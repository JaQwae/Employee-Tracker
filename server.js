const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_db'
    },
    console.log('Connect to company_db')
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// main selector
const userPrompt = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'options',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit program'
                ]
            }
        ])
        .then((answers) => {
        const choiceSelected = answers.options;
        
        if (choiceSelected === 'View all departments'){
            showAllDepartments();
        } 

        if (choiceSelected === 'View all roles'){
            showAllRoles();
        } 

        if (choiceSelected === 'View all employees'){
            showAllEmployees();
        } 

        if (choiceSelected === 'Add a department'){
            addADepartment()
        } 

        if (choiceSelected === 'Add a role'){
            console.log('addARole()')
        } 

        if (choiceSelected === 'Add an employee'){
            console.log('addAnEmployee()')
        } 

        if (choiceSelected === 'Update an employee role'){
            console.log('updateAnEmployeeRole()')
        } 

        if (choiceSelected === 'Exit program'){
            console.log('exitProgram()')
        } 
    })
}
userPrompt();

// Functionality to show all departments
const showAllDepartments = () => {
    const mysql = `SELECT department.id AS ID, department.names AS Department 
                    FROM department`;

    connection.query(mysql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        userPrompt();
    });
};

// Functionality to show all roles
const showAllRoles = () => {
    const mysql = `SELECT roles.id AS ID, roles.title AS Title, department.names AS Department 
                    FROM roles 
                    INNER JOIN department ON roles.department_id = department.id`;

    connection.query(mysql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        userPrompt();
    });
};

// Functionality to show all employees
const showAllEmployees = () => {
    const mysql = `SELECT employee.id AS ID, 
                    employee.first_name AS 'First Name', 
                    employee.last_name AS 'Last Name', 
                    roles.title AS Title, 
                    department.names AS Department,
                    roles.salary AS Salary, 
                    CONCAT (manager.first_name, " ", manager.last_name) AS Manager
                    FROM employee
                        LEFT JOIN roles ON employee.roles_id = roles.id
                        LEFT JOIN department ON roles.department_id = department.id
                        LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    connection.query(mysql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        userPrompt();
    });
};

// function to add a department 
const addADepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: "What department do you want to add?",
            validate: addDepartment => {
                if (addDepartment) {
                    return true;
                } else {
                    console.log('Please enter a department');
                    return false;
                }
            }
        }
    ])
        .then(answers => {
            const sql = `INSERT INTO department (names)
                    VALUES ?`;
            connection.query(sql, answers.addDepartments, (err, result) => {
                if (err) throw err;
                console.log('Added ' + answers.addDepartments + " to departments!");

                showAllDepartments();
                userPrompt();
            });
        });
};