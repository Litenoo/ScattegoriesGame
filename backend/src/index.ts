import { server } from "./middleware/app.js";

server.listen(3000, '0.0.0.0', () => {
   console.log("Server is listening on port 3000");
});
