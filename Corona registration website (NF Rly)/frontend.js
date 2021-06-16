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
   var x = document.getElementById("contact_info");
   document.getElementById("contact").onclick = function(){
     x.show();
   }
   document.getElementById("hide").onclick = function(){
     x.close();
   }
 }

 function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
