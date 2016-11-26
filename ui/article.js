var currentArticleTitle = window.location.pathname.split('/')[2];
var articles = document.getElementById('articles');

loadArticles();
var articleTitle = document.getElementById('posts');

function loadCommentForm () {
    var commentFormHtml = `
        <textarea id="content" class="form-control col-md-10" rows="5" placeholder="Type comment here"></textarea>
        <button id="submitbtn" class="btn btn-primary onclick="return submit();">SUBMIT</button>
        `;
    document.getElementById('typecomment').innerHTML = commentFormHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('submitbtn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    document.getElementById('content').value = '';
                    loadComments();    
                } else {
                    alert('Error! Could not submit comment');
                }
                submit.value = 'Submit';
          }
        };
        
        // Make the request
        var comment = document.getElementById('content').value;
        request.open('POST', '/submit-comment/' + currentArticleTitle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));  
        submit.value = 'Submitting...';
        
    };
}
loadComments();
function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadCommentForm(this.responseText);
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

loadLogin();
function loadArticleTitle () {
       
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(request.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>";
                articleTitle.innerHTML = content;
            } else {
                articleTitle.innerHTML('Oops! Could not load all articles!');
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}
loadArticleTitle();
//var submit=document.getElementById('submitbtn');
var content=document.getElementById('content');

function submit()
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




//loadArticleTitle();


var comment=document.getElementById('content').value;
request.open('POST','http://varunotelli.imad.hasura-app.io/submit-comment/'+currentArticleTitle,true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({comment:comment}));


};



 function loadComments()
{
   
    var cmt=document.getElementById('commentpost');
    
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
                
                //alert(user);
                for(var i=commentsData.length-1;i>=0;i--)
                {
                    var timestamp= new Date(commentsData[i].time);
                   
                    content+=`<div id="userbox" class="commentbox "><b>${commentsData[i].username}</b>  <h6>at ${timestamp.toLocaleTimeString()} on ${timestamp.toLocaleDateString()}</h6> </div>
                    <div id="commbox" class="commentbox ">${commentsData[i].comment}</div>`;
                   
                    //console.log(commentsData[i].username);
                    
                }
                cmt.innerHTML=content;
            }
              
              
            
        }
        
    };
request.open('GET','http://varunotelli.imad.hasura-app.io/get-comments/'+currentArticleTitle,true);
request.send(null);
  
  
 
    
}

function loadArticles () {
        // Check if the user is already logged in
        
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(request.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a target="_blank" href="/articles/${articleData[i].title}"><div class="articlestuff"><div>  
        
        <center><h2><b>${articleData[i].heading}</b></h2></center>
        <center><h6>(${articleData[i].date.split('T')[0]})</h6></center>
        <br>
        <center>
    <img src='${articleData[i].image}'>
    <br>
    <br>
    <div id="artcontent">${articleData[i].content}</div>
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

