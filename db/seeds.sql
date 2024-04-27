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
       ('Prototype Modeling', 80000, 4,),
       ('Other Product Design', 60000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Ted', 'Lasso', 1, NULL),
       ('Rebecca', 'Welton', 1, NULL),
       ('Roy', 'Kent', 2, 2),
       ('Keeley', 'Jones', 2, NULL),
       ('Noidy', 'Forger', 3, 4),
       ('Clor', 'Yor', 3, NULL),
       ('Geralt', 'Rivia', 4, NULL),
       ('Ein', 'Ein', 4, NULL);