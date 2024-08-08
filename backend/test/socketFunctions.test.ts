import request from "supertest";
import { Server } from "http";
import { AddressInfo } from "net";
import { io as Client, Socket } from "socket.io-client";
import { server, io } from "../src/middleware/app.ts";

import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';

let httpServer: Server;
let httpServerAddr: AddressInfo;
let clientSocket: Socket;

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
      try {
         const response1 = await request(httpServer).get("/");
         expect(response1.status).toBe(200);
      } catch (err) {
         console.log(err);
      }
   });
});

describe("Socket.io", () => {
   beforeAll((done) => {
      clientSocket = Client(`http://localhost:${httpServerAddr.port}`, {
         transports: ["websocket"],
         reconnectionDelayMax: 10000,
      });
      clientSocket.on("connect", done);
   });

   afterAll((done) => {
      if (clientSocket) {
         clientSocket.close();
      }
      done();
   });

   test("Should create and join created room", (done) => {
      try{
         const userId = "testId";
         const username = "tester";
         clientSocket.emit("createRoom", userId, username);
   
         clientSocket.on("refreshPlayers", (room) => {
            expect(room.playerList).toContainEqual({username: username, userId: userId, socketId: clientSocket.id, isHost: true });
         });
         done();
      }catch(err){
         console.error(err);
         done();
      }

   });
});