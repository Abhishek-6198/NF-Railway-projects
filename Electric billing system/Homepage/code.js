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

function toggle(){
    if(document.getElementById("nav").offsetWidth == 0 && document.getElementById("nav").offsetHeight == 0)
        document.getElementById("nav").style.display="block";
    else
        document.getElementById("nav").style.display="none";
    console.log(document.getElementById("nav").style.display);
}