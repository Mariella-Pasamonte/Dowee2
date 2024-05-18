-- This file contains the queries for creating the tables in the database
-- Do not copy and paste all of the queries at once, run them one by one in the database
-- separated by a semicolon

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    contactNo VARCHAR(100) NOT NULL UNIQUE,
    fName VARCHAR(100),
    lName VARCHAR(100),
    gender VARCHAR(100),
    birthDate VARCHAR(100),
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES "users"(id),
    name VARCHAR(100) NOT NULL,
    clientName VARCHAR(100) NOT NULL,
    clientEmAdd VARCHAR(100) NOT NULL,
    clientConNum VARCHAR(100) NOT NULL,
    issuedDate VARCHAR(100) NOT NULL,
    dueDate VARCHAR(100) NOT NULL,
    description VARCHAR(100),
    employees INT[] NOT NULL
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    projectId INT REFERENCES "projects"(id),
    name VARCHAR(100) NOT NULL,
    paymentType BOOLEAN NOT NULL,
    priority INT,
    amount NUMERIC(10,2)[] NOT NULL,
    employeeList INT[] NOT NULL,
    description VARCHAR(100),
    status VARCHAR(100) NOT NULL 
);

CREATE TABLE hourLog(
    id SERIAL PRIMARY KEY,
    taskId INT REFERENCES "tasks"(id),
    employeeAssigned INT REFERENCES "users"(id),
    date VARCHAR(100),
    seconds INT NOT NULL,
    minutes INT NOT NULL,
    hours INT NOT NULL,
    startTimer BOOLEAN,
    amount NUMERIC(10,2) NOT NULL,
    pendingamount NUMERIC(10,2)
);

CREATE TABLE invoice (
    id SERIAL PRIMARY KEY,
    invoice_number INT NOT NULL,
    invoice_date DATE DEFAULT CURRENT_DATE,
    invoice_to_clientName VARCHAR(100) NOT NULL,
    invoice_to_clientEmAdd VARCHAR(100) NOT NULL,
    invoice_from_userId INT REFERENCES users(id),
    notes TEXT,
    invoice_project INT REFERENCES projects(id),
    invoice_tasks INT[] NOT NULL,
    invoice_hourlogs INT[] NOT NULL,
    invoice_total NUMERIC(10, 2) NOT NULL
);

-- possible queries to use for testing
/*
-----------------------------------------------------------------------------------------------
display query to see the results for the tasks under the test project with a status of finished and assigned to testuser:

SELECT 
    t.id AS task_id,
    t.name AS task_name,
    t.amount AS task_amount,
    hl.seconds,
    hl.minutes,
    hl.hours,
    hl.pendingamount
FROM 
    tasks t
JOIN 
    projects p ON t.projectId = p.id
JOIN 
    hourLog hl ON hl.taskId = t.id
JOIN 
    users u ON hl.employeeAssigned = u.id
WHERE 
    p.name = 'test' AND
    t.status = 'finished' AND
    u.username = 'testuser';

-----------------------------------------------------------------------------------------------


*/