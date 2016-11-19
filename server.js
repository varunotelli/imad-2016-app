var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');

var config = {
  host:'db.imad.hasura-app.io',
  user: 'varunotelli',
  password: process.env.DB_PASSWORD,
  database: 'varunotelli',
  port:'5432'
  
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret:'randomval',
    age: {maxAge:1000*60*60*24*30}
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/jquery-2.2.3.min.js', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'jquery-2.2.3.min.js')); });

app.get('/ui/bootstrap.min.js', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bootstrap.min.js')); });

app.get('/ui/bootstrap.min.css', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bootstrap.min.css')); });

app.get('/ui/bootstrap.css', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bootstrap.css')); });

app.get('/ui/main.js', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'main.js')); });


app.get('/ui/bgimg.jpg', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bgimg.jpg')); });

app.get('/ui/profilecss.css', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'profilecss.css')); });

app.get('/ui/blogstyle.css', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'blogstyle.css')); });

app.get('/ui/profile.html', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'profile.html')); });

app.get('/ui/create-blog.html', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'create-blog.html')); });

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});





































