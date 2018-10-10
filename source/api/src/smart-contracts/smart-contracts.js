const Web3 = require('web3');
const Config = require('../config');

const NETWORK_ADDRS = "http://localhost:7545";
let provider = new Web3.providers.HttpProvider(NETWORK_ADDRS);
const web3 = new Web3(provider);

const TruffleContract = require('truffle-contract');
var resolve = require('path').resolve;

var pathFileContracts = resolve('../smart-contracts/build/contracts/Cetification.json');
const cetificationArtifacts = require(pathFileContracts);


class SmartContracts {
    constructor() {
        let contract = TruffleContract(cetificationArtifacts);
        contract.setProvider(web3.currentProvider);
        if (typeof contract.currentProvider.sendAsync !== "function") {
            contract.currentProvider.sendAsync = function () {
                return contract.currentProvider.send.apply(
                    contract.currentProvider,
                    arguments
                );
            };
        }
        this.cetification = contract.at(Config.CONTRACTS_ID);
    }

    addAuthor(data) {
        return new Promise((Result, Err) => {
            let config = {
                from: data.account,
                gas: 6000000
            };
            let id = data.id;
            let name = data.name;
            let sign = data.sign;
            this.cetification.addAuthor(id, name, sign, config)
                .then(status => {
                    Result(status);
                })
                .catch(err => {
                    Err(err);
                });
        });
    }

    getAuthorList() {
        return new Promise((Result, Err) => {
            let authorList = [];
            this.cetification.authorsCount().then(count => {
                if (count == 0) {
                    Result(authorList);
                }
                for (let i = 1; i <= count; i++) {
                    this.cetification.authors(i).then(author => {
                        let id = author[0];
                        let name = author[1];
                        let sign = author[2];
                        let status = author[3];

                        let item = {
                            id: id,
                            name: name,
                            sign: sign,
                            status: status
                        };
                        authorList.push(item);
                        if (i == count) {
                            Result(authorList);
                        }
                    });
                }

            }).catch(err => {
                Err(err);
            });
        });
    }

    getAuthorBySign(sign) {
        return new Promise((Result, Err) => {
            let dataAuthor = {};
            this.cetification.authorsCount().then(count => {
                if (count == 0) {
                    Result(author);
                }
                for (let i = 1; i <= count; i++) {
                    this.cetification.authors(i).then(author => {
                        if (sign == author[2]) {
                            let id = author[0];
                            let name = author[1];
                            let sign = author[2];
                            let status = author[3];

                            dataAuthor = {
                                index: i,
                                id: id,
                                name: name,
                                sign: sign,
                                status: status
                            };
                            Result(dataAuthor);
                        }
                        if (i == count) {
                            Result(dataAuthor);
                        }
                    });
                }

            }).catch(err => {
                Err(err);
            });
        });
    }

    updateStatus(data) {
        return new Promise((Result, Err) => {
            let config = {
                from: data.account,
                gas: 6000000
            }
            this.cetification.updateStatusAuthor(data.index, data.status, config)
                .then(status => {
                    Result(true);
                })
                .catch(err => {
                    Err(err);
                });
        });
    }

    getCertificateList() {
        return new Promise((Result, Err) => {
            let dataList = [];
            this.cetification.certificatesCount().then(count => {
                if (count == 0) {
                    Result(dataList);
                }
                for (let i = 1; i <= count; i++) {
                    this.cetification.certificates(i).then(result => {
                        let item = {
                            code: web3.utils.hexToUtf8(result[0]),
                            title: web3.utils.hexToUtf8(result[1]), // Tên bằng tốt nghiệp
                            studentName: web3.utils.hexToUtf8(result[2]), // Tên sinh viên
                            dataOfBirth: web3.utils.hexToUtf8(result[3]), // Ngày tháng năm sinh
                            yearOfGraduation: Number(result[4]), // Năng tốt nghiệp
                            degreeClassification: web3.utils.hexToUtf8(result[5]), // Loại bằng
                            modeOfStudy: web3.utils.hexToUtf8(result[6]), // Hình thức đào tạo
                            date: web3.utils.hexToUtf8(result[7]), // Ngày phát hành
                            author: web3.utils.hexToUtf8(result[8]), // Người cấp bằng
                            updateBy: Number(result[9]), // Id của người sửa dữ liệu
                            status: Number(result[10]) // Trang thai bang
                        };
                        dataList.push(item);
                        if (i == count) {
                            Result(dataList);
                        }
                    });
                }

            }).catch(err => {
                Err(err);
            });
        });
    }

    addCertificate(data) {
        return new Promise((Result, Err) => {
            let config = {
                from: data.account,
                gas: 6000000
            };
            let code = web3.utils.fromAscii(data.code);
            let title = web3.utils.fromAscii(data.title);
            let studentName = web3.utils.fromAscii(data.studentName);
            let dataOfBirth = web3.utils.fromAscii(data.dateOfBirth);
            let yearOfGraduation = data.yearOfGraduation;
            let degreeClassification = web3.utils.fromAscii(data.degreeClassification);
            let modeOfStudy = web3.utils.fromAscii(data.modeOfStudy);
            let date = web3.utils.fromAscii(data.date);
            let author = web3.utils.fromAscii(data.author);
            let updateBy = data.updateBy;
            this.cetification.addCertificate(code, title, studentName, dataOfBirth,
                    yearOfGraduation, degreeClassification, modeOfStudy, date,
                    author, updateBy, config)
                .then(status => {
                    Result(status);
                })
                .catch(err => {
                    Err(err);
                });
        });
    }

    updateCertificate(data) {
        return new Promise((Result, Err) => {
            let config = {
                from: data.account,
                gas: 6000000
            };
            let title = web3.utils.fromAscii(data.title);
            let index = data.index;
            let studentName = web3.utils.fromAscii(data.studentName);
            let dataOfBirth = web3.utils.fromAscii(data.dateOfBirth);
            let yearOfGraduation = data.yearOfGraduation;
            let degreeClassification = web3.utils.fromAscii(data.degreeClassification);
            let modeOfStudy = web3.utils.fromAscii(data.modeOfStudy);
            let date = web3.utils.fromAscii(data.date);
            let author = web3.utils.fromAscii(data.author);
            let updateBy = data.updateBy;
            let status = data.status;
            this.cetification.updateCertificate(index, title,
                    studentName, dataOfBirth,
                    yearOfGraduation, degreeClassification,
                    modeOfStudy, date,
                    author, updateBy, status, config)
                .then(status => {
                    Result(status);
                })
                .catch(err => {
                    Err(err);
                });
        });
    }

}

module.exports = new SmartContracts();