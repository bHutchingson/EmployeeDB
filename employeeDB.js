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
    .then((answer) => {
        switch (answer.DB_options) {
            case 'View all employees':
                console.log('Viewing all employees');
                break;

            case 'View all employees by department':
                console.log('Viewing all employees');
                break;

            case 'View all employees by manager':
                console.log('Viewing all employees by manager');
                break;

            case 'Add new employee':
                console.log('Adding new employee');
                break;

            case 'Remove employee':
                console.log('Removing employee');
                break;

            case 'Update employee role':
                console.log('Updating employee role');
                break;

            case 'Update employee manager':
                console.log('Updating employee manager');
                break;
        }
    });
}