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
            if(date.includes(arr[parseInt(arr1[1])-1]))
                document.getElementById("colony_name").disabled=false;
            else{
                document.getElementById("colony_name").disabled=true;
                alert("Invalid date");
            }
                
        }
        else{
            alert("Date should be in 'dd/mm/yyyy' format");
            document.getElementById("colony_name").disabled=true;
        }       
    }
    else{
        document.getElementById("colony_name").disabled=true;
        alert("Invalid date");
    }
})

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

                var k=2;
                var count=0;
                //alert(response);
                if(response[0] == '['){//occupied quarters found
                    var table=document.getElementById("quarter_details");
                    var row = table.insertRow(1);  
                    var cell = row.insertCell(0);
                    var cell1 = row.insertCell(1);
                    var cell2 = row.insertCell(2);
                    var cell3 = row.insertCell(3);
                    var cell4 = row.insertCell(4);
                    var cell5 = row.insertCell(5);
                    var cell6 = row.insertCell(6);
    
                    cell.innerHTML = "<b>Qtr_ID:</b>";
                    cell1.innerHTML = "<b>EmpNo:</b>";
                    cell2.innerHTML = "<b>Qtr_No:</b>";
                    cell3.innerHTML = "<b>EmpName:</b>";
                    cell4.innerHTML = "<b>Prev met read:</b>";
                    cell5.innerHTML = "<b>Prev date:</b>";
                    cell6.innerHTML = "<b>Final met read:</b>";


                    const arr=JSON.parse(response);
                    alert(arr.length);

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

                        //console.log(arr[i][count]);
                        cell.innerHTML=arr[i][count];
                        ++count;
                        //console.log(arr[i][count]);
                        cell1.innerHTML=arr[i][count];
                        ++count;
                        //console.log(arr[i][count]);
                        cell2.innerHTML=arr[i][count];
                        ++count;
                        //console.log(arr[i][count]);
                        cell3.innerHTML=arr[i][count];
                        ++count;
                        //console.log(arr[i][count]);
                        cell4.innerHTML=arr[i][count];
                        ++count;
                        //console.log(arr[i][count]);
                        cell5.innerHTML=arr[i][count];
                        ++count;
                        //console.log(arr[i][count]);
                        var input = document.createElement("input");
                        input.type = "number";
                        input.id="current_read"+i.toString();
                        cell6.appendChild(input);
                        count=0;
                        ++k;
                    }  
                }
                else{
                    //document.getElementById("colony_type").disabled=true;
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