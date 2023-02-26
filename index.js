// Imports
import { Manager } from './lib/Manager.js';
import { Engineer } from './lib/Engineer.js';
import { Intern } from './lib/Intern.js';
import { render } from './src/page-template.js';
import { resolve, join } from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';

// Gather information about the development team members, and render the HTML file.

// Team Array
const team = [];

// Validations
const validateEmail = (email) => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i;
    return re.test(email) || 'Please enter a valid email address';
};

const validateId = (id) => {
    const re = /^[0-9]/i;
    return re.test(id) || 'Please enter a valid ID';
};

const validateOfficeNumber = (officeNumber) => {
    const re = /^[0-9]/i;
    return re.test(officeNumber) || 'Please enter a valid office number';
};

const validateName = (name) => {
    const re = /^[a-z][A-Z]/i;
    return re.test(name) || 'Please enter a valid name';
};

const validateSchool = (school) => {
    const re = /^[a-z][A-Z]/i;
    return re.test(school) || 'Please enter a valid school name';
};

const validateGithubUsername = (github) => {
    const re = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    return re.test(github) || 'Please enter a valid Github username';
};

// Questions
const name = {
    type: 'input',
    name: 'name',
    message: 'Name: ',
    validate: validateName,
};
const id = {
    type: 'input',
    name: 'id',
    message: 'ID: ',
    validate: validateId,
};

const email = {
    type: 'input',
    name: 'email',
    message: 'Email: ',
    validate: validateEmail,
};

const employeeSpecificInput = [
    {
        type: 'input',
        name: 'thisInput',
        message: 'Office Number: ',
        validate: validateOfficeNumber,
    },
    {
        type: 'input',
        name: 'thisInput',
        message: 'Github Username: ',
        validate: validateGithubUsername,
    },
    {
        type: 'input',
        name: 'thisInput',
        message: 'School: ',
        validate: validateSchool,
    },
];

const employeeChoice = {
    type: 'list',
    name: 'employee',
    message: 'Choose employee type ?',
    choices: ['Manager', 'Engineer', 'Intern'],
    default: 0,
};

const askAgain = {
    type: 'confirm',
    name: 'askAgain',
    message: 'Want to add another employee (just hit enter for YES)?',
    default: true,
};

// Prompts
function ask() {
    // Prompt for employee type
    inquirer.prompt([employeeChoice]).then((choice) => {
        let thisInput;
        if (choice.employee === 'Manager') {
            thisInput = employeeSpecificInput[0];
        } else if (choice.employee === 'Engineer') {
            thisInput = employeeSpecificInput[1];
        } else if (choice.employee === 'Intern') {
            thisInput = employeeSpecificInput[2];
        }
        // Prompts for chosen employee type
        inquirer.prompt([name, id, email, thisInput, askAgain]).then((ans) => {
            // Create objects
            let teamMember;
            if (choice.employee === 'Manager') {
                teamMember = new Manager(
                    ans.name,
                    ans.id,
                    ans.email,
                    ans.thisInput
                );
            } else if (choice.employee === 'Engineer') {
                teamMember = new Engineer(
                    ans.name,
                    ans.id,
                    ans.email,
                    ans.thisInput
                );
            } else if (choice.employee === 'Intern') {
                teamMember = new Intern(
                    ans.name,
                    ans.id,
                    ans.email,
                    ans.thisInput
                );
            }

            // Add objects to array
            team.push(teamMember);

            // Ask for more employees
            if (ans.askAgain) {
                ask();
            } else {
                // Call render
                console.log('Rendering HTML ....');
                const output = render(team);

                // Create File Path
                const OUTPUT_DIR = resolve('', 'output');
                const outputPath = join(OUTPUT_DIR, 'team.html');

                // Write file
                setTimeout(() => {
                    fs.outputFile(outputPath, output, (err) => {
                        if (err) console.log(err);
                    });
                    console.log('Done');
                }, 3000);
            }
        });
    });
}

ask();
