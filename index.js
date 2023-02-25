// const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
// const inquirer = require("inquirer");
import { resolve, join } from 'path';
import fs from 'fs-extra';

const OUTPUT_DIR = resolve('', 'output');
const outputPath = join(OUTPUT_DIR, 'team.html');

fs.outputFile(outputPath, '<h1>Hello World</h1>', (err) => {
    if (err) console.log(err);
});
//console.log(typeof outputPath);
// const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
