var charge1=0;
var days_difference=0;
var r=1;
var c1=0;
var array=[];
var arr2=[];
var arr3=[];
var arr4=[];
var arr5=[];
var qtrid=[];
var table=document.getElementById("employee_details");
var n=sessionStorage.getItem("name");
if (n==null)
    window.open("http://localhost//Electric%20billing%20system/Login%20screen/index.html","_self");
function get_names() {
    let $select = $("#colony_name");
    //refresh_colony_name();
    $.ajax({
      url: 'server.php',
      type: 'POST',
      data: { "input": "names" }, 
      dataType: 'json', 
      success: function(response) {
        let selectedValue = $select.val();
        let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
        $select.html(html).val(selectedValue);
        document.getElementById("colony_type").disabled=false;
      },
      complete: function() {}
    });
}

function get_types() {
    let flag=false; 
    let $select = $("#colony_type");
    //refresh_colony_type();
    $.ajax({
      url: 'server.php',
      type: 'POST',
      data: { "input": "types",
              "name": $("#colony_name").val() }, 
      dataType: 'json', // add this property to avoid the need to call JSON.parse in success
      success: function(response) {
        for(var i=0; i<response.length; i++){
          if(response[i].includes("No")){
            flag=true;
            document.getElementById("colony_type").disabled=true;
            var c= confirm(response[i]);
                if (c==true && sessionStorage.getItem("type")=="Admin") {
                  window.open("http://localhost//Electric%20billing%20system/Quarter_master_entry/index.html","_self");
                } 
          }
        }
        if(!flag){
          let selectedValue = $select.val();
          let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
          $select.html(html).val(selectedValue);
          document.getElementById("book-no").disabled=false;
        }
      },
      complete: function() {}
    });
}

function get_bookno(){
    //let flag=false; 
    let $select = $("#book-no");
    //refresh_colony_type();
    $.ajax({
      url: 'server.php',
      type: 'POST',
      data: { "input": "book",
              "name": $("#colony_name").val(),
              "type": $("#colony_type").val()}, 
      dataType: 'json', // add this property to avoid the need to call JSON.parse in success
      success: function(response) {
        let selectedValue = $select.val();
        let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
        $select.html(html).val(selectedValue);
        document.getElementById("page-no").disabled=false;
      },
      complete: function() {}
    });
}

function get_pageno(){
 //let flag=false; 
 let $select = $("#page-no");
 //refresh_colony_type();
 $.ajax({
   url: 'server.php',
   type: 'POST',
   data: { "input": "page",
           "name": $("#colony_name").val(),
           "type": $("#colony_type").val(),
           "book": $("#book-no").val()}, 
   dataType: 'json', // add this property to avoid the need to call JSON.parse in success
   success: function(response) {
     let selectedValue = $select.val();
     let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
     $select.html(html).val(selectedValue);
   },
   complete: function() {}
 });
}


