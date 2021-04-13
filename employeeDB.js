const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '',
  database: 'employeeDB',
});

connection.connect((err) => {
    if (err) throw err;
    startProgram();
});

const startProgram = () => {
    inquirer.prompt({
        name: 'DB_options',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View all employees by department',
            'View all employees by manager',
            'Add new employee',
            'Remove employee',
            'Update employee role',
            'Update employee manager'
        ]
    })
    .then
}