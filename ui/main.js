var signup=document.getElementById('signupbtn');
signup.onclick=function()
{
    //console.log('in func');
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            window.location.href='http://varunotelli.imad.hasura-app.io/ui/profile.html'
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






var submit=document.getElementById('submit');
signup.onclick=function()
{
    //console.log('in func');
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            window.location.href='http://varunotelli.imad.hasura-app.io/ui/profile.html'
            else
            alert('problem');
        }
    };



var title=document.getElementById('titletxt').value;
console.log(title);
var content=document.getElementById('content').value;
console.log(content);
//var email=document.getElementById('email').value;
//console.log(email);
request.open('POST','http://varunotelli.imad.hasura-app.io/create-blog',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({title:title,content:content}));


};