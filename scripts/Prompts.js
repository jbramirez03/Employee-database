
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
        name: 'departmentName',
        message: 'What is the name of the department?',
        when: answers => answers.action === 'Add a department'
    },
    {
        type: 'input',
        name: 'roleTitle',
        message: "What is the title of the role you'd like to add?",
        when: answers => answers.action === 'Add a role'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary for the role you would like to add?',
        when: answers => answers.action === 'Add a role'
    },
    {
        type: 'input', 
        name: 'roleDepartment',
        message: 'What is the department id of this role?',
        when: answers => answers.action === 'Add a role'
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
        type: 'input',
        name: 'employeeRole',
        message: 'What is the role id for this employee?',
        when: answers => answers.action === 'Add an employee'
    },
    {
        type: 'input',
        name: 'employeeManagement',
        message: 'Who is the manager of this employee?',
        when: answers => answers.action === 'Add an employee'
    }
];

module.exports = actionChoices;