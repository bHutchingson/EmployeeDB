const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Hutch409!',
  database: 'employeeDB',
});

connection.connect((err) => {
    if (err) throw err;
    startProgram();
});

const departments = ['sales', 'marketing', 'engineering', 'finance', 'legal']

const startProgram = () => {
    inquirer.prompt({
        name: 'DB_options',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add new employee',
            'Add new role',
            'Add new department',
            'Update employee role',
        ]
    })
    .then((answer) => {
        switch (answer.DB_options) {
            case 'View all employees':
                console.log('Viewing all employees...');
                viewAllEmployees();
                break;

            case 'View all employees by department':
                console.log('Viewing all employees by department...');
                viewEmployeeByDepartment();
                break;

            case 'View all employees by manager':
                console.log('Viewing all employees by manager...');
                break;

            case 'Add new employee':
                console.log('Adding new employee...');
                break;
            
            case 'Add new department':
                console.log('Adding new department...');
                break;

            case 'Add new role':
                console.log('Adding new role...');
                break;

            case 'Remove employee':
                console.log('Removing employee...');
                break;

            case 'Update employee role':
                console.log('Updating employee role...');
                break;

            case 'Update employee manager':
                console.log('Updating employee manager...');
                break;
        }
    });
}

const viewAllEmployees = () => {
    connection.query('Select * from employee', function (err,res) {
        if (err) throw (err)
        console.table(res)
        startProgram();
    })
};

const viewDepartments = () => {
    // Returns a list of all departments
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw (err);
        console.table(res);
        startProgram();
    })
}

const viewRoles = () => {
    // Returns a list of all roles
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw (err);
        console.table(res);
        startProgram();
    })
};

const viewEmployeeByDepartment = () => {
    inquirer.prompt({
        name: 'DB_options',
        type: 'list',
        message: 'Select a department to view employees',
        choices: departments
    })
    .then((answer) => {
        for (i=0; i < departments.length; i++) {
            if (departments[i] === answer) {
                connection.query(`SELECT  FROM department WHERE `)
            }
        };
             
        
        switch (answer.DB_options) {
            case 'View all employees':
                console.log('Viewing all employees...');
                viewAllEmployees();
                break;

            case 'View all employees by department':
                console.log('Viewing all employees by department...');
                viewEmployeeByDepartment();
                break;

            case 'View all employees by manager':
                console.log('Viewing all employees by manager...');
                break;

            case 'Add new employee':
                console.log('Adding new employee...');
                break;
            
            
        }
    });
}