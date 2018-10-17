var connect = require('../connect');
var Sequelize = require('sequelize');
var StudentClassroom = require('./student-class-room');
var Student =  require('./student');

function generateClassroomSign() {
    var numberRandom = Math.floor(100000 + Math.random() * 900000);
    var code = (new Date()).getFullYear() + '' + numberRandom;
    return code;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

class StudentModel {
    constructor() {
        var sequelize = connect.sequelize;
        this.model = sequelize.define('class_room', {
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
            dsc: {
                field: 'dsc',
                type: Sequelize.STRING
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
            classroomSign: {
                field: 'class_room_sign',
                type: Sequelize.STRING
            }
        }, {
            tableName: 'class_room'
        });
    }

    insert(data) {
        return new Promise((Result, Err) => {
            let dto = {
                code: data.code,
                dsc: data.dsc,
                timeCreate: new Date().getTime(),
                timeUpdate: new Date().getTime(),
                classroomSign: generateClassroomSign()
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
                code: data.code,
                dsc: data.dsc,
                timeUpdate: new Date().getTime(),
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

    getAll() {
        return new Promise((Result, Err) => {
            this.model.findAll({
                    raw: true
                })
                .then(classroomList => {
                    Result(classroomList);
                })
                .catch(err => {
                    Err(err);
                });
        });
    }

    getClassroomActive() {
        return new Promise((Result, Err) => {
            this.model.findAll({
                    raw: true,
                    where: {
                        status: {
                            $ne: -1
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

    getStudentOfClassroomById(classroomId) {
        return new Promise((Result, Err) => {
            StudentClassroom.getDataByClassroomId(classroomId)
            .then(async (classroomist) => {
                let dataSource = [];
                await asyncForEach(classroomist, async (item) => {
                    await Student.getStudentById(item.studentId)
                        .then(student => {
                            dataSource.push(student);
                        })
                });
                Result(dataSource);
            })
            .catch(err => {
                Err(err);
            })
        });
    }
}

module.exports = new StudentModel();