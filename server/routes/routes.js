import express from "express";
// import pg from "pg";
import {db} from '@vercel/postgres';
import bcrypt from "bcrypt";

const router = express.Router();

//For localhost
// const db = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: "Doify",
//   //Akoa's password
//   //  password: "doifywebapp",
//   //Mariela's password
//   password: "doifyapp",
//   port: 5432,
// });

try { 
  db.connect();
  console.log("Connected Routes to Database");
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
        res.send({ status: success, data: user.id });
      } else {
        console.log("Invalid credentials");
        res.send(success);
      }
    } else {
      console.log("User not found");
      res.send("User not found");
    }
  } catch (error) {
    console.error("post/login errorError: ", error);
    res.status(500).send("Shit hit the fan Error");
  }
});

router.get("/login", async (req, res) => {
  const userId = req.headers["userId"] || req.query.userId;
  try {
    let success = false;
    const result = await db.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (result.rows.length > 0) {
      success = true;
      res.send({ status: success });
    } else {
      res.send({ status: success });
    }
  } catch (error) {
    console.error("get/login errorError:", error);
    res.status(500).send("User does not exist");
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
      console.log("Username already exists")
    } else if (checkExistingContact.rows.length > 0) {
      res.send(exist);
      console.log("Contact number already exists")
    } else if (checkExistingEmail.rows.length > 0) {
      res.send(exist);
      console.log("Email already exists")
    } else {
      const result = await db.query(
        "INSERT INTO users (fname, lname, username, password, email, contactno, gender, birthdate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [fname, lname, username, hashPass, email, contactNum, gender, birthday]
      );
      exist = false;
      res.send(exist);
    }
  } catch (error) {
    console.error("post/register errorError: ", error);
    res.status(500).send("Shit hit the fan Error");
  }
});

router.post("/addProject", async (req, res) => {
  const userid = req.body.userid;
  const name = req.body.name;
  const clientname = req.body.clientname;
  const clientemadd = req.body.clientemadd;
  const clientconnum = req.body.clientconnum;
  const issueddate = req.body.issueddate;
  const duedate = req.body.duedate;
  const description = req.body.description;
  const employees = req.body.employees;

  try{
    const result = await db.query(
      "INSERT INTO projects (userid, name, clientname, clientemadd, clientconnum, issueddate, duedate, description, employees) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        userid,
        name,
        clientname,
        clientemadd,
        clientconnum,
        issueddate,
        duedate,
        description,
        employees,
      ]
    );
  }catch{
    console.error("post. /addProject error Error: ", error);
    res.status(500).send("Shit hit the fan Error in addProject");
  }
});

router.post("/editProject", async (req, res) => {
  const id = req.body.id;
  const userid = req.body.userid;
  const name = req.body.name;
  const clientname = req.body.clientname;
  const clientemadd = req.body.clientemadd;
  const clientconnum = req.body.clientconnum;
  const issueddate = req.body.issueddate;
  const duedate = req.body.duedate;
  const description = req.body.description;
  const employees = req.body.employees;

  try{
    const result = await db.query(
      "UPDATE projects SET id = $10, userid = $1, name = $2, clientname = $3, clientemadd = $4, clientconnum = $5, issueddate = $6, duedate = $7, description = $8, employees = $9 WHERE id = $10",
      [
        userid,
        name,
        clientname,
        clientemadd,
        clientconnum,
        issueddate,
        duedate,
        description,
        employees,
        id,
      ]
    );
  }catch{
    console.error("post. /editProject error Error: ", error);
    res.status(500).send("Shit hit the fan Error in editProject");
  }
});

router.post("/deleteProject", async (req, res) => {
  const id = req.body.id;

  try{
    const hourlog = await db.query(
      "DELETE FROM hourlog WHERE taskid IN (SELECT id FROM tasks WHERE projectid = $1)",[id]);

    const task = await db.query("DELETE FROM tasks WHERE projectid = $1", [id]);

    const result = await db.query("DELETE FROM projects WHERE id = $1", [id]);

  }catch{
    console.error("post. /deleteProject error Error: ", error);
    res.status(500).send("Shit hit the fan Error in deleteProject");
  }
});

