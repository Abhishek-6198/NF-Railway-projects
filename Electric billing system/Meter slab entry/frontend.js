var flag=false;
var table=document.getElementById("slab_details");
var table1=document.getElementById("old_table");
var x=0;

//console.log(table1)
var n=sessionStorage.getItem("name");
if (n==null)
    window.open("http://localhost//Electric%20billing%20system/Login%20screen/index.html","_self");
    
setTimeout(function(){
    document.getElementById("add_info").style.display="none";
    document.getElementById("slab_info").style.display="none";
},5000);

$.ajax({
    url: 'server.php',
    type: 'POST',
    data:{
          "input": "fetch",    
    },
    success:function(response){
        var k=1;
        var count=0;
        if(response[0]=='['){
            document.getElementById("slab_info").style.display="block";
            document.getElementById("old").innerText="Old slab entries:";
            if(table1.rows.length!=1){
                var row = table1.insertRow(0);
                var cell = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                var cell3 = row.insertCell(3);
                var cell4 = row.insertCell(4);
                var cell5 = row.insertCell(5);
                var cell6 = row.insertCell(6);
                var cell7 = row.insertCell(7);
                var cell8 = row.insertCell(8);
                
                cell.innerHTML="<b>Sl No</b>:";
                cell1.innerHTML="<b>Load (in KW)</b>:";
                cell2.innerHTML="<b>From date</b>:";
                cell3.innerHTML="<b>To date</b>:";
                cell4.innerHTML="<b>From unit</b>:";
                cell5.innerHTML="<b>To unit</b>:";
                cell6.innerHTML="<b>Rate/unit</b>:";
                cell7.innerHTML="<b>Unit type</b>:";
                cell8.innerHTML="<b>Fixed charge/day</b>:";
            }
            table1.rows[0].style.position="sticky";
            table1.rows[0].style.top="0";
            table1.rows[0].style.backgroundColor="rgb(233, 124, 74)";
            const arr=JSON.parse(response);

            var x=arr.length*9;
            for(var i=0; i<x/9; i++){
                var row=table1.insertRow(k);
                row.style.backgroundColor="rgb(243, 242, 189)";
                row.addEventListener("click",updation);
                row.addEventListener("mouseover",func);
                row.addEventListener("mouseout",func1);
                var cell = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                var cell3 = row.insertCell(3);
                var cell4 = row.insertCell(4);
                var cell5 = row.insertCell(5);
                var cell6 = row.insertCell(6);
                var cell7 = row.insertCell(7);
                var cell8 = row.insertCell(8);

                cell.innerHTML=arr[i][count];
                ++count;
                cell1.innerHTML=arr[i][count];
                ++count;
                cell2.innerHTML=arr[i][count];
                ++count;
                cell3.innerHTML=arr[i][count];
                ++count;
                cell4.innerHTML=arr[i][count];
                ++count;
                cell5.innerHTML=arr[i][count];
                ++count;
                cell6.innerHTML=arr[i][count];
                ++count;
                cell7.innerHTML=arr[i][count];
                ++count;
                cell8.innerHTML=arr[i][count];
                count=0;
                ++k;
            }
        }
        else{
            document.getElementById("old").innerText="No old slabs";
            document.getElementById("slab_info").style.display="none";
        }
    },
    complete:function(){

    }
});


