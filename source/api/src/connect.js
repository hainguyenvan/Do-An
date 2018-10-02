var Sequelize = require('sequelize');

var Config = require('./config');

class Connect {
    constructor() {
        this.sequelize = new Sequelize(
            Config.DB_NAME, Config.DB_USER_NAME, Config.DB_PASS_WORD, {
                host: Config.DB_HOST,
                port: Config.DB_PORT,
                dialect: 'mysql',
                pool: {
                    max: 10,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },
                define: {
                    timestamps: false
                }
            });
    }
}

module.exports = new Connect();