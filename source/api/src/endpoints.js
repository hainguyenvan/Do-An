var express = require('express');
var validate = require('express-validation');
var Joi = require('joi');
var router = express.Router();

var thirdparty = require('./third-party');
var accController = require('./controller/account-controller');

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


// Upload images
router.route("/upload").post(thirdparty.upload);

module.exports = router;