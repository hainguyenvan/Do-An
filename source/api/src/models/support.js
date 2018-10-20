var connect = require('../connect');
var Sequelize = require('sequelize');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

class SupportModel {
    constructor() {
        var sequelize = connect.sequelize;
        this.model = sequelize.define('support', {
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
            phone: {
                field: 'phone',
                type: Sequelize.STRING
            },
            img: {
                field: 'img',
                type: Sequelize.STRING
            },
            company: {
                field: 'company',
                type: Sequelize.STRING
            },
            dsc: {
                field: 'dsc',
                type: Sequelize.STRING
            },
            positionDsc: {
                field: 'position_dsc',
                type: Sequelize.STRING
            },
            status: {
                field: 'status',
                type: Sequelize.INTEGER
            },
            sex: {
                field: 'sex',
                type: Sequelize.INTEGER
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
            tableName: 'support'
        });
    }

    insert(data) {
        return new Promise((Result, Err) => {
            let dto = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                img: data.img,
                company: data.company,
                dsc: data.dsc,
                sex: data.sex,
                positionDsc: data.positionDsc,
                timeCreate: new Date().getTime(),
                timeUpdate: new Date().getTime()
            }
            this.model.create(dto)
                .then(res => {
                    Result(res);
                })
                .catch(err => {
                    Err(err);
                })
        });
    }

    updateById(data) {
        return new Promise((Result, Err) => {
            let dto = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                img: data.img,
                company: data.company,
                dsc: data.dsc,
                sex: data.sex,
                status: data.status,
                positionDsc: data.positionDsc,
                timeUpdate: new Date().getTime()
            }
            this.model.update(dto, {
                    where: {
                        id: data.id
                    }
                })
                .then(result => {
                    Result(result);
                })
                .catch(err =>
                    Err(err)
                )
        });
    }

    deleteById(id) {
        return new Promise((Result, Err) => {
            this.model.update({
                    status: -1
                }, {
                    where: {
                        id: id
                    }
                })
                .then(result => {
                    Result(result);
                })
                .catch(err =>
                    Err(err)
                )
        });
    }

    getDataByStatus(status) {
        return new Promise((Result, Err) => {
            if (status == undefined || status == null) {
                this.model.findAll({
                        raw: true
                    })
                    .then(studentList => {
                        Result(studentList);
                    })
                    .catch(err => {
                        Err(err);
                    });
            } else {
                status = Number(status);
                this.model.findAll({
                        raw: true,
                        where: {
                            status: {
                                $eq: status
                            }
                        }
                    })
                    .then(studentList => {
                        Result(studentList);
                    })
                    .catch(err => {
                        Err(err);
                    });
            }
        });
    }
}

module.exports = new SupportModel();