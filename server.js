// server.js
// where your node app starts

// init project
var express = require('express');
var oso_server = require('./src/oso-api');

var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.use("/api", oso_server.router);

// listen for requests :)
var listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});