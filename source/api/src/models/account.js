var JWT_SECRET = 'Cexk6azogyew7DoTOYKgAXtTOP+18VLDQ1MzYoEWxr6Gqbhg+CeK33MuBPdhyz1dlW4VOKE/ce4TTkfI0yGLlTc+kC74BA8WNoySWmmNsBTEgt83f+9WKYNUgYoGUvml3rRlzvNG71bFqcfJa7U+AuCECq8JnPTeMQ4MSuFBZb4i/q91ZPoI/8SDmcvfai1ofyaHc4xauqhq2hrED5zuZsFbiRDY9bo4d4hHPXdBQaUCm/vklx/BxaAL3OLvvNGhULYmbV/v9Yj0xSAqhZMd7b0TJcDYZ+FHrTX7ZCG15M/Sj/amI/auUEKRNYfwL67/Y7zZxgUWLPsZQ48zPBxgeA==';
var JWT = require('jsonwebtoken');

var connect = require('../connect');
var Sequelize = require('sequelize');

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
            dsc: {
                field: 'dsc',
                type: Sequelize.STRING
            }
        }, {
            tableName: 'account'
        });
    }

    login(email, password) {
        return new Promise((Result, Err) => {
            this.model.findOne({
                raw: true,
                where: {
                    email: email,
                    password: password
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
                .then(accList => {
                    Result(accList);
                })
                .catch(err => {
                    Err(err);
                });
        });
    }
}

module.exports = new AccountModel();