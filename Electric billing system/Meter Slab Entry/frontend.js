var a = document.getElementById("meter_rates");
if(a.rows.length!=1){
    var row = a.insertRow(0);
    var cell = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    
    cell.innerHTML="<b>From date</b>:";
    cell1.innerHTML="<b>To date</b>:";
    cell2.innerHTML="<b>From unit</b>:";
    cell3.innerHTML="<b>To unit</b>:";
    cell4.innerHTML="<b>Rate/unit</b>:";
    cell5.innerHTML="<b>Unit type</b>:";
}

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
            document.getElementById("old").style.display="block";
            a.style.display="block";
            document.getElementById("rate_table").style.display="block";
            a.rows[0].style.position="sticky";
            a.rows[0].style.top="0";
            a.rows[0].style.backgroundColor="rgb(233, 124, 74)";
            const arr=JSON.parse(response);

            var x=arr.length*6;
            for(var i=0; i<x/6; i++){
                var row=a.insertRow(k);
                row.style.backgroundColor="rgb(243, 242, 189)";
                var cell = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                var cell3 = row.insertCell(3);
                var cell4 = row.insertCell(4);
                var cell5 = row.insertCell(5);

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

                count=0;
                ++k;
            }

            for(var j=1;j<a.rows.length;j++){
                if(a.rows[j].cells.item(1).innerHTML=="" || a.rows[j].cells.item(1).innerHTML==null){
                    document.getElementById("fdate").value= a.rows[j].cells.item(0).innerHTML;
                    document.getElementById("funit").value=a.rows[j].cells.item(2).innerHTML;
                    document.getElementById("tunit").value=a.rows[j].cells.item(3).innerHTML;
                    document.getElementById("r").value=a.rows[j].cells.item(4).innerHTML;
                    document.getElementById("type").value=a.rows[j].cells.item(5).innerHTML;
                    document.getElementById("fdate").disabled=true;
                }
            }
        }
        else{
            document.getElementById("old").style.display="none";
            alert(response);
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
    var type = document.getElementById("type").value;

    if(fdate.toString().length==0 ||  funit.toString().length==0 || tunit.toString().length==0 || rate.toString().length==0){
        alert("Please insert all the details");
    }
    else{
        const d=fdate.split("/");
        const d1=tdate.split("/");

        var dt=d[1]+"/"+d[0]+"/"+d[2];
        var dt1=d1[1]+"/"+d1[0]+"/"+d1[2];

        var prev=new Date(dt);
        var curr=new Date(dt1);

        if(document.getElementById("fdate").disabled==false){ //insertion
            //console.log("inserting" +curr>prev);
            if(curr>prev || tdate==""){
                //console.log("Yes");
                //console.group(rate);
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
                        if(response.includes("-")){
                            const a=response.split("-");
                            alert(a[0]);
                            fdate=a[1];
                            document.getElementById("fdate").disabled=true;
                        }
                        else
                            alert(response);
                        setTimeout(function(){
                            while (a.rows.length > 1) {
                                a.deleteRow(1);
                            }
                            location.reload();
                        },2000);
                    },
                    complete:function(){

                    }
                });
            }else
                alert("Current meter reading date should always be greater than previous meter reading date");
        }
        else{ //updation
            //console.log("updating");
            if(curr>prev || tdate==""){
                console.log(tdate);
                $.ajax({
                    url: 'server.php',
                    type: 'POST',
                    data:{
                        "input":"update",
                        "from_date":fdate,
                        "to_date":tdate,
                        "from_unit":funit,
                        "to_unit":tunit,
                        "rate":rate,
                        "type":type
                    },
                    success:function(response){
                        if(response=="Updated rate table"){
                            if(tdate=="")
                                document.getElementById("fdate").disabled=true;
                            else
                                document.getElementById("fdate").disabled=false;
                        }
                        alert(response);
                        setTimeout(function(){
                            while (a.rows.length > 1) {
                                a.deleteRow(1);
                            }
                            location.reload();
                        },2000);
                    },
                    complete:function(){
                        
                    }
                });
            }else
            alert("Current meter reading date should always be greater than previous meter reading date");
        }
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
})

function parseDateStringToObject(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${month}-${day}-${year}`);
}