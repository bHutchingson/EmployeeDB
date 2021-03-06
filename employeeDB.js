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
                addDepartment();
                break;

            case 'Add new role':
                console.log('Adding new role...');
                addRole();
                break;

            case 'Update employee role':
                console.log('Updating employee role...');
                updateRole();
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
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw (err);
        console.table(res);
        startProgram();
    })
};

//add new employee
const addEmployee = () => {
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

//add a new role
const addRole = () => {
    // Allows the user to create a new role and add it to the database
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role you would like to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the starting salary of the role you are adding?'
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'What is the department id for the role you would like to add?'
            },

        ])
        .then((answer) => {
            connection.query('INSERT into role SET ?', {
                title: answer.roleName,
                salary: answer.salary,
                department_id: answer.departmentId
            })
            console.log('role Added')
            viewRoles()
        })
}

//add new department
const addDepartment = () => {
    // Creates a new department then displays all departments
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department you would like to add?'
            },

        ])
        .then((answer) => {
            connection.query('INSERT into department SET ?', {
                department_name: answer.departmentName,
            })
            console.log('Department Added')
            viewDepartments()
        })
}
//update employee role
const updateRole = () => {
    // Updates the employee role based on employee id and role id
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'What is the employee id number of the employee you would like to update?'
            },
            {
                type: 'input',
                name: 'newRole',
                message: 'What is the new role of the employee?'
            },

        ]).then((answer) => {
            connection.query('UPDATE employee SET ? WHERE?', [{
                role_id: answer.newRole
            },
            {
                id: answer.employeeId
            }
            ])
            console.log('Employee updated')
            viewAllEmployees()
        })
}
