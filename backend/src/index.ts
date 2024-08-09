import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { server } from "./middleware/app.js";

server.listen(process.env.BACKEND_PORT, () => {
   console.log(`Server is listening on port ${process.env.BACKEND_PORT}`);
});