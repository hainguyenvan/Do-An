var JWT = require('jsonwebtoken');

var StudentClassroom = require('../models/student-class-room');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

exports.insert =  async function (req, res) {
    let data = req.body;
    await asyncForEach(data.students, async (item) => {
        let row = {
            classroomId: data.classroomId,
            studentId: item.id
        }
        await StudentClassroom.insert(row)
            .then(async (student) => {
                // TODO - hainv
            })
            .catch(err => {
                res.send({
                    status: 400,
                    msg: err
                })
            })
    });
    res.send({
        status: 200,
        msg: 'Success !'
    })
}

// Delete all data by classroomId
// Insert again data of classroom
exports.update = function (req, res) {
    let data = req.body;
    StudentClassroom.deleteDataByClassroomId(data.classroomId)
        .then(async (success) => {
            await asyncForEach(data.students, async (item) => {
                let row = {
                    classroomId: data.classroomId,
                    studentId: item.id
                }
                await StudentClassroom.insert(row)
                    .then(async (student) => {
                        // TODO - hainv
                    })
                    .catch(err => {
                        res.send({
                            status: 400,
                            msg: err
                        })
                    })
            });
            res.send({
                status: 200,
                msg: 'Success !'
            })
        })
        .catch(err => {
            res.send({
                status: 200,
                msg: 'Success !'
            })
        })
}

exports.destroy = function (req, res) {
    StudentClassroom.destroyRow(req.body.studentId, req.body.classroomId)
        .then(result => {
            res.send({
                status: 200,
                msg: 'Success !'
            })
        })
        .catch(err => {
            res.send({
                status: 200,
                msg: err
            })
        })
}