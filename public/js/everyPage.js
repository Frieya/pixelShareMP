$(document).ready(function () {
    var input = document.getElementById("searchInput");
      // Execute a function when the user presses a key on the keyboard
      input.addEventListener("keypress", function(event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
          url = "/search/"+$(input).val()
          window.location.href = url
      }
      });
    
    $('#submit').click( function (e) {
            var post_id = $("#post_id").val();
            var comment = $("#comment").val();
            var jsonTrans = {
                post_id: post_id,
                comment: comment,
                date: new Date().toLocaleDateString()
            }
            
            if(comment!=''){
                $.get("/api/addComment",jsonTrans, function(data){
                    if (data!=null)
                        $('#commentBox').append(data);
                });
            }
            $("#comment").val("");
          
        
    });
    

    $('#createNewButton').click(function () { 
        window.location.href = '/create';
    });

   $('#fileUpload').change(function (event) { 
        $('#flup').remove();
        var output = document.getElementById('imgUpload');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
        }
        let img = document.getElementById("imgUpload")
        img.removeAttribute("hidden")
    
   });

   $('.indivComment').on('click', '#deleteComment', function () {
    var divDelete = $(this).parents(".indivComment");
    var post_id = $(this).siblings("#commentpost_id").get(0);
    url = "/comment/"+$(post_id).text()+"/delete"
  
    $.get(url, 
        function (success) {
           if (success==true)
            $(divDelete).remove();
        }
    );
    });


    $('#continueDelete').click(function () { 
        var post_id = $("#post_id").val();
        url = "/post/"+post_id+"/delete"
        
        $.get(url,
            function (success) {
                window.location.href = '/home'
            });    
        $('#promptLayer').css('display', "none");   
    });
    
    $('#cancelDelete').click(function () { 
        $('#promptLayer').css('display', "none");
     });

    $('#deleteButton').click( function () {
        $('#promptLayer').css('display', "flex");
    });

    document.forms['changePassForm'].addEventListener('submit', async(event) => {
        event.preventDefault();
        
        var response = await fetch(event.target.action, {
            method: 'POST',
            body: new URLSearchParams(new FormData(event.target)) // event.target is the form
        })
        var data =  await response.json()
        alert(data.message)
        $("#old_password").val("");
        $("#new_password").val("");
        $("#conf_password").val("");
    });
});