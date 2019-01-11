const Web3 = require('web3');
const Config = require('../config');
const ABI = require('../abi');

let provider = new Web3.providers.HttpProvider(Config.NETWORK_ADDRS);
const web3 = new Web3(provider);

const TruffleContract = require('truffle-contract');
var resolve = require('path').resolve;

var pathFileContracts = resolve('../smart-contracts/build/contracts/Cetification.json');
const cetificationArtifacts = require(pathFileContracts);

var getCurrentDate = function () {
    var d = new Date;
    var dformat = [d.getMonth() + 1,
        d.getDate(),
        d.getFullYear()
    ].join('/') + ' ' + [d.getHours(),
        d.getMinutes(),
        d.getSeconds()
    ].join(':');
    return dformat;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

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
                from: Config.ACCOUNT,
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
                    Result(dataAuthor);
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

    getAuthorByIndex(index) {
        return new Promise((Result, Err) => {
            let dataAuthor = {};
            this.cetification.authorsCount().then(count => {
                if (count == 0) {
                    Result(dataAuthor);
                }
                this.cetification.authors(index).then(author => {
                    let id = author[0];
                    let name = author[1];
                    let sign = author[2];
                    let status = author[3];
                    dataAuthor = {
                        index: index,
                        id: id,
                        name: name,
                        sign: sign,
                        status: status
                    };
                    Result(dataAuthor);
                });
            }).catch(err => {
                Err(err);
            });
        });
    }

    updateStatus(data) {
        return new Promise((Result, Err) => {
            let config = {
                from: Config.ACCOUNT,
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
                            status: Number(result[10]), // Trang thai bang
                            timeUpdate: web3.utils.hexToUtf8(result[11]),
                            studentSign: web3.utils.hexToUtf8(result[12])
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

    getCertificateByCode(code) {
        return new Promise((Result, Err) => {
            let certificate;
            this.cetification.certificatesCount().then(count => {
                if (count == 0) {
                    Result(certificate);
                }
                for (let i = 1; i <= count; i++) {
                    this.cetification.certificates(i).then(result => {
                        let codeId = web3.utils.hexToUtf8(result[0]);
                        if (Number(code) == Number(codeId)) {
                            let dataText = web3.utils.hexToUtf8(result[8]);
                            let arr = dataText.split(':');
                            certificate = {
                                index: i,
                                code: web3.utils.hexToUtf8(result[0]),
                                title: web3.utils.hexToUtf8(result[1]), // Tên bằng tốt nghiệp
                                studentName: web3.utils.hexToUtf8(result[2]), // Tên sinh viên
                                dataOfBirth: web3.utils.hexToUtf8(result[3]), // Ngày tháng năm sinh
                                yearOfGraduation: Number(result[4]), // Năng tốt nghiệp
                                degreeClassification: web3.utils.hexToUtf8(result[5]), // Loại bằng
                                modeOfStudy: web3.utils.hexToUtf8(result[6]), // Hình thức đào tạo
                                date: web3.utils.hexToUtf8(result[7]), // Ngày phát hành
                                author: arr[0], // Người cấp bằng
                                txtLimit: arr[1],
                                updateBy: Number(result[9]), // Id của người sửa dữ liệu
                                status: Number(result[10]), // Trang thai bang
                                timeUpdate: web3.utils.hexToUtf8(result[11]),
                                studentSign: web3.utils.hexToUtf8(result[12])
                            };
                            Result(certificate);
                        }
                        if (i == count) {
                            Result(certificate);
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
                from: Config.ACCOUNT,
                gas: 6000000
            };
            let code = web3.utils.fromAscii(data.code);
            let title = web3.utils.fromAscii(data.title);
            let studentName = web3.utils.fromAscii(data.studentName);
            let dateOfBirth = web3.utils.fromAscii(data.dateOfBirth);
            let yearOfGraduation = data.yearOfGraduation;
            let degreeClassification = web3.utils.fromAscii(data.degreeClassification);
            let modeOfStudy = web3.utils.fromAscii(data.modeOfStudy);
            let date = web3.utils.fromAscii(data.date);
            let author = web3.utils.fromAscii(data.author + ':' + data.txtLimit);
            let updateBy = data.updateBy;
            let timeUpdate = web3.utils.fromAscii(getCurrentDate());
            let studentSign = web3.utils.fromAscii(data.studentSign);
            this.cetification.addCertificate(code, title, studentName, dateOfBirth,
                    yearOfGraduation, degreeClassification, modeOfStudy, date,
                    author, updateBy, timeUpdate, studentSign, config)
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
                from: Config.ACCOUNT,
                gas: 6000000
            };
            console.log('============= data : ', data);
            let title = web3.utils.fromAscii(data.title);
            let index = data.index;
            let studentName = web3.utils.fromAscii(data.studentName);
            let dataOfBirth = web3.utils.fromAscii(data.dateOfBirth);
            let yearOfGraduation = data.yearOfGraduation;
            let degreeClassification = web3.utils.fromAscii(data.degreeClassification);
            let modeOfStudy = web3.utils.fromAscii(data.modeOfStudy);
            let date = web3.utils.fromAscii(data.date);
            let author = web3.utils.fromAscii(data.author + ':' + data.txtLimit);
            let updateBy = data.updateBy;
            let status = data.status;
            let timeUpdate = web3.utils.fromAscii(getCurrentDate());
            let studentSign = web3.utils.fromAscii(data.studentSign);
            this.cetification.updateCertificate(index, title,
                    studentName, dataOfBirth,
                    yearOfGraduation, degreeClassification,
                    modeOfStudy, date,
                    author, updateBy, status, timeUpdate, studentSign, config)
                .then(status => {
                    Result(status);
                })
                .catch(err => {
                    Err(err);
                });
        });
    }


    getDataChanegs() {
        return new Promise((Result, Err) => {
            try {
                var contract = new web3.eth.Contract(ABI.abi, Config.CONTRACTS_ID);
                contract.getPastEvents('eventUpdateCertificate', {
                    fromBlock: 0,
                    toBlock: 'latest'
                }, function (error, events) {
                    if (error) {
                        console.log('Error in myEvent event handler: ' + error);
                        Err(error);
                    } else {
                        Result(events);
                    }
                });
            } catch (err) {
                console.log('Err : ', err);
                Err(err)
            }
        });
    }

    getHistoryByCertificateCode(code) {
        return new Promise((Result, Err) => {
            this.getDataChanegs()
                .then(async (dataList) => {
                    let dataSource = [];
                    // Sync data
                    await asyncForEach(dataList, async (item) => {
                        let indexUpdateBy = Number(item.returnValues[9]);
                        await this.getAuthorByIndex(indexUpdateBy).then(updateBy => {
                            let dataText = web3.utils.hexToUtf8(item.returnValues[8]);
                            let arr = dataText.split(':');
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
                            if (Number(log.code) == code) {
                                dataSource.push(log);
                            }
                        });
                    });
                    Result(dataSource);
                })
                .catch(err => {
                    Err(err);
                })
        });
    }
}

module.exports = new SmartContracts();