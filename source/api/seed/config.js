var orm = require('orm');

var opts = {
    host: '',
    database: 'supply_chain',
    protocol: 'mysql',
    port: '9906',
    username: 'root',
    password: 'pwd',
    query: {
        pool: true
    }
};

class Config {
    connectToDB() {
        return new Promise((Result, Err) => {
            orm.connectAsync(opts)
                .then(db => {
                    Result(db);
                })
                .catch(err => {
                    Err(err)
                });
        })

    }
}


module.exports = Config;