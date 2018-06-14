let connect = require('./dataAccess').sequelize;
let Customer = require('./customer');
var Sequelize=require('sequelize');

let Comment = connect.define('comment', {
    comment_id: { type: Sequelize.STRING, primaryKey: true },
    text: Sequelize.STRING,
    date: Sequelize.DATE,
    customer_email: Sequelize.STRING
})

Comment.belongsTo(Customer, {foreignKey: 'customer_email'});
Customer.hasMany(Comment, {foreignKey: 'customer_email'})

module.exports = Comment;