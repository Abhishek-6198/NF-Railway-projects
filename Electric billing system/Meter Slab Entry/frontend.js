var flag=false;
var table=document.getElementById("slab_details");
var table1=document.getElementById("old_table");
var x=0;
//console.log(table1)

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
                
                cell.innerHTML="<b>Sl No</b>:";
                cell1.innerHTML="<b>From date</b>:";
                cell2.innerHTML="<b>To date</b>:";
                cell3.innerHTML="<b>From unit</b>:";
                cell4.innerHTML="<b>To unit</b>:";
                cell5.innerHTML="<b>Rate/unit</b>:";
                cell6.innerHTML="<b>Unit type</b>:";
            }
            table1.rows[0].style.position="sticky";
            table1.rows[0].style.top="0";
            table1.rows[0].style.backgroundColor="rgb(233, 124, 74)";
            const arr=JSON.parse(response);

            var x=arr.length*6;
            for(var i=0; i<x/6; i++){
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

                count=0;
                ++k;
            }
        }
        else{
            document.getElementById("old").innerText="No old slabs";
        }
    },
    complete:function(){

    }
});



document.getElementById("save").addEventListener("click",function(){
    var fdate = document.getElementById("fdate").value;
    var tdate = document.getElementById("tdate").value;
    var funit = document.getElementById("funit").value;
    var tunit = document.getElementById("tunit").value;
    var rate = document.getElementById("r").value;
    var type=document.getElementById("type").value;

    if(fdate!="" && funit.toString()!="" && tunit.toString()!="" && rate.toString()!=""){
        if(document.getElementById("save").innerText=="Save"){
            $.ajax({
                url: 'server.php',
                type: 'POST',
                data:{
                        "input":"append",
                        "from_date":fdate,
                        "to_date":tdate,
                        "from_unit":funit,
                        "to_unit":tunit,
                        "rate":rate,
                        "type":type
                },
                success:function(response){
                    //console.log(response.length);
                    //alert(response);
                    if(response.includes("-")){
                        const arr=response.split("-");
    
                    document.getElementById("old").innerText="Old slab entries:";
                    if(table1.rows.length>=1){
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
    
                        if(arr.length<7){
                            cell.innerHTML=arr[0];
                            cell1.innerHTML=arr[1];
                            cell2.innerHTML="-";
                            cell3.innerHTML=arr[2];
                            cell4.innerHTML=arr[3];
                            cell5.innerHTML=arr[4];
                            cell6.innerHTML=arr[5];
                        }else{
                            cell.innerHTML=arr[0];
                            cell1.innerHTML=arr[1];
                            cell2.innerHTML=arr[2];
                            cell3.innerHTML=arr[3];
                            cell4.innerHTML=arr[4];
                            cell5.innerHTML=arr[5];
                            cell6.innerHTML=arr[6];
                        }
                    }
                    else{
                        var row = table1.insertRow(0);
                        var cell = row.insertCell(0);
                        var cell1 = row.insertCell(1);
                        var cell2 = row.insertCell(2);
                        var cell3 = row.insertCell(3);
                        var cell4 = row.insertCell(4);
                        var cell5 = row.insertCell(5);
                        var cell6 = row.insertCell(6);
                                
                        cell.innerHTML="<b>Sl No</b>:";
                        cell1.innerHTML="<b>From date</b>:";
                        cell2.innerHTML="<b>To date</b>:";
                        cell3.innerHTML="<b>From unit</b>:";
                        cell4.innerHTML="<b>To unit</b>:";
                        cell5.innerHTML="<b>Rate/unit</b>:";
                        cell6.innerHTML="<b>Unit type</b>:";
    
                        table1.rows[0].style.position="sticky";
                        table1.rows[0].style.top="0";
                        table1.rows[0].style.backgroundColor="rgb(233, 124, 74)";
    
                        var row=table1.insertRow(table1.rows.length);
                        row.addEventListener("click",updation);
                        row.addEventListener("mouseover",func);
                        row.addEventListener("mouseout",func1);
                        row.style.backgroundColor="rgb(243, 242, 189)";
                        var cell = row.insertCell(0);
                        var cell1 = row.insertCell(1);
                        var cell2 = row.insertCell(2);
                        var cell3 = row.insertCell(3);
                        var cell4 = row.insertCell(4);
                        var cell5 = row.insertCell(5);
                        var cell6 = row.insertCell(6);
    
                        if(arr.length<7){
                            cell.innerHTML=arr[0];
                            cell1.innerHTML=arr[1];
                            cell2.innerHTML="-";
                            cell3.innerHTML=arr[2];
                            cell4.innerHTML=arr[3];
                            cell5.innerHTML=arr[4];
                            cell6.innerHTML=arr[5];
                        }else{
                            cell.innerHTML=arr[0];
                            cell1.innerHTML=arr[1];
                            cell2.innerHTML=arr[2];
                            cell3.innerHTML=arr[3];
                            cell4.innerHTML=arr[4];
                            cell5.innerHTML=arr[5];
                            cell6.innerHTML=arr[6];
                        }
                    }
                }
            },
            complete:function(){
    
            }
        });
    
                if(flag==true){  
                    document.querySelectorAll(".from_unit").forEach((item,index) => {
                        if(item.value.toString()!="" && document.getElementsByClassName("to_unit")[index].value.toString()!="" && document.getElementsByClassName("rate")[index].value.toString()!=""){
                            //console.log(item.value+"-"+document.getElementsByClassName("to_unit")[index].value+"-"+document.getElementsByClassName("rate")[index].value);
                            $.ajax({
                                url: 'server.php',
                                type: 'POST',
                                data:{
                                    "input":"append",
                                    "from_date":fdate,
                                    "to_date":tdate,
                                    "from_unit":item.value,
                                    "to_unit":document.getElementsByClassName("to_unit")[index].value,
                                    "rate":document.getElementsByClassName("rate")[index].value,
                                    "type":document.getElementsByClassName("unit_type")[index].value
                                },
                                success:function(response){
                                     if(response.includes("-")){
                                        const arr=response.split("-");
                                        document.getElementById("old").innerText="Old slab entries:";
                            
                                        if(table1.rows.length>=1){
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
    
                                            if(arr.length<7){
                                                cell.innerHTML=arr[0];
                                                cell1.innerHTML=arr[1];
                                                cell2.innerHTML="-";
                                                cell3.innerHTML=arr[2];
                                                cell4.innerHTML=arr[3];
                                                cell5.innerHTML=arr[4];
                                                cell6.innerHTML=arr[5];
                                            }else{
                                                cell.innerHTML=arr[0];
                                                cell1.innerHTML=arr[1];
                                                cell2.innerHTML=arr[2];
                                                cell3.innerHTML=arr[3];
                                                cell4.innerHTML=arr[4];
                                                cell5.innerHTML=arr[5];
                                                cell6.innerHTML=arr[6];
                                            }
                                        }
                                        else{
                                            var row = table1.insertRow(0);
                                            var cell = row.insertCell(0);
                                            var cell1 = row.insertCell(1);
                                            var cell2 = row.insertCell(2);
                                            var cell3 = row.insertCell(3);
                                            var cell4 = row.insertCell(4);
                                            var cell5 = row.insertCell(5);
                                            var cell6 = row.insertCell(6);
                                
                                            cell.innerHTML="<b>Sl No</b>:";
                                            cell1.innerHTML="<b>From date</b>:";
                                            cell2.innerHTML="<b>To date</b>:";
                                            cell3.innerHTML="<b>From unit</b>:";
                                            cell4.innerHTML="<b>To unit</b>:";
                                            cell5.innerHTML="<b>Rate/unit</b>:";
                                            cell6.innerHTML="<b>Unit type</b>:";
    
                                            table1.rows[0].style.position="sticky";
                                            table1.rows[0].style.top="0";
                                            table1.rows[0].style.backgroundColor="rgb(233, 124, 74)";
    
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
    
                                            if(arr.length<7){
                                                cell.innerHTML=arr[0];
                                                cell1.innerHTML=arr[1];
                                                cell2.innerHTML="-";
                                                cell3.innerHTML=arr[2];
                                                cell4.innerHTML=arr[3];
                                                cell5.innerHTML=arr[4];
                                                cell6.innerHTML=arr[5];
                                            }else{
                                                cell.innerHTML=arr[0];
                                                cell1.innerHTML=arr[1];
                                                cell2.innerHTML=arr[2];
                                                cell3.innerHTML=arr[3];
                                                cell4.innerHTML=arr[4];
                                                cell5.innerHTML=arr[5];
                                                cell6.innerHTML=arr[6];
                                            }
                                        }
                                    }
                                },
                                complete:function(){
                
                                }
                            });
                        }
                    })
                }
        }
        else if(document.getElementById("save").innerText=="Update"){
            $.ajax({
                url: 'server.php',
                type: 'POST',
                data:{
                        "input":"update",
                        "sl_no":x,
                        "from_date":fdate,
                        "to_date":tdate,
                        "from_unit":funit,
                        "to_unit":tunit,
                        "rate":rate,
                        "type":type
                },
                success:function(response){
                    //console.log(response.length);
                    if(response.includes("-")){
                        const arr=response.split("-");
                        document.getElementById("old").innerText="Old slab entries:";
                        if(arr.length<7){
                            for(var i=0; i<table1.rows.length; i++){
                                if(table1.rows[i].cells.item(0).innerHTML==x){
                                    table1.rows[i].cells.item(0).innerHTML=arr[0];
                                    table1.rows[i].cells.item(1).innerHTML=arr[1];
                                    table1.rows[i].cells.item(3).innerHTML=arr[2];
                                    table1.rows[i].cells.item(4).innerHTML=arr[3];
                                    table1.rows[i].cells.item(5).innerHTML=arr[4];
                                    table1.rows[i].cells.item(6).innerHTML=arr[5];
                                    table1.rows[i].addEventListener("click",updation);
                                    table1.rows[i].addEventListener("mouseover",func);
                                    table1.rows[i].addEventListener("mouseout",func1);
                                    table1.rows[i].style.backgroundColor="rgb(39, 243, 148)";
                                    setTimeout(function(){table1.rows[i].style.backgroundColor="rgb(243, 242, 189)"},1000);
                                    table1.rows[i].scrollIntoView({
                                        behavior: 'smooth',
                                      block: 'center'
                                    });
                                    document.getElementById("fdate").value="";
                                    document.getElementById("tdate").value="";
                                    document.getElementById("funit").value="";
                                    document.getElementById("tunit").value="";
                                    document.getElementById("r").value="";
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
                                    table1.rows[i].cells.item(3).innerHTML=arr[3];
                                    table1.rows[i].cells.item(4).innerHTML=arr[4];
                                    table1.rows[i].cells.item(5).innerHTML=arr[5];
                                    table1.rows[i].cells.item(6).innerHTML=arr[6];
                                    table1.rows[i].addEventListener("click",updation);
                                    table1.rows[i].addEventListener("mouseover",func);
                                    table1.rows[i].addEventListener("mouseout",func1);
                                    table1.rows[i].style.backgroundColor="rgb(39, 243, 148)";
                                    setTimeout(function(){table1.rows[i].style.backgroundColor="rgb(243, 242, 189)"},1000);
                                    table1.rows[i].scrollIntoView({
                                        behavior: 'smooth',
                                      block: 'center'
                                    });
                                    document.getElementById("fdate").value="";
                                    document.getElementById("tdate").value="";
                                    document.getElementById("funit").value="";
                                    document.getElementById("tunit").value="";
                                    document.getElementById("r").value="";
                                    break;
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

    cell.innerHTML="''"
    cell1.innerHTML="''";

    var input = document.createElement("input");
    input.type = "number";
    input.className="from_unit";
    input.style.width="80px";
    input.addEventListener("change",f1);
    cell2.appendChild(input);

    var input = document.createElement("input");
    input.type = "number";
    input.className="to_unit";
    input.style.width="80px";
    input.addEventListener("change",f1);
    cell3.appendChild(input);

    var input = document.createElement("input");
    input.type = "number";
    input.className="rate";
    input.style.width="80px";
    cell4.appendChild(input);


    var selectList = document.createElement("select");
    selectList.className = "unit_type";
    selectList.style.width="100%";
    cell5.appendChild(selectList);

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
        document.getElementById("fdate").value=this.cells.item(1).innerHTML;
        if(this.cells.item(2).innerHTML!="")
            document.getElementById("tdate").value=this.cells.item(2).innerHTML;
        document.getElementById("funit").value=this.cells.item(3).innerHTML;
        document.getElementById("tunit").value=this.cells.item(4).innerHTML;
        document.getElementById("r").value=this.cells.item(5).innerHTML;
        document.getElementById("type").value=this.cells.item(6).innerHTML;

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