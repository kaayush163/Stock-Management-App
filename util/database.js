const Sequelize = require('sequelize');

const sequelize = new Sequelize('candyshop','root','nodemysql',
{
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;