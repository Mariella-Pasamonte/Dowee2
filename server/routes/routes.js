import express from "express";
import pg from "pg";
import bcrypt from "bcrypt";

const router = express.Router();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Doify",
  password: "doifywebapp",
  port: 5432,
});

db.connect();

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  const hashPass = await bcrypt.hash(password, 10);
  console.log(hashPass);
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      let success = false;
      const user = result.rows[0];
      const currPassword = user.password;
      const match = await bcrypt.compare(password, currPassword);

      if (match === true) {
        success = true;
        console.log("Success: ", success);
        res.send(success);
      } else {
        console.log("Invalid credentials");
        res.send(success);
      }
    } else {
      console.log("User not found");
      res.send("User not found");
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send("Shit hit the fan Error");
  }
});

export default router;
