// Create web server
     
// Load the http module to create an http server.
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require('fs');
var comments = require('./comments.json');

// Configure the app to use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname + '/public'));

// Set up the route for the comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// Set up the route for the comments
app.post('/comments', function(req, res) {
  var newComment = req.body;
  comments.push(newComment);
  fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
    res.json(comments);
  });
});

// Create the server
var server = app.listen(3000, function() {
  console.log('Listening on port 3000');
});

