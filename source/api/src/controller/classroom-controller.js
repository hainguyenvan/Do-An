var JWT = require('jsonwebtoken');

var classroom = require('../models/class-room');

exports.insert = function (req, res) {
    let token = req.body.token;
    let tokenJson = JWT.decode(token, {
        complete: true
    });
    req.body.updateBy = tokenJson.payload.id;
    req.body.createBy = tokenJson.payload.id;
    classroom.insert(req.body)
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

exports.update = function (req, res) {
    let token = req.body.token;
    let tokenJson = JWT.decode(token, {
        complete: true
    });
    req.body.updateBy = tokenJson.payload.id;
    classroom.update(req.body)
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

exports.updateByStatus = function (req, res) {
    classroom.updateStatusById(req.body)
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

exports.getAllClassroom = function (req, res) {
    classroom.getAll()
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


exports.getClassroomActive = function (req, res) {
    classroom.getClassroomActive()
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

exports.getStudentOfClassroom = function (req, res) {
    classroom.getStudentOfClassroomById(req.body.classroomId)
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