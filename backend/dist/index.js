"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const app_js_1 = require("./middleware/app.js");
app_js_1.server.listen(process.env.BACKEND_PORT, () => {
    console.log(`Server is listening on port ${process.env.BACKEND_PORT}`);
});
