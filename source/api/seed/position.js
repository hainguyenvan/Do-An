var Config = require('./config');

var config = new Config();

// Insert data to DB
config.connectToDB().then(db => {
    var Position = db.define("position", {
        id: {
            type: 'serial',
            key: true
        },
        code: Number,
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
        Position.create({
            code:1,
            dsc: 'Đơn vị sản xuất',
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