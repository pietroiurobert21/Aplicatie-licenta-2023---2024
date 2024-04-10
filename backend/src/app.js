const express = require('express');
const cors = require('cors'); // Import the cors package
const dotenv = require('dotenv'); // Import the dotenv package

const app = express();

const user_routes = require('./routes/users-routes');
const organization_routes = require('./routes/organization-routes');
const employee_routes = require('./routes/employee-routes');
const contact_routes = require('./routes/contact-routes');
const deal_routes = require('./routes/deals-routes');
const task_routes = require('./routes/tasks-routes');
const leads_routes = require('./routes/leads-routes');
const templates_routes = require('./routes/templates-routes');
const campaigns_routes = require('./routes/campaign-routes');


dotenv.config(); // Configure dotenv
app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', user_routes);
app.use('/organizations', organization_routes);
app.use('/employees', employee_routes);
app.use('/contacts', contact_routes);
app.use('/deals', deal_routes);
app.use('/tasks', task_routes);
app.use('/leads', leads_routes);
app.use('/templates', templates_routes);
app.use('/campaigns', campaigns_routes)

module.exports = app;