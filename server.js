var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
  host:'db.app.hasura-app.io',
  user: 'varunotelli',
  password: process.env.DB_PASSWORD,
  database: 'varunotelli',
  port:'5432',
  
};
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

app.get('/ui/jquery-2.2.3.min.js', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'jquery-2.2.3.min.js')); });

app.get('/ui/bootstrap.min.js', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bootstrap.min.js')); });

app.get('/ui/bootstrap.min.css', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bootstrap.min.css')); });

app.get('/ui/bootstrap.css', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bootstrap.css')); });




app.get('/ui/bgimg.jpg', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bgimg.jpg')); });

app.get('/ui/profilecss.css', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'profilecss.css')); });

app.get('/ui/profile.html', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'profile.html')); });

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});








var pool = new Pool(config);

app.get('/test-db', function (req, res) {
    pool.query('SELECT * FROM test',function(req,res){
        if(err){
           res.status(500).res.send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
  
});




















function createTemplate(data)
{
    var title=data.title;
    var content=data.content;
    var htmlTemplate=
    
        `
        <html>        
        <h1>
        ${title}
        </h1>
        <p>${content}</p>
        `
        
        ;
     return htmlTemplate;   
    
}

app.get('/ui/profile.html', function (req, res) { res.send(createTemplate());
































