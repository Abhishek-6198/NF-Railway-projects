document.getElementById("register").addEventListener("mouseover",function(){
    document.getElementById("r").style.fontWeight="500"
    setTimeout(function(){
        document.getElementById("r").style.fontWeight="200";
    },500)
})

document.getElementById("occupancy").addEventListener("mouseover",function(){
    document.getElementById("occ").style.fontWeight="500"
    setTimeout(function(){
        document.getElementById("occ").style.fontWeight="200";
    },500)
})

document.getElementById("navbar").addEventListener("click",function(){
    if(document.getElementById("nav").style.display!="none")
        document.getElementById("nav").style.display="none";
    else
        document.getElementById("nav").style.display="block";
})