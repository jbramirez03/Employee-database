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
        console.log(answers.action);
    })
    .catch(error => {
        if (error) {
            throw error;
        } else {
            console.log('success');
        }
    })