document.getElementById("save").addEventListener("click",function(){
    var load = document.getElementById("load").value;
    var fdate = document.getElementById("fdate").value;
    var tdate = document.getElementById("tdate").value;
    var funit = document.getElementById("funit").value;
    var tunit = document.getElementById("tunit").value;
    var rate = document.getElementById("r").value;
    var type = document.getElementById("type").value;
    var fcharge = document.getElementById("fcharge").value;

    if(load.toString()!="" && fdate!="" && funit.toString()!="" &&  rate.toString()!="" && fcharge.toString()!=""){
        if(document.getElementById("save").innerText=="Save"){
            var arr=[];
            var temp=[];
            temp.push(load,fdate,tdate,funit,tunit,rate,type,fcharge);
            arr.push(temp);
            temp=[];
    
                if(flag==true){  
                    document.querySelectorAll(".from_unit").forEach((item,index) => {
                        if(item.value.toString()!=""  && document.getElementsByClassName("rate")[index].value.toString()!=""){
                                temp.push(load,fdate,tdate,item.value,document.getElementsByClassName("to_unit")[index].value,document.getElementsByClassName("rate")[index].value,document.getElementsByClassName("unit_type")[index].value,fcharge);
                                arr.push(temp);
                                temp=[];
                        }
                    
                    })
                }
                var temp1=[];
                for(var i=0;i<arr.length;i++){
                    if(arr[i].length==8){
                        temp.push(Number(arr[i][3]));
                    }
                    else{
                        temp.push(Number(arr[i][2]));
                    } 
                }
                for(var i=0;i<temp.length; i++){
                    temp1.push(temp[i]);
                }
                temp.sort(function(a, b){return a - b});
                //console.log(temp);

                var count=0;
                for(var i=0; i<temp.length; i++){
                    if(temp1[i]==temp[i])
                        count+=1;
                    else
                        break;
                }

                if(count==temp.length){
                    var jsonString = JSON.stringify(arr);
                    $.ajax({
                        url: 'server.php',
                        type: 'POST',
                        data: {"input":"append",
                                data:jsonString},
                        cache: false,
                        success:function(response){
                            //alert(response);
                            var count=0;
                            if(response[0]=='['){
                                while (table1.rows.length > 1) {
                                    table1.deleteRow(1);
                                }
                                //document.getElementById("slab_info").style.display="block";
                                document.getElementById("old").innerText="Old slab entries:";
                                if(!table1.rows.length>=1){
                                    var row = table1.insertRow(0);
                                    var cell = row.insertCell(0);
                                    var cell1 = row.insertCell(1);
                                    var cell2 = row.insertCell(2);
                                    var cell3 = row.insertCell(3);
                                    var cell4 = row.insertCell(4);
                                    var cell5 = row.insertCell(5);
                                    var cell6 = row.insertCell(6);
                                    var cell7 = row.insertCell(7);
                                    var cell8 = row.insertCell(8);
                                    
                                    cell.innerHTML="<b>Sl No</b>:";
                                    cell1.innerHTML="<b>Load (in KW)</b>:";
                                    cell2.innerHTML="<b>From date</b>:";
                                    cell3.innerHTML="<b>To date</b>:";
                                    cell4.innerHTML="<b>From unit</b>:";
                                    cell5.innerHTML="<b>To unit</b>:";
                                    cell6.innerHTML="<b>Rate/unit</b>:";
                                    cell7.innerHTML="<b>Unit type</b>:";
                                    cell8.innerHTML="<b>Fixed charge/day</b>:";
    
                                    table1.rows[0].style.position="sticky";
                                    table1.rows[0].style.top="0";
                                    table1.rows[0].style.backgroundColor="rgb(233, 124, 74)";
                                }
                                
                                const arr=JSON.parse(response);
                    
                                var x=arr.length*9;
                                for(var i=0; i<x/9; i++){
                                    var row=table1.insertRow(table1.rows.length);
                                    row.style.backgroundColor="rgb(243, 242, 189)";
                                    row.addEventListener("click",updation);
                                    row.addEventListener("mouseover",func);
                                    row.addEventListener("mouseout",func1);
                                    var cell = row.insertCell(0);
                                    var cell1 = row.insertCell(1);
                                    var cell2 = row.insertCell(2);
                                    var cell3 = row.insertCell(3);
                                    var cell4 = row.insertCell(4);
                                    var cell5 = row.insertCell(5);
                                    var cell6 = row.insertCell(6);
                                    var cell7 = row.insertCell(7);
                                    var cell8 = row.insertCell(8);
                    
                                    cell.innerHTML=arr[i][count];
                                    ++count;
                                    cell1.innerHTML=arr[i][count];
                                    ++count;
                                    cell2.innerHTML=arr[i][count];
                                    ++count;
                                    cell3.innerHTML=arr[i][count];
                                    ++count;
                                    cell4.innerHTML=arr[i][count];
                                    ++count;
                                    cell5.innerHTML=arr[i][count];
                                    ++count;
                                    cell6.innerHTML=arr[i][count];
                                    ++count;
                                    cell7.innerHTML=arr[i][count];
                                    ++count;
                                    cell8.innerHTML=arr[i][count];
                                    count=0;
                                }
                                document.getElementById("load").value=""
                                document.getElementById("fdate").value="";
                                document.getElementById("tdate").value="";
                                document.getElementById("funit").value="";
                                document.getElementById("tunit").value="";
                                document.getElementById("r").value="";
                                document.getElementById("fcharge").value="";
                            }
                            else{
                                document.getElementById("old").innerText="No old slabs";
                                document.getElementById("slab_info").style.display="none";
                            }
                        },
                        complete:function(){
    
                        }
                    });
                }
                else{
                    alert("The units should be in increasing order.");
                    setTimeout(function(){
                        document.getElementById("funit").value="";
                        document.getElementById("load").value="";
                        document.getElementById("tunit").value="";
                        document.getElementById("r").value="";
                        document.getElementById("fcharge").value="";

                        if(flag==true){  
                            document.querySelectorAll(".from_unit").forEach((item,index) => {
                                item.value="";
                                document.getElementsByClassName("to_unit")[index].value="";
                                document.getElementsByClassName("rate")[index].value="";
                            })
                        }

                    },1000);
                }
                    
        }
        else if(document.getElementById("save").innerText=="Update"){
            $.ajax({
                url: 'server.php',
                type: 'POST',
                data:{
                        "input":"update",
                        "sl_no":x,
                        "load":load,
                        "from_date":fdate,
                        "to_date":tdate,
                        "from_unit":funit,
                        "to_unit":tunit,
                        "rate":rate,
                        "type":type,
                        "fcharge":fcharge
                },
                success:function(response){
                    //console.log(response.length);
                    if(response.includes("-")){
                        const arr=response.split("-");
                        document.getElementById("old").innerText="Old slab entries:";
                        if(arr.length==7){
                            for(var i=0; i<table1.rows.length; i++){
                                if(table1.rows[i].cells.item(0).innerHTML==x){
                                    table1.rows[i].cells.item(0).innerHTML=arr[0];
                                    table1.rows[i].cells.item(1).innerHTML=arr[1];
                                    table1.rows[i].cells.item(2).innerHTML=arr[2];
                                    table1.rows[i].cells.item(3).innerHTML="";
                                    table1.rows[i].cells.item(4).innerHTML=arr[3];
                                    table1.rows[i].cells.item(5).innerHTML="";
                                    table1.rows[i].cells.item(6).innerHTML=arr[4];
                                    table1.rows[i].cells.item(7).innerHTML=arr[5];
                                    table1.rows[i].cells.item(8).innerHTML=arr[6];
                                    table1.rows[i].addEventListener("click",updation);
                                    table1.rows[i].addEventListener("mouseover",func);
                                    table1.rows[i].addEventListener("mouseout",func1);
                                    table1.rows[i].style.backgroundColor="rgb(39, 243, 148)";
                                    setTimeout(function(){table1.rows[i].style.backgroundColor="rgb(243, 242, 189)"},1000);
                                    table1.rows[i].scrollIntoView({
                                        behavior: 'smooth',
                                      block: 'center'
                                    });
                                    document.getElementById("load").value=""
                                    document.getElementById("fdate").value="";
                                    document.getElementById("tdate").value="";
                                    document.getElementById("funit").value="";
                                    document.getElementById("tunit").value="";
                                    document.getElementById("r").value="";
                                    document.getElementById("fcharge").value="";
                                    break;
                                }
                            }
                        }
                        else if(arr.length==9){
                            for(var i=0; i<table1.rows.length; i++){
                                if(table1.rows[i].cells.item(0).innerHTML==x){
                                    table1.rows[i].cells.item(0).innerHTML=arr[0];
                                    table1.rows[i].cells.item(1).innerHTML=arr[1];
                                    table1.rows[i].cells.item(2).innerHTML=arr[2];
                                    table1.rows[i].cells.item(3).innerHTML=arr[3];
                                    table1.rows[i].cells.item(4).innerHTML=arr[4];
                                    table1.rows[i].cells.item(5).innerHTML=arr[5];
                                    table1.rows[i].cells.item(6).innerHTML=arr[6];
                                    table1.rows[i].cells.item(7).innerHTML=arr[7];
                                    table1.rows[i].cells.item(8).innerHTML=arr[8];
                                    table1.rows[i].addEventListener("click",updation);
                                    table1.rows[i].addEventListener("mouseover",func);
                                    table1.rows[i].addEventListener("mouseout",func1);
                                    table1.rows[i].style.backgroundColor="rgb(39, 243, 148)";
                                    setTimeout(function(){table1.rows[i].style.backgroundColor="rgb(243, 242, 189)"},1000);
                                    table1.rows[i].scrollIntoView({
                                        behavior: 'smooth',
                                      block: 'center'
                                    });

                                    document.getElementById("load").value=""
                                    document.getElementById("fdate").value="";
                                    document.getElementById("tdate").value="";
                                    document.getElementById("funit").value="";
                                    document.getElementById("tunit").value="";
                                    document.getElementById("r").value="";
                                    document.getElementById("fcharge").value="";
                                    break;
                                }
                            }
                        }
                        else if(arr.length==8){
                            if(arr[3].includes("/")){
                                for(var i=0; i<table1.rows.length; i++){
                                    if(table1.rows[i].cells.item(0).innerHTML==x){
                                        table1.rows[i].cells.item(0).innerHTML=arr[0];
                                        table1.rows[i].cells.item(1).innerHTML=arr[1];
                                        table1.rows[i].cells.item(2).innerHTML=arr[2];
                                        table1.rows[i].cells.item(3).innerHTML=arr[3];
                                        table1.rows[i].cells.item(4).innerHTML=arr[4]
                                        table1.rows[i].cells.item(5).innerHTML="";
                                        table1.rows[i].cells.item(6).innerHTML=arr[5];
                                        table1.rows[i].cells.item(7).innerHTML=arr[6];
                                        table1.rows[i].cells.item(8).innerHTML=arr[7];
                                        table1.rows[i].addEventListener("click",updation);
                                        table1.rows[i].addEventListener("mouseover",func);
                                        table1.rows[i].addEventListener("mouseout",func1);
                                        table1.rows[i].style.backgroundColor="rgb(39, 243, 148)";
                                        setTimeout(function(){table1.rows[i].style.backgroundColor="rgb(243, 242, 189)"},1000);
                                        table1.rows[i].scrollIntoView({
                                            behavior: 'smooth',
                                          block: 'center'
                                        });
                                        document.getElementById("load").value=""
                                        document.getElementById("fdate").value="";
                                        document.getElementById("tdate").value="";
                                        document.getElementById("funit").value="";
                                        document.getElementById("tunit").value="";
                                        document.getElementById("r").value="";
                                        document.getElementById("fcharge").value="";
                                        break;
                                    }
                                }
                            }
                            else{
                                for(var i=0; i<table1.rows.length; i++){
                                    if(table1.rows[i].cells.item(0).innerHTML==x){
                                        table1.rows[i].cells.item(0).innerHTML=arr[0];
                                        table1.rows[i].cells.item(1).innerHTML=arr[1];
                                        table1.rows[i].cells.item(2).innerHTML=arr[2];
                                        table1.rows[i].cells.item(3).innerHTML="";
                                        table1.rows[i].cells.item(4).innerHTML=arr[3];
                                        table1.rows[i].cells.item(5).innerHTML=arr[4];
                                        table1.rows[i].cells.item(6).innerHTML=arr[5];
                                        table1.rows[i].cells.item(7).innerHTML=arr[6];
                                        table1.rows[i].cells.item(8).innerHTML=arr[7];
                                        table1.rows[i].addEventListener("click",updation);
                                        table1.rows[i].addEventListener("mouseover",func);
                                        table1.rows[i].addEventListener("mouseout",func1);
                                        table1.rows[i].style.backgroundColor="rgb(39, 243, 148)";
                                        setTimeout(function(){table1.rows[i].style.backgroundColor="rgb(243, 242, 189)"},1000);
                                        table1.rows[i].scrollIntoView({
                                            behavior: 'smooth',
                                          block: 'center'
                                        });
                                        document.getElementById("load").value=""
                                        document.getElementById("fdate").value="";
                                        document.getElementById("tdate").value="";
                                        document.getElementById("funit").value="";
                                        document.getElementById("tunit").value="";
                                        document.getElementById("r").value="";
                                        document.getElementById("fcharge").value="";
                                        break;
                                    }
                                }
                            }
                        }
                        document.getElementById("save").innerText="Save";
                        document.getElementById("add").disabled=false;
                    }
                    
            },
            complete:function(){
    
            }
        });
        }
        
        }else{
            alert("Please insert all the details");
        }
})

