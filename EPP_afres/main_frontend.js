const input = document.getElementById("mySwitch");
const variable = document.getElementById("emp");
const table = document.getElementById("table");
const table1 = document.getElementById("export_table");
var inputElems = document.getElementsByClassName("form-check-input");
const label = input.nextElementSibling;
var onkeypress_code = document.getElementById("emp").getAttribute("onkeypress")
const label1 = variable.nextElementSibling;
let n="";
input.addEventListener('change', function() {
    if (input.checked) {
      //label.textContent = 'EmpNo';
      document.getElementById("tag").innerHTML="EmpNo";
      label1.textContent = 'Enter your PF No';
      document.getElementById("emp").value="";
      document.getElementById("emp").removeAttribute("onkeypress");
    } else {
      //label.textContent = 'EmpName';
      document.getElementById("tag").innerHTML="EmpName";
      label1.textContent = 'Enter your name';
      document.getElementById("emp").value="";
      document.getElementById("emp").setAttribute("onkeypress", onkeypress_code);
    }
});

document.addEventListener("keypress",function(event){
  if(event.code=="Enter" || event.code=="NumpadEnter"){
      document.getElementById("submit").click();
  }
})

window.onload = () => {
  const myInput = document.getElementById('emp');
  myInput.onpaste = e => e.preventDefault();
}

document.getElementById("submit").addEventListener("click",function(){
  if(document.getElementById("emp").value==""){
    document.getElementById("message").className="alert alert-danger fade show d-flex align-items-center justify-content-center";
    document.getElementById("msg").innerHTML="Please don't leave the input field empty";
    document.getElementsByClassName("table-responsive")[0].style.display="none";
    document.getElementById("save").style.display="none";
  }
  else{
    $.ajax({
      url: '/paydetails_server.php',
      type: 'POST',
      data: { "value":document.getElementById("emp").value},
      cache: false,
      success:function(response){
        if(response[0]=='['){
          n=document.getElementById("emp").value;
          document.getElementById("message").className="alert alert-success fade show d-flex align-items-center justify-content-center";
          document.getElementById("msg").innerHTML="Valid employee found, records are as below";
          if(table.rows.length>1){
            while(table.rows.length!=1)
              table.deleteRow(1);
          }
          const arr=JSON.parse(response);
          var len=arr.length*26;
          for(var i=0; i<len/26; i++){
            var row=table.insertRow(table.rows.length);
            //table1.insertRow(table1.rows.length);
            row.style.backgroundColor="rgb(255, 255, 255)";
            var cell0=row.insertCell(0);
            var cell1=row.insertCell(1);
            var cell2=row.insertCell(2);
            var cell3=row.insertCell(3);
            var cell4=row.insertCell(4);
            var cell5=row.insertCell(5);
            var cell6=row.insertCell(6);
            var cell7=row.insertCell(7);
            var cell8=row.insertCell(8);
            var cell9=row.insertCell(9);
            var cell10=row.insertCell(10);
            var cell11=row.insertCell(11);
            var cell12=row.insertCell(12);
            var cell13=row.insertCell(13);
            var cell14=row.insertCell(14);
            var cell15=row.insertCell(15);
            var cell16=row.insertCell(16);
            var cell17=row.insertCell(17);
            var cell18=row.insertCell(18);
            var cell19=row.insertCell(19);
            var cell20=row.insertCell(20);
            var cell21=row.insertCell(21);
            var cell22=row.insertCell(22);
            var cell23=row.insertCell(23);
            var cell24=row.insertCell(24);
            var cell25=row.insertCell(25);

            cell0.innerHTML=arr[i][0];
            cell1.innerHTML=arr[i][1];
            cell2.innerHTML=arr[i][2];
            cell3.innerHTML=arr[i][3];
            cell4.innerHTML=arr[i][4];
            cell5.innerHTML=arr[i][5];
            cell6.innerHTML=arr[i][6];
            cell7.innerHTML=arr[i][7];
            cell8.innerHTML=arr[i][8];
            cell9.innerHTML=arr[i][9];
            cell10.innerHTML=arr[i][10];
            cell11.innerHTML=arr[i][11];
            cell12.innerHTML=arr[i][12];
            cell13.innerHTML=arr[i][13];
            cell14.innerHTML=arr[i][14];
            cell15.innerHTML=arr[i][15];
            cell16.innerHTML=arr[i][16];
            cell17.innerHTML=arr[i][17];
            cell18.innerHTML=arr[i][18];
            cell19.innerHTML=arr[i][19];
            cell20.innerHTML=arr[i][20];
            cell21.innerHTML=arr[i][21];
            cell22.innerHTML=arr[i][22];
            cell23.innerHTML=arr[i][23];
            cell24.innerHTML=arr[i][24];
            cell25.innerHTML=arr[i][25];
          }
          table.rows[0].style.position="sticky";
          table.rows[0].style.top="0";
          document.getElementsByClassName("table-responsive")[0].style.display="block";
          document.getElementById("save").style.display="block";
        }
        else{
          document.getElementById("message").className="alert alert-danger fade show d-flex align-items-center justify-content-center";
          document.getElementById("msg").innerHTML=response;
          document.getElementsByClassName("table-responsive")[0].style.display="none";
          document.getElementById("save").style.display="none";
        }
      },
      complete:function(){}
    });
  }
  document.getElementById("message").style.display="block";
  setTimeout(function(){
    document.getElementById("message").className="random_name";
    document.getElementById("msg").innerHTML="";
  },3000);
})
//console.log(table.rows.length==table1.rows.length);
document.getElementById("export").addEventListener("click",function(){
  var arr=[];
  if(table1.rows.length>1){
    while(table1.rows.length!=1)
      table1.deleteRow(1);
  }
  for (var i=1; i<inputElems.length; i++) {
    if (inputElems[i].checked){
      arr.push(i-1);
    }
  }
  if(arr.length>0){
    for(var i=1; i<table.rows.length; i++){
      table1.insertRow(i);
    }
    for(var i=0; i<table1.rows.length; i++){
      for(var j=0; j<arr.length; j++){
        var cell=table1.rows[i].insertCell(j);
        cell.style.textAlign="center";
      }
    }
    for(var i=0; i<table1.rows[0].cells.length; i++){
      table1.rows[0].cells.item(i).style.fontWeight="900";
    }
    
    //console.log(table1.rows[0].cells.length);
    for(var i=0; i<table1.rows.length; i++){
      for(var j=0; j<arr.length; j++){
        //console.log(table.rows[i].cells[arr[j]].innerHTML+"-"+arr[j]);
        table1.rows[i].cells[j].innerHTML=table.rows[i].cells[arr[j]].innerHTML;
        //console.log(table1.rows[i].innerText)
      }
    }
    //console.log(table1)
    var fp=XLSX.utils.table_to_book(table1,{sheet:"pay_details"});
    XLSX.write(fp,{
      bookType:'xlsx',
      type:'base64'
    });
    XLSX.writeFile(fp,n+' pay_details.xlsx');
  }
})