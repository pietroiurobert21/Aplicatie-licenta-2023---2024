const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//     // dialect: 'postgres',
//     // storage: 'database/database.postgres',
//     // logging: false
//     dialect: 'sqlite',
//     storage: 'database/database.sqlite',
//     logging: false
// });

const sequelize = new Sequelize('CRM', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
  });

sequelize.sync()
.then(() => { 
    console.log('Models successfully (re)created'); 
}).catch((err) => { 
    console.warn('Error creating models');
    console.warn(err);
});

module.exports = sequelize;