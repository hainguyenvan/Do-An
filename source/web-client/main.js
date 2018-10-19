var express = require("express");
var app = express();
var path = require("path");

app.use(express.static(__dirname + '/public' ));
var HTTP_PORT = 3003;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(HTTP_PORT);

console.log("Running at Port: ", HTTP_PORT);