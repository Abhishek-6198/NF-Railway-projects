document.getElementById("pass").addEventListener("keyup", function(event) {
    if (event.getModifierState("CapsLock")) {
      alert("Caps lock is ON!!")
    } 
});

document.getElementById("login").addEventListener("click",function(event){
  event.preventDefault();
  var username = document.getElementById("id").value;
  var password = document.getElementById("pass").value;
  if(username!="" && password!=""){
    $.ajax({
      url: 'backend.php',
      type: 'POST',
      data: { "input": "sign in",
              "username":  username,
              "password": password},
      success: function(response) { 
        if(response=="Meter reader inspector" || response=="Senior meter reader" || response=="Admin" || response=="Meter reader"){
          sessionStorage.setItem("type",response);
          sessionStorage.setItem("name",username); 
          window.open("http://localhost//Electric%20billing%20system/Homepage/index.html", "_self");
        }
        else{
          alert("You are not allowed access into the package. Try contacting the admin.");
          document.getElementById("id").value="";
          document.getElementById("pass").value="";
        }
      },
      complete: function() {}
    });
  }
  else{
    alert("Please fill in the credentials");
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