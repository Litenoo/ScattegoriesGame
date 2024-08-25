"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const randomstring_1 = __importDefault(require("randomstring"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const logger_js_1 = __importDefault(require("./logger.js"));
const socketFunctions_js_1 = require("./socketFunctions.js");
const Player_js_1 = __importDefault(require("./Classes/Player.js"));
const app = (0, express_1.default)();
exports.server = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(exports.server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    }
});
app.use(express_1.default.json(), express_1.default.urlencoded({ extended: true }), (0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
}), (0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "session-secret",
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: true,
    }
}));
app.get("/userID", (req, res) => {
    try {
        const userId = randomstring_1.default.generate(12);
        res.status(200);
        res.send(userId);
    }
    catch (err) {
        logger_js_1.default.error("Error generating user Id: ", err);
        res.status(500).send("Internal Server Error.");
    }
});
exports.io.on('connection', (socket) => {
    socket.on('createRoom', (userId, username) => {
        try {
            const host = new Player_js_1.default(username, userId, socket.id, true);
            const roomId = (0, socketFunctions_js_1.createLobby)(socket, host);
        }
        catch (err) {
            logger_js_1.default.error(err);
        }
    });
    socket.on("refreshPlayers", (userId) => {
        (0, socketFunctions_js_1.refreshPlayers)(userId, socket.id);
    });
    socket.on("startGame", (userId) => {
    });
    socket.on('joinRoom', (userId, roomId, username) => {
        console.log("/joinRoom");
        (0, socketFunctions_js_1.joinRoom)(socket, userId, roomId, username);
    });
});
