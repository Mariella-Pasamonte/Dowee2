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
)