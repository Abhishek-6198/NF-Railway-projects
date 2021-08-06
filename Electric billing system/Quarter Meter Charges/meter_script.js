var charge1=0;
var days_difference=0;
function get_names() {
    let $select = $("#colony_name");
    //refresh_colony_name();
    $.ajax({
      url: 'meter_server.php',
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
      url: 'meter_server.php',
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
                if (c==true) {
                  window.open("http://localhost//Electric%20billing%20system/Quarter%20master%20entry/index.html");
                } 
          }
        }
        if(!flag){
          let selectedValue = $select.val();
          let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
          $select.html(html).val(selectedValue);
        }
      },
      complete: function() {}
    });
}

const isAlphaNumeric = (str) => /[a-zA-Z\u00C0-\u00FF\d\/]/.test(str);

document.getElementById("date").addEventListener('keypress', (e) => {
    if (!isAlphaNumeric(e.key) && e.cancelable) {
        e.preventDefault();
    }
});


document.getElementById("date").addEventListener("change",() => {
    const arr=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const arr1=document.getElementById("date").value.split("/");
    var date=parseDateStringToObject(document.getElementById("date").value).toString();
    //console.log(date+"------"+arr[parseInt(arr1[2])-1]);
    //console.log(parseInt(arr1[1])-1);
    if(date.length!=12){
        if(document.getElementById("date").value.length==10){
            if(date.includes(arr[parseInt(arr1[1])-1])){
                //console.log(document.getElementById("employee_details").rows.length);
                if( document.getElementById("employee_details").rows.length==0)
                    document.getElementById("colony_name").disabled=false;
                else{
                    document.querySelectorAll('.current_read').forEach((item,index) => {
                        if(item.value.toString().length>0){
                            //console.log(charge1+"-"+days_difference);
                            var date=document.getElementById("date").value;
                            var date1=table.rows[index+1].cells.item(5).innerHTML;
                            const d=date.split("/");
                            const d1=date1.split("/");

                             var dt=d[1]+"/"+d[0]+"/"+d[2];
                            var dt1=d1[1]+"/"+d1[0]+"/"+d1[2];

                            var curr=new Date(dt);
                            var prev=new Date(dt1);
                            var time_difference = curr.getTime() - prev.getTime(); 
                            days_difference = time_difference / (1000 * 60 * 60 * 24);
                            charge1=(item.value-parseInt(table.rows[index+1].cells.item(4).innerHTML))/days_difference;  
                            $.ajax({
                                url: 'meter_server.php',
                                type: 'POST',
                                data:{"input": "calculate_charges",
                                        "rate": charge1,
                                        "days": days_difference},
                                success:function(response){ 
                                    document.getElementById("save").style.display="block"; 
                                    //table.rows[index+1].cells.item(7).innerHTML=charge;
                                    document.getElementById("save").disabled=false;
                                    document.getElementById("date").disabled=true;
                                    if(table.rows[0].cells.length<9){
                                        var cell = table.rows[0].insertCell(8);     
                                        cell.innerHTML = "<b>Total charge (Rs):</b>"   
                                    }
                                    if(table.rows[index+1].cells.length<9){
                                        var cell1 = table.rows[index+1].insertCell(8);
                                        cell1.innerHTML = response;
                                    }
                                    else{
                                        table.rows[index+1].cells.item(8).innerHTML=response;
                                    }
                                },
                                complete:function(){
        
                                }

                             });
                        }
                    })
                }
            }       
            else{
                document.getElementById("colony_name").disabled=true;
                alert("Invalid date");
                document.getElementById("date").value="";
            }
                
        }
        else{
            alert("Date should be in 'dd/mm/yyyy' format");
            document.getElementById("colony_name").disabled=true;
            document.getElementById("date").value="";
        }       
    }
    else{
        document.getElementById("colony_name").disabled=true;
        alert("Invalid date");
        document.getElementById("date").value="";
    }
})
var table=document.getElementById("employee_details");
function fetch(){
    var colony_name=document.getElementById("colony_name").value;
    var colony_type=document.getElementById("colony_type").value;

    if(colony_name!="default" && colony_type!="default"){
        $.ajax({
            url: 'meter_server.php',
            type: 'POST',
            data: { "input": "is it registered?",
                    "c_name":  colony_name,
                    "c_type": colony_type},
            success:function(response){

                var k=1;
                var count=0;
               
                //alert(response);
                if(response[0] == '['){//occupied quarters found
                    document.getElementById("colony_name").disabled=true;
                    document.getElementById("colony_type").disabled=true;
                    document.getElementById("date").disabled=true;
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
    
                    cell.innerHTML = "<b>Qtr_ID:</b>";
                    cell1.innerHTML = "<b>EmpNo:</b>";
                    cell2.innerHTML = "<b>Qtr_No:</b>";
                    cell3.innerHTML = "<b>EmpName:</b>";
                    cell4.innerHTML = "<b>Prev met read:</b>";
                    cell5.innerHTML = "<b>Prev date:</b>";
                    cell6.innerHTML = "<b>Current met read:</b>";
                    cell7.innerHTML = "<b>Total unit consumed</b>"

                    const arr=JSON.parse(response);
                    alert(arr.length+" occupied quarters found in this area");

                    var x=arr.length*6;

                    for(var i=0; i<x/6; i++){
                        var row=table.insertRow(k);
                        var cell = row.insertCell(0);
                        var cell1 = row.insertCell(1);
                        var cell2 = row.insertCell(2);
                        var cell3 = row.insertCell(3);
                        var cell4 = row.insertCell(4);
                        var cell5 = row.insertCell(5);
                        var cell6 = row.insertCell(6);
                        var cell7 = row.insertCell(7);

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
                        var input = document.createElement("input");
                        input.type = "number";
                        input.className="current_read";
                        input.style.width="80px";
                        cell6.appendChild(input);
                        cell7.innerHTML=0;
                        input.autocomplete="off";
                        input.style.textAlign="center";
                        count=0;
                        ++k;
                    }

                    document.querySelectorAll('.current_read').forEach((item,index) => {
                        item.addEventListener('change', event => {
                          item.style.backgroundColor="rgb(255, 246, 205)";
                          var date=document.getElementById("date").value;
                          var date1=table.rows[index+1].cells.item(5).innerHTML;
                          const d=date.split("/");
                          const d1=date1.split("/");

                          var dt=d[1]+"/"+d[0]+"/"+d[2];
                          var dt1=d1[1]+"/"+d1[0]+"/"+d1[2];

                          var curr=new Date(dt);
                          var prev=new Date(dt1);
                          var time_difference = curr.getTime() - prev.getTime(); 
                          days_difference = time_difference / (1000 * 60 * 60 * 24);  

                          charge1=(item.value-parseInt(table.rows[index+1].cells.item(4).innerHTML))/days_difference; 
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
                            document.getElementById("date").disabled=false;
                            document.getElementById("date").value="";
                            item.value="";
                            document.getElementById("save").style.display="none";
                            table.rows[index+1].cells.item(7).innerHTML=0;
                            document.getElementById("save").disabled=true;
                            if(table.rows[0].cells.length===9)
                                table.rows[index+1].cells.item(8).innerHTML=0;
                          }
                          else{  
                             $.ajax({
                                url: 'meter_server.php',
                                type: 'POST',
                                data:{"input": "calculate_charges",
                                        "rate": charge1,
                                        "days": days_difference},
                                success:function(response){ 
                                    document.getElementById("save").style.display="block"; 
                                    table.rows[index+1].cells.item(7).innerHTML=charge;
                                    document.getElementById("save").disabled=false;
                                    document.getElementById("date").disabled=true;
                                    if(table.rows[0].cells.length<9){
                                        var cell = table.rows[0].insertCell(8);     
                                        cell.innerHTML = "<b>Total charge (Rs):</b>"   
                                    }
                                    if(table.rows[index+1].cells.length<9){
                                        var cell1 = table.rows[index+1].insertCell(8);
                                        cell1.innerHTML = response;
                                    }
                                    else{
                                        table.rows[index+1].cells.item(8).innerHTML=response;
                                    }
                                },
                                complete:function(){
        
                                }

                             });
                              
                          }
                        })
                    })

                    document.getElementById("save").addEventListener("click",function(){
                        document.querySelectorAll('.current_read').forEach((item,index) => {
                            if(item.value.toString().length>0){
                                $.ajax({
                                    url: 'meter_server.php',
                                    type: 'POST',
                                    data:{"input": "insert_records",
                                            "rate": table.rows[index+1].cells.item(8).innerHTML,
                                            "qtrid": table.rows[index+1].cells.item(0).innerHTML,
                                            "empno": table.rows[index+1].cells.item(1).innerHTML,
                                            "prev_met": table.rows[index+1].cells.item(4).innerHTML,
                                            "prev_date": table.rows[index+1].cells.item(5).innerHTML,
                                            "curr_date": document.getElementById("date").value,
                                            "curr_met": item.value},
                                    success:function(response){
                                        if(response.includes("-")){
                                            const arr=response.split("-");
                                            table.rows[index+1].cells.item(4).innerHTML=arr[0];
                                            table.rows[index+1].cells.item(5).innerHTML=arr[1];
                                            table.rows[index+1].cells.item(7).innerHTML=0;
                                            table.rows[index+1].cells.item(8).innerHTML=0;
                                            document.getElementById("save").disabled=true;
                                            document.getElementById("date").disabled=false;
                                            document.getElementById("date").value="";
                                            item.value="";
                                        } 
                                        else{
                                            alert(response);
                                        } 
                                    },
                                    complete:function(){
            
                                    }
                                });
                            }

                        })
                    })
                }
                else{
                    //document.getElementById("colony_type").disabled=true;
                    if(response.includes("No quarters are occupied in this colony")){
                        if(confirm("No quarters are currently occupied in this colony. Please ensure that they are occupied from the redirected site")==true){
                            window.open("http://localhost//Electric%20billing%20system/Quarter%20Occupancy%20entry/index.html");
                            location.reload();
                        }
                    }
                    else
                        alert(response);
                }

            },
            complete:function(){

            }
        });
    }
}
function parseDateStringToObject(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${month}-${day}-${year}`);
}