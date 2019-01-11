var SmartContracts = require('../smart-contracts/smart-contracts');
var JWT = require('jsonwebtoken');
var CertificateList = require('../models/cetificate-list');

const Web3 = require('web3');
const Config = require('../config');

const NETWORK_ADDRS = "http://localhost:7545";
let provider = new Web3.providers.HttpProvider(NETWORK_ADDRS);
const web3 = new Web3(provider);

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

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
        id: req.body.id
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
        id: req.body.id
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
        .then(async (dataList) => {
            if (dataList.length == 0) {
                res.send({
                    status: 200,
                    data: dataList
                });
                return;
            }
            let dataSource = [];
            // Sync data
            await asyncForEach(dataList, async (item) => {
                let indexUpdateBy = Number(item.returnValues[9]);
                await SmartContracts.getAuthorByIndex(indexUpdateBy).then(updateBy => {
                    let txtData = web3.utils.hexToUtf8(item.returnValues[8]);
                    let arr = txtData.split(':');
                    let log = {
                        code: web3.utils.hexToUtf8(item.returnValues[0]),
                        title: web3.utils.hexToUtf8(item.returnValues[1]),
                        studentName: web3.utils.hexToUtf8(item.returnValues[2]),
                        dateOfBirth: web3.utils.hexToUtf8(item.returnValues[3]),
                        yearOfGraduation: Number(item.returnValues[4]),
                        degreeClassification: web3.utils.hexToUtf8(item.returnValues[5]),
                        modeOfStudy: web3.utils.hexToUtf8(item.returnValues[6]),
                        date: web3.utils.hexToUtf8(item.returnValues[7]),
                        author: arr[0],
                        txtLimit: arr[1],
                        updateBy: updateBy,
                        status: Number(item.returnValues[10]),
                        timeUpdate: web3.utils.hexToUtf8(item.returnValues[11]),
                        studentSign: web3.utils.hexToUtf8(item.returnValues[12]),
                        log: item
                    };
                    dataSource.push(log);
                });
            });
            res.send({
                status: 200,
                data: dataSource
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