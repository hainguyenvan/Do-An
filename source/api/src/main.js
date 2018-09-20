const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

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


app.use(cors());
app.use('', router);
app.listen(HTTP_PORT);
console.log('Listening http on port: http://localhost:' + HTTP_PORT);