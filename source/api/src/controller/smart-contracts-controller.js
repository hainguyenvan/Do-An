var SmartContracts = require('../smart-contracts/smart-contracts');

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
    SmartContracts.addCertificate(req.body)
        .then(result => {
            res.send({
                status: 200,
                data: result
            });
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
    SmartContracts.updateCertificate(req.body)
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