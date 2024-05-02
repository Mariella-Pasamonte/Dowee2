import express from "express";
import pg from "pg";
import bcrypt from "bcrypt";

const router = express.Router();

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
        res.send({status: success, data:user.id});
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

router.get("/login", async (req,res) =>{
  const userId = req.headers['userid']||req.query.userId;
  try{
    let success = false;
    const result = await db.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if(result.rows.length>0){
      success = true;
      res.send({status: success});
    }
    else{
      res.send({status: success});
    }

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("User does not exist");
  }
})

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

router.post("/home", async (req, res) =>{
  const func = req.body.headers.function;

  try{
    if(func==='addNewProject'){
      const userid = req.body.newProject.userId;
      const name = req.body.newProject.name;
      const clientname = req.body.newProject.clientname;
      const clientemadd = req.body.newProject.clientemadd;
      const clientconnum = req.body.newProject.clientconnum;
      const issueddate = req.body.newProject.issueddate;
      const duedate = req.body.newProject.duedate;
      const description = req.body.newProject.description;
      const employees = req.body.newProject.employees;

      const result = await db.query(
        "INSERT INTO projects (userid, name, clientname, clientemadd, clientconnum, issueddate, duedate, description, employees) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [userid, name, clientname, clientemadd, clientconnum, issueddate, duedate, description,employees]
      );
    } else if (func === 'editProject'){
      const id = req.body.editedProject.id;
      const userid = req.body.editedProject.userid;
      const name = req.body.editedProject.name;
      const clientname = req.body.editedProject.clientname;
      const clientemadd = req.body.editedProject.clientemadd;
      const clientconnum = req.body.editedProject.clientconnum;
      const issueddate = req.body.editedProject.issueddate;
      const duedate = req.body.editedProject.duedate;
      const description = req.body.editedProject.description;
      const employees = req.body.editedProject.employees;

      const result = await db.query(
        "UPDATE projects SET id = $10, userid = $1, name = $2, clientname = $3, clientemadd = $4, clientconnum = $5, issueddate = $6, duedate = $7, description = $8, employees = $9 WHERE id = $10",
        [userid, name, clientname, clientemadd, clientconnum, issueddate, duedate, description,employees, id]
      );
    } else if (func === 'deleteProject'){
      const id = req.body.deleteProject.id;

      console.log(id);

      const result = await db.query(
        "DELETE FROM projects WHERE id = $1",
        [id]
      );
    }
  } catch(error) {
    console.error("Error: ", error);
    res.status(500).send("Shit hit the fan Error in function home");
  }
});

router.get("/home", async (req, res) => {
  const userId = req.headers['userid']||req.query.userId;

  try {
    const result = await db.query("SELECT * FROM projects WHERE userid = $1", [
      userId,
    ]);
    const tasks = await db.query("SELECT t.* FROM tasks t JOIN projects p ON t.projectid = p.id WHERE p.userid = $1 OR EXISTS (SELECT 1 FROM unnest(p.employees) AS emp WHERE emp = $1)",[
      userId,
    ]);

    const users = await db.query("SELECT * FROM users");

    let projects = result.rows;
    let projLength = result.rows.length;
    let taskLength = tasks.rows.length;

    res.send({projects: projLength?projects:null, users:users.rows, tasks:taskLength?tasks.rows:null});
    
  } catch(error) {
    console.error("Error: ", error);
    res.status(500).send("Shit hit the fan Error in get data home");
  }
})

export default router;
