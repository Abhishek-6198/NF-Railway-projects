var charge1=0;
var days_difference=0;
var r=1;
let fixed_charge={};
let c={};
var counter=0;
var array=[];
var arr2=[];
var arr4=[];
var qtrid=[];
var flag1=false;
//console.log(document.getElementById("colony_type").selectedIndex);
var table=document.getElementById("employee_details");
var n=sessionStorage.getItem("name");
var t=sessionStorage.getItem("type");
if (n==null || t=="Meter reader")
    window.open("http://localhost//Electric%20billing%20system/Login%20screen/index.html","_self");
document.addEventListener("keypress",function(event){
    if(event.code=="Enter")
        document.getElementById("save").click();
})
function get_names() {
    let $select = $("#colony_name");
    //refresh_colony_name();
    $.ajax({
      url: 'meter_server.php',
      type: 'POST',
      data: { "input": "names" }, 
      dataType: 'json', 
      success: function(response) {
          response.sort();
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
      url: 'meter_server.php',
      type: 'POST',
      data: { "input": "book",
              "name": $("#colony_name").val(),
              "type": $("#colony_type").val()}, 
      dataType: 'json', // add this property to avoid the need to call JSON.parse in success
      success: function(response) {
        let selectedValue = $select.val();
        let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
        $select.html(html).val(selectedValue);
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
                            var date1=table.rows[index+1].cells.item(6).innerHTML;
                            const d=date.split("/");
                            const d1=date1.split("/");

                             var dt=d[1]+"/"+d[0]+"/"+d[2];
                            var dt1=d1[1]+"/"+d1[0]+"/"+d1[2];

                            var curr=new Date(dt);
                            var prev=new Date(dt1);
                            var time_difference = curr.getTime() - prev.getTime(); 
                            days_difference = time_difference / (1000 * 60 * 60 * 24);
                            charge1=item.value-parseInt(document.getElementsByClassName("previous_read")[index].value);  
                            table.rows[index+1].cells.item(8).innerHTML=charge1;
                            var temp=[];
                            temp.push(charge1,qtrid[index],table.rows[index+1].cells.item(6).innerHTML, document.getElementById("date").value);
                            array.push(temp);   
                            arr2.push(index);
                        }
                    })
                    
                    document.querySelectorAll('.previous_read').forEach((item,index) => {
                        item.addEventListener("change",function(){
                            if(item.value.toString().length>0){
                                if(document.getElementsByClassName('current_read')[index].value!=""){
                                    document.getElementsByClassName('current_read')[index].value="";
                                    table.rows[index+1].cells.item(8).innerHTML='0';
                                    if(table.rows[index+1].cells.length==10)
                                        table.rows[index+1].cells.item(9).innerHTML='0';
                                    document.getElementById("save").disabled=true;
                                }
                            }
                        })
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


function fetch(){
    var colony_name=document.getElementById("colony_name").value;
    var colony_type=document.getElementById("colony_type").value;
    var book_no=document.getElementById("book-no").value;
    
    if(colony_name!="default" && colony_type!="default" && book_no!="default"){
        //console.log(page_no);
        $.ajax({
            url: 'meter_server.php',
            type: 'POST',
            data: { "input": "is it registered?",
                    "c_name":  colony_name,
                    "c_type": colony_type,
                    "c_book": book_no
                },
            success:function(response){

                var k=1;
                var count=0;
                if(table.rows.length>0){
                    while(table.rows.length!=0)
                        table.deleteRow(0);
                }
                //alert(response);
                if(response[0] == '['){//occupied quarters found
                    document.getElementById("info").style.display="block";
                    document.getElementById("colony_name").disabled=true;
                    document.getElementById("colony_type").disabled=true;
                    //document.getElementById("book-no").disabled=true;
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
                    var cell8 = row.insertCell(8);
    
                    cell.innerHTML = "<b>Page:</b>";
                    cell1.innerHTML = "<b>EmpNo:</b>";
                    cell2.innerHTML = "<b>EmpName:</b>";
                    cell3.innerHTML = "<b>Retirement date:</b>";
                    cell4.innerHTML = "<b>Qtr_No</b>";
                    cell5.innerHTML = "<b>Prev met read:</b>";
                    cell6.innerHTML = "<b>Prev date:</b>";
                    cell7.innerHTML = "<b>Current met read:</b>";
                    cell8.innerHTML = "<b>Total unit consumed</b>"

                    table.rows[0].style.position="sticky";
                    table.rows[0].style.top="0";
                    table.rows[0].style.backgroundColor="rgb(233, 124, 74)";

                    const arr=JSON.parse(response);
                    //console.log(arr.length+" occupied quarters found in this area");
                    alert(arr.length+" occupied quarters found in this area");

                    var x=arr.length*8;

                    for(var i=0; i<x/8; i++){
                        var row=table.insertRow(k);
                        var cell = row.insertCell(0);
                        var cell1 = row.insertCell(1);
                        var cell2 = row.insertCell(2);
                        var cell3 = row.insertCell(3);
                        var cell4 = row.insertCell(4);
                        var cell5 = row.insertCell(5);
                        var cell6 = row.insertCell(6);
                        var cell7 = row.insertCell(7);
                        var cell8 = row.insertCell(8);

                        cell.innerHTML=arr[i][7];
                        ++count;
                        cell1.innerHTML=arr[i][1];
                        ++count;
                        cell2.innerHTML=arr[i][3];
                        ++count;
                        cell3.innerHTML=arr[i][6];
                        ++count;
                        cell4.innerHTML=arr[i][2];
                        ++count;
                        //cell5.innerHTML=arr[i][4];
                        



                        ++count;
                        //cell5.innerHTML=arr[i][5];
                        var string="";
                        arr4=arr[i][5].split('/');
                        string+=arr4[1]+'/'+arr4[0]+'/'+arr4[2];

                        var day = new Date(string);


                        var nextDay = new Date(day);
                        nextDay.setDate(day.getDate() + 1);
                        cell6.innerHTML=convertDate(nextDay);
                        ++count;
                        qtrid.push(arr[i][0]);
                        var input = document.createElement("input");
                        input.type = "number";
                        input.className="current_read";
                        input.style.width="80px";
                        input.style.textAlign="center";
                        cell7.appendChild(input);

                        var input = document.createElement("input");
                        input.type = "number";
                        input.className="previous_read";
                        input.style.width="80px";
                        input.style.textAlign="center";
                        cell5.appendChild(input);
                        input.value=arr[i][4];

                        cell8.innerHTML=0;
                        input.autocomplete="off";
                        input.style.textAlign="center";
                        count=0;
                        ++k;
                    }

                    document.querySelectorAll('.current_read').forEach((item,index) => {
                        item.addEventListener('change', event => {
                          item.style.backgroundColor="rgb(255, 246, 205)";
                          var date=document.getElementById("date").value;
                          var date1=table.rows[index+1].cells.item(6).innerHTML;
                          const d=date.split("/");
                          const d1=date1.split("/");

                          var dt=d[1]+"/"+d[0]+"/"+d[2];
                          var dt1=d1[1]+"/"+d1[0]+"/"+d1[2];

                          var curr=new Date(dt);
                          var prev=new Date(dt1);
                          var time_difference = curr.getTime() - prev.getTime(); 
                          days_difference = time_difference / (1000 * 60 * 60 * 24);  

                          charge1=(item.value-parseInt(document.getElementsByClassName("previous_read")[index].value))/days_difference; 
                          var charge=item.value-parseInt(document.getElementsByClassName("previous_read")[index].value); 

                          if(curr<=prev || item.value<=parseInt(document.getElementsByClassName("previous_read")[index].value) || date.length===0){
                            if(curr<=prev){
                                alert("The current meter read date must be greater than the previous meter read date.");
                            }
                            else if(item.value<=parseInt(document.getElementsByClassName("previous_read")[index].value)){
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
                            table.rows[index+1].cells.item(8).innerHTML=0;
                            document.getElementById("save").disabled=true;
                            if(table.rows[index+1].cells.length===10)
                                table.rows[index+1].cells.item(9).innerHTML=0;
                          }
                          else{  
                              document.getElementById("save").disabled=true;
                              table.rows[index+1].cells.item(8).innerHTML=charge;
                              var temp=[];
                              temp.push(charge,qtrid[index],table.rows[index+1].cells.item(6).innerHTML,document.getElementById("date").value);
                              array.push(temp);
                              arr2.push(index);
                          }
                        })
                    })

                    document.querySelectorAll('.current_read').forEach((item,index) => {
                        item.addEventListener('keydown', event => {
                            document.getElementById("save").disabled=true;
                        })
                    })

                    document.querySelectorAll('.previous_read').forEach((item,index) => {
                        item.addEventListener('keydown', event => {
                            document.getElementById("save").disabled=true;
                        })
                    })
                    //console.log(arr1.length+" "+arr2.length);
                    document.querySelectorAll('.previous_read').forEach((item,index) => {
                        item.addEventListener("change",function(){
                            if(item.value.toString().length>0){
                                if(document.getElementsByClassName('current_read')[index].value!=""){
                                    document.getElementsByClassName('current_read')[index].value="";
                                    table.rows[index+1].cells.item(8).innerHTML='0';
                                    if(table.rows[index+1].cells.length==10)
                                        table.rows[index+1].cells.item(9).innerHTML='0';
                                    document.getElementById("save").disabled=true;
                                }
                            }
                        })
                    })
                    document.getElementById("save").addEventListener("click",function(){
                        //counter=0;
                        if(flag1){
                            document.querySelectorAll('.current_read').forEach((item,index) => {
                                if(item.value.toString().length>0){
                                    $.ajax({
                                        url: 'meter_server.php',
                                        type: 'POST',
                                        data:{"input": "insert_records",
                                              "rate": table.rows[index+1].cells.item(9).innerHTML,
                                              "charge":c[index],
                                              "unit_consumed":table.rows[index+1].cells.item(8).innerHTML,
                                              "fixed_charge":fixed_charge[index],
                                              "qtr_no":table.rows[index+1].cells.item(4).innerHTML,
                                              "name":table.rows[index+1].cells.item(2).innerHTML,
                                              "qtrid": qtrid[index],
                                              "empno": table.rows[index+1].cells.item(1).innerHTML,
                                              "prev_met": document.getElementsByClassName("previous_read")[index].value,
                                              "prev_date": table.rows[index+1].cells.item(6).innerHTML,
                                              "curr_date": document.getElementById("date").value,
                                              "curr_met": item.value},
                                        success:function(response){
                                            if(response.includes("-")){
                                                const arr=response.split("-");
                                                document.getElementsByClassName("previous_read")[index].value=arr[0];
                                                //table.rows[index+1].cells.item(5).innerHTML=arr[1];
                                                var string="";
                                                arr4=[];
                                                arr4=arr[1].split('/');
                                                string+=arr4[1]+'/'+arr4[0]+'/'+arr4[2];

                                                var day = new Date(string);


                                                var nextDay = new Date(day);
                                                nextDay.setDate(day.getDate() + 1);
                                                table.rows[index+1].cells.item(6).innerHTML=convertDate(nextDay);
                                                table.rows[index+1].cells.item(8).innerHTML=0;
                                                table.rows[index+1].cells.item(9).innerHTML=0;
                                                setTimeout(function(){
                                                    for(var i=0; i<table.rows[index+1].cells.length; i++){
                                                        table.rows[index+1].cells.item(i).style.fontWeight = "500";
                                                }},2000);
                                                setTimeout(function(){
                                                    for(var i=0; i<table.rows[index+1].cells.length; i++){
                                                        table.rows[index+1].cells.item(i).style.fontWeight = "900";
                                                }},1000);
                                                table.rows[index+1].scrollIntoView({
                                                    behavior: 'smooth',
                                                block: 'center'
                                                });
                                                document.getElementById("save").disabled=true;
                                                document.getElementById("date").disabled=false;
                                                document.getElementById("date").value="";
                                                //window.scrollTo(table.rows[index+1]);
                                                item.value="";
                                                charge1=0;
                                                days_difference=0;
                                                r=1;
                                                //qtrid=[];
                                                counter=0; 
                                            } 
                                            else{
                                                alert(response);
                                            } 
                                        },
                                        complete:function(){
            
                                        }
                                    });
                                    counter+=1;
                                }

                            })
                            //qtrid=[];
                            fixed_charge=[];
                            c=[];
                        }
                        else{
                            alert("Please press the Numpad Enter key to calculate the charges, before pressing Save");
                        }
                })
            }
            else{
                //document.getElementById("colony_type").disabled=true;
                document.getElementById("info").style.display="none";
                if(response.includes("No quarters are registered")){
                    if(confirm("No quarters are currently registered in this colony. Please ensure that they are registered from the redirected site")==true && (sessionStorage.getItem("type")=="Admin" || sessionStorage.getItem("type")=="Meter reader inspector")){
                        window.open("http://localhost//Electric%20billing%20system/Quarter_master_entry/index.html","_self");
                        //location.reload();
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

document.getElementById("reset").addEventListener("click",function(){
    location.reload()
})

document.addEventListener("keyup", function(event) {
    if (event.code === "NumpadEnter") {
        if(array.length!=0 && arr2.length!=0){
            flag1=true;
            var jsonString = JSON.stringify(array);
            $.ajax({
                url: 'meter_server.php',
                type: 'POST',
                data: {"input":"calculate_charges",
                        data:jsonString},
                        cache: false,
            success:function(response){
                //console.log(response);
                if(response[0]=='['){
                    document.getElementById("save").style.display="block";
                    document.getElementById("save").disabled=false;
                    document.getElementById("date").disabled=true;
                    if(table.rows[0].cells.length<10){
                        var cell = table.rows[0].insertCell(9);     
                        cell.innerHTML = "<b>Total charge (Rs):</b>"   
                    }
                    const arr3=JSON.parse(response);
                    var x = arr3.length*3;
                    for(var i=0; i<x/3; i++){
                        //alert(arr3[i]);
                        if(table.rows[arr2[i]+1].cells.length<10){
                            var cell1 = table.rows[arr2[i]+1].insertCell(9);
                            cell1.innerHTML = arr3[i][0];
                        }
                        else{
                            table.rows[arr2[i]+1].cells.item(9).innerHTML=arr3[i][0];
                        }
                        c[arr2[i]]=arr3[i][2];
                        fixed_charge[arr2[i]]=arr3[i][1];
                    }
                    array=[];
                    arr2=[];
                    //qtrid=[];
                    //console.log(c);
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
function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }