const inquirer = require('inquirer');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
  {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: 'employees_db',
    port: process.env.DB_PORT,
  },
  console.log(`Connected to the employee database.`)
)

pool.connect();

function mainMenu() {
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ]
  })
  .then((answer) => {
    switch (answer.action) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Goodbye, hope to see you again soon!');
        pool.end();
        break;
      default:
        console.log(`Invalid action: ${action.answer}`);
        break;
    }
  })
}

function viewDepartments() {
  pool.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    mainMenu();
  });
}

function viewRoles() {
  pool.query('SELECT * FROM roles', (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    mainMenu();
  })
}

function viewEmployees() {
  pool.query('SELECT * FROM employees', (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    mainMenu();
  })
}

function addDepartment() {
  inquirer.prompt({
    name: 'name',
    type: 'text',
    message: 'What department would you like to add?'
  })
  .then((answer) => {
    pool.query(`INSERT INTO departments (department_name) VALUES ($1)`, [answer.name], (err, res) => {
      if (err) throw err;
      console.log('Department added!');
      mainMenu();
    })
  })
}

function addRole() {
  pool.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;
    const departments = res.rows.map(department => 
      ({ name: department.department_name, value: department.department_id }));
    
  inquirer.prompt([
    {
      name: 'title',
      type: 'text',
      message: 'What is the name of the role?'
    },
    {
      name: 'salary',
      type: 'text',
      message: 'What is the salary?',
      validate: function(value) {
        const valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      }
    },
    {
      name: 'department',
      type: 'list',
      message: 'What department is your role in?',
      choices: departments,
    }
])
.then((answers) => {
  pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department], (err, res) => {
    if (err) throw err;
    console.log('Role added!');
    mainMenu();
  })
})
})
}

function addEmployee() {
  pool.query('SELECT * FROM roles', (err, res) => {
    if (err) throw err;
    const roles = res.rows.map(role => 
      ({ name: role.title, value: role.role_id }));

  inquirer.prompt([
    {
      name: 'firstName',
      type: 'text',
      message: 'What is the first name?'
    },
    {
      name: 'lastName',
      type: 'text',
      message: 'What is the last name?'
    },
    {
      name: 'role',
      type: 'list',
      message: 'What role will they have?',
      choices: roles
    },
    {
      name: 'manager',
      type: 'text',
      message: 'Enter the ID of their manager (optional)',
      default: '',
    }
  ])
  .then((answers) => {
    const managerId = answers.manager.trim() === '' ? null : answers.manager;
    pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.firstName, answers.lastName, answers.role, managerId], (err, res) => {
      if (err) throw err;
      console.log('Employee added!');
      mainMenu();
    })
  })
  })
}

function updateEmployeeRole() {
  pool.query('SELECT * FROM employees', (err, res) => {
    if (err) throw err;
    const employees = res.rows.map(employee => 
      ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.employee_id }));

      pool.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        const roles = res.rows.map(role => 
          ({ name: role.title, value: role.role_id }));

        inquirer.prompt([
          {
            name: 'employee',
            type: 'list',
            message: 'Select the employee to update:',
            choices: employees,
          },
          {
            name: 'role',
            type: 'list',
            message: 'Select the new role for the employee:',
            choices: roles,
          }
        ])
        .then((answers) => {
          pool.query('UPDATE employees SET role_id = $1 WHERE employee_id = $2', [answers.role, answers.employee], (err, res) => {
            if (err) throw err;
            console.log('Employee updated!');
            mainMenu();
          })
        })
      })
  })
}

mainMenu();