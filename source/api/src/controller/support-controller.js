var JWT = require('jsonwebtoken');

var Supprot = require('../models/support');

exports.insert = function(req, res) {
    Supprot.insert(req.body)
        .then(result => {
            res.send({
                status: 200,
                msg: 'Success !'
            })
        })
        .catch(err => {
            res.send({
                status: 400,
                msg: err
            })
        })
}

exports.update = function(req, res) {
    Supprot.updateById(req.body)
        .then(result => {
            res.send({
                status: 200,
                msg: 'Success !'
            })
        })
        .catch(err => {
            res.send({
                status: 200,
                msg: err
            })
        })
}

exports.getAllByStatus = function(req, res) {
    Supprot.getDataByStatus(req.body.status)
        .then(result => {
            res.send({
                status: 200,
                data: result
            })
        })
        .catch(err => {
            res.send({
                status: 200,
                msg: err
            })
        })
}


exports.delete = function(req, res) {
    return new Promise((Result, Err) => {
    Supprot.deleteById(req.body.id)
            .then(result => {
                res.send({
                    status: 200,
                    msg: 'Success !'
                })
            })
            .catch(err => {
                res.send({
                    status: 200,
                    msg: err
                })
            })
    })
}