const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const actionChoices = require('./Prompts');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'newpassword',
        database: 'employees_db'
    },
    console.log(`Connected to database.`)
);


const viewDepartments = () => {
    db.query('SELECT * FROM departments', function (err, results) {
        if (err) { 
            throw err;
        } else {
            console.table(results);
            startPrompt();
        }
    });
};

const viewRoles = () => {
    db.query('SELECT * FROM roles', function (err, results) {
        if (err) {
            throw err;
        } else {
            console.table(results);
            startPrompt();
        }
    });
};

const viewEmployees = () => {
    db.query('SELECT * FROM employees', function (err, results) {
        if (err) {
            throw err;
        } else {
            console.table(results);
            startPrompt();
        }
    });
};

const addDepartment = (value) => {

    db.query("INSERT INTO departments (name) VALUES (?)", value, function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log(`Successfully added department.\n`);
            db.query("SELECT * FROM departments", function (err, results) {
                console.table(results);
            });
        }
    });
};

const addRole = (title,salary,department) => {
    const post  = {title: `${title}`, salary: salary, department_id: department};
        db.query("INSERT INTO roles SET ?", post, function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log(`Successfully added role.\n`);
            db.query("SELECT * FROM roles", function (err, results) {
                console.table(results);
            });
        }
    });
};


const startPrompt = async () => {
    const userChoice = await inquirer.prompt(actionChoices);

    switch (userChoice.action) {
        case 'View all departments':
            viewDepartments();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all employees':
            viewEmployees();
            break;
        case 'Add a department':
            addDepartment(userChoice.departmentName);
            break;
        case 'Add a role':
            addRole(userChoice.roleTitle, userChoice.roleSalary, userChoice.roleDepartment);
            break;
        case 'Add an employee':
            break;
        case 'Update an employee role':
            break;
    }


}

module.exports = startPrompt;