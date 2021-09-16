var a = document.getElementById("new_table");
if(a.rows.length!=1){
    var row = a.insertRow(0);
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
    var cell12 = row.insertCell(12);

    
    cell.innerHTML="<b>EmpNo</b>:";
    cell1.innerHTML="<b>Name</b>:";
    cell2.innerHTML="<b>QtrNo</b>:";
    cell3.innerHTML="<b>Prev meter read</b>:";
    cell4.innerHTML="<b>Curr meter read</b>:";
    cell5.innerHTML="<b>Prev date</b>:";
    cell6.innerHTML="<b>Curr date</b>:";

    cell7.innerHTML="<b>Total unit consumed</b>:";
    cell8.innerHTML="<b>Electric charge (Rs)</b>:";
    cell9.innerHTML="<b>Fixed charge (Rs)</b>:";
    cell10.innerHTML="<b>Total charge (Rs)</b>:";
    cell11.innerHTML="<b>No of installments</b>:";
    cell12.innerHTML="<b>Amount per installment</b>:";
}

function get_names(){
    let $select = $("#colony_name");
    //refresh_colony_name();
    $.ajax({
      url: 'draft_server.php',
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
const isAlphaNumeric = (str) => /[a-zA-Z\u00C0-\u00FF\d\/]/.test(str);

document.getElementById("date").addEventListener('keypress', (e) => {
    if (!isAlphaNumeric(e.key) && e.cancelable) {
        e.preventDefault();
    }
});

document.getElementById("date").addEventListener("change",() => {
  const arr=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const arr1=document.getElementById("date").value.split("/");
  //console.log(arr[parseInt(arr1[1])-1]);
  var date=parseDateStringToObject(document.getElementById("date").value).toString();
  if(date.length==12){
      alert("Invalid date");
      document.getElementById("date").value="";
  }
  else  if(document.getElementById("date").value.length!=10){
      alert("Date should be in 'dd/mm/yyyy' format");
      document.getElementById("date").value="";
  }
  else if(!date.includes(arr[parseInt(arr1[1])-1])){
      alert("Invalid date");
      document.getElementById("date").value="";
  }
})

function parseDateStringToObject(dateStr) {
  const [day, month, year] = dateStr.split('/');
  return new Date(`${month}-${day}-${year}`);
}

document.getElementById("generate").addEventListener("click",function(){
  if(document.getElementById("date").value!="" && document.getElementById("colony_name").value!="default"){
    $.ajax({
      url: 'draft_server.php',
      type: 'POST',
      data: {"input": "generate_report",
             "date": document.getElementById("date").value,
             "colony": document.getElementById("colony_name").value},
      success:function(response){
        var count=0;
          if(response[0] == '['){
            const arr=JSON.parse(response);
            var x=arr.length*11;
            for(var i=0; i<x/11; i++){
              var row = a.insertRow(a.rows.length);
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
              var cell12 = row.insertCell(12);

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
              cell6.innerHTML=arr[i][count];
              ++count;
              cell7.innerHTML=arr[i][count];
              ++count;
              cell8.innerHTML=arr[i][count];
              ++count;
              cell9.innerHTML=arr[i][count];
              ++count;
              cell10.innerHTML=arr[i][count];

              cell11.innerHTML=6;
              cell12.innerHTML=arr[i][count]/6;
                                    
              count=0;
          }
          var row=a.insertRow(a.rows.length);
          var cell=row.insertCell(0);
          cell.colSpan="13";
          //alert(a.rows[1].cells.item(10).innerHTML);
          for(var i=1; i<a.rows.length-1; i++){
            //console.log(a.rows[i].cells.item(10).innerHTML);
            count+=a.rows[i].cells.item(10).innerHTML;
          }
          cell.innerHTML="Total amount = "+count;
          var doc = new jsPDF('1', 'pt', 'a0');  
          doc.setFontSize(50); 
          doc.setFontStyle('arial');
          var pageHeight = 0;  
          pageHeight = doc.internal.pageSize.height;  
          specialElementHandlers = {  
              // element with id of "bypass" - jQuery style selector  
              '#bypassme': function(element, renderer) {  
               // true = "handled elsewhere, bypass text extraction"  
              return true  
              }  
          };  
          margins = {  
              top: 150,  
              bottom: 60,  
              left: 40,  
              right: 40,  
              width: 600  
          };  
          var y = 20;
          //var res = doc.autoTableHtmlToJson(a);  
          doc.setLineWidth(2);  
          doc.text(document.getElementById("colony_name").value+" "+document.getElementById("date").value+" draft report",980, y = y + 200, );
          doc.page=1; // use this as a counter.

          function footer(){ 
              doc.text(2900,1000, 'page ' + doc.page); //print number bottom right
              doc.page ++;
          };  
          //doc.autoTable(res.columns, res.data);
          doc.autoTable({  
            html: '#new_table',  
            startY: 300,  
            theme: 'grid',  
            columnStyles: {  
              0: {  
                cellWidth: 'auto',  
            },  
            1: {  
                cellWidth: 'auto',  
            },  
            2: {  
                cellWidth: 'auto', 
            },
            3:{
                cellWidth: 'auto',
            },
            4:{
                cellWidth: 'auto',
            },  
            5:{
                cellWidth: 'auto',
            },
            6:{
                cellWidth: 'auto',
            },
            7:{
                cellWidth: 'auto',
            },
            8:{
                cellWidth: 'auto',
            },
            9:{
                cellWidth: 'auto',
            },
            10:{
              cellWidth: 'auto',
            },
            11:{
              cellWidth:'auto',
            },
            12:{
              cellWidth:'auto',
            }
            },  
            styles: {  
                fontSize: 30,
                cellWidth: 'wrap' 
            }  
        })
              doc.setFontSize(20);
              //footer();
              doc.save(document.getElementById("colony_name").value+" "+document.getElementById("date").value+" draft report"+".pdf");
              while (a.rows.length > 1) {
                  a.deleteRow(1);
              }
          }
          else{
                alert(response);
          }
        
      },
      complete:function(){

      }
    })
  }
  else if(document.getElementById("date").value=="" && document.getElementById("colony_name").value=="default"){
    alert("Please insert at least one field");
  }
  else if(document.getElementById("date").value=="" || document.getElementById("colony_name").value=="default"){
    if(document.getElementById("date").value==""){
      $.ajax({
        url: 'draft_server.php',
        type: 'POST',
        data: {"input": "generate_report",
               "colony": document.getElementById("colony_name").value
               },
        success:function(response){
          var count=0;
          if(response[0] == '['){
            const arr=JSON.parse(response);
            var x=arr.length*11;
            for(var i=0; i<x/11; i++){
              var row = a.insertRow(a.rows.length);
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
              var cell12 = row.insertCell(12);

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
              cell6.innerHTML=arr[i][count];
              ++count;
              cell7.innerHTML=arr[i][count];
              ++count;
              cell8.innerHTML=arr[i][count];
              ++count;
              cell9.innerHTML=arr[i][count];
              ++count;
              cell10.innerHTML=arr[i][count];

              cell11.innerHTML=6;
              cell12.innerHTML=arr[i][count]/6;
                                    
              count=0;
          }
          var row=a.insertRow(a.rows.length);
          var cell=row.insertCell(0);
          cell.colSpan="13";
          //alert(a.rows[1].cells.item(10).innerHTML);
          for(var i=1; i<a.rows.length-1; i++){
            //console.log(a.rows[i].cells.item(10).innerHTML);
            count+=a.rows[i].cells.item(10).innerHTML;
          }
          cell.innerHTML="Total amount = "+count;
          var doc = new jsPDF('1', 'pt', 'a0');  
          doc.setFontSize(50); 
          doc.setFontStyle('arial');
          var pageHeight = 0;  
          pageHeight = doc.internal.pageSize.height;  
          specialElementHandlers = {  
              // element with id of "bypass" - jQuery style selector  
              '#bypassme': function(element, renderer) {  
               // true = "handled elsewhere, bypass text extraction"  
              return true  
              }  
          };  
          margins = {  
              top: 150,  
              bottom: 60,  
              left: 40,  
              right: 40,  
              width: 600  
          };  
          var y = 20;
          //var res = doc.autoTableHtmlToJson(a);  
          doc.setLineWidth(2);  
          doc.text(document.getElementById("colony_name").value+" draft report",980, y = y + 200, );
          doc.page=1; // use this as a counter.

          function footer(){ 
              doc.text(2900,1000, 'page ' + doc.page); //print number bottom right
              doc.page ++;
          };  
          //doc.autoTable(res.columns, res.data);
          doc.autoTable({  
            html: '#new_table',  
            startY: 300,  
            theme: 'grid',  
            columnStyles: {  
              0: {  
                cellWidth: 'auto',  
            },  
            1: {  
                cellWidth: 'auto',  
            },  
            2: {  
                cellWidth: 'auto', 
            },
            3:{
                cellWidth: 'auto',
            },
            4:{
                cellWidth: 'auto',
            },  
            5:{
                cellWidth: 'auto',
            },
            6:{
                cellWidth: 'auto',
            },
            7:{
                cellWidth: 'auto',
            },
            8:{
                cellWidth: 'auto',
            },
            9:{
                cellWidth: 'auto',
            },
            10:{
              cellWidth: 'auto',
            },
            11:{
              cellWidth:'auto',
            },
            12:{
              cellWidth:'auto',
            }
            },  
            styles: {  
                fontSize: 30,
                cellWidth: 'wrap' 
            }  
        })
              doc.setFontSize(20);
              //footer();
              doc.save(document.getElementById("colony_name").value+" draft report"+".pdf");
              while (a.rows.length > 1) {
                  a.deleteRow(1);
              }
          }
          else{
                alert(response);
          }
        },
        complete:function(){
  
        }
      })
    }
    else{
      $.ajax({
        url: 'draft_server.php',
        type: 'POST',
        data: {"input": "generate_report",
               "date": document.getElementById("date").value},
        success:function(response){
          var count=0;
          if(response[0] == '['){
            const arr=JSON.parse(response);
            var x=arr.length*11;
            for(var i=0; i<x/11; i++){
              var row = a.insertRow(a.rows.length);
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
              var cell12 = row.insertCell(12);

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
              cell6.innerHTML=arr[i][count];
              ++count;
              cell7.innerHTML=arr[i][count];
              ++count;
              cell8.innerHTML=arr[i][count];
              ++count;
              cell9.innerHTML=arr[i][count];
              ++count;
              cell10.innerHTML=arr[i][count];

              cell11.innerHTML=6;
              cell12.innerHTML=arr[i][count]/6;
                                    
              count=0;
          }
          var row=a.insertRow(a.rows.length);
          var cell=row.insertCell(0);
          cell.colSpan="13";
         //alert(a.rows[1].cells.item(10).innerHTML);
         for(var i=1; i<a.rows.length-1; i++){
          //console.log(a.rows[i].cells.item(10).innerHTML);
          count+=a.rows[i].cells.item(10).innerHTML;
        }
        cell.innerHTML="Total amount = "+count;
          var doc = new jsPDF('1', 'pt', 'a0');  
          doc.setFontSize(50); 
          doc.setFontStyle('arial');
          var pageHeight = 0;  
          pageHeight = doc.internal.pageSize.height;  
          specialElementHandlers = {  
              // element with id of "bypass" - jQuery style selector  
              '#bypassme': function(element, renderer) {  
               // true = "handled elsewhere, bypass text extraction"  
              return true  
              }  
          };  
          margins = {  
              top: 150,  
              bottom: 60,  
              left: 40,  
              right: 40,  
              width: 600  
          };  
          var y = 20;
          //var res = doc.autoTableHtmlToJson(a);  
          doc.setLineWidth(2);  
          doc.text("Draft report "+document.getElementById("date").value,980, y = y + 200, );
          doc.page=1; // use this as a counter.

          function footer(){ 
              doc.text(2900,1000, 'page ' + doc.page); //print number bottom right
              doc.page ++;
          };  
          //doc.autoTable(res.columns, res.data);
          doc.autoTable({  
            html: '#new_table',  
            startY: 300,  
            theme: 'grid',  
            columnStyles: {  
              0: {  
                  cellWidth: 'auto',  
              },  
              1: {  
                  cellWidth: 'auto',  
              },  
              2: {  
                  cellWidth: 'auto', 
              },
              3:{
                  cellWidth: 'auto',
              },
              4:{
                  cellWidth: 'auto',
              },  
              5:{
                  cellWidth: 'auto',
              },
              6:{
                  cellWidth: 'auto',
              },
              7:{
                  cellWidth: 'auto',
              },
              8:{
                  cellWidth: 'auto',
              },
              9:{
                  cellWidth: 'auto',
              },
              10:{
                cellWidth: 'auto',
              },
              11:{
                cellWidth:'auto',
              },
              12:{
                cellWidth:'auto',
              }
            },  
            styles: {  
                fontSize: 30,
                cellWidth: 'wrap' 
            }  
        })
              doc.setFontSize(20);
              //footer();
              doc.save("Draft report "+document.getElementById("date").value+".pdf");
              while (a.rows.length > 1) {
                  a.deleteRow(1);
              }
          }
          else{
                alert(response);
          }
        },
        complete:function(){
  
        }
      })
    }
  }
})