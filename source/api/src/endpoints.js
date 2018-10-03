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

// Position
router.route('/getAllPosition').post(positionController.getAll);

// Upload images
router.route("/upload").post(thirdparty.upload);

module.exports = router;