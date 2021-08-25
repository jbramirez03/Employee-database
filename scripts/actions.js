const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'jb0cme1214',
        database: 'employees_db'
    },
    console.log(`Connected to database.`)
);

const viewDepartments = () => {
    db.query('SELECT * FROM departments', function(err, results){
        if(err){
            throw err;
        } else {
            console.table(results);
        }
    });
};

const viewRoles = () => {
    db.query('SELECT * FROM roles', function(err, results){
        if(err){
            throw err;
        } else {
            console.table(results);
        }
    });
};

module.exports = {
    viewDepartments,
    viewRoles
}