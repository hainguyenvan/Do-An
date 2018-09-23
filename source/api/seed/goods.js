var Config = require('./config');

var config = new Config();

// Insert data to DB
config.connectToDB().then(db => {
    var Goods = db.define("goods", {
        id: {
            type: 'serial',
            key: true
        },
        qr_code: String,
        name: String,
        dsc: String,
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
        Goods.create({
            qr_code: '1212121212',
            name: 'Xoai',
            dsc: 'Hoa qua',
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