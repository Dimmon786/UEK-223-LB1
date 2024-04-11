import express, { Application } from "express";
import 'dotenv/config';
import Routes from "./src/routes/index";


const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

new Routes(app);

app.listen(PORT, "localhost", function () {
  console.log(`Server is running on port http://localhost:${PORT}.`);
})
.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.log("Error: Address already in use");
  } else {
    console.log(err);
  }
});
