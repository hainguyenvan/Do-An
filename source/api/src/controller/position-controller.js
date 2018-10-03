var Position = require('../models/position');

exports.getAll = function (req, res) {
    Position.getAll()
        .then(result => {
            res.send({
                status: 200,
                data: result
            });
        })
        .catch(err => {
            res.send({
                status: 400,
                msg: err
            });
        });
}