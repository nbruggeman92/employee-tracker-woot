\c employee_db

INSERT INTO department (name)
VALUES ('Front Desk'),
       ('CNC Machining'),
       ('Manual Machining'),
       ('Product Engineering');

INSERT INTO role (title, salary, department_id)
VALUES ('The Best', 100000000000, 1),
       ('Intake/Shipping', 300000, 1),
       ('CNC Lathe Operator', 70000, 2),
       ('CNC Programmer', 80000, 2),
       ('Manual Mill Operator', 400000, 3),
       ('Manual Finisher', 80000, 3),
       ('Prototype Modeling', 80000, 4),
       ('Other Product Design', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ted', 'Lasso', 1, NULL),
       ('Rebecca', 'Welton', 2, 1),
       ('Roy', 'Kent', 3, 1),
       ('Keeley', 'Jones', 4, NULL),
       ('Noidy', 'Forger', 5, 3),
       ('Clor', 'Yor', 6, NULL),
       ('Geralt', 'Rivia', 4, NULL),
       ('Ein', 'Ein', 7, 4);