var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var router = require('./endpoints');
var Config = require('./config');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('src/public'));

const HTTP_PORT = Config.HTTP_PORT;

app.use(cors());
app.use('', router);
app.listen(HTTP_PORT);
console.log('Listening http on port: http://localhost:' + HTTP_PORT);