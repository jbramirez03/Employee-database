DROP DATABASE if EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

-- Table for departments in database
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Table for roles in database.
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY(department_id)
    REFERENCES departments(id)
);

-- Table for employees in database.
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT ,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,  
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL  
);