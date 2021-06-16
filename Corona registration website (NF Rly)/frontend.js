function toggle() {
   var x = document.getElementById("myDIV");
   /*var y = document.getElementById("patient_status");*/
   var y = document.getElementsByClassName("registration_content");
   if (x.style.display === "none") {
     x.style.display = "block";
     y[0].style.top="30em";
   } else {
     x.style.display = "none";
     y[0].style.top="10em";
   }
 }

 function toggle_contact(){
   var x = document.getElementById("contact_info");
   if (x.style.display === "none") {
     x.style.display = "block";
   } else {
     x.style.display = "none";
   }

 }

 function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
