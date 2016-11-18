var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
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

app.get('/ui/favicon-60.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'favicon-60.png'));
});

app.get('/ui/favicon-57.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'favicon-57.png'));
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







var pool = new Pool(config);
app.get('/test-db',function(req,res){
//make a select response
////return a response with results
pool.query("SELECT * FROM test",function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }else{
        res.send(JSON.stringify(result));
    }
    
});
});

/*
app.get('/user/:input',function(req,res){
    var hashedString=hash(req.params.input,"random string");
    res.send(hashedString);
});


*/

/*app.get('/articles/:articleName',function(req,res){
    
    var articleName=req.params.articleName;
    pool.query("SELECT * FROM article where title=$1",[req.params.articleName],function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }else{
        if(result.rows.length===0)
        {
            res.status(404).send('Article not found');
        }
        else
        {
            var articleDate=result.rows[0];
            res.send(createTemplate(articleDate));
        }
    }
    
});
});
*/

/*
    
app.get('/user',function(req,res){
    
    pool.query("SELECT * from user",function(err,result){
        if(err)
        res.status(500).send(err.toString());
        else
        
        res.send(JSON.stringify(result));
        
    });
    
});
*/





function hash(input,salt)
{
    var hashed=crypto.pbkdf2Sync(input,salt, 10000, 512, 'sha512');
    return["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}



app.post('/signup',function(req,res){
    
    var username=req.body.username;
    var password=req.body.password;
    var email=req.body.email;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    
    pool.query('INSERT INTO "user" (username,password,email) VALUES($1,$2,$3) ',[username,dbString,email],function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }else{
        res.send('Success');
    }
    
});
});


app.post('/signin', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedpass = hash(password, salt); 
              //res.send(hashedpass);
              if (hashedpass === dbString) {
                
               req.session.auth={userId:result.rows[0].id};
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});













































