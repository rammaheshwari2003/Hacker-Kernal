const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('HackerKernal', 'root', 'Ram2003@', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;

