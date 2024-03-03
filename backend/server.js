const app = require('./app');

const User = require('./database/models/user');
const Organization = require('./database/models/organization');
const Employee = require('./database/models/employee');
const Contact = require('./database/models/contact')
const Deal = require('./database/models/deals')
const Task = require('./database/models/task')

User.hasOne(Employee, { foreignKey: 'userId' });
Organization.hasMany(Employee, { foreignKey: 'organizationId' })
Organization.hasMany(Contact, { foreignKey: 'organizationId' })
Organization.hasMany(Deal, { foreignKey: 'organizationId' })
Employee.hasMany(Deal, { foreignKey: 'employeeId' })
Employee.hasMany(Task, { foreignKey: 'employeeId' })
Contact.hasMany(Deal, { foreignKey: 'contactId' })


Deal.belongsTo(Employee, {foreignKey: 'employeeId' })
Deal.belongsTo(Contact, {foreignKey: 'contactId' })
Task.belongsTo(Employee, { foreignKey: 'employeeId' })

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});