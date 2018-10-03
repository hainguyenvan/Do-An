var JWT_SECRET = 'Cexk6azogyew7DoTOYKgAXtTOP+18VLDQ1MzYoEWxr6Gqbhg+CeK33MuBPdhyz1dlW4VOKE/ce4TTkfI0yGLlTc+kC74BA8WNoySWmmNsBTEgt83f+9WKYNUgYoGUvml3rRlzvNG71bFqcfJa7U+AuCECq8JnPTeMQ4MSuFBZb4i/q91ZPoI/8SDmcvfai1ofyaHc4xauqhq2hrED5zuZsFbiRDY9bo4d4hHPXdBQaUCm/vklx/BxaAL3OLvvNGhULYmbV/v9Yj0xSAqhZMd7b0TJcDYZ+FHrTX7ZCG15M/Sj/amI/auUEKRNYfwL67/Y7zZxgUWLPsZQ48zPBxgeA==';
var JWT = require('jsonwebtoken');

var connect = require('../connect');
var Sequelize = require('sequelize');

class PositionModel {
    constructor() {
        var sequelize = connect.sequelize;
        this.model = sequelize.define('position', {
            id: {
                field: 'id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            status: {
                field: 'status',
                type: Sequelize.INTEGER
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
            tableName: 'position'
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

    insert(data) {
        return new Promise((Result, Err) => {
            this.model.create({
                    dsc: data.dsc,
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

    delete(id) {
        return new Promise((Result, Err) => {
            this.model.update({
                    status: -1
                }, {
                    where: {
                        id: id
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
            this.model.update({
                    dsc: data.dsc,
                    status: data.status,
                    timeUpdate: new Date().getTime()
                }, {
                    where: {
                        id: data.id
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

}

module.exports = new PositionModel();