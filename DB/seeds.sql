INSERT INTO department(name)
VALUES
('Sales'),
('Marketing'),
('Engineering'),
('Finance'),
('Legal');



INSERT INTO role(title, salary, department_id)
VALUES
('Salesperson', 80000, 1),
('Sales Lead', 100000, 1),
('Marketing Coordinator', 60000, 2),
('Marketing Manager', 90000, 2),
('Software Engineer', 120000, 3),
('Lead Engineer', 150000, 3),
('Accountant', 125000, 4),
('Lawyer', 190000, 5),
('Legal Team Lead', 200000, 5);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Doe', 2, 3),
('Mike', 'Chan', 1, 1),
('Ashley', 'Rodriguez', 6, NULL),
('Kevin', 'Tupik', 5, 3),
('Malia', 'Brown', 7, NULL),
('Sarah', 'Lourd', 9, NULL),
('Tom', 'Allen', 8, 6),
('Tammer', 'Galal', 5, 3),
('John', 'Doe', 2, NULL),
('Yogi', 'Dolder', 3, 11),
('Jack', 'Clemmons', 4, NULL);
