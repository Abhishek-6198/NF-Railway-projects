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
              document.getElementById("phone").innerHTML.value="Please enter the OTP received : ";
                document.getElementById("register").innerHTML.value="Verify";
                document.getElementById("tel").placeholder="OTP";
                document.getElementById("register").addEventListener("click",function(){
                  $(".error").html("").hide();
	                $(".success").html("").hide();
	                var otp = $("#tel").val();
	                var user_input = {
		                                  "otp" : otp,
		                                  "action" : "verify_otp"
	                                  };
	                if (otp.length == 6 && otp != null) {
	                    $('#loading-image').show();
		                  $.ajax({
		                          url : 'server.php',
		                          type : 'POST',
		                          dataType : "json",
		                          data : user_input,
		                          success : function(response) {
                                $(".container").html(response);
		                          },
		                          complete: function(){
                                $(".container").html("You're all set!!");
                              },
		                          error : function() {
			                            alert("Please try again!");
		                          }
		                        });
	                } else {
		                  $(".err").html('You have entered wrong OTP.')
		                  $(".err").show();
	                }

                });
            },
            complete: function(){         
              $(".container").html(response);
            }
          });        
  }
}
