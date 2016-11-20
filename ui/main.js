 var currentArticleTitle = window.location.pathname.split('/')[2];

 
 
 
 function loggedinUser()
{
    
    var usertxt=document.getElementById('nav-list');
    console.log('in func');
   // console.log(user);
     var request=new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                
                console.log("yes");
               console.log('in func');
                var user=request.responseText;
                
              usertxt.innerHTML=` <li id="usertxt" class="dropdown">
                <div class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><br class="hidden-xs">${user}<span class="caret"></span></div>
                
                
                
                
                <ul class="dropdown-menu">

                    <li><a href="/ui/profile.html">HOME</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="#">ABOUT</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a id="logout" href="/logout">SIGN OUT</a></li>
            
            
                </ul>
            </li>`;
            
            }
              else
              console.log("nope");
              
            
        }
        
    };
request.open('GET','http://varunotelli.imad.hasura-app.io/check-login');
request.send(null);
  
   console.log("loaded");
 
    
}


loggedinUser();

var submit=document.getElementById('submit');
submit.onclick=function()
{
    console.log('in article');
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                alert("Comment posted Succesfully");
                //window.location.href="http://varunotelli.imad.hasura-app.io";
            
            }
            else
            alert('problem');
        }
    };
    var comment=document.getElementById('content').value;
    request.open('POST','http://varunotelli.imad.hasura-app.io/submit-comment/'+currentArticleTitle,true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({comment:content}));
};


var signup=document.getElementById('signupbtn');
signup.onclick=function()
{
    console.log('in func');
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                alert("User created Successfully! Login to continue!");
                window.location.href="http://varunotelli.imad.hasura-app.io";
            
            }
            else
            alert('problem');
        }
    };



var username=document.getElementById('usr').value;
console.log(username);
var password=document.getElementById('pwd').value;
console.log(password);
var email=document.getElementById('email').value;
console.log(email);
request.open('POST','http://varunotelli.imad.hasura-app.io/signup',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username,password:password,email:email}));


};

var signin=document.getElementById('signinbtn');
signin.onclick=function()
{
    console.log('in func');
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            window.location.href='http://varunotelli.imad.hasura-app.io/ui/profile.html';
            else
            alert('problem');
        }
    };



var username=document.getElementById('signin-usr').value;
console.log(username);
var password=document.getElementById('signin-pwd').value;
console.log(password);

request.open('POST','http://varunotelli.imad.hasura-app.io/signin',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username,password:password,email:email}));


};







//loadCommentForm();




var logout=document.getElementById('logout');
logout.onclick=function()
{
     var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            res.send("<h1>LOGGED OUT</h1><br>click<a href='http://varunotelli.imad.hasura-app.io/>here </a> to login");
            else
            alert('problem');
        }
        
    };
request.open('GET','http://varunotelli.imad.hasura-app.io/logout');
request.send(null);
};

