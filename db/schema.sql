DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    names VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT,
    manager_id INT,
    FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE SET NULL
    -- Not SOURCE correctly idk why (was working initally and on other computer but not mines)
    -- FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);