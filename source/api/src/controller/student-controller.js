var JWT = require('jsonwebtoken');

var Student = require('../models/student');

exports.insert = function(req, res) {
    let token = req.body.token;
    let tokenJson = JWT.decode(token, {
        complete: true
    });
    req.body.updateBy = tokenJson.payload.id;
    req.body.createBy = tokenJson.payload.id;
    Student.insert(req.body)
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
    let token = req.body.token;
    let tokenJson = JWT.decode(token, {
        complete: true
    });
    req.body.updateBy = tokenJson.payload.id;
    Student.update(req.body)
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

exports.updateByStatus = function(req, res) {
    Student.updateStatusById(req.body)
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

exports.getAllStudent = function(req, res) {
    Student.getAllStudent()
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

exports.getStudentAvailable = function(req, res) {
    Student.getStudentAvailable()
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

exports.getStudentActive = function(req, res) {
    return new Promise((Result, Err) => {
        Student.getStudentActive()
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
    })
}