var counter=0;
var count1=0;
var count2=0;
var count3=0;
var count4=0;
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

function get_numbers() {
  let flag=false;
  let $select = $("#quarter_no");
  //refresh_quarter_no();
  $.ajax({
    url: 'server.php',
    type: 'POST',
    data: { "input": "numbers",
            "type": $("#colony_type").val(),
            "name": $("#colony_name").val() }, // should 'code' be a variable...?
    dataType: 'json', // add this property to avoid the need to call JSON.parse in success
    success: function(response) {
      for(var i=0; i<response.length; i++){
        if(response[i].includes("No")){
          flag=true;
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


function check(){
  var colony_name=document.getElementById("colony_name").value;
  var colony_type=document.getElementById("colony_type").value;
  var quarter_no=document.getElementById("quarter_no").value;

  if(colony_name!="default" && colony_type!="default" && quarter_no!="default" ){
    //console.log("selected");
    $.ajax({
      url: 'server.php',
      type: 'POST',
      data: { "input": "is it registered?",
              "c_name":  colony_name,
              "c_type": colony_type,
              "q_no": quarter_no}, // should 'code' be a variable...?
      success: function(response) {

        document.getElementById("colony_name").disabled=true;
        document.getElementById("colony_type").disabled=true;
        document.getElementById("quarter_no").disabled=true;
        //const arr=JSON.parse(response);
        //alert(arr.length);

        var input = document.createElement("input");
        input.type = "text";

        var table = document.getElementById("quarter_details");

        if(response[0]=='['){ // Vac=null
          const arr=JSON.parse(response);
          if(arr.length!=1){
            input.placeholder="dd/mm/yyyy";
            count1+=1;
            console.log("count1");
            input.id="vac";
            
            var row = table.insertRow(3);
            var cell1 = row.insertCell(0);
            var cell2=row.insertCell(1);

            var row = table.insertRow(4);
            var cell3 = row.insertCell(0);
            var cell4=row.insertCell(1);

            var row = table.insertRow(5);
            var cell5 = row.insertCell(0);
            var cell6=row.insertCell(1);

            var row = table.insertRow(6);
            var cell7 = row.insertCell(0);
            var cell8=row.insertCell(1);

            cell1.innerHTML="Occupied Quarter:"
            cell2.innerHTML=arr[0];

            cell3.innerHTML="Qccupied by:";
            cell4.innerHTML=arr[3];

            cell5.innerHTML="Occupied on:";
            cell6.innerHTML=arr[1];

            cell7.innerHTML="<b>Date of vacation:</b>";
            cell8.appendChild(input);

            document.getElementById("save").style.top="53em";
            document.getElementById("reset").style.top="53em";

            input.addEventListener("change",() => check_date());
          }
          else{ //all vacated
            count2+=0;
            console.log("count2");
            input.id="emp_no";
            input.placeholder="Your 11 digit emp no";
            //document.getElementById("emp_no").disabled=false;
            //input.onchange=find_emp(input.value);
            //input.onkeyup=forceUpper(input.value);
            input.size=20;
            input.addEventListener("change",() => find_emp(input.value));
            input.addEventListener("keyup",() => input.value=input.value.toUpperCase());

            var row = table.insertRow(3);
            var cell1 = row.insertCell(0); //Quarter ID
            var cell2=row.insertCell(1);

            cell1.innerHTML="Quarter ID:";
            cell2.innerHTML=arr[0];

            var row = table.insertRow(4);
            var cell3 = row.insertCell(0); //Employee No
            var cell4=row.insertCell(1);

            cell3.innerHTML="<b>Employee No:</b>";
            cell4.appendChild(input); 

            document.getElementById("save").style.top="45em";
            document.getElementById("reset").style.top="45em";
          }
        }
        else{
          alert(response);
        }
      },
      complete: function() {}
    });
  }
}


function find_emp(str){
  
  if(str.length===11){

    var input = document.createElement("input");
    input.type = "text";
    input.placeholder="dd/mm/yyyy";
    
    $.ajax({
      url: 'server.php',
      type: 'POST',
      data: { "input": "emp",
              "emp_no":  str},
      //dataType: 'json', 
      success: function(response) { 
        //console.log(typeof(response));
        if(response[0]=='['){
          document.getElementById("emp_no").disabled=true;
          const arr=JSON.parse(response);
          var table = document.getElementById("quarter_details");
          //table.style.display="block";
          if(arr.length==4){ //employee doesn't have any occupied quarters
            count3+=1;
            console.log("count3");
            var row = table.insertRow(5);
            var cell1 = row.insertCell(0);
            var cell2=row.insertCell(1);

            var row1=table.insertRow(6)
            var cell3 = row1.insertCell(0);
            var cell4=row1.insertCell(1);

            var row2=table.insertRow(7)
            var cell5 = row2.insertCell(0);
            var cell6 = row2.insertCell(1);

            var row3=table.insertRow(8)
            var cell7 = row3.insertCell(0);
            var cell8 = row3.insertCell(1);

            var row4=table.insertRow(9)
            var cell9 = row4.insertCell(0);
            var cell10 = row4.insertCell(1);

            cell1.innerHTML="Name:";
            cell2.innerHTML=arr[0];

            cell3.innerHTML="Designation:";
            cell4.innerHTML=arr[1];

            cell5.innerHTML="Billunit:";
            cell6.innerHTML=arr[2];

            cell7.innerHTML="Station:";
            cell8.innerHTML=arr[3];

            cell9.innerHTML="<b>Date of occupancy:</b>";
            cell10.appendChild(input);
            input.id="occ";
            input.addEventListener("change",() => check_date());
            document.getElementById("save").style.top="53em";
            document.getElementById("reset").style.top="53em";
          }
          else if(arr.length>4){ //employee has occupied quarters
            count4+=1;
            console.log("count4");
            input.id="vac";

            var row = table.insertRow(5);
            var cell1 = row.insertCell(0);
            var cell2=row.insertCell(1);

            var row1=table.insertRow(6)
            var cell3 = row1.insertCell(0);
            var cell4=row1.insertCell(1);

            var row2=table.insertRow(7)
            var cell5 = row2.insertCell(0);
            var cell6=row2.insertCell(1);

            cell1.innerHTML="Quarter occupied:";
            cell2.innerHTML=arr[4];

            cell3.innerHTML="Occupied on:";
            cell4.innerHTML=arr[5];

            cell5.innerHTML="<b>Date of Vacation:</b>";
            cell6.appendChild(input);
            input.addEventListener("change",() => check_date());
            document.getElementById("save").style.top="53em";
            document.getElementById("reset").style.top="53em";

            alert("The quarter "+table.rows[3].cells.item(1).innerHTML+" will not be  available for occupation as the employee has an unvacated quarter "+table.rows[5].cells.item(1).innerHTML)
          }
        }
        else{
          document.getElementById("emp_no").value="";
          alert(response);
        }
         
        //$("#emp_details").html(response);
      },
      complete: function() {}
    });
  }
  else{
    //alert("Incorrect emp no");
    str.value="";
  }
    
}

function check_date(){
  if(count1>0){

  var dateParts = document.getElementById("vac").value;
  var dateparts2=document.getElementById("quarter_details").rows[5].cells.item(1).innerHTML;

  if(parseDateStringToObject(dateParts)>parseDateStringToObject(dateparts2)){
    document.getElementById("save").disabled=false;
  }
  }
  else if(count2>0 || count3>0){
      var dateParts = document.getElementById("occ").value;
      //console.log(parseDateStringToObject(dateParts).toString().length);
      if(parseDateStringToObject(dateParts).toString().length>10)
        document.getElementById("save").disabled=false;
  }
  else if(count4>0){
  
  var dateParts = document.getElementById("vac").value;
  var dateParts2 = document.getElementById("quarter_details").rows[6].cells.item(1).innerHTML;
  if(parseDateStringToObject(dateParts)>parseDateStringToObject(dateParts2))
    document.getElementById("save").disabled=false;
  
}
}

function send_message(){

      var datum={"input": "register"};
      if(count1>0){
        datum["qtr_id"] = document.getElementById("quarter_details").rows[3].cells.item(1).innerHTML;
        datum["emp_name"]=document.getElementById("quarter_details").rows[4].cells.item(1).innerHTML;
        datum["count"]="count1";
        datum["vac_date"] = document.getElementById("vac").value;
      }
      else if(count3>0){
        datum["emp_no"]=document.getElementById("emp_no").value;
        datum["qtr_id"]=document.getElementById("quarter_details").rows[3].cells.item(1).innerHTML;
        datum["occ_date"]=document.getElementById("occ").value;
      }
      else if(count4>0){
        datum["emp_no"]=document.getElementById("emp_no").value;;
        datum["qtr_id"]=document.getElementById("quarter_details").rows[5].cells.item(1).innerHTML;
        datum["vac_date"] = document.getElementById("vac").value;
      }
      console.log(datum);
        $.ajax({
          url: 'server.php',
          type: 'POST',
          data: datum, 
          success: function(response) { 
            var c= confirm(response);
            if (c==true||c==false) {          
                window.location.reload();
            } 
          },
          complete: function() {}
        });
      
  
}

function erase(){
  location.reload();
}

function refresh_colony_name(){
  var select = document.getElementById("colony_name");
  var length = select.options.length;
  for (i = length-1; i >= 1; i--) {
    select.options[i] = null;
  }
}

function refresh_colony_type(){
  var select = document.getElementById("colony_type");
  var length = select.options.length;
  for (i = length-1; i >= 1; i--) {
    select.options[i] = null;
  }
}

function refresh_quarter_no(){
  var select = document.getElementById("quarter_no");
  var length = select.options.length;
  for (i = length-1; i >= 1; i--) {
    select.options[i] = null;
  }
}

function show_table(){
 
  counter+=1;
  if(counter%2!=0)
    document.getElementById("emp_details").style.display="block";
  else
    document.getElementById("emp_details").style.display="none";
}

function parseDateStringToObject(dateStr) {
  const [day, month, year] = dateStr.split('/');
  return new Date(`${month}-${day}-${year}`);
}