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

            case 'View all departments':
                console.log('Viewing all departments...');
                viewDepartments();
                break;

            case 'View all roles':
                console.log('Viewing all roles...');
                viewRoles();
                break;

            case 'Add new employee':
                console.log('Adding new employee...');
                addEmployee();
                break;
            
            case 'Add new department':
                console.log('Adding new department...');
                break;

            case 'Add new role':
                console.log('Adding new role...');
                break;

            case 'Update employee role':
                console.log('Updating employee role...');
                break;
        }
    });
}

//shows all employees
const viewAllEmployees = () => {
    connection.query('Select * from employee', function (err,res) {
        if (err) throw (err)
        console.table(res)
        startProgram();
    })
};

//shows all departments
const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw (err);
        console.table(res);
        startProgram();
    })
};

//shows all roles
const viewRoles = () => {
    // Returns a list of all roles
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw (err);
        console.table(res);
        startProgram();
    })
};

//add new employee
const addEmployee = () => {
    // Creates a new employee row and then displays a new list of all employees
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of the employee?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the employee?'
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'What is the employee role id?'
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'What is the emploee manager id?'
            },
        ])
        .then((answer) => {
            connection.query('INSERT into employee SET ?', {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId
            })
            console.log('Employee Added')
            viewAllEmployees()
        })
}
