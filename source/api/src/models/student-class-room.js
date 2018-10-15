var connect = require('../connect');
var Sequelize = require('sequelize');

class StudentModel {
    constructor() {
        var sequelize = connect.sequelize;
        this.model = sequelize.define('student', {
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
            tableName: 'student'
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
}

module.exports = new StudentModel();