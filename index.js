const inquirer = require('inquirer');
const mysql = require('mysql2');
const actionChoices = require('./scripts/Prompts');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'jb0cme1214',
        database: 'employees_db'
    },
    console.log(`Connected to database.`)
);

inquirer
    .prompt(actionChoices)
    .then(answers => {
        switch (answers.action) {
            case 'View all departments':
                break;
            case 'View all roles':
                break;
            case 'View all employees':
                break;
            case 'Add a department':
                break;
            case 'Add a role':
                break;
            case 'Add an employee':
                break;
            case 'Update an employee role':
                break;
        }
    })
    .catch(error => {
        if (error) {
            throw error;
        } else {
            console.log('success');
        }
    })

