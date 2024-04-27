const inquirer = require("inquirer");
const pg = require("pg");
const { Pool } = pg;

const pool = new Pool(
    {
        user: 'postgres',
        password: 'drew123yay',
        host: 'localhost',
        port: '5432',
        database: 'employees_db'
    }
)

function menuOptions () {
    const questions = [
        {
            type: 'list',
            name: 'choices',
            message: 'Please make a selection:',
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
    ]
    
    return inquirer.createPromptModule(questions);

};

function viewDepartments() {
    pool.query(`SELECT * FROM department`, (err, result) => {
        if(err) {
            console.error(err);
        } else {
            console.log('Viewing departments')
            console.table(result.rows);
            menuOptions();
        }
    })
}

function viewRole() {
    pool.query(`SELECT role.id, role.title, department.name, role.salary FROM department LEFT JOIN role ON department.id=department_id`, (err, result) => {
        if(err) {
            console.error(err);
        } else {
            console.log('Viewing all roles')
            console.table(result.rows);
            menuOptions;
        }
    })
}