document.getElementById("add").addEventListener("click",function(){
    flag=true;
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    var cell6 = row.insertCell(6);
    var cell7 = row.insertCell(7);

    cell.innerHTML="''"
    cell1.innerHTML="''";
    cell2.innerHTML="''";
    cell7.innerHTML="''";

    var input = document.createElement("input");
    input.type = "number";
    input.className="from_unit";
    input.style.width="80px";
    input.style.textAlign="center";
    input.addEventListener("change",f1);
    cell3.appendChild(input);

    var input = document.createElement("input");
    input.type = "number";
    input.className="to_unit";
    input.style.width="80px";
    input.style.textAlign="center";
    input.addEventListener("change",f1);
    cell4.appendChild(input);

    var input = document.createElement("input");
    input.type = "number";
    input.className="rate";
    input.style.width="80px";
    input.style.textAlign="center";
    cell5.appendChild(input);


    var selectList = document.createElement("select");
    selectList.className = "unit_type";
    selectList.style.width="100%";
    cell6.appendChild(selectList);

    var option = document.createElement("option");
    option.value = "Household";
    option.text = "Household";
    selectList.appendChild(option);

    var option = document.createElement("option");
    option.value = "Commercial";
    option.text = "Commercial";
    selectList.appendChild(option);

    for(var i=0; i<table.rows.length; i++){
        table.rows[i].style.backgroundColor="rgb(252, 244, 235)";
    }
})

