var JWT_SECRET = 'Cexk6azogyew7DoTOYKgAXtTOP+18VLDQ1MzYoEWxr6Gqbhg+CeK33MuBPdhyz1dlW4VOKE/ce4TTkfI0yGLlTc+kC74BA8WNoySWmmNsBTEgt83f+9WKYNUgYoGUvml3rRlzvNG71bFqcfJa7U+AuCECq8JnPTeMQ4MSuFBZb4i/q91ZPoI/8SDmcvfai1ofyaHc4xauqhq2hrED5zuZsFbiRDY9bo4d4hHPXdBQaUCm/vklx/BxaAL3OLvvNGhULYmbV/v9Yj0xSAqhZMd7b0TJcDYZ+FHrTX7ZCG15M/Sj/amI/auUEKRNYfwL67/Y7zZxgUWLPsZQ48zPBxgeA==';
var JWT = require('jsonwebtoken');
var md5 = require('md5');

var connect = require('../connect');
var Sequelize = require('sequelize');
var SmartContracts = require('../smart-contracts/smart-contracts');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

class AccountModel {
    constructor() {
        var sequelize = connect.sequelize;
        this.model = sequelize.define('account', {
            id: {
                field: 'id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                field: 'name',
                type: Sequelize.STRING
            },
            email: {
                field: 'email',
                type: Sequelize.STRING
            },
            code: {
                field: 'code',
                type: Sequelize.STRING
            },
            dateOfBirth: {
                field: 'date_of_birth',
                type: Sequelize.STRING
            },
            sex: {
                field: 'sex',
                type: Sequelize.INTEGER
            },
            phone: {
                field: 'phone',
                type: Sequelize.STRING
            },
            address: {
                field: 'address',
                type: Sequelize.STRING
            },
            img: {
                field: 'img',
                type: Sequelize.STRING
            },
            status: {
                field: 'status',
                type: Sequelize.INTEGER
            },
            position: {
                field: 'position',
                type: Sequelize.STRING
            },
            password: {
                field: 'password',
                type: Sequelize.STRING
            },
            sign: {
                field: 'sign',
                type: Sequelize.STRING
            },
            dsc: {
                field: 'dsc',
                type: Sequelize.STRING
            },
            timeCreate: {
                field: 'time_create',
                type: Sequelize.INTEGER
            },
            timeUpdate: {
                field: 'time_update',
                type: Sequelize.INTEGER
            }
        }, {
                tableName: 'account'
            });
    }

    login(email, password) {
        return new Promise((Result, Err) => {
            let md5Password = md5(password);
            this.model.findOne({
                raw: true,
                where: {
                    email: email,
                    password: md5Password,
                    status: {
                        $ne: -1
                    }
                }
            }).then(acc => {
                let tokenJson = {
                    id: acc.id,
                    code: acc.code,
                    exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
                    email: acc.email
                }
                let token = JWT.sign(tokenJson, JWT_SECRET);
                acc.token = token;
                Result(acc);
            }).catch(err => {
                Err(err);
            });
        });
    }

    getAll() {
        return new Promise((Result, Err) => {
            this.model.findAll({
                raw: true
            })
                .then(async (accList) => {
                    if (accList.length == 0) {
                        Result([]);
                    }
                    await asyncForEach(accList, async (item) => {
                        await SmartContracts.getAuthorBySign(item.sign).then(res => {
                            item.publicPermission = res;
                        });
                    });
                    Result(accList);
                })
                .catch(err => {
                    Err(err);
                });
        });
    }

    insert(data) {
        return new Promise((Result, Err) => {
            var md5Password = md5(data.password);
            this.model.create({
                name: data.name,
                email: data.email,
                code: data.code,
                dateOfBirth: data.dateOfBirth,
                sex: data.sex,
                phone: data.phone,
                address: data.address,
                img: data.img,
                position: data.position,
                password: md5Password,
                dsc: data.dsc,
                sign: data.sign,
                timeCreate: new Date().getTime(),
                timeUpdate: new Date().getTime()
            })
                .then(res => {
                    Result(res);
                })
                .catch(err => {
                    Err(err);
                })
        });
    }

    delete(accountCode) {
        return new Promise((Result, Err) => {
            this.model.update({
                status: -1
            }, {
                    where: {
                        code: accountCode
                    }
                })
                .then(result =>
                    Result(result)
                )
                .catch(err =>
                    Err(err)
                )
        })
    }

    update(data) {
        return new Promise((Result, Err) => {
            let md5Password = md5(data.password);
            this.model.update({
                name: data.name,
                email: data.email,
                dateOfBirth: data.dateOfBirth,
                sex: data.sex,
                phone: data.phone,
                address: data.address,
                img: data.img,
                status: data.status,
                position: data.position,
                password: md5Password,
                dsc: data.dsc,
                timeUpdate: new Date().getTime()
            }, {
                    where: {
                        code: data.code
                    }
                })
                .then(result =>
                    Result(result)
                )
                .catch(err =>
                    Err(err)
                )
        })
    }

    getById(id) {
        return new Promise((Result, Err) => {
            this.model.findOne({
                raw: true,
                id: id
            })
                .then(data => {
                    Result(data);
                })
                .catch(err => {
                    Err(err);
                });
        })
    }
}

module.exports = new AccountModel();