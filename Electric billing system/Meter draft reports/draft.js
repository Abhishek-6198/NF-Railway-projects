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
    cell2.innerHTML="<b>QtrNo;type</b>:";
    cell3.innerHTML="<b>Prev meter read</b>:";
    cell4.innerHTML="<b>Curr meter read</b>:";
    cell5.innerHTML="<b>Prev date</b>:";
    cell6.innerHTML="<b>Curr date</b>:";

    cell7.innerHTML="<b>Total unit consumed</b>:";
    cell8.innerHTML="<b>Electric charge (Rs)</b>:";
    cell9.innerHTML="<b>Fixed charge (Rs)</b>:";
    cell10.innerHTML="<b>Total charge (Rs)</b>:";
    cell11.innerHTML="<b>No of installments</b>:";
    cell12.innerHTML="<b>Amount per installment (Rs)</b>:";
}

function get_names(){
    let $select = $("#colony_name");
    $.ajax({
      url: 'draft_server.php',
      type: 'POST',
      data: { "input": "names" }, 
      dataType: 'json', 
      success: function(response) {
        let selectedValue = $select.val();
        let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
        $select.html(html).val(selectedValue);
        //alert(response);
      },
      error: function(xhr, status, error) {
        var error1 = eval("(" + xhr.responseText + ")");
        console.log(error1.Message);
        console.log(geturl.getAllResponseHeaders());
        alert("error!"+ geturl.getAllResponseHeaders());
      },
      complete: function() {}
    });
}

function get_dates(){
  let $select = $("#c_date");
  $.ajax({
    url: 'draft_server.php',
    type: 'POST',
    data: { "input": "abcdef" }, 
    dataType: 'json', 
    success: function(response) {
      let selectedValue = $select.val();
      let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
      $select.html(html).val(selectedValue);
      //alert(response);
    },
    error: function(xhr, status, error) {
      alert(xhr.responseText)
    },
    complete: function() {
    }
  });
}

