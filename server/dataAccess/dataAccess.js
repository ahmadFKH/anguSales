var Sequelize = require('sequelize');

const Op = Sequelize.Op;
class DA {
    constructor() {
        this.sequelize = new Sequelize('heroku_69dde057fe379a0','bee9b5de84e784', '0576c4cb', {
            host: 'us-cdbr-iron-east-04.cleardb.net',
            dialect: 'mysql',
            operatorsAliases: false, // prevent string deprication
            pool: { // You can read about the pool in the documentation
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: { // Sequelize define timestamp columns by default. To prevent it we will defind the following line
                timestamps: false
            }
        });
    }
}
const dataAccess = new DA()
module.exports = dataAccess;