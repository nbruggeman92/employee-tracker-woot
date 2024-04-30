-- dropping employees database if one already exists before creating new employees database on a clean slate
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- using employees database
\c employees_db;

-- creating department table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- creating role table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

-- creating employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);