function fetch(){
    var colony_name=document.getElementById("colony_name").value;
    var colony_type=document.getElementById("colony_type").value;
    var book_no=document.getElementById("book-no").value;
    var page_no=document.getElementById("page-no").value;

    if(colony_name!="default" && colony_type!="default" && book_no!="default"){       
        $.ajax({
            url: 'server.php',
            type: 'POST',
            data: { "input": "is it registered?",
                    "c_name":  colony_name,
                    "c_type": colony_type,
                    "c_book": book_no,
                    "c_page":page_no},
            success:function(response){

                var k=1;
                var count=0;
                //alert(response);
                if(table.rows.length>0){
                    while(table.rows.length!=0)
                        table.deleteRow(0);
                }
                if(response[0]=="["){
                    document.getElementById("info").style.display="block";
                    document.getElementById("save").style.display="block";
                    document.getElementById("confirm").style.display="block";
                    //document.getElementById("reset").style.top="37em";
                    document.getElementById("colony_name").disabled=true;
                    document.getElementById("colony_type").disabled=true;
                    document.getElementById("save").disabled=false;
                    document.getElementById("confirm").disabled=false;
                    table.style.display="block";
                    var row = table.insertRow(0);  
                    var cell = row.insertCell(0);
                    var cell1 = row.insertCell(1);
                    var cell2 = row.insertCell(2);
                    var cell3 = row.insertCell(3);
                    var cell4 = row.insertCell(4);
                    var cell5 = row.insertCell(5);
                    var cell6 = row.insertCell(6);
                    var cell7 = row.insertCell(7);
                    var cell8 = row.insertCell(8);
                    var cell9 = row.insertCell(9);
                    var cell10 = row.insertCell(10);
                    var cell11 = row.insertCell(11);
                    
    
                    cell.innerHTML = "<b>EmpNo:</b>";
                    cell1.innerHTML = "<b>EmpName:</b>";
                    cell2.innerHTML = "<b>Retirement date:</b>";
                    cell3.innerHTML = "<b>Qtr_No:</b>";
                    cell4.innerHTML = "<b>Prev met read:</b>";
                    cell5.innerHTML = "<b>Current met read:</b>";
                    cell6.innerHTML = "<b>Prev Date</b>";
                    cell7.innerHTML = "<b>Current Date:</b>";
                    cell8.innerHTML = "<b>Total unit consumed:</b>";
                    cell9.innerHTML = "<b>Electric charge (Rs):</b>";
                    cell10.innerHTML = "<b>Fixed charge (Rs):</b>";
                    cell11.innerHTML = "<b>Total charge (Rs):</b>";

                    table.rows[0].style.position="sticky";
                    table.rows[0].style.top="0";
                    table.rows[0].style.backgroundColor="rgb(233, 124, 74)";

                    const arr=JSON.parse(response);
                    var x=arr.length*13;

                    for(var i=0; i<x/13; i++){
                        //alert(arr[i][4]+" "+arr[i][6]);
                        var row=table.insertRow(k);
                        row.addEventListener("click",fun);
                        var cell = row.insertCell(0);
                        var cell1 = row.insertCell(1);
                        var cell2 = row.insertCell(2);
                        var cell3 = row.insertCell(3);
                        var cell4 = row.insertCell(4);
                        var cell5 = row.insertCell(5);
                        var cell6 = row.insertCell(6);
                        var cell7 = row.insertCell(7);
                        var cell8 = row.insertCell(8);
                        var cell9 = row.insertCell(9);
                        var cell10 = row.insertCell(10);
                        var cell11 = row.insertCell(11);

                        cell.innerHTML=arr[i][1];
                        ++count;
                        cell1.innerHTML=arr[i][2];
                        ++count;
                        cell2.innerHTML=arr[i][12];
                        ++count;
                        cell3.innerHTML=arr[i][3];
                        ++count;
                        cell4.innerHTML=arr[i][4];
                        ++count;

                        var input = document.createElement("input");
                        input.type = "number";
                        input.className="current_read";
                        input.style.width="80px";
                        input.style.textAlign="center";
                        input.value=arr[i][count];
                        cell5.appendChild(input);
                        ++count;

                        cell6.innerHTML=arr[i][6];
                        ++count;

                        var input = document.createElement("input");
                        input.type = "text";
                        input.className="current_date";
                        input.style.width="80px";
                        input.style.textAlign="center";
                        input.value=arr[i][count];
                        cell7.appendChild(input);
                        ++count;

                        cell8.innerHTML=arr[i][8];
                        ++count;
                        cell9.innerHTML=arr[i][9];
                        ++count;
                        cell10.innerHTML=arr[i][10];
                        ++count;
                        cell11.innerHTML=arr[i][11];
                        qtrid.push(arr[i][0]);
                        count=0;
                        ++k;
                    }
                    
                    const isAlphaNumeric = (str) => /[a-zA-Z\u00C0-\u00FF\d\/]/.test(str);

                    document.querySelectorAll('.current_date').forEach((item,index) => {
                        item.addEventListener('keypress', event => {
                            if (!isAlphaNumeric(event.key) && event.cancelable) {
                                event.preventDefault();
                            }
                        })
                    })

                    document.querySelectorAll('.current_date').forEach((item,index) => {
                        item.addEventListener('change', event => {
                            const arr=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                            item.style.backgroundColor="rgb(255, 246, 205)";
                            const arr1=item.value.split("/");
                            var date=parseDateStringToObject(item.value).toString();
                            if(date.length!=12){
                                if(item.value.length==10){
                                    if(date.includes(arr[parseInt(arr1[1])-1])){
                                        document.getElementById("colony_name").disabled=true;
                                        var date= item.value;
                                        var date1=table.rows[index+1].cells.item(6).innerHTML;
                                        const d=date.split("/");
                                        const d1=date1.split("/");

                                        var dt=d[1]+"/"+d[0]+"/"+d[2];
                                        var dt1=d1[1]+"/"+d1[0]+"/"+d1[2];

                                        var curr=new Date(dt);
                                        var prev=new Date(dt1);
                                        var time_difference = curr.getTime() - prev.getTime(); 
                                        days_difference = time_difference / (1000 * 60 * 60 * 24); 
                                       
                                        if((curr>prev)&&(document.getElementsByClassName("current_read")[index].value>table.rows[index+1].cells.item(4).innerHTML)){
                                            //console.log(curr>prev);
                                            //console.log(document.getElementsByClassName("current_read")[index].value>table.rows[index+1].cells.item(4).innerHTML);
                                            charge1=document.getElementsByClassName("current_read")[index].value-parseInt(table.rows[index+1].cells.item(4).innerHTML);
                                            //console.log(charge1);
                                            table.rows[index+1].cells.item(8).innerHTML=document.getElementsByClassName("current_read")[index].value-parseInt(table.rows[index+1].cells.item(4).innerHTML);
                                            var temp=[];
                                            temp.push(charge1,qtrid[index],date1,date);
                                            array.push(temp);
                                            arr2.push(index);
                                        }
                                        else{
                                            item.value="";
                                            table.rows[index+1].cells.item(9).innerHTML=0;
                                            table.rows[index+1].cells.item(10).innerHTML=0;
                                            table.rows[index+1].cells.item(11).innerHTML=0;
                                            document.getElementById("save").disabled=true;
                                            document.getElementById("confirm").disabled=true;
                                        }
                                            
                                    }       
                                    else{
                                        console.log(date+"--------->"+arr[parseInt(arr1[1])-1]);
                                        document.getElementById("colony_name").disabled=true;
                                        document.getElementById("save").disabled=true;
                                        document.getElementById("confirm").disabled=true;
                                        alert("Invalid date");
                                        item.value="";
                                        table.rows[index+1].cells.item(9).innerHTML=0;
                                        table.rows[index+1].cells.item(10).innerHTML=0;
                                        table.rows[index+1].cells.item(11).innerHTML=0;
                                    }
                
                                }  
                                else{
                                    alert("Date should be in 'dd/mm/yyyy' format");
                                    document.getElementById("colony_name").disabled=true;
                                    document.getElementById("save").disabled=true;
                                    document.getElementById("confirm").disabled=true;
                                    item.value="";
                                    table.rows[index+1].cells.item(9).innerHTML=0;
                                    table.rows[index+1].cells.item(10).innerHTML=0;
                                    table.rows[index+1].cells.item(11).innerHTML=0;
                                }       
                            }
                            else{
                                console.log(date);
                                document.getElementById("colony_name").disabled=true;
                                document.getElementById("save").disabled=true;
                                document.getElementById("confirm").disabled=true;
                                alert("Invalid date");
                                item.value="";
                                table.rows[index+1].cells.item(9).innerHTML=0;
                                table.rows[index+1].cells.item(10).innerHTML=0;
                                table.rows[index+1].cells.item(11).innerHTML=0;
                            }
                        })
                    })

                    document.querySelectorAll('.current_read').forEach((item,index) => {
                        //console.log(document.getElementsByClassName("current_date")[index].value);
                        item.addEventListener('change', event => {
                                item.style.backgroundColor="rgb(255, 246, 205)";
                            
                                var date= document.getElementsByClassName("current_date")[index].value;
                                var date1=table.rows[index+1].cells.item(6).innerHTML;
                                const d=date.split("/");
                                const d1=date1.split("/");

                                var dt=d[1]+"/"+d[0]+"/"+d[2];
                                var dt1=d1[1]+"/"+d1[0]+"/"+d1[2];

                                var curr=new Date(dt);
                                var prev=new Date(dt1);
                                var time_difference = curr.getTime() - prev.getTime(); 
                                days_difference = time_difference / (1000 * 60 * 60 * 24);  

                                charge1=(item.value-parseInt(table.rows[index+1].cells.item(4).innerHTML))/days_difference; 
                                //console.log(charge1);
                                var charge=item.value-parseInt(table.rows[index+1].cells.item(4).innerHTML); 

                                if(curr<=prev || item.value<=parseInt(table.rows[index+1].cells.item(4).innerHTML) || date.length===0){
                                    if(curr<=prev){
                                        alert("The current meter read date must be greater than the previous meter read date.");
                                    }
                                    else if(item.value<=parseInt(table.rows[index+1].cells.item(4).innerHTML)){
                                        alert("The current meter value must be greater than the previous meter value.");
                                    }
                                    else if(date.length===0){
                                        alert("The current meter read date cannot be empty.");
                                    }
                                    //alert("The current meter reading and date must be greater than the previous one.");
                                    //document.getElementById("date").disabled=false;
                                    //document.getElementsByClassName("current_date")[index].value=""
                                    item.value="";
                                    //document.getElementById("save").style.display="none";
                                    table.rows[index+1].cells.item(8).innerHTML=0;
                                    document.getElementById("save").disabled=true;
                                    document.getElementById("confirm").disabled=true;
                                    table.rows[index+1].cells.item(9).innerHTML=0;
                                    table.rows[index+1].cells.item(10).innerHTML=0;
                                    table.rows[index+1].cells.item(11).innerHTML=0;
                                }
                                else{  
                                    table.rows[index+1].cells.item(8).innerHTML=document.getElementsByClassName("current_read")[index].value-parseInt(table.rows[index+1].cells.item(4).innerHTML);
                                    var temp=[];
                                    temp.push(charge,qtrid[index],date1,date);
                                    array.push(temp);
                                    arr2.push(index);
                              
                                }
                        
                        })
                    })

                    document.getElementById("save").addEventListener("click",function(){
                        c1=0;
                        document.querySelectorAll('.current_read').forEach((item,index) => {
                            if(item.value.toString().length>0 && document.getElementsByClassName("current_date")[index].value.length>0){
                                if(table.rows[index+1].style.backgroundColor=="rgb(118, 230, 238)"){
                                    arr3.push(qtrid[index]);
                                    arr3.push(table.rows[index+1].cells.item(8).innerHTML);
                                    arr3.push(table.rows[index+1].cells.item(9).innerHTML);
                                    arr3.push(table.rows[index+1].cells.item(10).innerHTML);
                                    arr3.push(table.rows[index+1].cells.item(11).innerHTML);
                                    arr3.push(document.getElementsByClassName("current_date")[index].value);
                                    arr3.push(item.value);
                                    arr4.push(arr3);
                                    arr3=[];
                                }
                                else
                                    c1+=1;
                            }

                        })
                        if(c1==table.rows.length-1)
                            alert("Please click on the row you want to update/confirm, click again to deselect.");
                        else{
                            if(arr4.length!=0){
                                var jsonString = JSON.stringify(arr4);
                                $.ajax({
                                    url: 'server.php',
                                    type: 'POST',
                                    data:   {"input": "update_records",
                                            "data": jsonString},
                                    success:function(response){
                                        arr4=[];
                                        //qtrid=[];
                                        alert(response);
                                    },
                                    complete:function(){
            
                                    }
                                }); 
                            }
                        }
                        
                    })

                    document.getElementById("confirm").addEventListener("click",function(){
                        c1=0;
                        document.querySelectorAll('.current_read').forEach((item,index) => {
                            if(item.value.toString().length>0 && document.getElementsByClassName("current_date")[index].value.length>0){
                                if(table.rows[index+1].style.backgroundColor=="rgb(118, 230, 238)"){
                                    arr3.push(qtrid[index]);
                                    arr3.push(table.rows[index+1].cells.item(8).innerHTML);
                                    arr3.push(table.rows[index+1].cells.item(9).innerHTML);
                                    arr3.push(table.rows[index+1].cells.item(10).innerHTML);
                                    arr3.push(table.rows[index+1].cells.item(11).innerHTML);
                                    arr3.push(document.getElementsByClassName("current_date")[index].value);
                                    arr3.push(item.value);
                                    arr4.push(arr3);
                                    arr3=[];
                                    arr5.push(index+1);
                                }
                                else
                                    c1+=1;
                                
                            }

                        })
                        if(c1==table.rows.length-1)
                            alert("Please click on the row you want to update/confirm, click again to deselect.");
                        else{
                            if(arr4.length!=0){
                                if(confirm("Do you really want to finalize the rows? This process is irreversible")==true){
                                var jsonString = JSON.stringify(arr4);
                                $.ajax({
                                    url: 'server.php',
                                    type: 'POST',
                                    data:   {"input": "insert_records",
                                            "data": jsonString},
                                    success:function(response){
                                        arr4=[];
                                        for(var i=0; i<arr5.length; i++){
                                            table.rows[arr5[i]].removeEventListener("click",fun);
                                            if(table.rows[arr5[i]].style.backgroundColor=="rgb(118, 230, 238)")
                                                table.rows[arr5[i]].style.backgroundColor="rgb(255, 221, 205)";
                                            document.getElementsByClassName("current_date")[arr5[i]-1].disabled=true;
                                            document.getElementsByClassName("current_read")[arr5[i]-1].disabled=true;
                                            for(var j=0; j<table.rows[arr5[i]].cells.length; j++){
                                                var text=table.rows[arr5[i]].cells.item(j).innerHTML.strike();
                                                table.rows[arr5[i]].cells.item(j).innerHTML=text;
                                            }
                                        }
                                        arr5=[];
                                        qtrid=[];
                                        alert(response);
                                    },
                                    complete:function(){
            
                                    }
                                }); 
                            }
                        }
                        }
                    })
                }
                else{
                    alert("No quarters found");
                    //alert(response);
                    document.getElementById("info").style.display="none";
                }

            },
            complete:function(){

            }
        });
    }
}

