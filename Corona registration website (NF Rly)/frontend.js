function toggle() {
   var x = document.getElementById("myDIV");
   var z = document.getElementById("disclaimer_points");
   /*var y = document.getElementById("patient_status");*/
   var y = document.getElementsByClassName("registration_content");
   if (x.style.display === "none") {
     x.style.display = "block";
     y[0].style.top="30em";
     z.innerHTML = "Disclaimer"
   } else {
     x.style.display = "none";
     y[0].style.top="10em";
     z.innerHTML = "Disclaimer (Click to read)"
   }
 }

function toggle_contact(){
$( function() {
  $( "#contact_info" ).dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 1000
    },
    hide: {
      effect: "explode",
      duration: 1000
    }
  });

  $( "#contact" ).on( "click", function() {
    $( "#contact_info" ).dialog( "open" );
  });
} );
}


 function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function check_number(){
  const alphabets=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  var flag = true;
  var str=document.getElementById("tel").value.toString();
  for(var i=0; i<alphabets.length; i++){
    if(str.includes(alphabets[i])){
      flag=false;
      break;
    }
  }

  if((str.length!=10) || (!flag))
    alert("Please enter a valid number");
  else{
    var number = $("#tel").val();
    var input={"mobile_number" : number,
               "action" : "get_otp"};
    
    $.ajax({
            url : 'server.php',
            type : 'POST',
            data : input,
            success : function(response) {
              $(".container").html(response);
            },
            complete: function(){         
              //$(".container").html("complete");
              document.getElementById("register").value="Verify OTP";
              var p = document.getElementById("phone");
              p.replaceChild(document.createTextNode("Enter the OTP received : "), p.firstChild);
              document.getElementById("tel").value="";
              document.getElementById("register").onclick=function(){
                if(document.getElementById("tel").value.length!=0){
                    input={"mobile_number" : number,
                            "otp" : document.getElementById("tel").value,
                            "action" : "verify_otp"};
                  $.ajax({
                      url : 'server.php',
                      type : 'POST',
                      data : input,
                      success : function(response){
                          $(".container").html(response);
                      },
                      complete: function(){
                          //$(".container").html(response);
                          window.open("registration.html", '_blank');
                      }
                  })
                }
                else
                  location.reload();
              }
            }
          });        
  }
}

function register(){

}