//import { db } from '@vercel/postgres';
import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import pg from "pg";

// To connect to database local. Remove vercel db connection and uncomment ("import pg from "pg")
const port = process.env.PORT || 5000;
// For localhost
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Doify",
  //Akoa's password
  // password: "doifywebapp",
  //Mariella's password
  password: "doifyapp",
  port: 5432,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));



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

app.listen(port, () => console.log(`Server ready on port ${port}.`));

export default app;