import { Employee } from '../lib/Employee.js';

// Define and export the Intern class.

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
        this.role = 'Intern';
    }
}

Intern.prototype.getSchool = function () {
    return this.school;
};

export { Intern };
