import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { server } from "./middleware/app.js";

server.listen(process.env.BACKEND_PORT, () => {
   console.log(`Server is listening on port ${process.env.BACKEND_PORT}`);
});

//TODO : make .env file for users to fill instead of creating it themselves.
