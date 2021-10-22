var n=sessionStorage.getItem("name");
var t=sessionStorage.getItem("type");
if (n==null)
    window.open("http://localhost//Electric%20billing%20system/Login%20screen/index.html","_self");
else{
    document.getElementById("name").innerText=n;
    var myList = document.getElementById('nav');
    if(t=="user1"){ //meter reader inspector
        document.getElementsByClassName("fas fa-user-shield")[0].style.display="block";
        document.getElementById("imp").removeAttribute('href');
        document.getElementById("imp").style.cursor="not-allowed";
        document.getElementById("imp").style.color="red";
        document.getElementById("r").removeAttribute('href');
        document.getElementById("r").style.cursor="not-allowed";
        document.getElementById("r").style.color="red";
        document.getElementById("slab").removeAttribute('href');
        document.getElementById("slab").style.cursor="not-allowed";
        document.getElementById("slab").style.color="red";
        document.getElementById("occ").removeAttribute('href');
        document.getElementById("occ").style.cursor="not-allowed";
        document.getElementById("occ").style.color="red";
        document.getElementById("mc").removeAttribute('href');
        document.getElementById("mc").style.cursor="not-allowed";
        document.getElementById("mc").style.color="red";
        
    }
    else if(t=="user2"){ //senior meter reader
        document.getElementsByClassName("fas fa-user-cog")[0].style.display="block";
        document.getElementById("imp").removeAttribute('href');
        document.getElementById("imp").style.cursor="not-allowed";
        document.getElementById("imp").style.color="red";
        document.getElementById("mce").removeAttribute('href');
        document.getElementById("mce").style.cursor="not-allowed";
        document.getElementById("mce").style.color="red";
        document.getElementById("reports").removeAttribute('href');
        document.getElementById("reports").style.cursor="not-allowed";
        document.getElementById("reports").style.color="red";
    }
    else if(t=="user3"){ //meter reader
        document.getElementsByClassName("fas fa-users-cog")[0].style.display="block";
        document.getElementById("imp").removeAttribute('href');
        document.getElementById("imp").style.cursor="not-allowed";
        document.getElementById("imp").style.color="red";
        document.getElementById("r").removeAttribute('href');
        document.getElementById("r").style.cursor="not-allowed";
        document.getElementById("r").style.color="red";
        document.getElementById("occ").removeAttribute('href');
        document.getElementById("occ").style.cursor="not-allowed";
        document.getElementById("occ").style.color="red";
        document.getElementById("mce").removeAttribute('href');
        document.getElementById("mce").style.cursor="not-allowed";
        document.getElementById("mce").style.color="red";
        document.getElementById("reports").removeAttribute('href');
        document.getElementById("reports").style.cursor="not-allowed";
        document.getElementById("reports").style.color="red";
    }
    else{
        document.getElementsByClassName("fas fa-user-lock")[0].style.display="block";
    }
    
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

    document.getElementById("name").addEventListener("click",function(){
        if(document.getElementsByClassName("dropdown-content")[0].style.display!="block")
            document.getElementsByClassName("dropdown-content")[0].style.display="block";
        else
            document.getElementsByClassName("dropdown-content")[0].style.display="none";
    })
    
    document.getElementById("signout").addEventListener("click",function(){
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("type");
        window.open("http://localhost//Electric%20billing%20system/Login%20screen/index.html","_self");
    })
}
