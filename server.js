var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/jquery-2.2.3.js', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'jquery-2.2.3.js')); });

app.get('/ui/bootstrap.min.js', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bootstrap.min.js')); });

app.get('/ui/bootstrap.css', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bootstrap.css')); });




app.get('/ui/bgimg.jpg', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bgimg.jpg')); });

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
