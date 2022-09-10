// const express = require('express');
const inquirer = require('inquirer');
// const mysql = require('mysql2');
// const table = require('console.table');

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({extended: false}));
// app.use(express.json());

// Connect to database
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'password',
//         database: 'company_db'
//     },
//     console.log('Connect to company_db')
// );

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

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
                    'Update an employee role'
                ]
            }
        ])
        .then((answers) => {
        const choiceSelected = answers.options;
        console.log(choiceSelected);
    })
};

userPrompt();