const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const AccControler = require('./controller/account-controller');
var accController = new AccControler();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const router = express.Router();
const HTTP_PORT = 3002;


// API
router.get('/', function (req, res) {
    res.json({
        msg: 'Welcome to our api !'
    });
});


// Account
router.get('/getAccount', function (req, res) {
    accController.getAcc().then(result => {
        res.json({
            code: 200,
            data: result,
            msg: 'Success !'
        });
    }).catch(err => {
        res.json({
            code: 201,
            msg: err
        });
    });
});

// API-Login
router.post('/login', function (req, res) {
    let userName = req.body.username;
    let passWord = req.body.password;
    if (userName == undefined || passWord == undefined) {
        res.json({
            status: 400,
            msg: 'Not invalid field !'
        });
    }
    accController.login(userName, passWord).then(result => {
        res.json({
            status: 200,
            data: result,
            msg: 'Success !'
        });
    }).catch(err => {
        res.json({
            code: 201,
            msg: err
        });
    });
});

// API-Register

app.use(cors());
app.use('', router);
app.listen(HTTP_PORT);
console.log('Listening http on port: http://localhost:' + HTTP_PORT);