const isAlphaNumeric = (str) => /[a-zA-Z\u00C0-\u00FF\d\/]/.test(str);

document.getElementById("fdate").addEventListener('keypress', (e) => {
    if (!isAlphaNumeric(e.key) && e.cancelable) {
        e.preventDefault();
    }
});

document.getElementById("tdate").addEventListener('keypress', (e) => {
    if (!isAlphaNumeric(e.key) && e.cancelable) {
        e.preventDefault();
    }
});

document.getElementById("fdate").addEventListener("change",() => {
    const arr=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const arr1=document.getElementById("fdate").value.split("/");
    //console.log(arr[parseInt(arr1[1])-1]);
    var date=parseDateStringToObject(document.getElementById("fdate").value).toString();
    if(date.length==12){
        alert("Invalid date");
        document.getElementById("fdate").value="";
    }
    else  if(document.getElementById("fdate").value.length!=10){
        alert("Date should be in 'dd/mm/yyyy' format");
        document.getElementById("fdate").value="";
    }
    else if(!date.includes(arr[parseInt(arr1[1])-1])){
        alert("Invalid date");
        document.getElementById("fdate").value="";
    }
    else{
        var fdate = document.getElementById("fdate").value;
        var tdate = document.getElementById("tdate").value;
        const d=fdate.split("/");
        const d1=tdate.split("/");

        var dt=d[1]+"/"+d[0]+"/"+d[2];
        var dt1=d1[1]+"/"+d1[0]+"/"+d1[2];

        var prev=new Date(dt);
        var curr=new Date(dt1);

        if(curr<prev && tdate!=""){
            //console.log(true);
            alert("Incorrect dates");
            document.getElementById("fdate").value="";
            document.getElementById("tdate").value="";
        }
        else{
            $.ajax({
                url: 'server.php',
                type: 'POST',
                data:{
                        "input":"calculate_fcharge",
                        "from_date":document.getElementById("fdate").value,
                        "load":document.getElementById("load").value
                },
                success:function(response){
                    if(!response.includes("_")){
                        document.getElementById("fcharge").value=response;
                    }
                },
                complete:function(){
    
                }
            });
        }
    }
    
})

