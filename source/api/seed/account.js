var Config = require('./config');

var config = new Config();

// Insert data to DB
config.connectToDB().then(db => {
    var Account = db.define("account", {
        id: {
            type: 'serial',
            key: true
        },
        acc_address: String,
        name: String,
        date_of_birth: String,
        address: String,
        img: String,
        email: String,
        phone: String,
        user_name: String,
        pass_word: String,
        time_create: String,
        time_update: String
    });
    // add the table to the database
    db.sync(function (err) {
        if (err) {
            db.close();
            return;
        }

        // add a row to the person table
        Account.create({
            acc_address: '0x011212121212121',
            name: 'HaiNV',
            date_of_birth: '08/09/1994',
            address: 'Dong Anh - Ha Noi',
            img: 'https://share.cdn.viber.com/pg_download?id=703851c7e013807e9409699193c7c3b60f437c966fd544265f93504a5660fa1a&filetype=jpg&type=icon',
            email: 'hainv@example.com',
            phone: '096799999',
            user_name: 'hainv',
            pass_word: 'hainv',
            time_create: '20180923',
            time_update: '20180923'
        }, function (err) {
            if (err) {
                db.close();
            }
            console.log('Insert success !');
            db.close();
        });
    });
}).catch(err => {
    console.error('Connection error: ' + err);
    db.close();
});