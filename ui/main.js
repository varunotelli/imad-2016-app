var signup=document.getElementById('signupbtn');
signup.onclick=function()
{
    //console.log('in func');
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
console.log(username);
var password=document.getElementById('pwd');
console.log(password);
var email=document.getElementById('email');
console.log(email);
request.open('POST','http://varunotelli.imad.hasura-app.io/signup',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username,password:password,email:email}));

};