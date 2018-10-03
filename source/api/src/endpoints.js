var express = require('express');
var validate = require('express-validation');
var Joi = require('joi');
var router = express.Router();

var thirdparty = require('./third-party');
var accController = require('./controller/account-controller');
var positionController = require('./controller/position-controller');

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

// Upload images
router.route("/upload").post(thirdparty.upload);

module.exports = router;