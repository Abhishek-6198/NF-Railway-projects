var counter=0;
var count1=0;
var count2=0;
var count3=0;
var count4=0;
var n=sessionStorage.getItem("name");
var t=sessionStorage.getItem("type");
if (n==null || t=="Senior meter reader" || t=="Meter reader")
    window.open("http://localhost//Electric%20billing%20system/Login%20screen/index.html","_self");
document.addEventListener("keypress",function(event){
  if(event.code=="Enter")
      document.getElementById("save").click();
})
function get_names() {
    let $select = $("#colony_name");
    //refresh_colony_name();
    $.ajax({
      url: 'server.php',
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
          document.getElementById("quarter_no").disabled=false;
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
              if (c==true && sessionStorage.getItem("type")=="Admin") {
                window.open("http://localhost//Electric%20billing%20system/Quarter_master_entry/index.html","_self");
              } 
        }
      }
      if(!flag){
        let selectedValue = $select.val();
        let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
        $select.html(html).val(selectedValue);
        document.getElementById("book_no").disabled=false;
      }
    },
    complete: function() {}
  });
}

function get_books(){
//let flag=false; 
    let $select = $("#book_no");
    //refresh_colony_type();
    $.ajax({
      url: 'server.php',
      type: 'POST',
      data: { "input": "book",
              "name": $("#colony_name").val(),
              "type": $("#colony_type").val(),
              "number": $("#quarter_no").val()}, 
      dataType: 'json', // add this property to avoid the need to call JSON.parse in success
      success: function(response) {
        let selectedValue = $select.val();
        let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
        $select.html(html).val(selectedValue);
        document.getElementById("page_no").disabled=false;
      },
      complete: function() {}
    });
}

function get_pages(){
//let flag=false; 
 let $select = $("#page_no");
 //refresh_colony_type();
 $.ajax({
   url: 'server.php',
   type: 'POST',
   data: { "input": "page",
           "name": $("#colony_name").val(),
           "type": $("#colony_type").val(),
           "number": $("#quarter_no").val(),
           "book": $("#book_no").val()}, 
   dataType: 'json', // add this property to avoid the need to call JSON.parse in success
   success: function(response) {
     let selectedValue = $select.val();
     let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
     $select.html(html).val(selectedValue);
   },
   complete: function() {}
 });
}

