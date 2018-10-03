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

exports.insert = function (req, res) {
    Position.insert(req.body)
        .then(result => {
            res.send({
                status: 200,
                msg: 'Success !'
            });
        })
        .catch(err => {
            res.send({
                status: 400,
                msg: err
            });
        });
}

exports.update = function (req, res) {
    Position.update(req.body)
        .then(result => {
            res.send({
                status: 200,
                msg: 'Success !'
            });
        })
        .catch(err => {
            res.send({
                status: 400,
                msg: err
            });
        });
}

exports.delete = function (req, res) {
    Position.delete(req.body.id)
        .then(result => {
            res.send({
                status: 200,
                msg: 'Success !'
            });
        })
        .catch(err => {
            res.send({
                status: 400,
                msg: err
            });
        });
}