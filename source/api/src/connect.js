var mysql = require('mysql');
var Config = require('./config');

class Connect {
    constructor() {
        this.con;
        this.connectToDB();
    }

    connectToDB() {
        if (this.con == undefined || this.con == null) {
            this.con = mysql.createConnection({
                host: Config.DB_HOST,
                port: Config.DB_PORT,
                user: Config.DB_USER_NAME,
                password: Config.DB_PASS_WORD,
                database: Config.DB_NAME
            });
            this.con.connect();
        }
        return this.con;
    }
}

module.exports = new Connect();