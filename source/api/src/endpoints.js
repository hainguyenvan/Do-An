var express = require('express');
var validate = require('express-validation');
var Joi = require('joi');
var router = express.Router();

var thirdparty = require('./third-party');
var accController = require('./controller/account-controller');
var positionController = require('./controller/position-controller');
var cetificateCategoryController = require('./controller/cetificate-category-controller');
var cetificaetListController = require('./controller/cetificate-list-controller');
var smartContractsController = require('./controller/smart-contracts-controller');
var studentController = require('./controller/student-controller');
var classroomController = require('./controller/classroom-controller');
var studentClassroomControlller = require('./controller/student-classroom-controller');
var supportController = require('./controller/support-controller');

// API
router.get('/', function (req, res) {
    res.json({
        msg: 'Welcome to our api !'
    });
});

// Account
router.route('/login').post(validate({
    body: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}), accController.login);

router.route('/getInfoAccount').post(validate({
    token: Joi.string().required()
}), accController.getInfo);

router.route('/getAllAccount').post(accController.getAll);

router.route('/addAccount').post(validate({
    name: Joi.string().required(),
    email: Joi.string().required(),
    code: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    sex: Joi.number().required(),
    phone: Joi.string().required(),
    address: Joi.string(),
    img: Joi.string(),
    position: Joi.string().required(),
    password: Joi.string().required(),
    dsc: Joi.string(),
}), accController.register);

router.route('/deleteAccount').post(validate({
    code: Joi.string().required()
}), accController.delete);

router.route('/updateAccount').post(validate({
    name: Joi.string().required(),
    email: Joi.string().required(),
    code: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    sex: Joi.number().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    img: Joi.string(),
    position: Joi.string().required(),
    password: Joi.string().required(),
    dsc: Joi.string(),
    status: Joi.string()
}), accController.update);


// Position
router.route('/getAllPosition').post(positionController.getAll);

router.route('/insertPosition').post(validate({
    dsc: Joi.string().required()
}), positionController.insert);

router.route('/updatePosition').post(validate({
    id: Joi.number().required(),
    dsc: Joi.string().required(),
    status: Joi.string().required()
}), positionController.update);

router.route('/deletePosition').post(validate({
    id: Joi.number().required()
}), positionController.delete);


// Cetificate category
router.route('/getAllCetificateCategory').post(cetificateCategoryController.getAll);

router.route('/insertCetificateCategory').post(validate({
    dsc: Joi.string().required()
}), cetificateCategoryController.insert);

router.route('/updateCetificateCategory').post(validate({
    id: Joi.number().required(),
    dsc: Joi.string().required(),
    status: Joi.string().required()
}), cetificateCategoryController.update);

router.route('/deleteCetificateCategory').post(validate({
    id: Joi.number().required()
}), cetificateCategoryController.delete);


// Cetificate list
router.route('/getAllCetificateList').post(cetificaetListController.getAll);

router.route('/insertCetificateList').post(validate({
    token: Joi.string().required(),
    title: Joi.string().required(),
    categoryId: Joi.number().required(),
    studentId: Joi.number().required(),
    yearOfGraduation: Joi.number().required(),
    degreeClassification: Joi.string().required(),
    modeOfStudy: Joi.string().required(),
    author: Joi.string().required(),
    date: Joi.string().required(),
    txtLimit: Joi.string().required()
}), cetificaetListController.insert);

router.route('/updateCetificateList').post(validate({
    id: Joi.number().required(),
    token: Joi.string().required(),
    title: Joi.string().required(),
    categoryId: Joi.number().required(),
    studentId: Joi.number().required(),
    yearOfGraduation: Joi.number().required(),
    degreeClassification: Joi.string().required(),
    modeOfStudy: Joi.string().required(),
    author: Joi.string().required(),
    date: Joi.string().required(),
    status: Joi.string().required(),
    txtLimit: Joi.string().required()
}), cetificaetListController.update);

router.route('/deleteCetificateList').post(validate({
    token: Joi.string().required(),
    id: Joi.number().required()
}), cetificaetListController.delete);

// 0: Get detail certificate
// 1: Get history edit of certificate
router.route('/getCertificateByCode').post(validate({
    code: Joi.string().required(),
    type: Joi.number().required()
}), cetificaetListController.getCertificateByCode)


// Smart Contracts
router.route('/smartcontracts/getAuthorList').post(smartContractsController.getAuthorList);

router.route('/smartcontracts/addAuthor').post(validate({
    id: Joi.string().required(),
    name: Joi.string().required(),
    sign: Joi.string().required(),
}), smartContractsController.addAuthor);

router.route('/smartcontracts/updateStatusAuthor').post(validate({
    index: Joi.number().required(),
    status: Joi.string().required()
}), smartContractsController.updateStatusAuthor);