function fun(){
    //alert(this);
    if(this.style.backgroundColor!="rgb(118, 230, 238)"){
        this.style.backgroundColor="rgb(118, 230, 238)";
    }
    else
        this.style.backgroundColor="rgb(255, 221, 205)";
}
function parseDateStringToObject(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${month}-${day}-${year}`);
}

document.getElementById("reset").addEventListener("click",function(){
    location.reload();
})

document.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        if(array.length!=0 && arr2.length!=0){
            var jsonString = JSON.stringify(array);
            $.ajax({
                url: 'server.php',
                type: 'POST',
                data: {"input":"calculate_charges",
                        data:jsonString},
                        cache: false,
            success:function(response){
                if(response[0]=='['){
                    
                    document.getElementById("save").disabled=false;
                    document.getElementById("confirm").disabled=false;
                    //document.getElementById("date").disabled=true;
                                                        
                    const arr3=JSON.parse(response);
                    var x= arr3.length*3;
                    for(var i=0; i<x/3; i++){
                        table.rows[arr2[i]+1].cells.item(9).innerHTML=arr3[i][2];
                        table.rows[arr2[i]+1].cells.item(10).innerHTML=arr3[i][1];
                        table.rows[arr2[i]+1].cells.item(11).innerHTML=arr3[i][0];
                    }
                    array=[];
                    arr2=[];
                }
                else
                    console.log(response);
            },
            complete:function(){

            }
        });
    }
    }
});