router.post("/addTask", async (req, res) => {
  // const projectid = req.body.projectid;
  // const name = req.body.name;
  // const paymenttype = req.body.paymenttype;
  // const priority = req.body.priority;
  // const amount = req.body.amount;
  // const employeelist = req.body.employeelist;
  // const description = req.body.desc;
  // const status = req.body.status;
  
  try{
    const result = await db.query(
      "INSERT INTO tasks (projectid, name, paymenttype, priority, amount, employeelist, description, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [ req.body.projectid, req.body.name, req.body.paymenttype,
        req.body.priority,
        req.body.amount,
        req.body.employeelist,
        req.body.description,
        req.body.status,
      ]
    );
  }catch{
    console.error("post. /addTask error Error: ", error);
    res.status(500).send("Shit hit the fan Error in addTask");
  }
});

router.post("/editTask", async (req, res) => {
  const id = req.body.id;
  const projectid = req.body.projectid;
  const name = req.body.name;
  const paymenttype = req.body.paymenttype;
  const priority = req.body.priority;
  const amount = req.body.amount;
  const employeelist = req.body.employeelist;
  const description = req.body.desc;
  const status = req.body.status;
  
  try{
    const result = await db.query(
      "UPDATE tasks SET id = $1, projectid = $2, name = $3, paymenttype = $4, priority = $5, amount = $6, employeelist = $7, description = $8, status = $9 WHERE id = $1",
      [
        id,
        projectid,
        name,
        paymenttype,
        priority,
        amount,
        employeelist,
        description,
        status,
      ]
    );
  }catch{
    console.error("post. /editTask error Error: ", error);
    res.status(500).send("Shit hit the fan Error in editTask");
  }
});

router.post("/deleteTask", async (req, res) => {
  const id = req.body.id;
  
  try{
    const result = await db.query("DELETE FROM tasks WHERE id = $1", [id]);
  }catch{
    console.error("post. /deleteTask error Error: ", error);
    res.status(500).send("Shit hit the fan Error in deleteTask");
  }
});

router.post("/addHourlog", async (req, res) => {
  const taskid = req.body.taskId;
  const employeeassigned = req.body.employeeassigned;
  const date = req.body.date;
  const seconds = req.body.seconds;
  const minutes = req.body.minutes;
  const hours = req.body.hours;
  const starttimer = req.body.starttimer;
  const amount = req.body.amount;
  const pendingamount = req.body.pendingamount;
  
  try{
    const result = await db.query(
      "INSERT INTO hourlog (taskid, employeeassigned, date, seconds, minutes, hours, starttimer, amount, pendingamount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        taskid,
        employeeassigned,
        date,
        seconds,
        minutes,
        hours,
        starttimer,
        amount,
        pendingamount,
      ]
    );
  }catch{
    console.error("post. /addHourlog error Error: ", error);
    res.status(500).send("Shit hit the fan Error in addHourlog");
  }
});

router.post("/runTimer", async (req, res) => {
  const id = req.body.id;
  const starttimer = req.body.starttimer;
  const hours = req.body.hours;
  const minutes = req.body.minutes;
  const seconds = req.body.seconds;
  const pendingamount = req.body.pendingamount;
  
  try{
    const result = await db.query(
      "UPDATE hourlog SET id = $1, starttimer = $2, hours = $3, minutes = $4, seconds = $5, pendingamount = $6 WHERE id = $1",
      [id, starttimer, hours, minutes, seconds, pendingamount]
    );
  }catch{
    console.error("post. /runTimer error Error: ", error);
    res.status(500).send("Shit hit the fan Error in runTimer");
  }
});

//Get users from database
router.get("/getUsers", async(req,res)=>{
  try {
    const users = await db.query("SELECT * FROM users");
    res.send({users: users.rows})
  } catch(error){
    console.error("get/getUsers error Error: ", error);
    res.status(500).send("Problem in /getUsers");
  }
})

router.get("/home", async (req, res) => {
  const userId = req.headers["userid"] || req.query.userId;
  try {
    const result = await db.query(
      "SELECT * FROM projects p WHERE userid = $1 OR EXISTS (SELECT 1 FROM unnest(p.employees) AS emp WHERE emp = $1) ORDER BY p.id ASC",
      [userId]
    );
    const tasks = await db.query(
      "SELECT t.* FROM tasks t JOIN projects p ON t.projectid = p.id WHERE p.userid = $1 OR EXISTS (SELECT 1 FROM unnest(t.employeelist) AS emp WHERE emp = $1) ORDER BY t.id ASC",
      [userId]
    );
    const hourlog = await db.query(
      "SELECT h.* FROM hourlog h INNER JOIN tasks t ON h.taskid = t.id INNER JOIN projects p ON t.projectid = p.id WHERE (p.userid = $1) OR (h.employeeassigned = $1) ORDER BY h.id ASC",
      [userId]
    );
    const invoice = await db.query(
      "SELECT i.* FROM invoice i WHERE i.invoice_from_userid = $1 ORDER BY i.id ASC",
      [userId]
    );

    const users = await db.query("SELECT * FROM users");

    let projects = result.rows;
    let projLength = result.rows.length;
    let taskLength = tasks.rows.length;
    let hlLength = hourlog.rows.length;

    res.send({projects: projLength ? projects : null, users: users.rows, tasks: taskLength ? tasks.rows : null, hourlog: hlLength ? hourlog.rows : null, invoices: invoice.rows.length ? invoice.rows : null});
  } catch (error) {
    console.error("get/home error Error: ", error);
    res.status(500).send("Shit hit the fan Error in get data home");
  }
});

