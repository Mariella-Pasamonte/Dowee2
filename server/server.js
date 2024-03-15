import pg from "pg";
import express from "express";
import cors from "cors";
import router from "./routes/routes.js";

const app = express();
const port = 5000;

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
  password: "doifyapp",
  port: 5432,
});
try {
  db.connect();
  console.log("Connected to Database");
} catch {
  console.log("error connecting to Database");
}
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
