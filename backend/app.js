const express = require('express');
const cors = require('cors'); // Import the cors package
const dotenv = require('dotenv'); // Import the dotenv package

const app = express();

const user_routes = require('./users/users-routes');
const organization_routes = require('./organizations/organization-routes');
const userOrganization_routes = require('./usersOrganization/usersOrganization-routes');

dotenv.config(); // Configure dotenv
app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', user_routes);
app.use('/organizations', organization_routes);
app.use('/usersOrganization', userOrganization_routes);

module.exports = app;