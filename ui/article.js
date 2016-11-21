 var currentArticleTitle = window.location.pathname.split('/')[2];
var articles = document.getElementById('articles');
console.log(articles);
loadArticles();

var submit=document.getElementById('submitbtn');
var content=document.getElementById('content');
console.log(submit);
submit.onclick=function()
{
    console.log('in art');
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                alert("Commment posted successfully");
               //window.location.href="http://varunotelli.imad.hasura-app.io";
               content.value='';
               loadComments();
            
            }
            else
            {alert('Login to post comment');
                window.location.href="http://varunotelli.imad.hasura-app.io/";
            }
        }
    };



var comment=document.getElementById('content').value;
request.open('POST','http://varunotelli.imad.hasura-app.io/submit-comment/'+currentArticleTitle,true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({comment:comment}));


};



 function loadComments()
{
    console.log(currentArticleTitle);
    var cmt=document.getElementById('commentpost');
    console.log('in comment');
   console.log(cmt);
     var request=new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                
                //console.log("yes");
               //console.log('in func');
               var content='';
                var commentsData=JSON.parse(request.responseText);
                console.log(commentsData);
                //alert(user);
                for(var i=commentsData.length-1;i>=0;i--)
                {
                    var timestamp= new Date(commentsData[i].time);
                    console.log(commentsData[i]);
                    content+=`<div id="userbox" class="commentbox "><b>${commentsData[i].username}</b>  <h6>at ${timestamp.toLocaleTimeString()} on ${timestamp.toLocaleDateString()}</h6> </div>
                    <div id="commbox" class="commentbox ">${commentsData[i].comment}</div>`;
                    console.log('in loop');
                    //console.log(commentsData[i].username);
                    console.log(content);
                }
                cmt.innerHTML=content;
            }
              else
              console.log("nope");
              
            
        }
        
    };
request.open('GET','http://varunotelli.imad.hasura-app.io/get-comments/'+currentArticleTitle,true);
request.send(null);
  
   console.log("loaded");
 
    
}

function loadArticles () {
        // Check if the user is already logged in
        console.log('in home');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(request.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}"><div class="articlestuff"><div id="blogtxt">  
        
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
    <br><br></div></a></li>`;
                }
                content += "</ul>";
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!');
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
    
}

loadComments();