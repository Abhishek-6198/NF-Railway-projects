const inp1=document.getElementsByClassName("form-control")[0];
const inp2=document.getElementsByClassName("form-control")[1];
document.addEventListener("keypress",function(event){
    if(event.code=="Enter" || event.code=="NumpadEnter"){
        document.getElementById("submit").click();
    }
})
document.getElementById("submit").addEventListener("click",function(){
    if((inp1.value=="") || (inp2.value=="")){
        alert("Empty fields will not be accepted")
    }
    else{
        if(inp1.value=="prime" && inp2.value=="prime@hq"){
            sessionStorage.setItem("user",inp1.value);
            sessionStorage.setItem("pass",inp2.value);
            window.open("/main_index.html","_self");
        }
        else
            alert("Incorrect credentials");
    }
})