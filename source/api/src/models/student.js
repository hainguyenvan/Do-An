var connect = require('../connect');
var Sequelize = require('sequelize');

var StudentClassroom = require('./student-class-room');

function generateStudentSign() {
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
        this.model = sequelize.define('student', {
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
            numberId: {
                field: 'number_id',
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
            createBy: {
                field: 'create_by',
                type: Sequelize.INTEGER
            },
            updateBy: {
                field: 'update_by',
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
            studentSign: {
                field: 'student_sign',
                type: Sequelize.STRING
            }
        }, {
            tableName: 'student'
        });
    }

    insert(data) {
        return new Promise((Result, Err) => {
            let dto = {
                name: data.name,
                code: data.code,
                numberId: data.numberId,
                email: data.email,
                phone: data.phone,
                sex: Number(data.sex),
                dateOfBirth: data.dateOfBirth,
                address: data.address,
                timeCreate: new Date().getTime(),
                timeUpdate: new Date().getTime(),
                createBy: data.createBy,
                updateBy: data.updateBy,
                img: data.img,
                studentSign: generateStudentSign()
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
                name: data.name,
                code: data.code,
                numberId: data.numberId,
                email: data.email,
                phone: data.phone,
                sex: Number(data.sex),
                dateOfBirth: data.dateOfBirth,
                address: data.address,
                timeUpdate: new Date().getTime(),
                updateBy: data.updateBy,
                img: data.img,
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

    getAllStudent() {
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

    getStudentActive() {
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

    getStudentById(id) {
        return new Promise((Result, Err) => {
            this.model.findOne({
                    raw: true,
                    where: {
                        id: id
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

    getStudentAvailable() {
        return new Promise((Result, Err) => {
            StudentClassroom.getAvailable()
                .then(async (dataList) => {
                    if (dataList.length == 0) {
                        this.getStudentActive().then(studentList => {
                            Result(studentList);
                        });
                    } else {
                        let dataSource = [];
                        await asyncForEach(dataList, async (item) => {
                            await this.getStudentById(item.studentId)
                                .then(async (student) => {
                                    dataSource.push(student);
                                })
                        });
                        Result(dataSource);
                    }
                })
                .catch(err => {
                    console.log('Err : ', err);
                    Err(err);
                });
        });
    }
}

module.exports = new StudentModel();