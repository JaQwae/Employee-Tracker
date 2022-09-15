const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
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

            if (choiceSelected === 'View all departments') {
                showAllDepartments();
            }

            if (choiceSelected === 'View all roles') {
                showAllRoles();
            }

            if (choiceSelected === 'View all employees') {
                showAllEmployees();
            }

            if (choiceSelected === 'Add a department') {
                addADepartment();
            }

            if (choiceSelected === 'Add a role') {
                addARole();
            }

            if (choiceSelected === 'Add an employee') {
                addAnEmployee()
            }

            if (choiceSelected === 'Update an employee role') {
                updateAnEmployeeRole()
            }

            if (choiceSelected === 'Exit program') {
                connection.end();
                console.log('Press Ctrl + C keys to close the server.')
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
    const mysql = `SELECT roles.id AS ID, roles.title AS Title, roles.salary, department.names AS Department 
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
            const mysql = `INSERT INTO department (names)
                        VALUES ('${answers.addDepartment}')`

            connection.query(mysql, answers.addDepartments, (err, result) => {
                if (err) throw err;
                console.log('Added ' + answers.addDepartments + " to departments!");

                showAllDepartments();
                userPrompt();
            });
        });
};

// functionality to add a role (prompted to enter the name, salary, and department for the role and that role is added to the database)
const addARole = async () => {

    // const departments = await showAllDepartments();

    let allDeptChoices = await connection
        .promise()
        .query(`SELECT department.id AS ID, department.names AS Department FROM department`)
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ ID, Department }) => ({
                name: Department,
                value: ID,
            }));
            return departmentChoices;
        });
    const responses = await inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the new role? ',
            },
            {
                name: 'salary',
                type: 'number',
                message: "What is the role's salary? ",
            },
            {
                name: 'department',
                type: 'list',
                choices: allDeptChoices,
                message: 'What department is the role in? ',
            },
        ])
        .then((answers) => {
            const mysql = `INSERT INTO roles (title, salary, department_id) VALUES ('${answers.title}', '${answers.salary}', '${answers.department}')`;

            connection.query(
                mysql,
                (err, result) => {
                    if (err) throw err;
                    console.log(
                        'Added ' +
                        answers.title +
                        answers.salary +
                        answers.department.id +
                        ' to departments!'
                    );

                    showAllRoles();
                    userPrompt();
                }
            );
        });
};

// functionality to add an employee (prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database)
const addAnEmployee = async () => {

    connection.query('Select * FROM employee', async (err) => {
        if (err) throw err;

        
        connection.query('Select * FROM employee WHERE manager_id IS NULL', async (err, managers) => {
            if (err) throw err;

            managers = managers.map(manager => ({ name: manager.first_name + " " + manager.last_name, value: manager.id }));
            managers.push({ name: "None" });

        connection.query('SELECT * FROM roles', async (err, roles) => {    
            rolesArry = roles.map(roles => ({ name: roles.title, value: roles.id }));

            const responses = await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is the employee's first name? ",
                        name: "first_name"
                    },
                    {
                        type: "input",
                        message: "What is the employee's last name? ",
                        name: "last_name"
                    },
                    {
                        type: "list",
                        message: "What is the employee's role? ",
                        choices: rolesArry, //(roles => ({ name: roles.title, value: roles.id })),
                        name: "roles_id"
                    },
                    {
                        type: "list",
                        message: "Who is the employee's manager? ",
                        choices: managers,
                        name: "manager_id"
                    }
                ])

            .then((answers) => {
                // console.log(answers);
                const mysql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.roles_id}', '${answers.manager_id}')`;
                
                connection.query(
                    mysql,
                    (err, result) => {
                        if (err) throw err;
                        console.log(
                            'Added ' +
                            answers.first_name +
                            answers.last_name +
                            answers.roles_id +
                            answers.manager_id +
                            ' to departments!'
                        );


                        if (answers.manager_id === "None") {
                            answers.manager_id = null
                        }

                        showAllEmployees();
                        userPrompt();
                    }
                );
            });
        });
        })
    })
}


// functionality to update an employee role (prompted to select an employee to update and their new role and this information is updated in the database)
const updateAnEmployeeRole = async () => {

    connection.query("SELECT employee.last_name, roles.title FROM employee JOIN roles ON employee.roles_id = roles.id;", function (err, res) {
        
        if (err) throw err

    connection.query('SELECT * FROM roles', async (err, roles) => {  
            rolesArry = roles.map(roles => ({ name: roles.title, value: roles.id }));
            
            inquirer.prompt([
                {
                    name: "lastName",
                    type: "list",
                    choices: function () {
                        var lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].last_name);
                        }
                        return lastName;
                    },
                    message: "What is the Employee's last name? ",
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is the Employees new title? ",
                    choices: rolesArry
                },
            ])
            .then(function (role) {
                var roleChange = rolesArry
                connection.query("UPDATE employee SET WHERE ?",
                    {
                        last_name: role.lastName

                    },
                    {
                        roles_id: roleChange

                    },
                    function (err) {
                        if (err) throw err
                        console.table(role)
                        showAllEmployees();
                        userPrompt();
                    })

            });

        });
    });

}