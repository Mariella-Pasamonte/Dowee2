import pg from "pg";
// import { db } from '@vercel/postgres';
import express from "express";
import cors from "cors";
import router from "./routes/routes.js";

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Doify",
  //Akoa's password
  // password: "doifywebapp",
  password: "doifyapp",
  port: 5432,
});

// const db = new pg.Client({
//   user: "default",
//   host: "ep-autumn-cell-a1hs24pd-pooler.ap-southeast-1.aws.neon.tech/verceldb?sslmode=require",
//   database: "verceldb",
//   password: "Ej5Nzx9edRBl",
// });
try {
  db.connect();
  console.log("Connected to Database");
} catch {
  console.log("error connecting to Database");
}
app.use("/", router);

app.get("/", (req, res) => res.send("Hello world."));

app.listen(port, () => console.log("Server ready on port 3000."));

console.log("hello");

export default app;