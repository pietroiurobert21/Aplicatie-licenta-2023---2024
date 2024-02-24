const app = require('./app');

const User = require('./database/models/user');
const Organization = require('./database/models/organization');
const UserOrganization = require('./database/models/employee');

UserOrganization.belongsTo(User, { foreignKey: 'userId' });
Organization.hasMany(UserOrganization, { foreignKey: 'organizationId' });

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});