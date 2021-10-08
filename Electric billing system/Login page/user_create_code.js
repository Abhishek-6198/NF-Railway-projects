var t=sessionStorage.getItem("type");
if (t!="admin")
    window.open("http://localhost//Electric%20billing%20system/Login%20screen/index.html","_self");
else{
    document.getElementById("name").innerText=n;
    var table=document.getElementById("emp");
    var temp=[];
    var final=[];
    var count=0;

    document.getElementById("name").addEventListener("click",function(){
        if(document.getElementsByClassName("dropdown-content")[0].style.display!="block")
            document.getElementsByClassName("dropdown-content")[0].style.display="block";
        else
            document.getElementsByClassName("dropdown-content")[0].style.display="none";
    })

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
                    input.style.textAlign="center";

                    var input1 = document.createElement("input");
                    input1.type = "text";
                    input1.className="password";
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
                    option1.value = "User1";
                    option1.text = "Meter reader inspector";
                    option1.style.textAlign="center";
                    selectList.appendChild(option1);

                    var option2 = document.createElement("option");
                    option2.value = "User2";
                    option2.text = "Senior meter reader";
                    option2.style.textAlign="center";
                    selectList.appendChild(option2);

                    var option3 = document.createElement("option");
                    option3.value = "User3";
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
        input.style.textAlign="center";

        var input1 = document.createElement("input");
        input1.type = "text";
        input1.className="password";
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
        option1.value = "User1";
        option1.text = "Meter reader inspector";
        option1.style.textAlign="center";
        selectList.appendChild(option1);

        var option2 = document.createElement("option");
        option2.value = "User2";
        option2.text = "Senior meter reader";
        option2.style.textAlign="center";
        selectList.appendChild(option2);

        var option3 = document.createElement("option");
        option3.value = "User3";
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
                        alert(response);
                    },
                    complete:function(){

                    }
                }); 
            }
            else
                alert("Please enter the credentials");
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

    document.getElementById("signout").addEventListener("click",function(){
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("type");
        window.open("http://localhost//Electric%20billing%20system/Login%20screen/index.html","_self");
    })
}