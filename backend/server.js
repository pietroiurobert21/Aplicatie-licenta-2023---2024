const app = require('./app');

const User = require('./database/models/user');
const Organization = require('./database/models/organization');
const Employee = require('./database/models/employee');
const Contact = require('./database/models/contact')
const Deal = require('./database/models/deals')
const Task = require('./database/models/task')
const Template = require('./database/models/template')
const Campaign = require('./database/models/campaign')

User.hasOne(Employee, { foreignKey: 'userId' });
Organization.hasMany(Employee, { foreignKey: 'organizationId' })
Organization.hasMany(Contact, { foreignKey: 'organizationId' })
Organization.hasMany(Deal, { foreignKey: 'organizationId' })
Organization.hasMany(Template, { foreignKey: 'organizationId' })
Organization.hasHook(Campaign, { foreignKey: 'organizationId' })
Employee.hasMany(Deal, { foreignKey: 'employeeId' })
Employee.hasMany(Task, { foreignKey: 'assignedByEmployeeId' })
Contact.hasMany(Deal, { foreignKey: 'contactId' })

Deal.belongsTo(Employee, { foreignKey: 'employeeId' })
Deal.belongsTo(Contact, { foreignKey: 'contactId' })

Task.belongsTo(Employee, { foreignKey: 'assignedByEmployeeId' })

Template.belongsTo(Organization, { foreignKey: 'organizationId' })

Campaign.belongsTo(Organization, { foreignKey: 'organizationId' })

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});