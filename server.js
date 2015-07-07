var express = require("express");
var path = require("path");
var app = express();
require('./server/config/mongoose.js');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./client")));
require('./server/config/routes.js')(app);
app.listen(8000, function() {
 console.log("listening on port 8000");
})