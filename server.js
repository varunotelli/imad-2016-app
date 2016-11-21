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




app.get('/ui/jquery-2.2.3.min.js', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'jquery-2.2.3.min.js')); });

app.get('/ui/bootstrap.min.js', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bootstrap.min.js')); });

app.get('/ui/bootstrap.min.css', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bootstrap.min.css')); });

app.get('/ui/bootstrap.css', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bootstrap.css')); });

app.get('/ui/main.js', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'main.js')); });

app.get('/ui/article.js', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'article.js')); });

app.get('/ui/bgimg.jpg', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'bgimg.jpg')); });

app.get('/ui/profilecss.css', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'profilecss.css')); });

app.get('/ui/blogstyle.css', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'blogstyle.css')); });
app.get('/ui/homestyle.css', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'homestyle.css')); });

app.get('/ui/profile.html', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'profile.html')); });

app.get('/ui/ajax-loader.gif', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'ajax-loader.gif')); });

app.get('/ui/ajax-loader1.gif', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'ajax-loader1.gif')); });

app.get('/ui/home.html', function (req, res) { res.sendFile(path.join(__dirname, 'ui', 'home.html')); });


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


function createTemplate(data)
{
    var title=data.title;
    var heading=data.heading;
    var image=data.image;
    var content=data.content;
    var time=data.date;
    var htmlTemplate=
    `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <link href="/ui/bootstrap.min.css" rel="stylesheet">
    
    <link href="https://fonts.googleapis.com/css?family=Prociono" rel="stylesheet">
    <link href="/ui/blogstyle.css" rel="stylesheet">
    
    <link href="https://fonts.googleapis.com/css?family=Oswald:700" rel="stylesheet">
    </head>
<body>
<nav  class="navbar navbar-default">
        <div class="container-fluid">
    
            <div class="navbar-header">
    
            <a href="/ui/home.html"><div id="blogotron" class="navbar-brand">BLOGOTRON</div></a>
            
            </div>
        
            <ul id="nav-list" class="nav navbar-nav navbar-right">
                
               
            
                
            </ul>
       
    </div>
</nav>
    <div class="container-fluid">
        <div id="blogtxt">  
        
        <center><h2><b>${heading}</b></h2></center>
        <center><h6>${time.toDateString()}</h6></center>
        <br>
        <center>
    <img src='${image}'>
    <br>
    <br>
    <div>${content}</div>
    <br>
    
    </div>
    <br><br>
<h3><b>Comments</b></h3>
<div id="commentpost" class="col-md-10">
<center><img src="/ui/ajax-loader.gif">Loading comments....</center>
</div>  
<textarea id="content" class="form-control col-md-10" rows="5" placeholder="Type comment here"></textarea>
        <button id="submitbtn" class="btn btn-primary">SUBMIT</button>
  
</div>


<script src="/ui/jquery-2.2.3.min.js"></script>
  <script src="/ui/bootstrap.min.js"></script>
  <script src="/ui/main.js"></script>
  <script src="/ui/article.js"></script>
</body>
</html>
    
     ` ; 
     return htmlTemplate;   
    
}


app.get('/articles/:articleName',function(req,res){
    
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


app.post('/submit-comment/:articleName', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from article where title = $1', [req.params.articleName], function (err, result) {
           
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comments (article_id, user_id,comment,time) VALUES ($1, $2, $3,now())",
                        [articleId, req.session.auth.userId,req.body.comment],
                        function (err, result) {
                            if (err) {
                                res.status(500).send('err.toString()');
                            } else {
                                res.status(200).send('Comment inserted!');
                            }
                        });
               
           
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});


app.get('/get-comments/:articleName', function (req, res) {
  
   pool.query('SELECT comments.*, "user".username FROM article, comments, "user" WHERE article.title = $1 AND article.id = comments.article_id AND comments.user_id = "user".id', [req.params.articleName], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});





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
    
    pool.query('INSERT INTO "user" (username,password,email) VALUES($1,$2,$3) ',[username,dbString,email],function(err,result)
    {
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

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/logout',function(req,res)
{
    delete req.session.auth;
    res.send('<h1>Logged out</h1><br>click <a href="/">here </a> to return to homepage');
   
});



app.get('/get-articles', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM article ORDER BY date DESC', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});





















