function get_names() {
    let $select = $("#colony_name");
  
    $.ajax({
      url: 'server.php',
      type: 'POST',
      data: { "input": "names" }, // should 'code' be a variable...?
      dataType: 'json', // add this property to avoid the need to call JSON.parse in success
      success: function(response) {
        let selectedValue = $select.val();
        let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
        $select.html(html).val(selectedValue);
      },
      complete: function() {}
    });
}

function get_types() {
    let $select = $("#colony_type");
  
    $.ajax({
      url: 'server.php',
      type: 'POST',
      data: { "input": "types" }, // should 'code' be a variable...?
      dataType: 'json', // add this property to avoid the need to call JSON.parse in success
      success: function(response) {
        let selectedValue = $select.val();
        let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
        $select.html(html).val(selectedValue);
      },
      complete: function() {}
    });
}

function get_numbers() {
  let $select = $("#quarter_no");

  $.ajax({
    url: 'server.php',
    type: 'POST',
    data: { "input": "numbers" }, // should 'code' be a variable...?
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
        const arr=response.split(" ");       
        if(arr.length==1){
          document.getElementById("qid").style.display="inline";
          document.getElementById("qrtr_id").style.display="inline";
          /*if(window.innerWidth>=1300)
            document.getElementById("qid").style.left="12em";*/
          $("#qrtr_id").html(response);   
          document.getElementById("emp_info").style.display="block";
        }
        else{
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
    $.ajax({
      url: 'server.php',
      type: 'POST',
      data: { "input": "emp",
            "emp_no":  str.value},
      //dataType: 'json', 
      success: function(response) { 
        //console.log(typeof(response));
        if(response[0]=='['){
          const arr=JSON.parse(response);
          var table = document.getElementById("emp_details");
          table.style.display="block";
          var row = table.insertRow(1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          cell1.innerHTML=arr[0];
          cell2.innerHTML=arr[1];
          cell3.innerHTML=arr[2];
          cell4.innerHTML=arr[3];
        }
        else
          alert(response);
        //$("#emp_details").html(response);
      },
      complete: function() {}
    });
  }
  else{
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

  if(code.selectedIndex <=-1 || type.selectedIndex <=-1 || q_no.selectedIndex <=-1 || emp_no=="" || table=="none")
      document.getElementById("save").style.backgroundColor="rgba(245, 175, 175, 0.945)";
  else{
      document.getElementById("save").style.backgroundColor="rgb(188, 247, 188)"; 
      document.getElementById("save").addEventListener("click",function(){
        $.ajax({
          url: 'server.php',
          type: 'POST',
          data: { "input": "register",
                  "emp_no": emp_no,
                  "qtr_id": $("#qrtr_id").html()}, // should 'code' be a variable...?
          success: function(response) { 
            alert(response);
          },
          complete: function() {}
        });



      })
  }
}

function erase(){
  location.reload();
}