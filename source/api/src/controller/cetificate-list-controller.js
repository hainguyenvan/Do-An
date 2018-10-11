var CetificateList = require('../models/cetificate-list');
var JWT = require('jsonwebtoken');
var SmartContracts = require('../smart-contracts/smart-contracts');

exports.getAll = function (req, res) {
    CetificateList.getAll()
        .then(dataList => {
            for (let i = 0; i < dataList.length; i++) {
                SmartContracts.getCertificateByCode(dataList[i].code).then(certificate => {
                    dataList[i].certificateSmartContracts = certificate;
                    if (i == dataList.length - 1) {
                        res.send({
                            status: 200,
                            data: dataList
                        });
                    }
                })
            }
        })
        .catch(err => {
            res.send({
                status: 400,
                msg: err
            });
        });
}

exports.insert = function (req, res) {
    let token = req.body.token;
    let tokenJson = JWT.decode(token, {
        complete: true
    });
    req.body.createBy = tokenJson.payload.id;
    req.body.updateBy = tokenJson.payload.id;
    CetificateList.insert(req.body)
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
    let token = req.body.token;
    let tokenJson = JWT.decode(token, {
        complete: true
    });
    req.body.updateBy = tokenJson.payload.id;
    CetificateList.update(req.body)
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
    let token = req.body.token;
    let tokenJson = JWT.decode(token, {
        complete: true
    });
    req.body.updateBy = tokenJson.payload.id;
    CetificateList.delete(req.body)
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