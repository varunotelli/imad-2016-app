var signup=document.getElementById('signupbtn');
signup.onclick=function()
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






/*var submit=document.getElementById('submit');
signup.onclick=function()
{
    //console.log('in func');
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



var title=document.getElementById('title').value;
console.log(title);
var content=document.getElementById('content').value;
console.log(content);
//var email=document.getElementById('email').value;
//console.log(email);
request.open('POST','http://varunotelli.imad.hasura-app.io/create-blog',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({title:title,content:content}));


};
*/


var logout=document.getElementById('logout');
logout.onclick=function()
{
     var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            window.location.href='http://varunotelli.imad.hasura-app.io/';
            else
            alert('problem');
        }
        
    };
request.open('GET','http://varunotelli.imad.hasura-app.io/logout');
request.send(null);
};

function loggedinUser()
{
 /*   
    var usertxt=document.getElementById('blogotron');
    console.log('in func');
   // console.log(user);
     var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                
                console.log("yes");
               console.log('in func');
                var user=request.responseText;
                alert(user);
              usertxt.innerHTML=` <li id="usertxt" class="dropdown">
                <div class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><br class="hidden-xs">${user}<span class="caret"></span></div>
                <ul class="dropdown-menu">

                    <li><a href="/ui/profile.html">PROFILE</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="#">ACCOUNT</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a id="logout" href="/logout">SIGN OUT</a></li>
            
            
                </ul>
            </li>`;
            
            }
              else
              console.log("nope");
              
            
        }
        
    
request.open('GET','http://varunotelli.imad.hasura-app.io/check-login');
request.send(null);
  */
   
    
}
 console.log("loaded");

loggedinUser();