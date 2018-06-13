let connect = require('./dataAccess').sequelize;
var Sequelize=require('sequelize');

let Company = connect.define('company', {
    name: { type: Sequelize.STRING, primaryKey: true },
    address: Sequelize.STRING,
    country: Sequelize.STRING,
})

module.exports = Company;