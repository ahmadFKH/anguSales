let connect = require('./dataAccess').sequelize;
const Sequelize = require('sequelize');
let Company = require('./company');
// var Sequelize=require('sequelize');

let Customer = connect.define('customer', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    company_name: Sequelize.STRING,
    email: { type: Sequelize.STRING, primaryKey: true },
    phone: Sequelize.STRING
})

Customer.belongsTo(Company, {foreignKey: 'company_name'});
Company.hasMany(Customer, {foreignKey: 'company_name'})

module.exports = Customer;