document.getElementById("generate").addEventListener("click",function(){
  var date=document.getElementById("c_date").value;
  var colony=document.getElementById("colony_name").value;
  if(date=="" || date=="default"){
    if(colony=="" || colony=="default"){
      alert("Please insert atleast one field");
    }
    else{
      $.ajax({
        url: 'draft_server.php',
        type: 'POST',
        data: {"input": "generate_report",
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
                cell12.innerHTML=Math.floor(arr[i][count]/6);
                                      
                count=0;
            }
            var row=a.insertRow(a.rows.length);
            for(var i=0;i<11;i++){
              var cell=row.insertCell(i);
            }
            cell.colSpan="3";
            for(var i=1; i<a.rows.length-1; i++){
              //console.log(a.rows[i].cells.item(10).innerHTML);
              count+=parseInt(a.rows[i].cells.item(10).innerHTML);
            }
            a.rows[a.rows.length-1].cells.item(9).innerHTML="Total amount = ";
            cell.innerHTML=count;
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
            doc.text(colony+" deduction list",900, y = y + 200, );
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
                doc.save(colony+" deduction list"+".pdf");
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
  else if(colony=="" || colony=="default"){
    if(date=="" || date=="default")
      alert("Please insert atleast one field");
    else{
      $.ajax({
        url: 'draft_server.php',
        type: 'POST',
        data: {"input": "generate_report",
               "date": date},
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
                cell12.innerHTML=Math.floor(arr[i][count]/6);
                                      
                count=0;
            }
            var row=a.insertRow(a.rows.length);
            for(var i=0;i<11;i++){
              var cell=row.insertCell(i);
            }
            cell.colSpan="3";
            for(var i=1; i<a.rows.length-1; i++){
              //console.log(a.rows[i].cells.item(10).innerHTML);
              count+=parseInt(a.rows[i].cells.item(10).innerHTML);
            }
            a.rows[a.rows.length-1].cells.item(9).innerHTML="Total amount = ";
            cell.innerHTML=count;
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
            doc.text("Total deduction list as on "+date,900, y = y + 200, );
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
                doc.save(date+" meter charge list"+".pdf");
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
  else{
    $.ajax({
      url: 'draft_server.php',
      type: 'POST',
      data: {"input": "generate_report",
             "date": date,
             "colony": colony},
      success:function(response){
        var count=0;
        //alert(response)
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
              cell12.innerHTML=Math.floor(arr[i][count]/6);
                                    
              count=0;
          }
          var row=a.insertRow(a.rows.length);
          for(var i=0;i<11;i++){
            var cell=row.insertCell(i);
          }
          cell.colSpan="3";
          for(var i=1; i<a.rows.length-1; i++){
            //console.log(a.rows[i].cells.item(10).innerHTML);
            count+=parseInt(a.rows[i].cells.item(10).innerHTML);
          }
          a.rows[a.rows.length-1].cells.item(9).innerHTML="Total amount = ";
          cell.innerHTML=count;
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
          doc.text("Total deduction list of "+colony+" as on "+date,860, y = y + 200, );
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
              doc.save(colony+" "+date+".pdf");
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
})

document.getElementById("generate1").addEventListener("click",function(){
  var date=document.getElementById("c_date").value;
  var colony=document.getElementById("colony_name").value;

  if((date=="" || date=="default") && (colony=="" || colony=="default")){
    $.ajax({
      url: 'draft_server.php',
      type: 'POST',
      data: {"input": "generate_draft",
             },
      success:function(response){
        var count=0;
        //alert(response)
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
              cell12.innerHTML=Math.floor(arr[i][count]/6);
                                    
              count=0;
          }
          var row=a.insertRow(a.rows.length);
          for(var i=0;i<11;i++){
            var cell=row.insertCell(i);
          }
          cell.colSpan="3";
          for(var i=1; i<a.rows.length-1; i++){
            //console.log(a.rows[i].cells.item(10).innerHTML);
            count+=parseInt(a.rows[i].cells.item(10).innerHTML);
          }
          a.rows[a.rows.length-1].cells.item(9).innerHTML="Total amount = ";
          cell.innerHTML=count;
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
          doc.text("Electric draft",860, y = y + 200, );
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
              doc.save("Electric draft report"+".pdf");
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
    if((date!="" && date!="default") && (colony!="" && colony!="default")){
      $.ajax({
        url: 'draft_server.php',
        type: 'POST',
        data: {"input": "generate_draft",
               "date": date,
               "colony": colony},
        success:function(response){
          var count=0;
          //alert(response)
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
                cell12.innerHTML=Math.floor(arr[i][count]/6);
                                      
                count=0;
            }
            var row=a.insertRow(a.rows.length);
            for(var i=0;i<11;i++){
              var cell=row.insertCell(i);
            }
            cell.colSpan="3";
            for(var i=1; i<a.rows.length-1; i++){
              //console.log(a.rows[i].cells.item(10).innerHTML);
              count+=parseInt(a.rows[i].cells.item(10).innerHTML);
            }
            a.rows[a.rows.length-1].cells.item(9).innerHTML="Total amount = ";
            cell.innerHTML=count;
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
            doc.text("Electric draft report of "+colony+" as on "+date,860, y = y + 200, );
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
                doc.save(colony+" "+date+".pdf");
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
    else if(date!="" && date!="default"){
      $.ajax({
        url: 'draft_server.php',
        type: 'POST',
        data: {"input": "generate_draft",
               "date": date},
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
                cell12.innerHTML=Math.floor(arr[i][count]/6);
                                      
                count=0;
            }
            var row=a.insertRow(a.rows.length);
            for(var i=0;i<11;i++){
              var cell=row.insertCell(i);
            }
            cell.colSpan="3";
            for(var i=1; i<a.rows.length-1; i++){
              //console.log(a.rows[i].cells.item(10).innerHTML);
              count+=parseInt(a.rows[i].cells.item(10).innerHTML);
            }
            a.rows[a.rows.length-1].cells.item(9).innerHTML="Total amount = ";
            cell.innerHTML=count;
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
            doc.text("Electric draft report as on "+date,900, y = y + 200, );
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
                doc.save(date+" meter charge draft"+".pdf");
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
    else if(colony!="" && colony!="default"){
      $.ajax({
        url: 'draft_server.php',
        type: 'POST',
        data: {"input": "generate_draft",
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
                cell12.innerHTML=Math.floor(arr[i][count]/6);
                                      
                count=0;
            }
            var row=a.insertRow(a.rows.length);
            for(var i=0;i<11;i++){
              var cell=row.insertCell(i);
            }
            cell.colSpan="3";
            for(var i=1; i<a.rows.length-1; i++){
              //console.log(a.rows[i].cells.item(10).innerHTML);
              count+=parseInt(a.rows[i].cells.item(10).innerHTML);
            }
            a.rows[a.rows.length-1].cells.item(9).innerHTML="Total amount = ";
            cell.innerHTML=count;
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
            doc.text(colony+" electric draft",900, y = y + 200, );
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
                doc.save(colony+" electric draft"+".pdf");
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