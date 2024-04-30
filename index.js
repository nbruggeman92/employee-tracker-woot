// imported packages
const inquirer = require("inquirer");

const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "drew123yay",
    database: "employees_db",
    port: 5432,
});

pool.connect();

function init() {
    displayMenu().then(handleMenu);
}

    function displayMenu() {
        const questions = [
            {
                type: "list",
                name: "choices",
                message: "Please make a selection from the following options:",
                choices: [
                    {
                        name: "View all departments",
                        value: "VIEW_DEPARTMENTS"
                    },
                    {
                        name: "View all roles",
                        value: "VIEW_ROLES"
                    },
                    {
                        name: "View all employees",
                        value: "VIEW_EMPLOYEES"
                    },
                    {
                        name: "Add a department",
                        value: "ADD_DEPARTMENT"
                    },
                    {
                        name: "Add a role",
                        value: "ADD_ROLE"
                    },
                    {
                        name: "Add an employee",
                        value: "ADD_EMPLOYEE"
                    },
                    {
                        name: "Update an employee role",
                        value: "UPDATE_EMPLOYEE_ROLE"
                    },
                ]
            }
        ]
        return inquirer.prompt(questions);
    };

    function handleMenu (selection) {
        switch (selection.choices) {    
            case "View all departments":
                viewDepartments();
                break;    
            case "View all roles":
                viewRoles();
                break;            
            case "View all employees":
                viewEmployees();
                break;    
            case "Add a department":
                addDepartment();
                break;    
            case "Add a role":
                addRole();
                break;                
            case "Add an employee":
                addEmployee();
                break;                    
            case "Update an employee role":
                updateEmployeeRole();
                break;                       
            default:
                console.log("No no no...try again!")
        }
        return false;
    }

    function viewDepartments(){
        pool.query(`SELECT * FROM department`, (err, result) => {
            if(err) {
                console.error(err);
            } else {
                console.table(result.rows);
                init()
            };
        });
    };

    function viewRoles() {
        pool.query(`SELECT role.title, role.id, department.name, role.salary 
        FROM department LEFT 
        JOIN role ON department.id=department_id`, (err, result) => {
            if(err){
                console.error(err);
            } else {
                console.table(result.rows);
                init()
            };
        });
    };

    