var Connect = require('../connect');

var TABLE = 'account';

class AccController {
    constructor() {
        this.connect = Connect.con;
    }

    getAcc() {
        return new Promise((Result, Err) => {
            var query = "SELECT * FROM " + TABLE;
            this.connect.query(query, function (err, result) {
                if (err) {
                    Err(err);
                }
                Result(result);
            });
        });
    }

    login(userName, passWord) {
        return new Promise((Result, Err) => {
            var query = 'SELECT * FROM account WHERE user_name = \'' + userName + '\' and pass_word = \'' + passWord + '\'';
            this.connect.query(query, (err, result) => {
                if (err) {
                    Err(err);
                }
                Result(result);
            })
        });
    }
}

module.exports = AccController;