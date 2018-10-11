var JWT_SECRET = 'Cexk6azogyew7DoTOYKgAXtTOP+18VLDQ1MzYoEWxr6Gqbhg+CeK33MuBPdhyz1dlW4VOKE/ce4TTkfI0yGLlTc+kC74BA8WNoySWmmNsBTEgt83f+9WKYNUgYoGUvml3rRlzvNG71bFqcfJa7U+AuCECq8JnPTeMQ4MSuFBZb4i/q91ZPoI/8SDmcvfai1ofyaHc4xauqhq2hrED5zuZsFbiRDY9bo4d4hHPXdBQaUCm/vklx/BxaAL3OLvvNGhULYmbV/v9Yj0xSAqhZMd7b0TJcDYZ+FHrTX7ZCG15M/Sj/amI/auUEKRNYfwL67/Y7zZxgUWLPsZQ48zPBxgeA==';
var JWT = require('jsonwebtoken');
var Crypto = require('crypto');

var Account = require('../models/account');
var SmartContracts = require('../smart-contracts/smart-contracts');

var accountModel = Account.model;

exports.login = function (req, res) {
    let data = req.body;
    let email = req.body.email;
    let password = req.body.password;
    Account.login(email, password)
        .then(acc => {
            SmartContracts.getAuthorBySign(acc.sign).then(author => {
                acc.authorSmartContracts = author;
                res.send({
                    status: 200,
                    data: acc
                });
            });
        })
        .catch(err => {
            res.send({
                status: 400,
                msg: err
            })
        });
}

exports.getAll = function (req, res) {
    Account.getAll()
        .then(accList => {
            res.send({
                status: 200,
                data: accList
            });
        }).catch(err => {
            res.send({
                status: 400,
                msg: err
            })
        });
}

exports.register = function (req, res) {
    var sign = Crypto.randomBytes(64).toString('hex');
    req.body.sign = sign;
    Account.insert(req.body)
        .then(result => {
            res.send({
                status: 200,
                msg: 'Success !'
            })
        }).catch(err => {
            res.send({
                status: 400,
                msg: err
            })
        })
}

exports.delete = function (req, res) {
    Account.delete(req.body.code)
        .then(result => {
            res.send({
                status: 200,
                msg: 'Success !'
            })
        }).catch(err => {
            res.send({
                status: 400,
                msg: err
            })
        })
}

exports.update = function (req, res) {
    Account.update(req.body)
        .then(result => {
            res.send({
                status: 200,
                msg: 'Success !'
            })
        }).catch(err => {
            res.send({
                status: 400,
                msg: err
            })
        })
}

exports.getInfo = function (req, res) {
    let token = req.body.token;
    let tokenJson = JWT.decode(token, {
        complete: true
    });
    Account.getById(tokenJson.payload.id)
        .then(acc => {
            res.send({
                status: 200,
                data: acc
            });
        })
        .catch(err => {
            res.send({
                status: 400,
                msg: err
            })
        });
}