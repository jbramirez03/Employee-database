const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
// const actionChoices = require('./Prompts');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'newpassword',
        database: 'employees_db'
    },
    console.log(`Connected to database.`)
);

let rolesArray = [];
let managersArray = [];
let departmentsArray = [];

db.query("SELECT * FROM roles", (err, results) => {
    if (err) {
        console.log(err);
    }
    return results.map(role => rolesArray.push(`${role.title}`));
});

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
    db.query("SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(e.first_name, ' ' ,e.last_name) AS manager FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id left join employees e on employees.manager_id = e.id;", function (err, results) {
        if (err) {
            throw err;
        } else {
            console.table(results);
            startPrompt();
        }
    });
};

const addDepartment = async () => {

    const departmentCreated = await inquirer.prompt([
        {
            type: 'input',
            name: 'depName',
            message: 'What is the name of the new department?'
        }
    ]);

    db.query(`INSERT INTO departments (name) VALUES ("${departmentCreated.depName}")`, function (err, results) {
        if (err) {
            throw err;
        } else {
            db.query("SELECT * FROM departments", function (err, results) {
                console.table(results);
                console.log(`Successfully added department.\n`);
                startPrompt();
            });
        }
    });
};

const addRole = async () => {
    let departmentsArray = [];

    db.query('SELECT name From departments', function (err, results) {
        if (err) {
            throw err;
        } else {
            results.map(department => {
                return departmentsArray.push(`${department.name}`);
            });
        }
    });

    const roleCreated = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: "What is the title of the role you'd like to add?",
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary for the role you would like to add?',
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'What department does this role belong to?',
            choices: departmentsArray,
        }
    ]);

    const departmentSelected = departmentsArray.indexOf(roleCreated.roleDepartment) + 1;

    const post = { title: `${roleCreated.roleTitle}`, salary: roleCreated.roleSalary, department_id: departmentSelected};
    db.query("INSERT INTO roles SET ?", post, function (err, results) {
        if (err) {
            throw err;
        } else {
            db.query("SELECT * FROM roles", function (err, results) {
                console.table(results);
                console.log(`Successfully added role.\n`);
                startPrompt();
            });
        }
    });
};

const addEmployee = (firstName, lastName, role, manager) => {

    db.query(
        "SELECT first_name, last_name FROM employees WHERE manager_id IS NULL",
        (err, results) => {
            if (err) {
                console.log(err);
            }

            results.map(manager => {
                return managersArray.push(`${manager.first_name} ${manager.last_name}`);
            });
        }
    );


    const post = { first_name: `${firstName}`, last_name: `${lastName}`, role_id: role, manager_id: manager };
    db.query('INSERT INTO employees SET ?', post, function (err, results) {
        if (err) {
            throw err
        } else {
            console.log(`Successfully added employee\n`);
            db.query("SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(e.first_name, ' ' ,e.last_name) AS manager FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id left join employees e on employees.manager_id = e.id;", function (err, results) {
                console.table(results);
                console.log(`Successfully added an employee\n`);
                startPrompt();
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
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':

            break;
        case 'Update an employee role':
            break;
    }


}

const actionChoices = [
    {
        type: 'list',
        name: 'action',
        message: 'What action would you like to take with the database?',
        default: '',
        choices: ["View all departments", "View all roles", "View all employees", "Add a department",
            "Add a role", "Add an employee", "Update an employee role"]
    },
    {
        type: 'input',
        name: 'employeeFName',
        message: 'What is the first name of the employee?',
        when: answers => answers.action === 'Add an employee'
    },
    {
        type: 'input',
        name: 'employeeLName',
        message: 'What is the last name of the employee?',
        when: answers => answers.action === 'Add an employee'
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'What is the role id for this employee?',
        choices: rolesArray,
        when: answers => answers.action === 'Add an employee'
    },
    {
        type: 'list',
        name: 'employeeManagement',
        message: 'Who is the manager of this employee?',
        choices: managersArray,
        when: answers => answers.action === 'Add an employee'
    }
];

module.exports = startPrompt;

