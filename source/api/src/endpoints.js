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
    address: Joi.string().required(),
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
    studentName: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    yearOfGraduation: Joi.number().required(),
    degreeClassification: Joi.string().required(),
    modeOfStudy: Joi.string().required(),
    author: Joi.string().required(),
    date: Joi.string().required()
}), cetificaetListController.insert);

router.route('/updateCetificateList').post(validate({
    id: Joi.number().required(),
    token: Joi.string().required(),
    title: Joi.string().required(),
    categoryId: Joi.number().required(),
    studentName: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    yearOfGraduation: Joi.number().required(),
    degreeClassification: Joi.string().required(),
    modeOfStudy: Joi.string().required(),
    author: Joi.string().required(),
    date: Joi.string().required(),
    status: Joi.string().required()
}), cetificaetListController.update);

router.route('/deleteCetificateList').post(validate({
    token: Joi.string().required(),
    id: Joi.number().required()
}), cetificaetListController.delete);


// Smart Contracts
router.route('/smartcontracts/getAuthorList').post(smartContractsController.getAuthorList);

router.route('/smartcontracts/addAuthor').post(validate({
    id: Joi.string().required(),
    name: Joi.string().required(),
    sign: Joi.string().required(),
    account: Joi.string().required()
}), smartContractsController.addAuthor);

router.route('/smartcontracts/updateStatusAuthor').post(validate({
    index: Joi.number().required(),
    status: Joi.string().required(),
    account: Joi.string().required()
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
    account: Joi.string().required()
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
    account: Joi.string().required()
}), smartContractsController.updateCertificate);


// Upload images
router.route("/upload").post(thirdparty.upload);

module.exports = router;