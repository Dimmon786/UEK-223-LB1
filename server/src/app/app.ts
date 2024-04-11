import express from "express";
import Routes from "../routes/index"; 

const app = express();
const port = 3000;

app.use(express.json()); // Middleware, um JSON-Anfragen zu parsen

new Routes(app); // Instanziiere die Routes-Klasse

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});