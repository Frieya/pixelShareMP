$(document).ready(function () {
    var post;

    $('#continueDelete').click(function () { 
        $('#promptLayer').css('display', "none");
        post.closest('.posts').remove();
    });
    
    $('#cancelDelete').click(function () { 
        $('#promptLayer').css('display', "none");
     });

    $('.optionButton').click( function () {
        post = $(this);
        $('#promptLayer').css('display', "flex");
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
});