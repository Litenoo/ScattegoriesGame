import request from "supertest";
import { Server } from "http";
import { AddressInfo } from "net";
import { io as Client, Socket } from "socket.io-client";
import { server, io } from "../src/middleware/app";

import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';

let httpServer: Server;
let httpServerAddr: AddressInfo;
let hostSocket: Socket;
let userSocket: Socket;

beforeAll((done) => {
   httpServer = server.listen(() => {
      httpServerAddr = httpServer.address() as AddressInfo;
      done();
   });
});

afterAll((done) => {
   io.close();
   httpServer.close();
   done();
});

describe("/userId request returns users ID correctly.", () => {
   test("joinRoom function", async () => {
      const response1 = await request(httpServer).get("/userId");
      expect(response1.status).toBe(200);
   });
});

describe("Socket.io, creating and joining room", () => {
   beforeAll((done) => {
      let connections = 0;

      const onConnect = () => {
         connections += 1;
         if (connections === 2) {
            done();
         }
      };

      hostSocket = Client(`http://localhost:${httpServerAddr.port}`, {
         transports: ["websocket"],
         reconnectionDelayMax: 10000,
      });
      userSocket = Client(`http://localhost:${httpServerAddr.port}`, {
         transports: ["websocket"],
         reconnectionDelayMax: 10000,
      });

      hostSocket.on("connect", onConnect);
      userSocket.on("connect", onConnect);
   });

   afterAll((done) => {
      if (hostSocket) {
         hostSocket.close();
      }
      if (userSocket) {
         userSocket.close()
      }
      done();
   });

   test("Creating room and joining it then works fine.", (done) => {
      try {
         //Host player creates room and joins it
         const hostId = "hostId";
         const hostName = "tester";

         hostSocket.emit("createRoom", hostId, hostName);

         hostSocket.once("refreshPlayers", (room) => {
            expect(room.playerList).toContainEqual(
               {
                  username: hostName,
                  userId: hostId,
                  socketId: hostSocket.id,
                  isHost: true
               }
            );
            let roomId = room.roomId; // In practice this is code which has to be shared between users.

            // Non host player joins the room:
            const guestId = "guestId";
            const guestName = "guestName";

            userSocket.emit("joinRoom", guestId, roomId, guestName);

            userSocket.once("refreshPlayers", (room) => {
               expect(room.playerList).toEqual(
                  [
                     {
                        isHost: true,
                        socketId: hostSocket.id,
                        userId: hostId,
                        username: hostName,
                     },
                     {
                        isHost: false,
                        socketId: userSocket.id,
                        userId: guestId,
                        username: guestName,
                     }],
               );
               done();
            });
         });
      } catch (err) {
         done(err as Error);
      }
   });
});

/**
 * IMPORTANT TODO :
 * Add to the test above two another sockets which will create second room and prove that it is not global.
 */