function check(){
  var colony_name=document.getElementById("colony_name").value;
  var colony_type=document.getElementById("colony_type").value;
  var quarter_no=document.getElementById("quarter_no").value;
  var book_no=document.getElementById("book_no").value;
  var page_no=document.getElementById("page_no").value;

  if(colony_name!="default" && colony_type!="default" && quarter_no!="default" && book_no!="default" && page_no!="default" ){
    //console.log("selected");
    $.ajax({
      url: 'server.php',
      type: 'POST',
      data: { "input": "is it registered?",
              "c_name":  colony_name,
              "c_type": colony_type,
              "q_no": quarter_no,
              "book": book_no,
              "page": page_no}, // should 'code' be a variable...?
      success: function(response) {

        document.getElementById("colony_name").disabled=true;
        document.getElementById("colony_type").disabled=true;
        document.getElementById("quarter_no").disabled=true;
        document.getElementById("book_no").disabled=true;
        document.getElementById("page_no").disabled=true;
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
            //console.log("count1");
            input.id="vac";
            
            var row = table.insertRow(5);
            var cell1 = row.insertCell(0);
            var cell2=row.insertCell(1);

            var row = table.insertRow(6);
            var cell3 = row.insertCell(0);
            var cell4=row.insertCell(1);

            var row = table.insertRow(7);
            var cell5 = row.insertCell(0);
            var cell6=row.insertCell(1);

            var row = table.insertRow(8);
            var cell7 = row.insertCell(0);
            var cell8=row.insertCell(1);

            var row = table.insertRow(9);
            var cell9 = row.insertCell(0);
            var cell10=row.insertCell(1);

            var row = table.insertRow(10);
            var cell11 = row.insertCell(0);
            var cell12=row.insertCell(1);

            var row = table.insertRow(11);
            var cell13 = row.insertCell(0);
            var cell14=row.insertCell(1);

            var row = table.insertRow(12);
            var cell15 = row.insertCell(0);
            var cell16=row.insertCell(1);

            var row = table.insertRow(13);
            var cell17 = row.insertCell(0);
            var cell18=row.insertCell(1);

            var row = table.insertRow(14);
            var cell19 = row.insertCell(0);
            var cell20=row.insertCell(1);

            cell1.innerHTML="Occupied Quarter ID:"
            cell2.innerHTML=arr[0];

            cell3.innerHTML="Empno:";
            cell4.innerHTML=arr[2];

            cell5.innerHTML="Name:";
            cell6.innerHTML=arr[3];
            
            cell7.innerHTML="Designation:";
            cell8.innerHTML=arr[4];

            cell9.innerHTML="Department:"
            cell10.innerHTML=arr[5]

            cell11.innerHTML="Billunit:";
            cell12.innerHTML=arr[6];

            cell13.innerHTML="Station:"
            cell14.innerHTML=arr[7];

            cell15.innerHTML="Date of retirement:"
            cell16.innerHTML=arr[8];

            cell17.innerHTML="Occupied on:";
            cell18.innerHTML=arr[1];
            

            cell19.innerHTML="<b>Date of vacation:</b>";
            cell20.appendChild(input);
            input.style.textAlign="center";
            input.maxLength=10;

            const isAlphaNumeric = (str) => /[a-zA-Z\u00C0-\u00FF\d\/]/.test(str);

            input.addEventListener('keypress', (e) => {
                if (!isAlphaNumeric(e.key) && e.cancelable) {
                      e.preventDefault();
                  }
              });

            input.autocomplete="off";

            document.getElementById("save").style.top="50em";
            document.getElementById("reset").style.top="50em";

            input.addEventListener("change",() => check_date());
          }
          else{ //all vacated
            count2+=0;
            //console.log("count2");
            input.id="emp_no";
            input.placeholder="Your 11 digit emp no";
            input.autocomplete="off";
            //document.getElementById("emp_no").disabled=false;
            //input.onchange=find_emp(input.value);
            //input.onkeyup=forceUpper(input.value);
            input.size=20;
            input.addEventListener("change",() => find_emp(input.value));
            input.addEventListener("keyup",() => input.value=input.value.toUpperCase());

            var row = table.insertRow(5);
            var cell1 = row.insertCell(0); //Quarter ID
            var cell2=row.insertCell(1);

            cell1.innerHTML="Quarter ID:";
            cell2.innerHTML=arr[0];

            var row = table.insertRow(6);
            var cell3 = row.insertCell(0); //Employee No
            var cell4=row.insertCell(1);

            cell3.innerHTML="<b>Employee No:</b>";
            cell4.appendChild(input); 
            //input.maxLength=10;
            input.style.textAlign="center";
            document.getElementById("save").style.top="38em";
            document.getElementById("reset").style.top="38em";
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
          if(arr.length==6){ //employee doesn't have any occupied quarters
            count3+=1;
            //console.log("count3");
            var row = table.insertRow(7);
            var cell1 = row.insertCell(0);
            var cell2=row.insertCell(1);

            var row1=table.insertRow(8)
            var cell3 = row1.insertCell(0);
            var cell4=row1.insertCell(1);

            var row2=table.insertRow(9)
            var cell5 = row2.insertCell(0);
            var cell6 = row2.insertCell(1);

            var row3=table.insertRow(10)
            var cell7 = row3.insertCell(0);
            var cell8 = row3.insertCell(1);

            var row4=table.insertRow(11)
            var cell9 = row4.insertCell(0);
            var cell10 = row4.insertCell(1);

            var row5=table.insertRow(12)
            var cell11 = row5.insertCell(0);
            var cell12 = row5.insertCell(1);

            var row6=table.insertRow(13);
            var cell13 = row6.insertCell(0);
            var cell14 = row6.insertCell(1);

            cell1.innerHTML="Name:";
            cell2.innerHTML=arr[0];

            cell3.innerHTML="Designation:";
            cell4.innerHTML=arr[1];

            cell5.innerHTML="Department:";
            cell6.innerHTML=arr[2];

            cell7.innerHTML="Billunit:";
            cell8.innerHTML=arr[3];

            cell9.innerHTML="Station:";
            cell10.innerHTML=arr[4];

            cell11.innerHTML="Date of retirement:";
            cell12.innerHTML=arr[5];

            cell13.innerHTML="<b>Date of occupation:</b>";
            cell14.appendChild(input);

            input.style.textAlign="center";
            input.maxLength=10;
            input.autocomplete="off";
            input.id="occ";
            const isAlphaNumeric = (str) => /[a-zA-Z\u00C0-\u00FF\d\/]/.test(str);

            input.addEventListener('keypress', (e) => {
                if (!isAlphaNumeric(e.key) && e.cancelable) {
                    e.preventDefault();
                  }
              });
            input.addEventListener("change",() => check_date());
            document.getElementById("save").style.top="50em";
            document.getElementById("reset").style.top="50em";
          }
          else if(arr.length>6){ //employee has occupied quarters
            count4+=1;
            //console.log("count4");
            input.id="vac";

            var row = table.insertRow(7);
            var cell1 = row.insertCell(0);
            var cell2=row.insertCell(1);

            var row1=table.insertRow(8)
            var cell3 = row1.insertCell(0);
            var cell4=row1.insertCell(1);

            var row2=table.insertRow(9)
            var cell5 = row2.insertCell(0);
            var cell6=row2.insertCell(1);

            var row3=table.insertRow(10)
            var cell7 = row3.insertCell(0);
            var cell8=row3.insertCell(1);

            
            var row4=table.insertRow(11)
            var cell9 = row4.insertCell(0);
            var cell10=row4.insertCell(1);

            
            var row5=table.insertRow(12)
            var cell11 = row5.insertCell(0);
            var cell12=row5.insertCell(1);

            
            var row6=table.insertRow(13)
            var cell13 = row6.insertCell(0);
            var cell14=row6.insertCell(1);

            var row7=table.insertRow(14)
            var cell15 = row7.insertCell(0);
            var cell16=row7.insertCell(1);

            var row8=table.insertRow(15);
            var cell17 = row8.insertCell(0);
            var cell18 = row8.insertCell(1);


            var text=table.rows[5].cells.item(1).innerHTML;
            text=text.strike();
            table.rows[5].cells.item(1).innerHTML=text;

            cell1.innerHTML="Quarter ID occupied:";
            cell2.innerHTML=arr[6];

            cell3.innerHTML="Occupied on:";
            cell4.innerHTML=arr[7];

            cell5.innerHTML="Name:";
            cell6.innerHTML=arr[0];

            cell7.innerHTML="Designation:";
            cell8.innerHTML=arr[1];

            cell9.innerHTML="Department:";
            cell10.innerHTML=arr[2];

            cell11.innerHTML="Billunit:";
            cell12.innerHTML=arr[3];

            cell13.innerHTML="Station:";
            cell14.innerHTML=arr[4];

            cell15.innerHTML="Date of retirement:";
            cell16.innerHTML=arr[5];

            cell17.innerHTML="<b>Date of Vacation:</b>";
            cell18.appendChild(input);
            input.autocomplete="off";
            input.style.textAlign="center";
            input.maxLength=10;
            const isAlphaNumeric = (str) => /[a-zA-Z\u00C0-\u00FF\d\/]/.test(str);

            input.addEventListener('keypress', (e) => {
                if (!isAlphaNumeric(e.key) && e.cancelable) {
                    e.preventDefault();
                  }
              });
            input.addEventListener("change",() => check_date());
            document.getElementById("save").style.top="54em";
            document.getElementById("reset").style.top="54em";

            alert("The quarter "+table.rows[5].cells.item(1).innerText+" will not be  available for occupation as this employee has an unvacated quarter.");
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
  const arr=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  if(count1>0){
    //console.log(count1);
  var dateParts = document.getElementById("vac").value;
  const arr1=document.getElementById("vac").value.split("/");
  var dateparts2=document.getElementById("quarter_details").rows[13].cells.item(1).innerHTML;

  if(parseDateStringToObject(dateParts).toString().length!=12){
        //document.getElementById("save").disabled=false;
    if(parseDateStringToObject(dateParts)>=parseDateStringToObject(dateparts2)){
      if(dateParts.length==10){
        if(parseDateStringToObject(dateParts).toString().includes(arr[parseInt(arr1[1])-1]))
          document.getElementById("save").disabled=false;
        else{
          alert("Invalid date");
          document.getElementById("save").disabled=true;
          document.getElementById("vac").value="";
        }
      }
      else{
          alert("The vacation date should follow 'dd/mm/yyyy' format.");
          document.getElementById("save").disabled=true;
          document.getElementById("vac").value="";
      }
    }
    else{
      document.getElementById("save").disabled=true;
      alert("The vacation date should be greater than or equal to the occupation date");
      document.getElementById("vac").value="";
    }
  }
  else{
    document.getElementById("save").disabled=true;
    alert("Invalid date");
    document.getElementById("vac").value="";
  }
  }
  else if(count2>0 || count3>0){
      //console.log(count2+" "+count3);
      var dateParts = document.getElementById("occ").value;
      const arr1=document.getElementById("occ").value.split("/");
      //console.log(parseDateStringToObject(dateParts).toString().length);
      if(parseDateStringToObject(dateParts).toString().length!=12)
        if(dateParts.length==10){
          if(parseDateStringToObject(dateParts).toString().includes(arr[parseInt(arr1[1])-1]))
            document.getElementById("save").disabled=false;
          else{
              alert("Invalid date");
              document.getElementById("save").disabled=true;
              document.getElementById("occ").value="";
          }
        }
        else{
          alert("The occupation date should follow 'dd/mm/yyyy' format.");
          document.getElementById("save").disabled=true;
          document.getElementById("occ").value="";
        }
          
      else{
        document.getElementById("save").disabled=true;
        alert("Not a proper date");
        document.getElementById("occ").value="";
      }
  }
  else if(count4>0){
    //console.log(count4);
  var dateParts = document.getElementById("vac").value;
  const arr1=document.getElementById("vac").value.split("/");
  var dateParts2 = document.getElementById("quarter_details").rows[8].cells.item(1).innerHTML;
  if(parseDateStringToObject(dateParts).toString().length!=12){
    //document.getElementById("save").disabled=false;
    if(parseDateStringToObject(dateParts)>=parseDateStringToObject(dateParts2)){
      if(dateParts.length==10){
        if(parseDateStringToObject(dateParts).toString().includes(arr[parseInt(arr1[1])-1]))
          document.getElementById("save").disabled=false;
        else{
            alert("Invalid date");
            document.getElementById("save").disabled=true;
            document.getElementById("vac").value="";
        }
      } 
      else{
          alert("The vacation date should follow 'dd/mm/yyyy' format.");
          document.getElementById("save").disabled=true;
          document.getElementById("vac").value="";
      }
    }
    else{
        document.getElementById("save").disabled=true;
        alert("The vacation date should be greater than or equal to the occupation date");
        document.getElementById("vac").value="";
    }
  }
  else{
      document.getElementById("save").disabled=true;
      alert("Invalid date");
      document.getElementById("vac").value="";
  }
  
}
}

function send_message(){

      var datum={"input": "register"};
      if(count1>0){
        if(document.getElementById("vac").value!=""){
          datum["qtr_id"] = document.getElementById("quarter_details").rows[5].cells.item(1).innerHTML;
          datum["emp_name"]=document.getElementById("quarter_details").rows[7].cells.item(1).innerHTML;
          datum["count"]="count1";
          datum["vac_date"] = document.getElementById("vac").value;
        }
      }
      else if(count3>0){
        if(document.getElementById("occ").value!=""){
          datum["emp_no"]=document.getElementById("emp_no").value;
          datum["emp_name"]=document.getElementById("quarter_details").rows[7].cells.item(1).innerHTML;
          datum["qtr_id"]=document.getElementById("quarter_details").rows[5].cells.item(1).innerHTML;
          datum["occ_date"]=document.getElementById("occ").value;
        }
      }
      else if(count4>0){
        if(document.getElementById("vac").value!=""){
          datum["emp_no"]=document.getElementById("emp_no").value;;
          datum["emp_name"]=document.getElementById("quarter_details").rows[9].cells.item(1).innerHTML;
          datum["qtr_id"]=document.getElementById("quarter_details").rows[7].cells.item(1).innerHTML;
          datum["vac_date"] = document.getElementById("vac").value;
        }
      }
      //console.log(datum);
      if(Object.keys(datum).length!=0){
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
      else{
        alert("Please don't leave any field empty");
      }
      
  
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