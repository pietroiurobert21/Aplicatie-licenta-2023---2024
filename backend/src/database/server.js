const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize('CRM', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
  });

// const sequelize = new Sequelize(process.env.DB_URL, {
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false // To allow self-signed certificates
//       }
//     }
// });

sequelize.sync()
.then(() => { 
    console.log('Models successfully (re)created'); 
}).catch((err) => { 
    console.warn('Error creating models');
    console.warn(err);
});

module.exports = sequelize;