const actionChoices = [
    {
        type: 'list',
        name: 'action',
        message: 'What action would you like to take with the database?',
        default: '',
        choices: ["View all departments", "View all roles", "View all employees", "Add a department",
         "Add a role", "Add an employee", "Update an employee role"]
    }
];

module.exports = actionChoices;