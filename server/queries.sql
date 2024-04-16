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
    employees INT[]
);