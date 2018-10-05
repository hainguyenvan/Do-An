var connect = require('../connect');
var Sequelize = require('sequelize');

class CetificateCategoryModel {
    constructor() {
        var sequelize = connect.sequelize;
        this.model = sequelize.define('cetificate_category', {
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
            tableName: 'cetificate_category'
        });
    }

    getAll() {
        return new Promise((Result, Err) => {
            this.model.findAll({
                    raw: true,
                    status: {
                        $ne: -1
                    }
                })
                .then(categorys => {
                    Result(categorys);
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

module.exports = new CetificateCategoryModel();