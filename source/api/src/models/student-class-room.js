var connect = require('../connect');
var Sequelize = require('sequelize');

class StudentModel {
    constructor() {
        var sequelize = connect.sequelize;
        this.model = sequelize.define('student_class_room', {
            id: {
                field: 'id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            studentId: {
                field: 'student_id',
                type: Sequelize.INTEGER
            },
            classroomId: {
                field: 'class_room_id',
                type: Sequelize.INTEGER
            },
            status: {
                field: 'status',
                type: Sequelize.INTEGER
            }
        }, {
                tableName: 'student_class_room'
            });
    }

    insert(data) {
        return new Promise((Result, Err) => {
            let dto = {
                studentId: data.studentId,
                classroomId: data.classroomId
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

    update(data) {
        return new Promise((Result, Err) => {
            let dto = {
                studentId: data.studentId,
                classroomId: data.classroomId,
                status: data.status
            }
            this.model.update(dto, {
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
        });
    }

    getDataByClassroomId(classroomId) {
        return new Promise((Result, Err) => {
            this.model.findAll({
                raw: true,
                where: {
                    classroomId: classroomId
                }
            })
                .then(rows => {
                    Result(rows);
                })
                .catch(err => {
                    Err(err);
                });
        });
    }

    deleteDataByClassroomId(classroomId) {
        return new Promise((Result, Err) => {
            this.model.destroy({
                where: {
                    classroomId:classroomId
                }
            }).then(result => {
                Result(result)
            }).catch(err => {
                Err(err)
            });
        });
    }

    destroyRow(studentId,classroomId) {
        return new Promise((Result, Err) => {
            this.model.destroy({
                where: {
                    studentId: studentId,
                    classroomId: classroomId
                }
            }).then(result => {
                Result(result)
            }).catch(err => {
                Err(err)
            });
        });
    }

    updateStatusById(data) {
        return new Promise((Result, Err) => {
            let dto = {
                status: data.status
            }
            this.model.update(dto, {
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
        });
    }

    getAll() {
        return new Promise((Result, Err) => {
            this.model.findAll({
                raw: true
            })
                .then(studentList => {
                    Result(studentList);
                })
                .catch(err => {
                    Err(err);
                });
        });
    }

    getAvailable() {
        return new Promise((Result, Err) => {
            this.model.findAll({
                raw: true,
                where: {
                    status: {
                        $eq: -1
                    }
                }
            })
                .then(studentList => {
                    Result(studentList);
                })
                .catch(err => {
                    Err(err);
                });
        });
    }
}

module.exports = new StudentModel();