document.getElementById("tdate").addEventListener("change",() => {
    const arr=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const arr1=document.getElementById("tdate").value.split("/");
    //console.log(arr[parseInt(arr1[1])-1]);
    var date=parseDateStringToObject(document.getElementById("tdate").value).toString();
    if(date.length==12){
        alert("Invalid date");
        document.getElementById("tdate").value="";
    }
    else  if(document.getElementById("tdate").value.length!=10){
        alert("Date should be in 'dd/mm/yyyy' format");
        document.getElementById("tdate").value="";
    }
    else if(!date.includes(arr[parseInt(arr1[1])-1])){
        alert("Invalid date");
        document.getElementById("tdate").value="";
    }
    else{
        var fdate = document.getElementById("fdate").value;
        var tdate = document.getElementById("tdate").value;
        const d=fdate.split("/");
        const d1=tdate.split("/");

        var dt=d[1]+"/"+d[0]+"/"+d[2];
        var dt1=d1[1]+"/"+d1[0]+"/"+d1[2];

        var prev=new Date(dt);
        var curr=new Date(dt1);

        
        if(curr<prev && tdate!=""){
            alert("Incorrect dates");
            document.getElementById("fdate").value="";
            document.getElementById("tdate").value="";
        }
    }
})

function parseDateStringToObject(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${month}-${day}-${year}`);
}

function updation(){
    const btn=document.getElementById("save");
    var c=confirm("Do you want to update the slab?");
    if (c==true){
        while (table.rows.length > 2) {
            table.deleteRow(2);
        }
        document.getElementById("add").disabled=true;     
        x=this.cells.item(0).innerHTML;
        document.getElementById("load").value=this.cells.item(1).innerHTML;
        document.getElementById("fdate").value=this.cells.item(2).innerHTML;
        if(this.cells.item(3).innerHTML!="")
            document.getElementById("tdate").value=this.cells.item(3).innerHTML;
        document.getElementById("funit").value=this.cells.item(4).innerHTML;
        document.getElementById("tunit").value=this.cells.item(5).innerHTML;
        document.getElementById("r").value=this.cells.item(6).innerHTML;
        document.getElementById("type").value=this.cells.item(7).innerHTML;
        document.getElementById("fcharge").value=this.cells.item(8).innerHTML;

        btn.innerText="Update";
    }
}

function func(){
    this.style.backgroundColor="rgb(118, 230, 238)";
    this.style.cursor="pointer";

    for(var i =0 ; i<this.cells.length; i++){
        this.cells.item(i).style.fontWeight = "900";
    }
}

function func1(){
    this.style.backgroundColor="rgb(243, 242, 189)";
    for(var i =0 ; i<this.cells.length; i++){
        this.cells.item(i).style.fontWeight = "500";
    }
}

document.getElementById("funit").addEventListener("change",f1);
document.getElementById("tunit").addEventListener("change",f1);


function f1(){
    var f=0;
    var funit=document.getElementById("funit").value;
    var tunit=document.getElementById("tunit").value;
    if(funit.toString()!="" && tunit.toString()!=""){
        if(Number(funit)>Number(tunit)){
            alert("incorrect units");
            document.getElementById("funit").value="";
            document.getElementById("tunit").value="";
        }
    }
    

    if(flag==true){
        document.querySelectorAll(".from_unit").forEach((item,index) => {
            if(item.value.toString()!="" && document.getElementsByClassName("to_unit")[index].value.toString()!=""){
                if(Number(item.value)>Number(document.getElementsByClassName("to_unit")[index].value)){
                    f+=1;
                    item.value="";
                    document.getElementsByClassName("to_unit")[index].value="";
                }
            }
        })

        if(f>0){
            alert("incorrect units");
        }
    }
}

document.getElementById("load").addEventListener("change",function(){
    if(document.getElementById("fdate").value!="" && document.getElementById("load").value!=""){
        $.ajax({
            url: 'server.php',
            type: 'POST',
            data:{
                    "input":"calculate_fcharge",
                    "from_date":document.getElementById("fdate").value,
                    "load":document.getElementById("load").value
            },
            success:function(response){
                if(!response.includes("_")){
                    document.getElementById("fcharge").value=response;
                }
            },
            complete:function(){

            }
        });
    }
})