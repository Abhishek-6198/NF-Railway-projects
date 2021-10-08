document.getElementById("pass").addEventListener("keyup", function(event) {
    if (event.getModifierState("CapsLock")) {
      alert("Caps lock is ON!!")
    } 
});

document.getElementById("login").addEventListener("click",function(){
  var username = document.getElementById("id").value;
  var password = document.getElementById("pass").value;
  if(username!="" && password!=""){
    $.ajax({
      url: 'backend.php',
      type: 'POST',
      data: { "input": "sign in",
              "username":  username,
              "password": password,
              "type": document.getElementById("emptype").value},
      success: function(response) { 
        if(response==1 || response==true){
          sessionStorage.setItem("type",document.getElementById("emptype").value);
          sessionStorage.setItem("name",username);
          if(document.getElementById("emptype").value=="admin")
            window.open("http://localhost//Electric%20billing%20system/Login%20screen/user_create.html", "_self");
          else  
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