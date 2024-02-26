const express = require('express');
const cors = require('cors'); // Import the cors package
const dotenv = require('dotenv'); // Import the dotenv package

const app = express();

const user_routes = require('./users/users-routes');
const organization_routes = require('./organizations/organization-routes');
const employee_routes = require('./employees/employee-routes');
const contact_routes = require('./contacts/contact-routes')
const deal_routes = require('./deals/deals-routes')

dotenv.config(); // Configure dotenv
app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', user_routes);
app.use('/organizations', organization_routes);
app.use('/employees', employee_routes);
app.use('/contacts', contact_routes);
app.use('/deals', deal_routes);

module.exports = app;