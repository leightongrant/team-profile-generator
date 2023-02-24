import { Employee } from '../lib/Employee.js';

// Define and export the Manager class.
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.role = 'Manager';
    }
}

Manager.prototype.getOfficeNumber = function () {
    return this.officeNumber;
};

export { Manager };
