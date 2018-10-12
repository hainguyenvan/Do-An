var SmartContracts = require('../smart-contracts/smart-contracts');
var JWT = require('jsonwebtoken');
var CertificateList = require('../models/cetificate-list');

exports.getAuthorList = function (req, res) {
    SmartContracts.getAuthorList()
        .then(accList => {
            res.send({
                status: 200,
                data: accList
            });
        })
        .catch(err => {
            res.send({
                status: 400,
                msg: err
            })
        })
}

exports.addAuthor = function (req, res) {
    SmartContracts.addAuthor(req.body)
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
            })
        })
}

exports.updateStatusAuthor = function (req, res) {
    SmartContracts.updateStatus(req.body)
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
            })
        })
}


// Certificate
exports.getCertificateList = function (req, res) {
    SmartContracts.getCertificateList()
        .then(accList => {
            res.send({
                status: 200,
                data: accList
            });
        })
        .catch(err => {
            res.send({
                status: 400,
                msg: err
            })
        })
}

exports.addCetificate = function (req, res) {
    let token = req.body.token;
    let tokenJson = JWT.decode(token, {
        complete: true
    });
    let body = {
        updateBy: tokenJson.payload.id,
        timeUpdate: new Date().getTime(),
        status: 1,
        id:req.body.id
    }
    SmartContracts.addCertificate(req.body)
        .then(result => {
            CertificateList.updateStatus(body).then(status => {
                res.send({
                    status: 200,
                    msg: 'Success !'
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.send({
                status: 400,
                msg: err
            })
        })
}

exports.updateCertificate = function (req, res) {
    let token = req.body.token;
    let tokenJson = JWT.decode(token, {
        complete: true
    });
    let body = {
        updateBy: tokenJson.payload.id,
        timeUpdate: new Date().getTime(),
        status: 1,
        id:req.body.id
    }
    SmartContracts.updateCertificate(req.body)
        .then(result => {
            CertificateList.updateStatus(body).then(status => {
                res.send({
                    status: 200,
                    msg: 'Success !'
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.send({
                status: 400,
                msg: err
            })
        })
}


exports.getDataChanegs = function (req, res) {
    SmartContracts.getDataChanegs()
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
            })
        })
}