// Certificate
router.route('/smartcontracts/getCertificateList').post(smartContractsController.getCertificateList);

router.route('/smartcontracts/addCertificate').post(validate({
    code: Joi.string().required(),
    title: Joi.string().required(),
    studentName: Joi.string().required(),
    dataOfBirth: Joi.string().required(),
    yearOfGraduation: Joi.number().required(),
    degreeClassification: Joi.string().required(),
    modeOfStudy: Joi.string().required(),
    date: Joi.string().required(),
    author: Joi.string().required(),
    updateBy: Joi.number().required(),
    token: Joi.string().required(),
    studentSign: Joi.string().required(),
    txtLimit: Joi.string().required()
}), smartContractsController.addCetificate);

router.route('/smartcontracts/updateCertificate').post(validate({
    index: Joi.number().required(),
    title: Joi.string().required(),
    studentName: Joi.string().required(),
    dataOfBirth: Joi.string().required(),
    yearOfGraduation: Joi.number().required(),
    degreeClassification: Joi.string().required(),
    modeOfStudy: Joi.string().required(),
    date: Joi.string().required(),
    author: Joi.string().required(),
    updateBy: Joi.number().required(),
    status: Joi.number().required(),
    token: Joi.string().required(),
    studentSign: Joi.string().required(),
    txtLimit:Joi.string().required()
}), smartContractsController.updateCertificate);

router.route('/smartcontracts/getDataChanegs').post(smartContractsController.getDataChanegs);


// Student
router.route('/insertStudent').post(validate({
    name: Joi.string().required(),
    code: Joi.string().required(),
    numberId: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    sex: Joi.number().required(),
    dateOfBirth: Joi.string().required(),
    address: Joi.string().required(),
    img: Joi.string().required(),
    token: Joi.string().required()
}), studentController.insert);

router.route('/updateStudent').post(validate({
    name: Joi.string().required(),
    code: Joi.string().required(),
    numberId: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    sex: Joi.number().required(),
    dateOfBirth: Joi.string().required(),
    address: Joi.string().required(),
    img: Joi.string().required(),
    token: Joi.string().required(),
    id: Joi.number().required(),
    status: Joi.number().required()
}), studentController.update);

router.route('/updateStudentStatus').post(validate({
    id: Joi.number().required(),
    status: Joi.number().required()
}), studentController.updateByStatus);

router.route('/getAllStudents').post(studentController.getAllStudent);

router.route('/getStudentAvailable').post(studentController.getStudentAvailable);

router.route('/getStudentActive').post(studentController.getStudentActive);


// Classroom
router.route('/insertClassroom').post(validate({
    token: Joi.string().required(),
    code: Joi.string().required(),
    dsc: Joi.string().required()
}), classroomController.insert);

router.route('/updateClassroom').post(validate({
    token: Joi.string().required(),
    code: Joi.string().required(),
    dsc: Joi.string().required(),
    id: Joi.number().required(),
    status: Joi.number().required()
}), classroomController.update);

router.route('/updateStatusClassroom').post(validate({
    token: Joi.string().required(),
    id: Joi.number().required(),
    status: Joi.number().required()
}), classroomController.updateByStatus);

router.route('/getAllClassroom').post(classroomController.getAllClassroom);

router.route('/getClassroomActive').post(classroomController.getClassroomActive);

router.route('/getStudentOfClassroom').post(validate({
    classroomId: Joi.number().required()
}), classroomController.getStudentOfClassroom);



// Study manager
router.route('/addStudyManager').post(validate({
    classroomId: Joi.number().required(),
    students: Joi.array().required()
}), studentClassroomControlller.insert);

router.route('/updateStudyManager').post(validate({
    classroomId: Joi.number().required(),
    students: Joi.array().required()
}), studentClassroomControlller.update);

router.route('/destroyStudentOfClassroom').post(validate({
    studentId: Joi.number().required(),
    classroomId: Joi.number().required()
}), studentClassroomControlller.destroy);


// Support
router.route('/addSupport').post(validate({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    img: Joi.string().required(),
    company: Joi.string().required(),
    dsc: Joi.string().required(),
    positionDsc: Joi.string().required(),
    sex: Joi.number().required()
}), supportController.insert);

router.route('/updateSupport').post(validate({
    id: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    img: Joi.string().required(),
    company: Joi.string().required(),
    dsc: Joi.string().required(),
    positionDsc: Joi.string().required(),
    status: Joi.string().required(),
    sex: Joi.number().required()
}), supportController.update);

router.route('/getSupportByStatus').post(validate({
    status: Joi.string()
}), supportController.getAllByStatus);

router.route('/deleteSupport').post(validate({
    id: Joi.number().required(),
}), supportController.delete);


// Upload images
router.route("/upload").post(thirdparty.upload);

module.exports = router;