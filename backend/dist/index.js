"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./middleware/app.js");
app_js_1.server.listen(3000, '0.0.0.0', () => {
    console.log("Server is listening on port 3000");
});
