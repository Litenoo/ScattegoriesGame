import request from "supertest";
import { Server } from "http";
import { AddressInfo } from "net";
import { io as Client, Socket } from "socket.io-client";
import { server, io } from "../src/app.ts";

import { describe, expect, it } from '@jest/globals';

let httpServer: Server;
let httpServerAddr: AddressInfo;
let clientSocket: Socket;

beforeAll((done) => {
    httpServer = server.listen(()=>{
        httpServerAddr = httpServer.address() as AddressInfo;
        done();
    });
});

afterAll((done)=>{
    io.close();
    httpServer.close();
    done();
});

describe("/userId request returns users ID correctly", () => {
    test("joinRoom function", async () => {
        const response1 = await request(httpServer).get("/");
        const response2 = await request(httpServer).get("/");
        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);
        expect(response1).not.toBe(response2);
    });

});
