import { Employee } from '../lib/Employee.js';

// Define and export the Engineer class.
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);

        this.github = github;
        this.role = 'Engineer';
    }
}

Engineer.prototype.getGithub = function () {
    return this.github;
};

export { Engineer };