router.post("/generateInvoice", async(req, res) => {
  const {
    invoice_number,
    invoice_to_clientName,
    invoice_to_clientEmAdd,
    invoice_from_userId,
    notes,
    invoice_project,
    invoice_tasks,
    invoice_hourlogs,
    invoice_total,
  } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO invoice (invoice_number, invoice_to_clientName, invoice_to_clientEmAdd, invoice_from_userId, notes, invoice_project, invoice_tasks, invoice_hourlogs, invoice_total) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        invoice_number,
        invoice_to_clientName,
        invoice_to_clientEmAdd,
        invoice_from_userId,
        notes,
        invoice_project,
        invoice_tasks,
        invoice_hourlogs,
        invoice_total,
      ]
    );
    res.status(201).json(result.rows[0]);
    
    console.log('Invoice generated:', result.rows[0]);
  } catch (error) {
    console.log(`some shit went down. It was probably ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update an existing invoice
router.post('/updateInvoice/:id', async (req, res) => {
  const { id } = req.params;
  const {
    invoice_number,
    invoice_to_clientName,
    invoice_to_clientEmAdd,
    invoice_from_userId,
    notes,
    invoice_project,
    invoice_tasks,
    invoice_hourlogs,
    invoice_total,
  } = req.body;

  try {
    const result = await db.query(
      `UPDATE invoice SET 
        invoice_number = $1,
        invoice_to_clientName = $2,
        invoice_to_clientEmAdd = $3,
        invoice_from_userId = $4,
        notes = $5,
        invoice_project = $6,
        invoice_tasks = $7,
        invoice_hourlogs = $8,
        invoice_total = $9
       WHERE id = $10 RETURNING *`,
      [
        invoice_number,
        invoice_to_clientName,
        invoice_to_clientEmAdd,
        invoice_from_userId,
        notes,
        invoice_project,
        invoice_tasks,
        invoice_hourlogs,
        invoice_total,
        id,
      ]
    );
    res.status(200).json(result.rows[0]);
    console.log('Invoice updated:', result.rows[0]);
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a specific invoice by ID
router.post('/getInvoice/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM invoice WHERE id = $1', [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error getting invoice:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete an invoice by ID
router.post('/deleteInvoice/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM invoice WHERE id = $1 RETURNING *', [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all invoices
router.post('/getAllInvoices', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM invoice');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error getting all invoices:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/checkInvoice', async (req, res)=>{
  const projectid = req.headers["projectid"];
  try{
    const result = await db.query('SELECT * FROM invoice WHERE invoice_project = $1;', [
      projectid
    ]);
    console.log(result.rows.length);
    if(result.rows.length>0){
      res.send({ status: true, invoice:result.rows });
    } else{
      res.send({ status: false });
    }
    
  } catch (error) {
    console.error('Error checking invoice:', error);
    res.status(500).json({ error: 'Internal Server Error in check invoice' });
  }

});

router.get('/viewInvoice/:id', async (req, res)=>{
  const { id } = req.params;
  
  try{
    const result = await db.query('SELECT 1 FROM invoice WHERE id = $1;', [
      id
    ]);

    const tasks = await db.query('SELECT * FROM tasks WHERE tasks.id IN $1', [
      result.rows[0].invoice_tasks
    ]);

    const hourlog = await db.query('SELECT * FROM hourlog WHERE hourlog.id IN $1', [
      result.rows[0].invoice_hourlogs
    ]);

    const project = await db.query('SELECT * FROM projects WHERE projects.id = $1', [
      result.rows[0].invoice_project
    ]);

    res.send({invoice:result.rows, tasks: tasks.rows, hourlog:hourlog.rows, project: project.rows});
    
  } catch (error) {
    console.error('Error checking invoice:', error);
    res.status(500).json({ error: 'Internal Server Error in check invoice' });
  }
})

export default router;
