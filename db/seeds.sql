INSERT INTO department (name)
VALUES
('Software specialists'),
('Sales'),
('HR'),
('Customer Service');


INSERT INTO roles (title, salary, departement_id)
VALUES
('Software Engineer', 120000, 1),
('Front End Developer', 100000, 1),
('Inside Sales', 45000, 2),
('Outside Sales' 60000, 2),
('Recruitment', 50000, 3),
('Labor Relations', 80000, 3),
('QA Customer Specialist', 40000, 4),
('Tech Support', 90000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES
('JaQwae', 'Ellison', 1, 1),
('Davey', 'Jones', 2, null),
('Carlton', 'Orange', 3, 2),
('Brian', 'Davis', 4, null),
('Kelly', 'Price', 5, null),
('Eric', 'Dollar', 6, 3),
('Katherine', 'Sanchez', 7, null),
('Donavon', 'Brazier', 8, 4);