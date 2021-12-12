var flag=false;
document.getElementById("pass").addEventListener("keyup", function(event) {
    if (event.getModifierState("CapsLock")) {
      alert("Caps lock is ON!!")
    } 
});
document.addEventListener("keypress",function(event){
  if(event.code=="Enter")
    document.getElementById("login").click();
})
document.getElementById("login").addEventListener("click",function(event){
  event.preventDefault();
  var username = document.getElementById("id").value;
  var password = document.getElementById("pass").value;
  if(!flag){
    if(username!="" && password!=""){
      $.ajax({
        url: 'backend.php',
        type: 'POST',
        data: { "input": "sign in",
              "username":  username,
              "password": password},
        success: function(response) { 
          if(response.includes(";")){
            const arr=response.split(";");
            if(arr[0]=="Meter reader inspector" || arr[0]=="Senior meter reader" || arr[0]=="Admin" || arr[0]=="Meter reader"){
              sessionStorage.setItem("type",arr[0]);
              sessionStorage.setItem("name",arr[1].substring(0,7)); 
              window.open("http://localhost//Electric%20billing%20system/Homepage/index.html", "_self");
            }
          }
          else if(response=="Incorrect password"){
         
            if(confirm("Incorrect details. You can reset your password using the recovery code given to you. Press OK to reset your password.\n\nTHE RECOVERY CODE IS HIGHLY CONFIDENTIAL. Please don't disclose it to anyone")==true){
              //story starts here

              document.getElementById("pid").innerHTML="<b>Recovery code</b>";
              document.getElementById("ppass").style.display="none";
              document.getElementById("pass").style.display="none";
              $("#id").keydown(function(){
                this.type = "text";
              }).keyup(function(){
                this.type = "password";
                if($("#id").val().length == 8){
                  $.ajax({
                    url: 'backend.php',
                    type: 'POST',
                    data: { "input": "reset_eligibility",
                          "recovery":  $("#id").val(),
                          "user": username
                          },
                    success: function(response) {
                      flag=true;
                      if(!response.includes("Not")){
                        document.getElementById("login").disabled=false;
                        document.getElementById("login").innerText="Save";
                        document.getElementsByClassName("far fa-eye-slash")[0].style.display="block";
                        document.getElementById("id").disabled=true;
                        document.getElementById("ppass").style.display="block";
                        document.getElementById("pass").style.display="block";
                        document.getElementById("ppass").innerHTML="<b>New password</b>";

                        document.getElementById("login").addEventListener("click",function(){
                          if(flag){
                            $.ajax({
                              url: 'backend.php',
                              type: 'POST',
                              data: { "input": "update_password",
                                  "pass":  $("#pass").val(),
                                  "user": username,
                                  "recovery": $("#id").val()
                                },
                              success: function(response){
                                alert(response);
                                setTimeout(function(){
                                  location.reload();
                                },1000)
                              },
                              complete:function(){}
                            });
                          }
                        })
                      }else{
                        var c = confirm("The recovery code you gave as input was incorrect.\nPress OK to go back to the login page or press CANCEL to retry again.");
                        if(c==true)
                          location.reload();
                        else
                          document.getElementById("id").value="";
                      }
                    },
                    complete: function() {}
                  });
                }
              })
              document.getElementsByClassName("far fa-eye-slash")[0].style.display="none";
              document.getElementById("login").disabled=true;

            }
            document.getElementById("id").value="";
            document.getElementById("pass").value="";
          }
          else{
            alert(response)
          }
        },
        complete: function() {}
      });
    }
    else{
      alert("Please fill in the credentials");
    }
  }
})

document.getElementsByTagName("i")[1].addEventListener("click",function(){
  if(document.getElementsByTagName("i")[1].className!="far fa-eye"){
    document.getElementsByTagName("i")[1].className="far fa-eye";
    document.getElementById("pass").type="text";
  }
  else{
    document.getElementsByTagName("i")[1].className="far fa-eye-slash";
    document.getElementById("pass").type="password";
  }
})