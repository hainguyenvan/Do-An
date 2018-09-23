var Config = require('./config');

var config = new Config();

// Insert data to DB
config.connectToDB().then(db => {
    var GoodsDsc = db.define("goods_dsc", {
        id: {
            type: 'serial',
            key: true
        },
        goods_id: Number,
        acc_id: Number,
        position_id: Number,
        title: String,
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
        GoodsDsc.create({
            goods_id: 1,
            acc_id: 1,
            position_id: 1,
            title: 'Xuat hang',
            dsc: 'Xuat hang cho hai',
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