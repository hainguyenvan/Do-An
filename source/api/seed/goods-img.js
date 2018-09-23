var Config = require('./config');

var config = new Config();

// Insert data to DB
config.connectToDB().then(db => {
    var GoodsImg = db.define("goods_img", {
        id: {
            type: 'serial',
            key: true
        },
        link_id: Number,
        img: String,
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
        GoodsImg.create({
            link_id: 1,
            img: 'http://google.com',
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