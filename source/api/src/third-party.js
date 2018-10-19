var multer = require('multer');
var Config = require('./config');

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./src/public");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).array("file", 3); // Field name and max count


exports.upload = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log('Err : ', err);
            res.send({
                status: 400,
                msg: err
            })
        }
        let img = Config.HTTP_SERVER + '/' + req.files[0].filename;
        res.send({
            status: 200,
            data: {
                img: img
            },
            msg: 'Success !'
        })
    });
}