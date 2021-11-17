var a = document.getElementById("new_table");
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var n=sessionStorage.getItem("name");
var key=sessionStorage.getItem("search");
if (n==null)
    window.open("http://localhost//Electric%20billing%20system/Login%20screen/index.html","_self");
if(key=="cname_bdate"){
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
        if(!response.includes("No colony name")){
          let selectedValue = $select.val();
          let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
          $select.html(html).val(selectedValue);
        }
        else
          alert(response);
      },
      error: function(xhr, status, error) {
        alert(xhr.responseText)
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
      if(!response.includes("Records")){
        let selectedValue = $select.val();
        let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
        $select.html(html).val(selectedValue);
      }
      else
        alert(response);
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
                var fp=XLSX.utils.table_to_book(a,{sheet:colony+' list'});
                XLSX.write(fp,{
                  bookType:'xlsx',
                  type:'base64'
                });
                XLSX.writeFile(fp,colony+'.xlsx');
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
                var temp=datetoword(date).split(" ");
                var fp=XLSX.utils.table_to_book(a,{sheet:temp[0]+" "+temp[1]+' list'});
                XLSX.write(fp,{
                  bookType:'xlsx',
                  type:'base64'
                });
                XLSX.writeFile(fp,date+' list.xlsx');
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
              var temp=datetoword(date).split(" ");
              var fp=XLSX.utils.table_to_book(a,{sheet:colony+' '+temp[0]+' '+temp[1]+' list'});
                XLSX.write(fp,{
                  bookType:'xlsx',
                  type:'base64'
                });
                XLSX.writeFile(fp,colony+' '+date+'.xlsx');
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
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          today = dd + '/' + mm + '/' + yyyy;
          doc.text("Electric draft generated on "+today,860, y = y + 200, );
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
              var fp=XLSX.utils.table_to_book(a,{sheet:"Draft"});
                XLSX.write(fp,{
                  bookType:'xlsx',
                  type:'base64'
                });
                XLSX.writeFile(fp,'Complete electric draft.xlsx');
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
                var temp=datetoword(date).split(" ");
                var fp=XLSX.utils.table_to_book(a,{sheet:colony+" "+temp[0]+" "+temp[1]+" draft"});
                XLSX.write(fp,{
                  bookType:'xlsx',
                  type:'base64'
                });
                XLSX.writeFile(fp,colony+" "+date+" draft.xlsx");
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
                var temp=datetoword(date).split(" ");
                var fp=XLSX.utils.table_to_book(a,{sheet:temp[0]+" "+temp[1]+" draft"});
                XLSX.write(fp,{
                  bookType:'xlsx',
                  type:'base64'
                });
                XLSX.writeFile(fp,date+" draft.xlsx");
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
                var fp=XLSX.utils.table_to_book(a,{sheet:colony+" draft"});
                XLSX.write(fp,{
                  bookType:'xlsx',
                  type:'base64'
                });
                XLSX.writeFile(fp,colony+" draft.xlsx");
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

function datetoword(date){
  temp_date = date.split("/");
  return temp_date[0]+" "+months[temp_date[1]-1].substring(0,3)+" "+temp_date[2];
}
}
else{
  //console.log(key);
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
    var cell13 = row.insertCell(13);
    var cell14 = row.insertCell(14);
    var cell15 = row.insertCell(15);
    var cell16 = row.insertCell(16);


    cell.innerHTML="<b>EmpName</b>";
    cell1.innerHTML="<b>Designation</b>";
    cell2.innerHTML="<b>BillUnit</b>";
    cell3.innerHTML="<b>Station</b>";
    cell4.innerHTML="<b>Retired on</b>";
    cell5.innerHTML="<b>QtrNo</b>";
    cell6.innerHTML="<b>Prev date</b>";
    cell7.innerHTML="<b>Curr date</b>";
    cell8.innerHTML="<b>Prev meter read</b>";
    cell9.innerHTML="<b>Curr meter read</b>";

    cell10.innerHTML="<b>Total unit consumed</b>";
    cell11.innerHTML="<b>Electric charge (Rs)</b>";
    cell12.innerHTML="<b>Fixed charge (Rs)</b>";
    cell13.innerHTML="<b>Total charge (Rs)</b>";
    cell14.innerHTML="<b>No of installments</b>";
    cell15.innerHTML="<b>Amount per installment (Rs)</b>";
    cell16.innerHTML="<b>Status</b>";
}
  document.getElementById("current_date").innerHTML="Employee no/name:";
  document.getElementById("c_date").remove();
  document.getElementById("colony").remove();
  document.getElementById("colony_name").remove();
  document.getElementById("disclaimer").remove();
  document.getElementById("generate").remove();
  document.getElementById("generate1").remove();
  document.getElementById("generate2").style.display="block";
  var input = document.createElement("input");
  input.id="c_date";
  input.type="text";
  input.size=30;
  document.getElementById("box").appendChild(input);
  document.getElementById("box").style.height="10em";
  document.getElementById("generate2").addEventListener("click",function(){
      if(document.getElementById("c_date").value!=""){
        $.ajax({
          url: 'draft_server.php',
          type: 'POST',
          data: {"input": "generate_report_foremp",
                 "id": document.getElementById("c_date").value},
          success:function(response){
            //console.log(document.getElementById("c_date").value);
            if(response[0] == '['){
              var count=0;
              const arr=JSON.parse(response);
              var x=arr.length*15;
              for(var i=0; i<x/15; i++){
                var row=a.insertRow(a.rows.length);
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
                var cell13 = row.insertCell(13);
                var cell14 = row.insertCell(14);
                var cell15 = row.insertCell(15);
                var cell16 = row.insertCell(16);
              
                cell.innerHTML=arr[i][10];
                cell1.innerHTML=arr[i][11];
                cell2.innerHTML=arr[i][12];
                cell3.innerHTML=arr[i][13];
                cell4.innerHTML=arr[i][14];
                cell5.innerHTML=arr[i][0];
                cell6.innerHTML=arr[i][1];
                cell7.innerHTML=arr[i][2];
                cell8.innerHTML=arr[i][3];

                cell9.innerHTML=arr[i][4];
                cell10.innerHTML=arr[i][5];
                cell11.innerHTML=arr[i][6];
                cell12.innerHTML=arr[i][7];
                cell13.innerHTML=arr[i][8];
                cell14.innerHTML=6;
                cell15.innerHTML=Math.floor(arr[i][8]/6);
                //cell16.innerHTML=arr[i][9];
    
                if(arr[i][9]==0)
                  cell16.innerHTML="Ongoing";
                else
                  cell16.innerHTML="Completed";
              }
              var row=a.insertRow(a.rows.length);
              for(var i=0;i<17;i++){
                var cell=row.insertCell(i);
              }
              cell.colSpan="3";
              for(var i=1; i<a.rows.length-1; i++){
                //console.log(a.rows[i].cells.item(10).innerHTML);
                count+=parseInt(a.rows[i].cells.item(13).innerHTML);
              }
              a.rows[a.rows.length-1].cells.item(12).innerHTML="Total amount = ";
              a.rows[a.rows.length-1].cells.item(13).innerHTML=count;
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
            var hasNumber = /\d/;
            if(hasNumber.test(document.getElementById("c_date").value)) 
              doc.text("EmpNo: "+document.getElementById("c_date").value+" draft report",900, y = y + 200, );
            else
              doc.text(document.getElementById("c_date").value+"'s draft report",900, y = y + 200, );
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
              },
              13:{
                cellWidth:'auto',
              },
              14:{
                cellWidth:'auto',
              },
              15:{
                cellWidth:'auto',
              },
              16:{
                cellWidth:'auto',
              }
              },  
              styles: {  
                  fontSize: 25,
                  cellWidth: 'wrap' 
              }  
          })
                doc.setFontSize(20);
                //footer();
                doc.save(document.getElementById("c_date").value+" draft report"+".pdf");
                /*var fp=XLSX.utils.table_to_book(a,{sheet:colony+" draft"});
                XLSX.write(fp,{
                  bookType:'xlsx',
                  type:'base64'
                });
                XLSX.writeFile(fp,colony+" draft.xlsx");*/
                while (a.rows.length > 1) {
                    a.deleteRow(1);
                }

            }else{
              alert(response);
            }
          },
          complete:function(){

          }
        })
      }
      else
        alert("Please insert the emp no or name");
    
  })
}