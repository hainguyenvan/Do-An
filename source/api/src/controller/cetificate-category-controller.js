var CetificateCategory = require('../models/cetificate-category');

exports.getAll = function (req, res) {
    CetificateCategory.getAll()
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
    CetificateCategory.insert(req.body)
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
    CetificateCategory.update(req.body)
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
    CetificateCategory.delete(req.body.id)
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