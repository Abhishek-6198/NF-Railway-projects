var n=sessionStorage.getItem("name");
var t=sessionStorage.getItem("type");
if (n==null)
    window.open("http://localhost//Electric%20billing%20system/Login%20screen/index.html","_self");
else{
    var flag=false;
    var flag1=false;
    document.getElementById("name").innerText=n;
    if(t=="Admin")
        document.getElementById("type").innerText="(Admin)";
    else if(t=="Meter reader inspector")
        document.getElementById("type").innerText="(MR Inspector)";
    else if(t=="Senior meter reader")
        document.getElementById("type").innerText="(SM Reader)";
    else
        document.getElementById("type").innerText="(Meter reader)";
    var myList = document.getElementById('nav');
    if(t=="Meter reader inspector"){ //meter reader inspector
        document.getElementsByClassName("fas fa-user-shield")[0].style.display="block";
        const imp = document.querySelector('#imp'); 
        const mgmt = document.querySelector('#mgmt'); 
        const slab = document.querySelector('#slab'); 
        const reg = document.querySelector('#r'); 
        imp.parentNode.remove();
        mgmt.parentNode.remove();
        slab.parentNode.remove();
        reg.parentNode.remove();
        myList.style.height="23em";
        document.getElementById("history").addEventListener("click",function(){
            if(!flag){
                var x = document.createElement("LI");
                var t = document.createTextNode("Search by emp no/name");
                x.id="emp";
                x.appendChild(t);
                x.style.textAlign="center";
                x.style.cursor="pointer";
                x.style.paddingTop="25px"
                x.addEventListener("mouseover",func);
                x.addEventListener("mouseout",func1);
    
                var y = document.createElement("LI");
                var u = document.createTextNode("Search by qtr no");
                y.id="qtr";
                y.appendChild(u);
                y.style.textAlign="center";
                y.style.cursor="pointer";
                y.style.paddingTop="25px";
                y.addEventListener("mouseover",func);
                y.addEventListener("mouseout",func1);
    
    
                myList.insertBefore(x,myList.childNodes[12]);
                myList.insertBefore(y,myList.childNodes[13]);
                if(flag1)
                    myList.style.height="47em";
                else
                    myList.style.height="35em";
                //myList.appendChild(y);
    
                if(window.innerWidth>="1281"){
                    x.style.fontSize="medium";
                    y.style.fontSize="medium";
                }
                else{
                    x.style.fontSize="small";
                    y.style.fontSize="small";
                }
    
                document.getElementById("emp").addEventListener("click",function(){
                    sessionStorage.setItem("search","emp");
                    window.open("http://localhost//Electric%20billing%20system/Quarter%20history/index.html","_self");
                })
    
                document.getElementById("qtr").addEventListener("click",function(){
                    sessionStorage.setItem("search","qtr");
                    window.open("http://localhost//Electric%20billing%20system/Quarter%20history/index.html","_self");
                })
    
    
                flag=true;
            }
            else{
                myList.removeChild(document.getElementById("emp"));
                myList.removeChild(document.getElementById("qtr"));
                if(flag1)
                    myList.style.height="34em";
                else
                    myList.style.height="23em";
                flag=false;
            }
        })

        document.getElementById("reports").addEventListener("click",function(){
            if(!flag1){
                var x = document.createElement("LI");
                var t = document.createTextNode("Generate by colony name/bill date");
                x.id="cname_bdate";
                x.appendChild(t);
                x.style.textAlign="center";
                x.style.cursor="pointer";
                x.style.paddingTop="25px"
                x.addEventListener("mouseover",func);
                x.addEventListener("mouseout",func1);
    
                var y = document.createElement("LI");
                var u = document.createTextNode("Generate by emp no/emp name");
                y.id="empno_name";
                y.appendChild(u);
                y.style.textAlign="center";
                y.style.cursor="pointer";
                y.style.paddingTop="25px";
                y.addEventListener("mouseover",func);
                y.addEventListener("mouseout",func1);
    
                if(flag){
                    myList.style.height="47em";
                    myList.insertBefore(x,myList.childNodes[16]);
                    myList.insertBefore(y,myList.childNodes[17]);
                }
                else{
                    myList.style.height="35em";
                    myList.insertBefore(x,myList.childNodes[14]);
                    myList.insertBefore(y,myList.childNodes[15]);
                }
                //myList.appendChild(y);
    
                if(window.innerWidth>="1281"){
                    x.style.fontSize="medium";
                    y.style.fontSize="medium";
                }
                else{
                    x.style.fontSize="small";
                    y.style.fontSize="small";
                }
    
                document.getElementById("cname_bdate").addEventListener("click",function(){
                    sessionStorage.setItem("search","cname_bdate");
                    window.open("http://localhost//Electric%20billing%20system/Meter%20draft%20reports/index.html","_self");
                })
    
                document.getElementById("empno_name").addEventListener("click",function(){
                    sessionStorage.setItem("search","empno_name");
                    window.open("http://localhost//Electric%20billing%20system/Meter%20draft%20reports/index.html","_self");
                })
    
    
                flag1=true;
            }
            else{
                myList.removeChild(document.getElementById("cname_bdate"));
                myList.removeChild(document.getElementById("empno_name"));
                if(flag)
                    myList.style.height="34em";
                else
                    myList.style.height="23em";
                flag1=false;
            }
        })
        
    }
    else if(t=="Senior meter reader"){ //senior meter reader
        document.getElementsByClassName("fas fa-user-cog")[0].style.display="block";
        const imp = document.querySelector('#imp'); 
        const mgmt = document.querySelector('#mgmt'); 
        const slab = document.querySelector('#slab'); 
        const reg = document.querySelector('#r');
        const occ = document.querySelector('#occ');
        imp.parentNode.remove();
        mgmt.parentNode.remove();
        slab.parentNode.remove();
        reg.parentNode.remove();
        occ.parentNode.remove();
        myList.style.height="19em";
        document.getElementById("history").addEventListener("click",function(){
            if(!flag){
                var x = document.createElement("LI");
                var t = document.createTextNode("Search by emp no/name");
                x.id="emp";
                x.appendChild(t);
                x.style.textAlign="center";
                x.style.cursor="pointer";
                x.style.paddingTop="25px"
                x.addEventListener("mouseover",func);
                x.addEventListener("mouseout",func1);
    
                var y = document.createElement("LI");
                var u = document.createTextNode("Search by qtr no");
                y.id="qtr";
                y.appendChild(u);
                y.style.textAlign="center";
                y.style.cursor="pointer";
                y.style.paddingTop="25px";
                y.addEventListener("mouseover",func);
                y.addEventListener("mouseout",func1);
    
    
                myList.insertBefore(x,myList.childNodes[12]);
                myList.insertBefore(y,myList.childNodes[13]);
                if(flag1)
                    myList.style.height="43em";
                else
                    myList.style.height="31em";
                //myList.appendChild(y);
    
                if(window.innerWidth>="1281"){
                    x.style.fontSize="medium";
                    y.style.fontSize="medium";
                }
                else{
                    x.style.fontSize="small";
                    y.style.fontSize="small";
                }
    
                document.getElementById("emp").addEventListener("click",function(){
                    sessionStorage.setItem("search","emp");
                    window.open("http://localhost//Electric%20billing%20system/Quarter%20history/index.html","_self");
                })
    
                document.getElementById("qtr").addEventListener("click",function(){
                    sessionStorage.setItem("search","qtr");
                    window.open("http://localhost//Electric%20billing%20system/Quarter%20history/index.html","_self");
                })
    
    
                flag=true;
            }
            else{
                myList.removeChild(document.getElementById("emp"));
                myList.removeChild(document.getElementById("qtr"));
                if(flag1)
                    myList.style.height="30em";
                else
                    myList.style.height="19em";
                flag=false;
            }
        })

        document.getElementById("reports").addEventListener("click",function(){
            if(!flag1){
                var x = document.createElement("LI");
                var t = document.createTextNode("Generate by colony name/bill date");
                x.id="cname_bdate";
                x.appendChild(t);
                x.style.textAlign="center";
                x.style.cursor="pointer";
                x.style.paddingTop="25px"
                x.addEventListener("mouseover",func);
                x.addEventListener("mouseout",func1);
    
                var y = document.createElement("LI");
                var u = document.createTextNode("Generate by emp no/emp name");
                y.id="empno_name";
                y.appendChild(u);
                y.style.textAlign="center";
                y.style.cursor="pointer";
                y.style.paddingTop="25px";
                y.addEventListener("mouseover",func);
                y.addEventListener("mouseout",func1);
    
                if(flag){
                    myList.style.height="43em";
                    myList.insertBefore(x,myList.childNodes[16]);
                    myList.insertBefore(y,myList.childNodes[17]);
                }
                else{
                    myList.style.height="31em";
                    myList.insertBefore(x,myList.childNodes[14]);
                    myList.insertBefore(y,myList.childNodes[15]);
                }
                //myList.appendChild(y);
    
                if(window.innerWidth>="1281"){
                    x.style.fontSize="medium";
                    y.style.fontSize="medium";
                }
                else{
                    x.style.fontSize="small";
                    y.style.fontSize="small";
                }
    
                document.getElementById("cname_bdate").addEventListener("click",function(){
                    sessionStorage.setItem("search","cname_bdate");
                    window.open("http://localhost//Electric%20billing%20system/Meter%20draft%20reports/index.html","_self");
                })
    
                document.getElementById("empno_name").addEventListener("click",function(){
                    sessionStorage.setItem("search","empno_name");
                    window.open("http://localhost//Electric%20billing%20system/Meter%20draft%20reports/index.html","_self");
                })
    
    
                flag1=true;
            }
            else{
                myList.removeChild(document.getElementById("cname_bdate"));
                myList.removeChild(document.getElementById("empno_name"));
                if(flag)
                    myList.style.height="30em";
                else
                    myList.style.height="19em";
                flag1=false;
            }
        })
        
    }
    else if(t=="Meter reader"){ //meter reader
        document.getElementsByClassName("fas fa-users-cog")[0].style.display="block";
        const imp = document.querySelector('#imp'); 
        const mgmt = document.querySelector('#mgmt'); 
        const slab = document.querySelector('#slab'); 
        const reg = document.querySelector('#r');
        const occ = document.querySelector('#occ');
        const ent = document.querySelector('#mc');
        imp.parentNode.remove();
        mgmt.parentNode.remove();
        slab.parentNode.remove();
        reg.parentNode.remove();
        occ.parentNode.remove();
        ent.parentNode.remove();
        myList.style.height="14em";
        document.getElementById("history").addEventListener("click",function(){
            if(!flag){
                var x = document.createElement("LI");
                var t = document.createTextNode("Search by emp no/name");
                x.id="emp";
                x.appendChild(t);
                x.style.textAlign="center";
                x.style.cursor="pointer";
                x.style.paddingTop="25px"
                x.addEventListener("mouseover",func);
                x.addEventListener("mouseout",func1);
    
                var y = document.createElement("LI");
                var u = document.createTextNode("Search by qtr no");
                y.id="qtr";
                y.appendChild(u);
                y.style.textAlign="center";
                y.style.cursor="pointer";
                y.style.paddingTop="25px";
                y.addEventListener("mouseover",func);
                y.addEventListener("mouseout",func1);
    
    
                myList.insertBefore(x,myList.childNodes[10]);
                myList.insertBefore(y,myList.childNodes[11]);
                if(flag1)
                    myList.style.height="38em";
                else
                    myList.style.height="26em";
                //myList.appendChild(y);
    
                if(window.innerWidth>="1281"){
                    x.style.fontSize="medium";
                    y.style.fontSize="medium";
                }
                else{
                    x.style.fontSize="small";
                    y.style.fontSize="small";
                }
    
                document.getElementById("emp").addEventListener("click",function(){
                    sessionStorage.setItem("search","emp");
                    window.open("http://localhost//Electric%20billing%20system/Quarter%20history/index.html","_self");
                })
    
                document.getElementById("qtr").addEventListener("click",function(){
                    sessionStorage.setItem("search","qtr");
                    window.open("http://localhost//Electric%20billing%20system/Quarter%20history/index.html","_self");
                })
    
    
                flag=true;
            }
            else{
                myList.removeChild(document.getElementById("emp"));
                myList.removeChild(document.getElementById("qtr"));
                if(flag1)
                    myList.style.height="25em";
                else
                    myList.style.height="14em";
                flag=false;
            }
        })

        document.getElementById("reports").addEventListener("click",function(){
            if(!flag1){
                var x = document.createElement("LI");
                var t = document.createTextNode("Generate by colony name/bill date");
                x.id="cname_bdate";
                x.appendChild(t);
                x.style.textAlign="center";
                x.style.cursor="pointer";
                x.style.paddingTop="25px"
                x.addEventListener("mouseover",func);
                x.addEventListener("mouseout",func1);
    
                var y = document.createElement("LI");
                var u = document.createTextNode("Generate by emp no/emp name");
                y.id="empno_name";
                y.appendChild(u);
                y.style.textAlign="center";
                y.style.cursor="pointer";
                y.style.paddingTop="25px";
                y.addEventListener("mouseover",func);
                y.addEventListener("mouseout",func1);
    
                if(flag){
                    myList.style.height="38em";
                    myList.insertBefore(x,myList.childNodes[14]);
                    myList.insertBefore(y,myList.childNodes[15]);
                }
                else{
                    myList.style.height="26em";
                    myList.insertBefore(x,myList.childNodes[12]);
                    myList.insertBefore(y,myList.childNodes[13]);
                }
                //myList.appendChild(y);
    
                if(window.innerWidth>="1281"){
                    x.style.fontSize="medium";
                    y.style.fontSize="medium";
                }
                else{
                    x.style.fontSize="small";
                    y.style.fontSize="small";
                }
    
                document.getElementById("cname_bdate").addEventListener("click",function(){
                    sessionStorage.setItem("search","cname_bdate");
                    window.open("http://localhost//Electric%20billing%20system/Meter%20draft%20reports/index.html","_self");
                })
    
                document.getElementById("empno_name").addEventListener("click",function(){
                    sessionStorage.setItem("search","empno_name");
                    window.open("http://localhost//Electric%20billing%20system/Meter%20draft%20reports/index.html","_self");
                })
    
    
                flag1=true;
            }
            else{
                myList.removeChild(document.getElementById("cname_bdate"));
                myList.removeChild(document.getElementById("empno_name"));
                if(flag)
                    myList.style.height="25em";
                else
                    myList.style.height="14em";
                flag1=false;
            }
        })
        
    }
    else{
        document.getElementsByClassName("fas fa-user-lock")[0].style.display="block";
        document.getElementById("history").addEventListener("click",function(){
            if(!flag){
                var x = document.createElement("LI");
                var t = document.createTextNode("Search by emp no/name");
                x.id="emp";
                x.appendChild(t);
                x.style.textAlign="center";
                x.style.cursor="pointer";
                x.style.paddingTop="25px"
                x.addEventListener("mouseover",func);
                x.addEventListener("mouseout",func1);
    
                var y = document.createElement("LI");
                var u = document.createTextNode("Search by qtr no");
                y.id="qtr";
                y.appendChild(u);
                y.style.textAlign="center";
                y.style.cursor="pointer";
                y.style.paddingTop="25px";
                y.addEventListener("mouseover",func);
                y.addEventListener("mouseout",func1);
    
    
                myList.insertBefore(x,myList.childNodes[16]);
                myList.insertBefore(y,myList.childNodes[17]);
                if(flag1)
                    myList.style.height="66em";
                else
                    myList.style.height="54em";
                //myList.appendChild(y);
    
                if(window.innerWidth>="1281"){
                    x.style.fontSize="medium";
                    y.style.fontSize="medium";
                }
                else{
                    x.style.fontSize="small";
                    y.style.fontSize="small";
                }
    
                document.getElementById("emp").addEventListener("click",function(){
                    sessionStorage.setItem("search","emp");
                    window.open("http://localhost//Electric%20billing%20system/Quarter%20history/index.html","_self");
                })
    
                document.getElementById("qtr").addEventListener("click",function(){
                    sessionStorage.setItem("search","qtr");
                    window.open("http://localhost//Electric%20billing%20system/Quarter%20history/index.html","_self");
                })
    
    
                flag=true;
            }
            else{
                myList.removeChild(document.getElementById("emp"));
                myList.removeChild(document.getElementById("qtr"));
                if(flag1)
                    myList.style.height="53em";
                else
                    myList.style.height="42em";
                flag=false;
            }
        })

        document.getElementById("reports").addEventListener("click",function(){
            if(!flag1){
                var x = document.createElement("LI");
                var t = document.createTextNode("Generate by colony name/bill date");
                x.id="cname_bdate";
                x.appendChild(t);
                x.style.textAlign="center";
                x.style.cursor="pointer";
                x.style.paddingTop="25px"
                x.addEventListener("mouseover",func);
                x.addEventListener("mouseout",func1);
    
                var y = document.createElement("LI");
                var u = document.createTextNode("Generate by emp no/emp name");
                y.id="empno_name";
                y.appendChild(u);
                y.style.textAlign="center";
                y.style.cursor="pointer";
                y.style.paddingTop="25px";
                y.addEventListener("mouseover",func);
                y.addEventListener("mouseout",func1);
    
                if(flag){
                    myList.style.height="66em";
                    myList.insertBefore(x,myList.childNodes[20]);
                    myList.insertBefore(y,myList.childNodes[21]);
                }
                else{
                    myList.style.height="54em";
                    myList.insertBefore(x,myList.childNodes[18]);
                    myList.insertBefore(y,myList.childNodes[19]);
                }
                //myList.appendChild(y);
    
                if(window.innerWidth>="1281"){
                    x.style.fontSize="medium";
                    y.style.fontSize="medium";
                }
                else{
                    x.style.fontSize="small";
                    y.style.fontSize="small";
                }
    
                document.getElementById("cname_bdate").addEventListener("click",function(){
                    sessionStorage.setItem("search","cname_bdate");
                    window.open("http://localhost//Electric%20billing%20system/Meter%20draft%20reports/index.html","_self");
                })
    
                document.getElementById("empno_name").addEventListener("click",function(){
                    sessionStorage.setItem("search","empno_name");
                    window.open("http://localhost//Electric%20billing%20system/Meter%20draft%20reports/index.html","_self");
                })
    
    
                flag1=true;
            }
            else{
                myList.removeChild(document.getElementById("cname_bdate"));
                myList.removeChild(document.getElementById("empno_name"));
                if(flag)
                    myList.style.height="53em";
                else
                    myList.style.height="42em";
                flag1=false;
            }
        })
    }

    function toggle(){
        if(document.getElementById("nav").offsetWidth == 0 && document.getElementById("nav").offsetHeight == 0)
            document.getElementById("nav").style.display="block";
        else
            document.getElementById("nav").style.display="none";
        //console.log(document.getElementById("nav").style.display);
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

    

    function func(){
        this.style.color="white";
    }

    function func1(){
        this.style.color="black";
    }
}
