import express from "express";
// import pg from "pg";
import {db} from '@vercel/postgres';
import bcrypt from "bcrypt";

const router = express.Router();

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

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashPass = await bcrypt.hash(password, 10);
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    res.send("Success");
    if (result.rows.length > 0) {
      let success = false;
      const user = result.rows[0];
      const currPassword = user.password;
      const match = await bcrypt.compare(password, currPassword);

      if (match === true) {
        success = true;
        res.send({status: success, data:user.id});
      } else {
        res.send(success);
      }
    } else {
      res.send("User not found");
    }
  } catch (error) {
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

      const hourlog = await db.query(
        "DELETE FROM hourlog WHERE taskid IN (SELECT id FROM tasks WHERE projectid = $1)",
        [id]
      )

      const task = await db.query(
        "DELETE FROM tasks WHERE projectid = $1",
        [id]
      )

      const result = await db.query(
        "DELETE FROM projects WHERE id = $1",
        [id]
      );

    } else if (func === 'addNewTask'){
      const projectid = req.body.newTask.projectid;
      const name = req.body.newTask.name;
      const paymenttype = req.body.newTask.paymenttype;
      const priority = req.body.newTask.priority;
      const amount = req.body.newTask.amount;
      const employeelist = req.body.newTask.employeelist;
      const description = req.body.newTask.desc;
      const status = req.body.newTask.status;

      const result = await db.query(
        "INSERT INTO tasks (projectid, name, paymenttype, priority, amount, employeelist, description, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [projectid, name, paymenttype, priority, amount, employeelist, description, status]
      );

    } else if(func === 'editTask'){
      const id = req.body.editedTask.id;
      const projectid = req.body.editedTask.projectid;
      const name = req.body.editedTask.name;
      const paymenttype = req.body.editedTask.paymenttype;
      const priority = req.body.editedTask.priority;
      const amount = req.body.editedTask.amount;
      const employeelist = req.body.editedTask.employeelist;
      const description = req.body.editedTask.desc;
      const status = req.body.editedTask.status;

      const result = await db.query(
        "UPDATE tasks SET id = $1, projectid = $2, name = $3, paymenttype = $4, priority = $5, amount = $6, employeelist = $7, description = $8, status = $9 WHERE id = $1",
        [id, projectid, name, paymenttype, priority, amount, employeelist, description, status]
      );

    } else if(func === 'deleteTask'){
      const id = req.body.deleteTask.id;

      const result = await db.query(
        "DELETE FROM tasks WHERE id = $1",
        [id]
      );

    } else if (func === 'addNewHourlog'){
      const taskid = req.body.newHourlog.taskId;
      const employeeassigned = req.body.newHourlog.employeeassigned;
      const date = req.body.newHourlog.date;
      const seconds = req.body.newHourlog.seconds;
      const minutes = req.body.newHourlog.minutes;
      const hours = req.body.newHourlog.hours;
      const starttimer = req.body.newHourlog.starttimer;
      const amount = req.body.newHourlog.amount;
      const pendingamount = req.body.newHourlog.pendingamount;

      const result = await db.query(
        "INSERT INTO hourlog (taskid, employeeassigned, date, seconds, minutes, hours, starttimer, amount, pendingamount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [taskid, employeeassigned, date, seconds, minutes, hours, starttimer, amount, pendingamount]
      );

    } else if (func === 'runTimer'){
      const id = req.body.time.id;
      const starttimer = req.body.time.starttimer;
      const hours = req.body.time.hours;
      const minutes = req.body.time.minutes;
      const seconds = req.body.time.seconds;

      const result = await db.query(
        "UPDATE hourlog SET id = $1, starttimer = $2, hours = $3, minutes = $4, seconds = $5 WHERE id = $1",
        [id, starttimer, hours, minutes, seconds]
      )
      
    }
  } catch(error) {
    console.error("Error: ", error);
    res.status(500).send("Shit hit the fan Error in function home");
  }
});

router.get("/home", async (req, res) => {
  const userId = req.headers['userid']||req.query.userId;

  try {
    const result = await db.query("SELECT * FROM projects p WHERE userid = $1 OR EXISTS (SELECT 1 FROM unnest(p.employees) AS emp WHERE emp = $1) ORDER BY p.id ASC", [
      userId,
    ]);
    const tasks = await db.query("SELECT t.* FROM tasks t JOIN projects p ON t.projectid = p.id WHERE p.userid = $1 OR EXISTS (SELECT 1 FROM unnest(t.employeelist) AS emp WHERE emp = $1) ORDER BY t.id ASC",[
      userId,
    ]); 
    const hourlog = await db.query("SELECT h.* FROM hourlog h INNER JOIN tasks t ON h.taskid = t.id INNER JOIN projects p ON t.projectid = p.id WHERE (p.userid = $1) OR (h.employeeassigned = $1) ORDER BY h.id ASC",[
      userId,
    ]);

    const users = await db.query("SELECT * FROM users");

    let projects = result.rows;
    let projLength = result.rows.length;
    let taskLength = tasks.rows.length;
    let hlLength = hourlog.rows.length;

    res.send({projects: projLength?projects:null, users:users.rows, tasks:taskLength?tasks.rows:null, hourlog:hlLength?hourlog.rows:null});
    
  } catch(error) {
    console.error("Error: ", error);
    res.status(500).send("Shit hit the fan Error in get data home");
  }
})

export default router;
