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
  if(document.getElementById("register").value === "Send OTP"){
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
                              $("#patient_info").html(response);
                              $( function() {
                                $( "#patient_info" ).dialog({
                                      autoOpen: false,
                                      show: {
                                        effect: "Bounce",
                                        duration: 1000
                                      },
                                      hide: {
                                          effect: "Fade",
                                          duration: 1000
                                      }
                                  });
                        
                            
                                  $( "#patient_info" ).dialog( "open" );
                              
                               });
                              },
                              complete: function(){
                              //location.href="registration.html";  
                              }
                        });
                      }
                      else
                        location.reload();
                      }   
                  }
          });        
        }
    }
    else{
      if(document.getElementById("uname").value.length==0 || document.getElementById("pass").value.length==0)
        alert("Please insert your credentials");
      else{
        var input={"uname" : document.getElementById("uname").value,
                  "pass" : document.getElementById("pass").value,
                  "action" : "Staff login"};

        $.ajax({
          url : 'server.php',
          type : 'POST',
          data:input,
          success : function(response){
            $(".container").html(response);
          },
          complete: function(){
            //location.href="registration.html";
          }
        });
        //location.href="registration.html";
      }
    }
}

function change_status(){

    var x = document.getElementById("phone");
    var y = document.getElementById("register");
    if(document.getElementById("yes").checked==true){
      document.getElementById("patient_status").innerHTML="Patient login";
      document.getElementById("username").style.display="none";
      document.getElementById("password").style.display="none";
      y.value="Send OTP";
      x.style.display="block";
      y.style.display="block";
    }
    else{
      document.getElementById("uname").value="";
      document.getElementById("pass").value="";
      document.getElementById("patient_status").innerHTML="Staff login";
      y.value="Login";
      x.style.display="none";
      y.style.display="block";
      document.getElementById("username").style.display="block";
      document.getElementById("password").style.display="block";
      
    }
  
}

function expand(obj){
  if (!obj.savesize) obj.savesize = obj.size;
      obj.size = Math.min(100, Math.max(obj.savesize, obj.value.length)); 
}

function change_operation(){
  document.getElementById("box").style.height="20em";
  if(document.getElementById("insert").checked==true){
    document.getElementById("id").style.display="block";
    document.getElementById("name").style.display="block";
    document.getElementById("age").style.display="block";
    document.getElementById("number").style.display="block";
    document.getElementById("advice").style.display="block";
    document.getElementById("medicine").style.display="block";
    document.getElementById("register").value="Insert";
    document.getElementById("register").style.display="block";
    document.getElementById("box").style.height="40em";
  }
  else if(document.getElementById("update").checked==true){
    document.getElementById("id").style.display="block";
    document.getElementById("name").style.display="block";
    document.getElementById("age").style.display="block";
    document.getElementById("number").style.display="block";
    document.getElementById("advice").style.display="block";
    document.getElementById("medicine").style.display="block";
    document.getElementById("register").value="Update";
    document.getElementById("register").style.display="block";
    document.getElementById("box").style.height="40em";
  }
  else{
    document.getElementById("id").style.display="block";
    document.getElementById("name").style.display="none";
    document.getElementById("age").style.display="none";
    document.getElementById("number").style.display="none";
    document.getElementById("advice").style.display="none";
    document.getElementById("medicine").style.display="none";
    document.getElementById("register").value="Delete";
    document.getElementById("register").style.display="block";
    document.getElementById("box").style.height="20em";
  }
}

function db_ops(){

  if(document.getElementById("register").value=="Delete"){
    
    var input={"id" : document.getElementById("patient_id").value,
                "op" : "Delete"};

    $.ajax({
          url : 'db_ops.php',
          type : 'POST',
          data : input,
          success : function(response) {
              //$(".container").html(response);
              alert(response);
          },
          complete: function(){
            //alert(response);
          }
  
    });
  }
  else{
    var input={"id" : document.getElementById("patient_id").value,
                "name" : document.getElementById("inp_name").value,
                "age" : document.getElementById("inp_age").value,
                "number" : document.getElementById("inp_number").value,
                "advice" : document.getElementById("inp_adv").value,
                "medicine" : document.getElementById("meds").value,
                "op" : document.getElementById("register").value};

    $.ajax({
          url : 'db_ops.php',
          type : 'POST',
          data : input,
          success : function(response) {
            alert(response);
          },
          complete: function(){
            //alert(response);
          }

    });
  }
}