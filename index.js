// Imports
import { Manager } from './lib/Manager.js';
import { Engineer } from './lib/Engineer.js';
import { Intern } from './lib/Intern.js';
import { render } from './src/page-template.js';
import { resolve, join } from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';

// Gather information about the development team members, and render the HTML file.

// Validations
const validateEmail = (email) => {
    const re =
        /^[A-Z0-9._%+-]+@[A-Z0-9-]+\.([a-z]{2}.[a-z]{2}|[a-z]{3}|[a-z]{2})$/i;
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

const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Manager Name: ',
        validate: validateName,
    },
    {
        type: 'input',
        name: 'id',
        message: 'ID: ',
        validate: validateId,
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email: ',
        validate: validateEmail,
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Office Number: ',
        validate: validateOfficeNumber,
    },
];

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Name: ',
        validate: validateName,
    },
    {
        type: 'input',
        name: 'id',
        message: 'ID: ',
        validate: validateId,
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email: ',
        validate: validateEmail,
    },
];

const github = {
    type: 'input',
    name: 'github',
    message: 'Github Username: ',
    validate: validateGithubUsername,
};

const school = {
    type: 'input',
    name: 'school',
    message: 'School: ',
    validate: validateSchool,
};

const employeeChoice = {
    type: 'list',
    name: 'employee',
    message: 'Choose type of employee ?',
    choices: ['Engineer', 'Intern'],
    default: 0,
};

const askAgain = {
    type: 'confirm',
    name: 'askAgain',
    message: 'Want to add another employee (just hit enter for YES)?',
    default: true,
};

// Team Array to store team members
const team = [];

// This function gets manager details then calls the ask function
// to get employee details
function manager() {
    inquirer
        .prompt([...managerQuestions])
        .then((manager) => {
            const { name, id, email, officeNumber } = manager;
            team.push(new Manager(name, id, email, officeNumber));
            ask();
        })
        .catch((err) => {
            console.log(err);
        });
}

// This function asks for emplayees and gets their details until the user quits.
// It then calls the render function with team array the render html
function ask() {
    inquirer
        .prompt([employeeChoice])
        .then((choice) => {
            let lastQuestion;
            choice.employee === 'Engineer'
                ? (lastQuestion = github)
                : (lastQuestion = school);
            inquirer
                .prompt([...questions, lastQuestion, askAgain])
                .then((answers) => {
                    let teamMember;
                    if (choice.employee === 'Engineer') {
                        const { name, id, email, github } = answers;
                        teamMember = new Engineer(name, id, email, github);
                    } else {
                        const { name, id, email, school } = answers;
                        teamMember = new Intern(name, id, email, school);
                    }
                    team.push(teamMember);

                    if (answers.askAgain) {
                        ask();
                    } else {
                        // Call render function with team array
                        console.log('Rendering HTML ....');
                        const output = render(team);

                        // Create File Path
                        const OUTPUT_DIR = resolve('', 'output');
                        const outputPath = join(OUTPUT_DIR, 'team.html');

                        // Write team.html file
                        setTimeout(() => {
                            fs.outputFile(outputPath, output, (err) => {
                                if (err) console.log(err);
                            });
                            console.log('Done');
                        }, 2000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}

manager();
