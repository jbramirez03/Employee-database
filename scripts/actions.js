const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const mysqlPromise = require('mysql2/promise');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'newpassword',
        database: 'employees_db'
    },
    console.log(`Connected to database.`)
);

const connectElements = {
    host: 'localhost',
    user: 'root',
    password: 'newpassword',
    database: 'employees_db'
}



const viewDepartments = () => {
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) {
            throw err;
        } else {
            console.table(results);
            startPrompt();
        }
    });
};

const viewRoles = () => {
    db.query('SELECT * FROM roles', (err, results) => {
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

    const connection = await mysqlPromise.createConnection(connectElements);

    const departmentCreated = await inquirer.prompt([
        {
            type: 'input',
            name: 'depName',
            message: 'What is the name of the new department?'
        }
    ]);

    const [insertedDepartment] = await connection.execute(`INSERT INTO departments (name) VALUES ("${departmentCreated.depName}")`);
    console.log(`\nSuccessfully added department.\n`);
    startPrompt();
};

const addRole = async () => {
    let departmentsArray = [];

    const connection = await mysqlPromise.createConnection(connectElements);

    const [departments] = await connection.execute('SELECT name From departments');
    departments.map(department => departmentsArray.push(department.name));

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

    const post = { title: `${roleCreated.roleTitle}`, salary: roleCreated.roleSalary, department_id: departmentSelected };
    const [roleAdded] = await connection.query("INSERT INTO roles SET ?", post);
    console.log(`\n Successfully added role\n`);
    startPrompt();
};

const addEmployee = async () => {
    let managersArray = [];
    let rolesArray = [];

    const connection = await mysqlPromise.createConnection(connectElements);

    const [managers] = await connection.execute("SELECT first_name, last_name FROM employees WHERE manager_id IS NULL")
    const [roles] = await connection.execute("SELECT * FROM roles");

    managers.map(manager => managersArray.push(`${manager.first_name} ${manager.last_name}`));
    roles.map(role => rolesArray.push(role.title));

    const employeeCreated = await inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFName',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'employeeLName',
            message: 'What is the last name of the employee?',
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'What is the role id for this employee?',
            choices: rolesArray,
        },
        {
            type: 'list',
            name: 'employeeManagement',
            message: 'Who is the manager of this employee?',
            choices: managersArray,
        }
    ]);

    const selectedRole = rolesArray.indexOf(employeeCreated.employeeRole) + 1;
    const selectedManager = managersArray.indexOf(employeeCreated.employeeManagement) + 1;

    const post = { first_name: `${employeeCreated.employeeFName}`, last_name: `${employeeCreated.employeeLName}`, role_id: selectedRole, manager_id: selectedManager };
    const [addEmployee] = await connection.query('INSERT INTO employees SET ?', post);

    console.log(`\nSuccessfully added ${employeeCreated.employeeFName} ${employeeCreated.employeeLName} to database\n`);
    startPrompt();
};


const updateEmployee = async () => {
    let employeesArray = [];
    let rolesArray = [];

    const connection = await mysqlPromise.createConnection(connectElements);

    const [employees] = await connection.execute('SELECT first_name, last_name FROM employees');
    employees.map(employee => employeesArray.push(`${employee.first_name} ${employee.last_name}`));

    const [roles] = await connection.execute('SELECT title FROM roles');
    roles.map(role => rolesArray.push(role.title));

    const employeeToUpdate = await inquirer.prompt([
        {
            type: 'list',
            name: 'employees',
            message: 'What employee would you like to update?',
            choices: employeesArray
        },
        {
            type: 'list',
            name: 'roles',
            message: 'What role would you like to assign to this employee?',
            choices: rolesArray
        }
    ]);

    const selectedEmployee = employeesArray.indexOf(employeeToUpdate.employees) + 1;
    const selectedRole = rolesArray.indexOf(employeeToUpdate.roles) + 1;

    const [employeeUpdated] = await connection.execute(`UPDATE employees SET role_id = ${selectedRole} WHERE id = ${selectedEmployee}`);

    console.log(`\nSuccessfully updated ${employeesArray[selectedEmployee - 1]}'s role\n`);
    startPrompt();
};

const viewByManagers = async () => {
    let managersArray = [];

    const connection = await mysqlPromise.createConnection(connectElements);

    const [rows, fields] = await connection.execute('SELECT * FROM employees WHERE manager_id IS NULL');

    rows.map(employee => managersArray.push(employee.first_name));

    const employeesByManager = await inquirer.prompt([
        {
            type: 'list',
            name: 'managers',
            message: 'Who is the manager of the employees?',
            choices: managersArray
        }
    ]);

    const [selectedManager] = await connection.execute(`SELECT id FROM employees WHERE first_name = "${employeesByManager.managers}"`);
    const [employees] = await connection.execute(`SELECT * FROM employees WHERE manager_id = ${selectedManager[0].id}`);

    console.table(employees);

    startPrompt();

}

const viewByDepartments = async () => {
    const connection = await mysqlPromise.createConnection(connectElements);
    let rolesArray = [];

    const [roles] = await connection.execute('SELECT title FROM roles');
    roles.map(role => rolesArray.push(role.title));

    const roleToViewBy = await inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'What role would you like to view employees by?',
            choices: rolesArray
        }
    ]);

    const roleSelected = rolesArray.indexOf(roleToViewBy.role) + 1;

    const [employeesByRole] = await connection.execute(`SELECT * FROM employees WHERE role_id = ${roleSelected}`);

    console.table(employeesByRole);
    startPrompt();
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
            addEmployee();
            break;
        case 'Update an employee role':
            updateEmployee();
            break;
        case 'View employees by manager':
            viewByManagers();
            break;
        case 'View employees by department':
            viewByDepartments();
            break;
        case 'Exit':
            console.log("Goodbye (;⌓;)");
            db.end();
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
            "Add a role", "Add an employee", "Update an employee role", "View employees by manager", "View employees by department", "Exit"]
    }
];

module.exports = startPrompt;

