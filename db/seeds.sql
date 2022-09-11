INSERT INTO department (names)
VALUES
('Software specialists'),
('Sales'),
('HR'),
('Customer Service');


INSERT INTO roles (title, salary, department_id)
VALUES
('Software Engineer', 120000, 1),
('Front End Developer', 100000, 1),
('Inside Sales', 45000, 2),
('Outside Sales', 60000, 2),
('Recruitment', 50000, 3),
('Labor Relations', 80000, 3),
('QA Customer Specialist', 40000, 4),
('Tech Support', 90000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES
('JaQwae', 'Ellison', 1, null),
('Davey', 'Jones', 2, 1),
('Carlton', 'Orange', 3, null),
('Brian', 'Davis', 4, 3),
('Kelly', 'Price', 5, 6),
('Eric', 'Dollar', 6, null),
('Katherine', 'Sanchez', 7, 8),
('Donavon', 'Brazier', 8, null);