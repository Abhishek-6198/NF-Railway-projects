function get_names() {
    let $select = $("#colony_name");
    //refresh_colony_name();
    $.ajax({
      url: 'server.php',
      type: 'POST',
      data: { "input": "names" }, // should 'code' be a variable...?
      dataType: 'json', // add this property to avoid the need to call JSON.parse in success
      success: function(response) {
        let selectedValue = $select.val();
        let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
        $select.html(html).val(selectedValue);
        document.getElementById("cln_name").style.backgroundColor="rgb(188, 247, 188)";
        document.getElementById("cln_name").style.border="groove";
        //document.getElementById("colony_name").disabled=true;
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
                if (c==true||c==false) {
                  window.open("http://localhost//Electric%20billing%20system/Quarter%20master%20entry/index.html");
                } 
          }
        }
        if(!flag){
          let selectedValue = $select.val();
          let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
          $select.html(html).val(selectedValue);
          document.getElementById("cln_type").style.backgroundColor="rgb(188, 247, 188)";
          document.getElementById("cln_type").style.border="groove";
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
              if (c==true||c==false) {
                window.open("http://localhost//Electric%20billing%20system/Quarter%20master%20entry/index.html");
              } 
        }
      }
      if(!flag){
        let selectedValue = $select.val();
        let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
        $select.html(html).val(selectedValue);
        document.getElementById("qrtr_no").style.backgroundColor="rgb(188, 247, 188)";
        document.getElementById("qrtr_no").style.border="groove";
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
        $("#qrtr_id").html("");
        const arr=response.split(" ");       
        if(arr.length==1){
          document.getElementById("qid").style.display="inline";
          document.getElementById("qrtr_id").style.display="inline";
          document.getElementById("employee").style.display="flex";
          document.getElementById("box").style.height="40em";
          document.getElementById("save").style.top="40em";
          document.getElementById("reset").style.top="40em";
          /*if(window.innerWidth>=1300)
            document.getElementById("qid").style.left="12em";*/
          $("#qrtr_id").html(response);   
          document.getElementById("emp_info").style.display="block";
          //document.getElementById("date").style.display="block";
          /*document.getElementById("box").style.height="45em";
          document.getElementById("employee").style.paddingTop="32em";
          if(document.documentElement.clientWidth>280){
            //console.log(document.documentElement.clientWidth);
            document.getElementById("save").style.top="44.8em";
            document.getElementById("reset").style.top="44.8em";
          }else{
            document.getElementById("save").style.top="50em";
            document.getElementById("reset").style.top="50em";
          }*/
        }
        else{
          document.getElementById("qid").style.display="none";
          document.getElementById("qrtr_id").style.display="none";
          document.getElementById("emp_info").style.display="none"
          alert(response);
        }
      },
      complete: function() {}
    });
  }
}

function forceUpper(strInput) 
{
  strInput.value=strInput.value.toUpperCase();
}

function find_emp(str){
  if(str.value.length===11){
    document.getElementById("emp_info").style.backgroundColor="rgb(194, 219, 235)";
    document.getElementById("emp_info").style.border="groove";

    $.ajax({
      url: 'server.php',
      type: 'POST',
      data: { "input": "emp",
            "emp_no":  str.value},
      //dataType: 'json', 
      success: function(response) { 
        document.getElementById("date").style.display="block";
        document.getElementById("box").style.height="85em";
        document.getElementById("employee").style.paddingTop="18em";
        document.getElementById("quarter_tenure").style.display="flex";
        document.getElementById("quarter_tenure").style.paddingTop="30em";
        document.getElementById("save").style.top="75.5em";
        document.getElementById("reset").style.top="75.5em";
        /*if(document.documentElement.clientWidth>280){
          //console.log(document.documentElement.clientWidth);
          document.getElementById("save").style.top="44.8em";
          document.getElementById("reset").style.top="44.8em";
        }else{
          document.getElementById("save").style.top="53em";
          document.getElementById("reset").style.top="53em";
        }*/

        if(document.getElementById("emp_details").rows.length>0)
          $("#emp_details").html("");
        //console.log(typeof(response));
        if(response[0]=='['){
          const arr=JSON.parse(response);
          var table = document.getElementById("emp_details");
          document.getElementsByClassName("fas fa-arrow-circle-right")[0].style.display="block";
          table.style.display="block";

          var row = table.insertRow(0);
          var cell1 = row.insertCell(0);
          var cell2=row.insertCell(1)

          var row1=table.insertRow(1)
          var cell3 = row1.insertCell(0);
          var cell4=row1.insertCell(1);

          var row2=table.insertRow(2)
          var cell5 = row2.insertCell(0);
          var cell6 = row2.insertCell(1);

          var row3=table.insertRow(3)
          var cell7 = row3.insertCell(0);
          var cell8 = row3.insertCell(1);

          cell1.innerHTML="<b>Name</b>";
          cell2.innerHTML=arr[0];

          cell3.innerHTML="<b>Designation</b>";
          cell4.innerHTML=arr[1];

          cell5.innerHTML="<b>Billunit</b>";
          cell6.innerHTML=arr[2];

          cell7.innerHTML="<b>Station</b>";
          cell8.innerHTML=arr[3];
        }
        else{
          document.getElementById("emp_details").style.display="none";
          document.getElementsByClassName("fas fa-arrow-circle-right")[0].style.display="none";
          document.getElementById("date").style.display="none";
          alert(response);
        }
         
        //$("#emp_details").html(response);
      },
      complete: function() {}
    });
  }
  else{
    document.getElementById("emp_details").style.display="none";
    document.getElementsByClassName("fas fa-arrow-circle-right")[0].style.display="none";
    document.getElementById("date").style.display="none";
    alert("Incorrect emp no");
    str.value="";
  }
    
}

