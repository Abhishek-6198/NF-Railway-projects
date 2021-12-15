var n=sessionStorage.getItem("name");
var t=sessionStorage.getItem("type");
if(n!=null){
    if (t!="Admin")
        window.open("http://localhost//Electric%20billing%20system/Homepage/index.html","_self");
    else{
        var table=document.getElementById("emp");
        var temp=[];
        var final=[];
        var count=0;

        $.ajax({
            url: 'backend.php',
            type: 'POST',
            data: { "input": "fetch"
                },
            success: function(response) { 
                if(response[0]=='['){
                    const arr=JSON.parse(response);
                    var x=arr.length*3;
                    for(var i=0; i<x/3; i++){
                        var row = table.insertRow(table.rows.length);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        row.addEventListener("click",f1);

                        var input = document.createElement("input");
                        input.type = "text";
                        input.className="no/name";
                        $(input).on({
                            keydown: function(e) {
                              if (e.which === 32)
                                return false;
                            },
                            change: function() {
                              this.value = this.value.replace(/\s/g, "");
                            }
                          });
                        input.maxLength=11;
                        input.style.textAlign="center";

                        var input1 = document.createElement("input");
                        input1.type = "password";
                        input1.className="password";
                        $(input1).mouseover(function(){
                            this.type="text";
                        })
                        $(input1).mouseout(function(){
                            this.type="password";
                        })
                        input1.style.textAlign="center";

                        var selectList = document.createElement("select");
                        selectList.className = "user_type";
                        selectList.style.width="80%";
                        selectList.style.textAlign="center";

                        var option = document.createElement("option");
                        option.value = "Admin";
                        option.text = "Admin";
                        option.style.textAlign="center";
                        selectList.appendChild(option);

                        var option1 = document.createElement("option");
                        option1.value = "Meter reader inspector";
                        option1.text = "Meter reader inspector";
                        option1.style.textAlign="center";
                        selectList.appendChild(option1);

                        var option2 = document.createElement("option");
                        option2.value = "Senior meter reader";
                        option2.text = "Senior meter reader";
                        option2.style.textAlign="center";
                        selectList.appendChild(option2);

                        var option3 = document.createElement("option");
                        option3.value = "Meter reader";
                        option3.text = "Meter reader";
                        option3.style.textAlign="center";
                        selectList.appendChild(option3);

                        cell1.appendChild(input);
                        cell2.appendChild(input1);
                        cell3.appendChild(selectList);

                        input.value=arr[i][0];
                        input1.value=arr[i][1];
                        selectList.value=arr[i][2];
                    }
                }
                else
                    alert(response);
            },
            complete: function() {}
        });

        document.getElementById("add").addEventListener("click",function(){
            var row = table.insertRow(table.rows.length);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            row.addEventListener("click",f1);

            var input = document.createElement("input");
            input.type = "text";
            input.className="no/name";
            $(input).on({
                keydown: function(e) {
                  if (e.which === 32)
                    return false;
                },
                change: function() {
                  this.value = this.value.replace(/\s/g, "");
                }
              });
            input.maxLength=11;
            input.style.textAlign="center";

            var input1 = document.createElement("input");
            input1.type = "password";
            input1.className="password";
            $(input1).mouseover(function(){
                this.type="text";
            })
            $(input1).mouseout(function(){
                this.type="password";
            })
            input1.style.textAlign="center";

            var selectList = document.createElement("select");
            selectList.className = "user_type";
            selectList.style.width="80%";
            selectList.style.textAlign="center";

            var option = document.createElement("option");
            option.value = "Admin";
            option.text = "Admin";
            option.style.textAlign="center";
            selectList.appendChild(option);

            var option1 = document.createElement("option");
            option1.value = "Meter reader inspector";
            option1.text = "Meter reader inspector";
            option1.style.textAlign="center";
            selectList.appendChild(option1);

            var option2 = document.createElement("option");
            option2.value = "Senior meter reader";
            option2.text = "Senior meter reader";
            option2.style.textAlign="center";
            selectList.appendChild(option2);

            var option3 = document.createElement("option");
            option3.value = "Meter reader";
            option3.text = "Meter reader";
            option3.style.textAlign="center";
            selectList.appendChild(option3);

            cell1.appendChild(input);
            cell2.appendChild(input1);
            cell3.appendChild(selectList);
        })

        document.getElementById("change").addEventListener("click",function(){
            for(var i=1; i<table.rows.length; i++){
                if(table.rows[i].style.backgroundColor=="rgb(118, 230, 238)"){
                    if(document.getElementsByClassName("no/name")[i-1].value.length>0 && document.getElementsByClassName("password")[i-1].value.length>0){
                        temp.push(document.getElementsByClassName("no/name")[i-1].value);
                        temp.push(document.getElementsByClassName("password")[i-1].value);
                        temp.push(document.getElementsByClassName("user_type")[i-1].value);
                        final.push(temp);
                        temp=[];
                    }
                }
                else
                    count+=1;
            }

            if(count==table.rows.length-1)
                alert("Please select the rows you want to update");
            else{
                if(final.length!=0){
                    var jsonString = JSON.stringify(final);
                    $.ajax({
                        url: 'backend.php',
                        type: 'POST',
                        data:   {"input": "update_records",
                                "data": jsonString},
                        success:function(response){
                            final=[];
                            if(response.includes("Updated"))
                                alert(response);
                            else if(response.includes("-")){
                                var arr=response.split("-");
                                //console.log(arr[0]);
                                
                                while(true){
                                    const pass=prompt("Please enter the password to view your recovery code. The password is the last 4 digits of your employee no and the last 3 digits of your billunit.\n\nSuppose your Empno is 123XXXX3476 and your Billunit is 01XX345, then your password will be 3476345");
                                    if(pass==Number(arr[0])){
                                        alert("Your recovery code is: "+arr[1]+".\n\n DO NOT FORGET THIS, PLEASE NOTE IT DOWN FOR FUTURE REFERENCE"); 
                                        break;
                                    } 
                                }
                                
                                
                                //console.log(arr[1]);
                            }
                            else{
                                alert(response);
                            }
                        },  
                        complete:function(){

                        }
                    }); 
                }
                else
                    alert("Something went wrong, please try again");
            }
            count=0;
        })

        function f1(){
            if(this.style.backgroundColor!="rgb(118, 230, 238)"){
                this.style.backgroundColor="rgb(118, 230, 238)";
            }
            else
                this.style.backgroundColor="rgb(252, 198, 118)";
        }

        document.getElementById("skip").addEventListener("click",function(){
            window.open("http://localhost//Electric%20billing%20system/Homepage/index.html", "_self");
        })

        /*document.querySelectorAll(".password").forEach((item,index) => {
            item.addEventListener("mouseover",function(){
                item.type="text";
            })

            item.addEventListener("mouseout",function(){
                item.type="password";
            })
        })*/

    }
}
else
    window.open("http://localhost//Electric%20billing%20system/Login%20screen/index.html","_self");