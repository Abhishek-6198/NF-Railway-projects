var n=sessionStorage.getItem("name");
var key=sessionStorage.getItem("search");
if (n==null)
    window.open("http://localhost//Electric%20billing%20system/Login%20screen/index.html","_self");
else{
    var table = document.getElementById("first_table");
    var table1 = document.getElementById("second_table");
    if(key=="emp"){
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML="<b>Employee no/name:</b>";
        cell1.style.textAlign="center";

        var input = document.createElement("input");
        input.type = "text";
        input.id="emp_id"
        input.style.width="150px";
        //console.log(input.size)
        input.style.textAlign="center";
        cell2.appendChild(input);
        cell2.style.textAlign="center";
        document.addEventListener("keypress",function(event){
            if(event.code=="Enter")
              document.getElementById("submit").click();
          })
        document.getElementById("submit").addEventListener("click", function(event) {
            if(document.getElementById("emp_id").value!=""){
                $.ajax({
                    url: 'backend.php',
                    type: 'POST',
                    data:{ "input":"fetch qrtr",
                           "data":document.getElementById("emp_id").value
                },
                success:function(response){
                    if(response[0]=='['){
                        document.getElementById("reset").disabled=false;
                        document.getElementById("emp_id").disabled=true;
                        const arr=JSON.parse(response);
                        var len=arr.length*6;
                        var row=table1.insertRow(table1.rows.length);
                        var cell0=row.insertCell(0);
                        var cell1=row.insertCell(1);
                        var cell2=row.insertCell(2);
                        var cell3=row.insertCell(3);
                        var cell4=row.insertCell(4);
                        var cell5=row.insertCell(5);

                        cell0.innerHTML="<b>QtrNo</b>";
                        cell1.innerHTML="<b>QtrType</b>";
                        cell2.innerHTML="<b>ColonyName</b>";
                        cell3.innerHTML="<b>Occupied by</b>";
                        cell4.innerHTML="<b>Occupied on</b>";
                        cell5.innerHTML="<b>Vacated on</b>";

                        cell0.style.height="2em";
                        cell1.style.height="2em";
                        cell2.style.height="2em";
                        cell3.style.height="2em";
                        cell4.style.height="2em";
                        cell5.style.height="2em";

                
                        table1.rows[0].style.position="sticky";
                        table1.rows[0].style.top="0";
                        table1.rows[0].style.backgroundColor="rgb(139, 238, 255)";

                        for(var i=0; i<len/6; i++){
                            var row=table1.insertRow(table1.rows.length);
                            var cell0=row.insertCell(0);
                            var cell1=row.insertCell(1);
                            var cell2=row.insertCell(2);
                            var cell3=row.insertCell(3);
                            var cell4=row.insertCell(4);
                            var cell5=row.insertCell(5);

                            cell0.innerHTML=arr[i][0];
                            cell1.innerHTML=arr[i][1];
                            cell2.innerHTML=arr[i][2];
                            cell3.innerHTML=arr[i][3];
                            cell4.innerHTML=arr[i][4];
                            cell5.innerHTML=arr[i][5];
                        }
                    }
                    else
                        alert(response);
                },
                complete:function(){

                }
                });
            
        }
        else
            alert("Please type the emp no/name and then press enter key to display results");
        })

        document.getElementById("reset").addEventListener("click",function(){
            document.getElementById("emp_id").value="";
            while(table1.rows.length>0)
                table1.deleteRow(0);
            document.getElementById("emp_id").disabled=false;
            document.getElementById("reset").disabled=true;
        })
    }
    else if(key=="qtr"){
        document.getElementById("fh").innerHTML="Quarter info";
        document.getElementById("sh").innerHTML="Employee info";
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML="<b>Colony name:</b>&ensp;";
        cell1.style.textAlign="center";
        cell1.style.width="15em";


        cell2.innerHTML="<b>Quarter type:</b>&ensp;";
        cell2.style.textAlign="center";

        cell3.innerHTML="<b>Quarter no:</b>&ensp;";
        cell3.style.textAlign="center";


        var selectList = document.createElement("select");
        selectList.id = "c_name";
        selectList.style.width="100%";
        selectList.style.textAlign="center";

        var selectList1 = document.createElement("select");
        selectList1.id = "c_type";
        selectList1.style.width="80%";
        selectList1.style.textAlign="center";
        //selectList1.disabled=true;

        var selectList2 = document.createElement("select");
        selectList2.id = "qrtr_no";
        selectList2.style.width="80%";
        selectList2.style.textAlign="center";
        selectList.style.fontSize="small";
        selectList1.style.fontSize="small";
        selectList2.style.fontSize="small";
        //selectList2.disabled=true;

        cell1.appendChild(selectList);
        cell2.appendChild(selectList1);
        cell3.appendChild(selectList2);
        cell1.style.textAlign="center";
        cell2.style.textAlign="center";
        cell3.style.textAlign="center";
        selectList.addEventListener("click",function(){
            let $select = $("#c_name");
            $.ajax({
              url: 'backend.php',
              type: 'POST',
              data: { "input": "names" }, 
              dataType: 'json', 
              success: function(response) {
                  response.sort();
                let selectedValue = $select.val();
                let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
                $select.html(html).val(selectedValue);
              },
              complete: function() {}
            });
        })
        
        selectList1.addEventListener("click",function(){
            let flag=false; 
            let $select = $("#c_type");
            $.ajax({
                url: 'backend.php',
                type: 'POST',
                data: { "input": "types",
                        "name": $("#c_name").val() }, 
                dataType: 'json', // add this property to avoid the need to call JSON.parse in success
                success: function(response) {
                  for(var i=0; i<response.length; i++){
                    if(response[i].includes("No")){
                      flag=true;
                      document.getElementById("c_type").disabled=true;
                      var c= confirm(response[i]);
                          if (c==true) {
                            window.open("http://localhost//Electric%20billing%20system/Quarter_master_entry/index.html");
                          } 
                    }
                  }
                  if(!flag){
                    let selectedValue = $select.val();
                    let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
                    $select.html(html).val(selectedValue);
                    document.getElementById("qrtr_no").disabled=false;
                  }
                },
                complete: function() {}
              });
        })

        selectList2.addEventListener("click",function(){
            let flag=false;
            let $select = $("#qrtr_no");
            //refresh_quarter_no();
            $.ajax({
                url: 'backend.php',
                type: 'POST',
                data: { "input": "qrtr_no",
                        "type": $("#c_type").val(),
                        "name": $("#c_name").val() }, // should 'code' be a variable...?
                dataType: 'json', // add this property to avoid the need to call JSON.parse in success
                success: function(response) {
                for(var i=0; i<response.length; i++){
                    if(response[i].includes("No")){
                    flag=true;
                    var c= confirm(response[i]);
                        if (c==true) {
                            window.open("http://localhost//Electric%20billing%20system/Quarter_master_entry/index.html");
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
        })
        document.addEventListener("keypress",function(event){
            if(event.code=="Enter")
              document.getElementById("submit").click();
          })
        document.getElementById("submit").addEventListener("click", function(event) {
            if(document.getElementById("c_name").value!="" && document.getElementById("c_type").value!="" && document.getElementById("qrtr_no").value!=""){
                    $.ajax({
                        url: 'backend.php',
                        type: 'POST',
                        data:{"input":"fetch emp", 
                              "c_name":  $("#c_name").val(),
                              "c_type": $("#c_type").val(),
                              "q_no": $("#qrtr_no").val()
                        },
                        success:function(response){
                            if(response[0]=='['){
                                //document.getElementById("reset").disabled=false;
                                //document.getElementById("qtr_no").disabled=true;
                                const arr=JSON.parse(response);
                                var len=arr.length*7;
                                var row=table1.insertRow(table1.rows.length);
                                var cell0=row.insertCell(0);
                                var cell1=row.insertCell(1);
                                var cell2=row.insertCell(2);
                                var cell3=row.insertCell(3);
                                var cell4=row.insertCell(4);
                                var cell5=row.insertCell(5);
                                var cell6=row.insertCell(6);

                                cell0.innerHTML="<b>Occupied by</b>";
                                cell1.innerHTML="<b>EmpNo</b>";
                                cell2.innerHTML="<b>Designation</b>";
                                cell3.innerHTML="<b>BillUnit</b>";
                                cell4.innerHTML="<b>Station</b>";
                                cell5.innerHTML="<b>Occupied on</b>";
                                cell6.innerHTML="<b>Vacated on</b>";

                                cell0.style.height="2em";
                                cell1.style.height="2em";
                                cell2.style.height="2em";
                                cell3.style.height="2em";
                                cell4.style.height="2em";
                                cell5.style.height="2em";
                                cell6.style.height="2em";


                                table1.rows[0].style.position="sticky";
                                table1.rows[0].style.top="0";
                                table1.rows[0].style.backgroundColor="rgb(139, 238, 255)";

                                for(var i=0; i<len/7; i++){
                                    var row=table1.insertRow(table1.rows.length);
                                    var cell0=row.insertCell(0);
                                    var cell1=row.insertCell(1);
                                    var cell2=row.insertCell(2);
                                    var cell3=row.insertCell(3);
                                    var cell4=row.insertCell(4);
                                    var cell5=row.insertCell(5);
                                    var cell6=row.insertCell(6);

                                    cell0.innerHTML=arr[i][0];
                                    cell1.innerHTML=arr[i][1];
                                    cell2.innerHTML=arr[i][4];
                                    cell3.innerHTML=arr[i][5];
                                    cell4.innerHTML=arr[i][6];
                                    cell5.innerHTML=arr[i][2];
                                    cell6.innerHTML=arr[i][3];
                                }
                            }
                            else
                                alert(response);
                        },
                        complete:function(){

                        }
                    });
                
            }
            else
                alert("Please select all values");
        })

        document.getElementById("reset").addEventListener("click",function(){
            document.getElementById("qrtr_no").value="";
            document.getElementById("c_name").value="";
            document.getElementById("c_type").value="";
            while(table1.rows.length>0)
                table1.deleteRow(0);
            //document.getElementById("reset").disabled=true;
        })
    }

    
}