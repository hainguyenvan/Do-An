var Config = require('./config');

var config = new Config();

// Insert data to DB
config.connectToDB().then(db => {
    var GoodsCategory = db.define("goods_category", {
        id: {
            type: 'serial',
            key: true
        },
        goods_id: Number,
        category_id: Number,
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
        GoodsCategory.create({
            goods_id: 1,
            category_id: 1,
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