function mouseout(){
  document.getElementById("save").style.backgroundColor="white";
}

function mouseover(){
  var code = document.getElementById("colony_name");
  var type = document.getElementById("colony_type");
  var q_no = document.getElementById("quarter_no");
  var emp_no = document.getElementById("emp_no").value;
  var table = document.getElementById("emp_details").style.display;
  var date = document.getElementById("datepicker").value;

  if(code.selectedIndex <=-1 || type.selectedIndex <=-1 || q_no.selectedIndex <=-1 || emp_no=="" || table=="none" || date.length!=23)
      document.getElementById("save").style.backgroundColor="rgba(245, 175, 175, 0.945)";
  else{
      document.getElementById("save").style.backgroundColor="rgb(188, 247, 188)"; 
      document.getElementById("save").addEventListener("click",function(){
        $.ajax({
          url: 'server.php',
          type: 'POST',
          data: { "input": "register",
                  "emp_no": emp_no,
                  "qtr_id": $("#qrtr_id").html()}, 
          success: function(response) { 
            var c= confirm(response);
            if (c==true||c==false) {          
                window.location.reload();
            } 
          },
          complete: function() {}
        });



      })
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

$(function() {

  $('input[name="datefilter"]').daterangepicker({
      autoUpdateInput: false,
      locale: {
          cancelLabel: 'Clear'
      }
  });

  $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
      document.getElementById("quarter_tenure").style.paddingTop="15em";
      document.getElementById("box").style.height="70em";
      document.getElementById("save").style.top="63.5em";
      document.getElementById("reset").style.top="63.5em";
      if($(this).val.length!=0){
        document.getElementById("date").style.backgroundColor="rgb(238, 223, 241)";
        document.getElementById("date").style.border="groove";
      }
      document.getElementsByClassName("fas fa-angle-right")[0].style.display="block";
      document.getElementById("days").style.display="block";
      document.getElementById("date_info").style.display="block";
      //document.getElementById("date_info").innerHTML="Days :";
      let days=get_number0fdays($("#datepicker").val());
      document.getElementById("days").innerHTML=days;
  });

  $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
      document.getElementsByClassName("fas fa-angle-right")[0].style.display="none";
      document.getElementById("days").style.display="none";
      document.getElementById("date_info").style.display="none";
  });

  $('input[name="datefilter"]').on('show.daterangepicker', function(ev, picker) {
    setTimeout(function(){
        //alert("You have opened datepicker");
        document.getElementById("quarter_tenure").style.paddingTop="30em";
        document.getElementById("box").style.height="85em";
        document.getElementById("save").style.top="75.5em";
        document.getElementById("reset").style.top="75.5em";
    }, 0);
  });

});

function increase_size(){

    document.getElementById("quarter_tenure").style.paddingTop="30em";
    document.getElementById("box").style.height="85em";
    document.getElementById("save").style.top="75.5em";
    document.getElementById("reset").style.top="75.5em";

}

function reduce_size(){
  document.getElementById("quarter_tenure").style.paddingTop="15em";
  document.getElementById("box").style.height="70em";
  document.getElementById("save").style.top="63.5em";
  document.getElementById("reset").style.top="63.5em";
}

function change_colour(str){
  if (str.value.length===23){
    document.getElementById("date").style.backgroundColor="rgb(238, 223, 241)";
    document.getElementById("date").style.border="groove";
    document.getElementsByClassName("fas fa-angle-right")[0].style.display="block";
    document.getElementById("days").style.display="block";
    document.getElementById("date_info").style.display="block";
    //document.getElementById("date_info").innerHTML="Days :";
    let days=get_number0fdays($("#datepicker").val());
    document.getElementById("days").innerHTML=days;
  }
  else{
    document.getElementById("date").style.backgroundColor="rgb(252, 219, 215)";
    document.getElementById("date").style.border="dotted";
    document.getElementsByClassName("fas fa-angle-right")[0].style.display="none";
    document.getElementById("days").style.display="none";
    document.getElementById("date_info").style.display="none";
  }
}

function get_number0fdays(str){
  const a=str.split("-");
  var date1 = new Date(a[0]);
  var date2 = new Date(a[1]);
    
  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();
    
  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  return Difference_In_Days;
}