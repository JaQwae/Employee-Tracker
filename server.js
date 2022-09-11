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
            showAllRoles()
        } 

        if (choiceSelected === 'View all employees'){
            console.log('showAllEmployees()')
        } 

        if (choiceSelected === 'Add a department'){
            console.log('addADepartment()')
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