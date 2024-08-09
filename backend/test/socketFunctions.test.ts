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

describe("/userId request returns users ID correctly", () => {
   test("joinRoom function", async () => {
      const response1 = await request(httpServer).get("/userId");
      expect(response1.status).toBe(200);
   });
});

describe("Socket.io, creating and joining room", () => {
   beforeAll((done) => {
      hostSocket = Client(`http://localhost:${httpServerAddr.port}`, {
         transports: ["websocket"],
         reconnectionDelayMax: 10000,
      });
      userSocket = Client(`http://localhost:${httpServerAddr.port}`, {
         transports: ["websocket"],
         reconnectionDelayMax: 10000,
      })
      hostSocket.on("connect", done);
   });

   afterAll((done) => {
      if (hostSocket) {
         hostSocket.close();
      }
      done();
   });

   test("Should create and join created room", (done) => {
      try {
         const userId = "testId";
         const username = "tester";
         hostSocket.emit("createRoom", userId, username);

         hostSocket.on("refreshPlayers", (room) => {
            expect(room.playerList).toContainEqual({ username: username, userId: userId, socketId: hostSocket.id, isHost: true });
         });
         done();
      } catch (err) {
         console.error(err);
         done();
      }

   });
   test("Should be able to join the room created before", (done)=>{

   });
});