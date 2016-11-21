 var currentArticleTitle = window.location.pathname.split('/')[2];


var submit=document.getElementById('submitbtn');
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
                    content+=`<div id="userbox" class="commentbox ">${commentsData[i].username} - ${timestamp.toLocaleTimeString()} on ${timestamp.toLocaleDateString()} </div>
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

loadComments();