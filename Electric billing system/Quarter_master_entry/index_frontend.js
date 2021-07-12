function IsAlphaNumeric(e) {
    var specialKeys = new Array();
    specialKeys.push(8);  //Backspace
    specialKeys.push(9);  //Tab
    specialKeys.push(46); //Delete
    specialKeys.push(36); //Home
    specialKeys.push(35); //End
    specialKeys.push(37); //Left
    specialKeys.push(39); //Right
    var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
    var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode));
    //console.log(e.keyCode);
    document.getElementById("error").style.display = ret ? "none" : "inline";
    if(e.charCode==47){
        ret=true;
        document.getElementById("error").style.display ="none";
    }
    return ret;
}

var colony_name="";
var colony_type="";

function get_code() {
    let $select = $("#colony_code");
  
    $.ajax({
      url: 'index_backend.php',
      type: 'POST',
      data: { "input": "code" }, // should 'code' be a variable...?
      dataType: 'json', // add this property to avoid the need to call JSON.parse in success
      success: function(response) {
        let selectedValue = $select.val();
        let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
        $select.html(html).val(selectedValue);
        colony_name=selectedValue;
      },
      complete: function() {}
    });
}

function get_type(){
    let $select = $("#colony_type");
  
    $.ajax({
      url: 'index_backend.php',
      type: 'POST',
      data: { "input": "type" }, // should 'code' be a variable...?
      dataType: 'json', // add this property to avoid the need to call JSON.parse in success
      success: function(response) {
        let selectedValue = $select.val();
        let html = response.filter((e, i, a) => a.indexOf(e) === i).map(item => `<option value="${item}">${item}</option>`);
        $select.html(html).val(selectedValue);
        colony_type=selectedValue;
      },
      complete: function() {}
    });
}

function get_qid(){
   var code = document.getElementById("colony_code");
   var type = document.getElementById("colony_type");
   var q_no = document.getElementById("qtr_no");
   var quarter_id="";

   if(code.selectedIndex <=-1 || type.selectedIndex <=-1 || q_no.value.length ==0)
    {
        console.log(code.selectedIndex <=-1);
        console.log(type.selectedIndex <=-1);
        console.log(q_no.value.length ==0);
      //document.getElementById("save").style.backgroundColor="red";
      alert("Please enter all the details");
    }
    else{
        if(!q_no.value.includes('/'))
            alert("Your quarter no is incorrect!");
        else{
            //document.getElementById("save").style.backgroundColor="rgb(188, 247, 188)";
            //document.getElementById("qid").innerHTML="Please note down your Quarter ID for future reference: "+Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            $.ajax({
                url: 'index_backend.php',
                type: 'POST',
                data: { "input": "id","name": colony_name, 
                                      "number": document.getElementById("qtr_no").value,
                                      "type": colony_type}, // should 'code' be a variable...?
                success: function(response) {
                    //console.log(response.length);
                    if(response.includes("0")){
                        document.getElementById("qid").style.display="inline";
                        document.getElementById("qrtr_id").style.display="inline";
                        if(response.length<70){
                            $("#qrtr_id").html(response);
                            if(window.innerWidth>=1300)
                                document.getElementById("qrtr_id").style.left="19em";
                            setTimeout(function()
                            { 
                                var c= confirm("This record has been inserted.");
                                if (c==true||c==false) {
                            
                                    window.location.reload();
                                } 
                            }, 2000);
                        }
                        else if(response.length>70){
                            let str="";
                            const arr=response.split(" ");
                            for(var i=0; i<arr.length-1; i++){
                                str=str.concat(" ",arr[i]);
                            }
                            //console.log(arr);
                            //console.log(arr[arr.length-1]);
                            $("#qid").html(str);
                            $("#qrtr_id").html(arr[arr.length-1]);
                            //document.getElementById("qrtr_id").innerHTML=arr[arr.length-1];
                            setTimeout(function(){
                                window.location.reload();
                            }, 4000);
                        }
                    }
                    else{
                        alert(response);
                    }
                    
                    
                    //alert(response);
                },
                complete: function() {
                    
                      //$("#qrtr_id").html(quarter_id);
                }
            });

            
            
        }
    }
}

function mouseover(){
    var code = document.getElementById("colony_code");
    var type = document.getElementById("colony_type");
    var q_no = document.getElementById("qtr_no");
 
    if(code.selectedIndex <=-1 || type.selectedIndex <=-1 || q_no.value.length ==0)
        document.getElementById("save").style.backgroundColor="rgba(245, 175, 175, 0.945)";
    else{
        if(!q_no.value.includes('/'))
            document.getElementById("save").style.backgroundColor="rgba(245, 175, 175, 0.945)";
        else
            document.getElementById("save").style.backgroundColor="rgb(188, 247, 188)"; 
    }
}

function mouseout(){
    document.getElementById("save").style.backgroundColor="white";

}

function forceUpper(strInput) 
{
strInput.value=strInput.value.toUpperCase();
}