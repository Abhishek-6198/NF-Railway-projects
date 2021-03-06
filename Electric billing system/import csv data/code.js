var t=sessionStorage.getItem("type");
var n=sessionStorage.getItem("name");
if (t!="Admin")
    window.open("http://localhost//Electric%20billing%20system/Login%20screen/index.html","_self");
else{

    var arr=[];
    var temp=[];
    var sheet=[];
    var flag1=false;

    //document.getElementById("name").innerText=n;

    //document.getElementsByClassName("fas fa-user-lock")[0].style.display="block";

    const file = document.getElementById('myfile');

    var table = document.getElementById("tab");
    
    
    file.addEventListener('change', (event) => {
        var flag = false;
        //console.log(document.getElementById("myfile").files[0].name);
        document.getElementsByClassName("fas fa-spinner")[0].style.display="block";
        document.getElementById("file-status").style.display="block";
        document.getElementById("file-status").innerHTML="Reading data...";
        document.getElementById("message").innerHTML="No preview available";
        setTimeout(function(){
            document.getElementsByClassName("fas fa-spinner")[0].style.display="none";
            document.getElementById("file-status").style.display="none";
            if(table.rows.length>0){
                while(table.rows.length>0)
                    table.deleteRow(0);
            }
        
            var reader = new FileReader();
            //console.log(typeof(event.target.files[0]))
            if(typeof(event.target.files[0])=="undefined"){
                document.getElementById("upload").style.display="none";
                document.getElementById("message").style.display="block";
                document.getElementsByClassName("far fa-frown")[0].style.display="block";
                var s = document.getElementById("message").innerHTML.toString().concat(" (No file selected)");
                document.getElementById("message").innerHTML = s;
            }  
            else{
                reader.readAsArrayBuffer(event.target.files[0]);
            }
        
            reader.onload = function(event){
        
                var data = new Uint8Array(reader.result);
        
                var work_book = XLSX.read(data, {type:'array'});
        
                var sheet_name = work_book.SheetNames;
        
                var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], {header:1});
        
                sheet=sheet_data;
        
                if(sheet_data.length > 0)
                {
                    if(sheet_data[0][0]=="Qtr_No" || sheet_data[0][1]=="Qtr_No" || sheet_data[0][5]=="Meter capacity (in KW)" || sheet_data[0][6]=="Meter capacity (in KW)"){ //for quarter_master_entry
                        if(sheet_data[0][0]=="Qtr_No"){
                            if(sheet_data[0][1]=="Qtr_type" && sheet_data[0][2]=="Colony_code" && sheet_data[0][3]=="Book_no" && sheet_data[0][4]=="Page_no"){
                                flag=true;
                            }
                        }
                        else{
                            if(sheet_data[0][0]=="Qtr_ID" && sheet_data[0][2]=="Qtr_type" && sheet_data[0][3]=="Colony_code" && sheet_data[0][4]=="Book_no" && sheet_data[0][5]=="Page_no"){
                                flag=true;
                            }
                        }
                    } 
                    else if(sheet_data[0][0]=="EmpNo"){ //for quarter occupancy entry & employee master entry
                        if(sheet_data[0][1]=="EmpName" && sheet_data[0][2]=="Qtr_No" && sheet_data[0][3]=="Colony_code" && sheet_data[0][4]=="Book_no" && sheet_data[0][5]=="Page_no" && sheet_data[0][6]=="Occupation Date"){
                            flag=true;
                        }
                        else if(sheet_data[0][1]=="Name" && sheet_data[0][2]=="Designation" && sheet_data[0][3]=="Department" && sheet_data[0][4]=="BillUnit" && sheet_data[0][5]=="Station" && sheet_data[0][6]=="DOR")
                            flag=true;
                    }
    
                    if(flag){
                        document.getElementById("upload").style.display="block";
                        for(var row = 0; row < sheet_data.length; row++)
                        {
                            var r = table.insertRow(table.rows.length);
            
                            for(var cell = 0; cell < sheet_data[row].length; cell++)
                            {
                                var c = r.insertCell(cell);
                                c.innerHTML=sheet_data[row][cell];
                                c.style.textAlign="center";
                                if(row==0){
                                    //c.style.fontWeight="800";
                                    c.style.color="white";
                                }
                                else{
                                    if(sheet_data[row][cell]!=undefined)
                                        temp.push(sheet_data[row][cell]);
                                    else{
                                        flag1=true;
                                        break;
                                    }

                                    if(sheet_data[row].length!=sheet_data[0].length){
                                        flag1=true;
                                        break;
                                    }
                                }
                            }
                            if(row>0){
                                arr.push(temp);
                                temp=[];
                            }
                            if(flag1){
                                document.getElementById("upload").style.display="none";
                                document.getElementById("message").style.display="block";
                                document.getElementsByClassName("far fa-frown")[0].style.display="block";
                                var s = document.getElementById("message").innerHTML.toString().concat(" (Empty cells found)");
                                document.getElementById("message").innerHTML = s;
                                if(table.rows.length>0){
                                    while(table.rows.length>0)
                                        table.deleteRow(0);
                                }
                                break;
                            }
                        }
                        table.rows[0].style.position="sticky";
                        table.rows[0].style.top="0";
                        table.rows[0].style.backgroundColor="rgb(96, 97, 97)";
                        document.getElementById("message").style.display="none";
                        document.getElementsByClassName("far fa-frown")[0].style.display="none";

                        //console.log(sheet_data[1].length);
                    }
                    else{
                        document.getElementById("upload").style.display="none";
                        document.getElementById("message").style.display="block";
                        document.getElementsByClassName("far fa-frown")[0].style.display="block";
                        var s = document.getElementById("message").innerHTML.toString().concat(" (Incorrect file; Please check the column order)");
                        document.getElementById("message").innerHTML = s;

                        //window.scrollTo(0,500);
                    }
                    
                }
                else{
                    document.getElementById("upload").style.display="none";
                    document.getElementById("message").style.display="block";
                    document.getElementsByClassName("far fa-frown")[0].style.display="block";
                    var s = document.getElementById("message").innerHTML.toString().concat(" (No data in file)");
                    document.getElementById("message").innerHTML = s;
                }
            }
        },1500)
    });

    /*document.getElementById("name").addEventListener("click",function(){
        if(document.getElementsByClassName("dropdown-content")[0].style.display!="block")
            document.getElementsByClassName("dropdown-content")[0].style.display="block";
        else
            document.getElementsByClassName("dropdown-content")[0].style.display="none";
    })
    
    document.getElementById("signout").addEventListener("click",function(){
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("type");
        window.open("http://localhost//Electric%20billing%20system/Login%20screen/index.html","_self");
    })*/
    if(document.getElementById("upload").style.display=="block"){
        document.addEventListener("keypress",function(event){
            if(event.code=="Enter")
                document.getElementById("upload").click();
        })
    }
    document.getElementById("upload").addEventListener("click",function(){
        
        /*for(var row = 1; row < sheet.length; row++){
            for(var cell = 0; cell < sheet[row].length; cell++){
                temp.push(sheet[row][cell]);
            }
            arr.push(temp);
            temp=[];
        }*/

        document.getElementsByClassName("fas fa-spinner")[0].style.display="block";
        document.getElementById("file-status").style.display="block";
        document.getElementById("file-status").innerHTML="Uploading data...";
        document.getElementById("upload").style.display="none";
        document.getElementById("myfile").disabled=true;

        setTimeout(function(){
            if(sheet[0][0]=="Qtr_No"){
                var jsonString = JSON.stringify(arr);
                $.ajax({
                    url: 'upload.php',
                    type: 'POST',
                    data: {"input":"qtr_master(wo id)",
                            data:jsonString},
                    cache: false,
                    success:function(response){
                        if(confirm(response)==true||confirm(response)==false){
                            setTimeout(function(){
                                location.reload();
                            },1500)
                        }
                        document.getElementsByClassName("fas fa-spinner")[0].style.display="none";
                        document.getElementById("file-status").style.display="none";
                        document.getElementById("myfile").disabled=false;
                        document.getElementById("message").style.display="block";
                        document.getElementById("message").innerHTML=document.getElementById("myfile").files[0].name+" has been uploaded successfully";
                        if(table.rows.length>0){
                            while(table.rows.length>0)
                                table.deleteRow(0);
                        }
                    },
                    complete:function(){
    
                    }
                });
            }
            else if(sheet[0][0]=="Qtr_ID"){
                var jsonString = JSON.stringify(arr);
                $.ajax({
                    url: 'upload.php',
                    type: 'POST',
                    data: {"input":"qtr_master",
                            data:jsonString},
                    cache: false,
                    success:function(response){
                        if(confirm(response)==true||confirm(response)==false){
                            setTimeout(function(){
                                location.reload();
                            },1500)
                        }
                        document.getElementsByClassName("fas fa-spinner")[0].style.display="none";
                        document.getElementById("file-status").style.display="none";
                        document.getElementById("myfile").disabled=false;
                        document.getElementById("message").style.display="block";
                        document.getElementById("message").innerHTML=document.getElementById("myfile").files[0].name+" has been uploaded successfully";
                        if(table.rows.length>0){
                            while(table.rows.length>0)
                                table.deleteRow(0);
                        }
                    },
                    complete:function(){
    
                    }
                });
            }
            else if(sheet[0][1]=="EmpName"){
                var jsonString = JSON.stringify(arr);
                $.ajax({
                    url: 'upload.php',
                    type: 'POST',
                    data: {"input":"qtr_occ",
                            data:jsonString},
                    cache: false,
                    success:function(response){
                        if(confirm(response)==true||confirm(response)==false){
                            setTimeout(function(){
                                location.reload();
                            },1500)
                        }
                        if(response.includes("database") || response.includes("quarter master")){
                            document.getElementsByClassName("fas fa-spinner")[0].style.display="none";
                            document.getElementById("file-status").innerHTML="Uploading failed";
                            if(table.rows.length>0){
                                while(table.rows.length>0)
                                    table.deleteRow(0);
                            }
                            alert(response);
                        }
                        else{
                            document.getElementsByClassName("fas fa-spinner")[0].style.display="none";
                            document.getElementById("file-status").style.display="none";
                            document.getElementById("myfile").disabled=false;
                            document.getElementById("message").style.display="block";
                            document.getElementById("message").innerHTML=document.getElementById("myfile").files[0].name+" has been uploaded successfully";
                            if(table.rows.length>0){
                                while(table.rows.length>0)
                                    table.deleteRow(0);
                            }
                        }
                    },
                    complete:function(){
    
                    }
                });
            }
            else if(sheet[0][1]=="Name"){
                var jsonString = JSON.stringify(arr);
                $.ajax({
                    url: 'upload.php',
                    type: 'POST',
                    data: {"input":"emp_entry",
                            data:jsonString},
                    cache: false,
                    success:function(response){
                        if(confirm(response)==true||confirm(response)==false){
                            setTimeout(function(){
                                location.reload();
                            },1500)
                        }
                        document.getElementsByClassName("fas fa-spinner")[0].style.display="none";
                        document.getElementById("file-status").style.display="none";
                        document.getElementById("myfile").disabled=false;
                        document.getElementById("message").style.display="block";
                        document.getElementById("message").innerHTML=document.getElementById("myfile").files[0].name+" has been uploaded successfully";
                        if(table.rows.length>0){
                            while(table.rows.length>0)
                                table.deleteRow(0);
                        }
                    },
                    complete:function(){
    
                    }
                });
            }
        },1500)
    })
}