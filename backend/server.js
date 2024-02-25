const app = require('./app');

const User = require('./database/models/user');
const Organization = require('./database/models/organization');
const Employee = require('./database/models/employee');
const Contact = require('./database/models/contact')

User.hasOne(Employee, { foreignKey: 'userId' });
Organization.hasMany(Employee, { foreignKey: 'organizationId' })
Organization.hasMany(Contact, { foreignKey: 'organizationId' })

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});