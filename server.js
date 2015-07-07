var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

require('./config/mongoose');

var app = express();

app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.json());

// require('./config/routes');

var server = app.listen(8000, function(){
	console.log('Food Thingie Lives! Port :8000 Yall!');
})

require('./config/socketio')(server);
