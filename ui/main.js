var signup=document.getElementById('signupbtn');
signup.onclick=function()
{
    console.log('in func');
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            alert('User created successfully');
            else
            alert('problem');
        }
    };



var username=document.getElementById('usr');
var password=document.getElementById('pwd');
var email=document.getElementById('email');
request.open('POST','http://varunotelli.imad.hasura-app.io/signup',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username,password:password,email:email}));

};