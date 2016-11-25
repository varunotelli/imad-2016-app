


 
 function loggedinUser()
{
    
    var usertxt=document.getElementById('nav-list');
    
   
     var request=new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                
               
                var user=request.responseText;
                //alert(user);
                console.log(user);
              usertxt.innerHTML=` <li id="usertxt" class="dropdown">
                <div class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><br class="hidden-xs">${user}<span class="caret"></span></div>
                
                
                
                
                <ul class="dropdown-menu">

                    <li><a href="/ui/home.html">HOME</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="/ui/profile.html">ABOUT</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a id="logout" href="/logout">SIGN OUT</a></li>
            
            
                </ul>
            </li>`;
            
            }
             
            else
            {
                usertxt.innerHTML=`<li><div id="homelink"><a href="/ui/home.html">Home</a></div></li>
                <li><div id="profiletxt"><a href="/ui/profile.html">Profile</a></div></li>`;
            }
              
            
        }
        
    };
request.open('GET','http://varunotelli.imad.hasura-app.io/check-login');
request.send(null);
  
   
    
}


loggedinUser();





var signup=document.getElementById('signupbtn');
signup.onclick=function()
{
    
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
            alert('Could not create user!');
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
   
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            window.location.href='http://varunotelli.imad.hasura-app.io/ui/home.html';
            else
            alert('problem');
        }
    };



var username=document.getElementById('signin-usr').value;

var password=document.getElementById('signin-pwd').value;


request.open('POST','http://varunotelli.imad.hasura-app.io/signin',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username,password:password,email:email}));


};





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
            alert('Could not logout');
        }
        
    };
request.open('GET','http://varunotelli.imad.hasura-app.io/logout');
request.send(null);
};

