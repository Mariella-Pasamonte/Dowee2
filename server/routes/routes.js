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
try {
  db.connect();
  console.log("Connected to Database");
} catch {
  console.log("error connecting to Database");
}

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashPass = await bcrypt.hash(password, 10);
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

router.post("/register", async (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const gender = req.body.gender;
  const birthday = req.body.birthday;
  const contactNum = req.body.contactNum;
  const username = req.body.username;
  const password = req.body.password;
  const hashPass = await bcrypt.hash(password, 10);
  let exist = true;

  try {
    const checkExistingUsername = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const checkExistingContact = await db.query(
      "SELECT * FROM users WHERE contactno = $1",
      [contactNum]
    );
    const checkExistingEmail = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (checkExistingUsername.rows.length > 0) {
      res.send(exist);
    } else if (checkExistingContact.rows.length > 0) {
      res.send(exist);
    } else if (checkExistingEmail.rows.length > 0) {
      res.send(exist);
    } else {
      const result = await db.query(
        "INSERT INTO users (fname, lname, username, password, email, contactno, gender, birthdate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [fname, lname, username, hashPass, email, contactNum, gender, birthday]
      );
      exist = false;
      res.send(exist);
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send("Shit hit the fan Error");
  }
});

export default router;
