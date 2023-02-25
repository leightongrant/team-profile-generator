// Imports
import { Manager } from './lib/Manager.js';
import { Engineer } from './lib/Engineer.js';
import { Intern } from './lib/Intern.js';
import { render } from './src/page-template.js';
import { resolve, join } from 'path';
import fs from 'fs-extra';

// const inquirer = require("inquirer");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Create objects
const manager = new Manager('Oneal', 1, 'oneal@team.com', 20);
const engineer = new Engineer('Charlene', 1, 'charlene@team.com', 'charz');
const intern = new Intern('Elijah', 1, 'elijah@team.com', 'Courtwood');

// Create array
const team = [manager, engineer, intern];

// Call render
const output = render(team);

// Create File Path
const OUTPUT_DIR = resolve('', 'output');
const outputPath = join(OUTPUT_DIR, 'team.html');

// Write file
fs.outputFile(outputPath, output, (err) => {
    if (err) console.log(err);
});
