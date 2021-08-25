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
        when: 'Add a department'
    }
];

module.exports = actionChoices;