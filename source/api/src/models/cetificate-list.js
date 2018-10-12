var connect = require('../connect');
var Sequelize = require('sequelize');
var CetificateCategory = require('./cetificate-category');
var Account = require('./account');

function generateCetificateCode() {
    var numberRandom = Math.floor(100000 + Math.random() * 900000);
    var code = (new Date()).getFullYear() + '' + numberRandom;
    return code;
}

class CetificateListModel {
    constructor() {
        var sequelize = connect.sequelize;
        this.model = sequelize.define('cetificate_list', {
            id: {
                field: 'id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            code: {
                field: 'code',
                type: Sequelize.STRING
            },
            title: {
                field: 'title',
                type: Sequelize.STRING
            },
            studentName: {
                field: 'student_name',
                type: Sequelize.STRING
            },
            dateOfBirth: {
                field: 'date_of_birth',
                type: Sequelize.STRING
            },
            yearOfGraduation: {
                field: 'year_of_graduation',
                type: Sequelize.INTEGER
            },
            degreeClassification: {
                field: 'degree_classification',
                type: Sequelize.STRING
            },
            modeOfStudy: {
                field: 'mode_of_study',
                type: Sequelize.STRING
            },
            author: {
                field: 'author',
                type: Sequelize.STRING
            },
            createBy: {
                field: 'create_by',
                type: Sequelize.INTEGER
            },
            updateBy: {
                field: 'update_by',
                type: Sequelize.INTEGER
            },
            status: {
                field: 'status',
                type: Sequelize.INTEGER
            },
            timeCreate: {
                field: 'time_create',
                type: Sequelize.INTEGER
            },
            timeUpdate: {
                field: 'time_update',
                type: Sequelize.INTEGER
            },
            date: {
                field: 'date',
                type: Sequelize.STRING
            },
            categoryId: {
                field: 'category_id',
                type: Sequelize.INTEGER
            }
        }, {
            tableName: 'cetificate_list'
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
                .then(dataList => {
                    if (dataList.length == 0) {
                        Result([]);
                    }
                    dataList.forEach((item, index) => {
                        CetificateCategory.getById(item.categoryId).then(res => {
                            item.category = res;
                            Account.getById(item.createBy).then(createBy => {
                                item.createBy = {
                                    id: createBy.id,
                                    name: createBy.name
                                }
                                Account.getById(item.updateBy).then(updateBy => {
                                    item.updateBy = {
                                        id: updateBy.id,
                                        name: updateBy.name
                                    }
                                    if (index == dataList.length - 1) {
                                        Result(dataList);
                                    }
                                });
                            })
                        })
                    });
                })
                .catch(err => {
                    Err(err);
                });
        });
    }

    insert(data) {
        return new Promise((Result, Err) => {
            this.model.create({
                    code: generateCetificateCode(),
                    title: data.title,
                    studentName: data.studentName,
                    dateOfBirth: data.dateOfBirth,
                    yearOfGraduation: data.yearOfGraduation,
                    degreeClassification: data.degreeClassification,
                    modeOfStudy: data.modeOfStudy,
                    author: data.author,
                    createBy: data.createBy,
                    updateBy: data.updateBy,
                    status: 0,
                    timeCreate: new Date().getTime(),
                    timeUpdate: new Date().getTime(),
                    date: data.date,
                    categoryId: data.categoryId
                })
                .then(res => {
                    Result(res);
                })
                .catch(err => {
                    Err(err);
                })
        });
    }

    delete(data) {
        return new Promise((Result, Err) => {
            this.model.update({
                    status: -1,
                    updateBy: data.updateBy,
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

    update(data) {
        return new Promise((Result, Err) => {
            this.model.update({
                    title: data.title,
                    studentName: data.studentName,
                    dateOfBirth: data.dateOfBirth,
                    yearOfGraduation: data.yearOfGraduation,
                    degreeClassification: data.degreeClassification,
                    modeOfStudy: data.modeOfStudy,
                    author: data.author,
                    updateBy: data.updateBy,
                    status: data.status,
                    timeUpdate: new Date().getTime(),
                    date: data.date,
                    categoryId: data.categoryId
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

    updateStatus(data) {
        return new Promise((Result, Err) => {
            this.model.update(data, {
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

module.exports = new CetificateListModel();