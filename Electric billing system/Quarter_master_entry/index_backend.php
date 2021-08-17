<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

$server="localhost";
$username="root";
$pass="";

$con=mysqli_connect($server,$username,$pass);
$connection=mysqli_select_db($con,"electric billing system");

if(isset($_POST["input"])){
    

    if($_POST["input"] == "code"){
        

        if(!$connection)
              echo "Connection to database failed! Please try again";
        else{
            $codes=array();
            $sql = "SELECT * from `colony_master`";
            $result = $con->query($sql);
            if ($result->num_rows > 0) {
                  while($row = $result->fetch_assoc()) {
                    array_push($codes,$row["Colony_name"]);
                  }
                  echo json_encode($codes);
            }
            else
                echo "No colony name information found in table!!";
        }
    }

    elseif($_POST["input"] == "type"){

        if(!$connection)
                echo "Connection to database failed! Please try again";
        else{
                $codes=array();
                $sql = "SELECT * from `quarter_master`";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            array_push($codes,$row["Qtr_type"]);
                        }
                        echo json_encode($codes);
                }
                else
                    echo "No quarter type information found in table!!";
        }
    }

    elseif($_POST["input"] == "id"){
        $name=$_POST["name"];
        $type=$_POST["type"];
        $number=$_POST["number"];

        //echo $name;
        //echo $type;
        //echo $number;

        if(!$connection)
                echo "Connection to database failed! Please try again";
        else{
                //$codes=array();
                $sql = "SELECT `Colony_code` from `colony_master` WHERE `Colony_name`='".$name."'";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            //check whether the colony details already exists in the database
                            
                                $code=$row["Colony_code"];
                                //var_dump($row);
                                
                        }
                        //echo $code;
                        $sql = "SELECT `Qtr_No` from `quarter_master_entry` WHERE `Qtr_No`='".$number."'";
                        $result = $con->query($sql);
                        //echo $result->num_rows;
                        if($result->num_rows > 0){
                            $sql = "SELECT `Qtr_ID` from `quarter_master_entry` WHERE `Qtr_No`='".$number."'";
                            $result = $con->query($sql);
                            if($result->num_rows > 0){
                                while($row = $result->fetch_assoc()) {
                                    $id=$row["Qtr_ID"];
                                }
                                echo "This Quarter number is already registered with the ID: ".$id;
                            } 
                        }
                        else{
                            //Inserting record
                            $stmt = $con->prepare("INSERT INTO `quarter_master_entry`(`Qtr_No`, `Qtr_type`, `Colony_code`) 
                                                            VALUES (?, ?, ?)");
                            $stmt->bind_param("sss", $number, $type, $code);
                            if( $stmt->execute()){
                                //echo "Colony details have been inserted. Your colony code is ".$code."<br>";

                                //give Qtr_ID as output
                                $sql = "SELECT `Sl_No` from `quarter_master_entry` WHERE `Colony_code`= '".$code. "'";
                                $result = $con->query($sql);
                                if($result->num_rows > 0){
                                    while($row = $result->fetch_assoc()) {
                                        if($type=="I")
                                            $qid="01000000";
                                        elseif($type=="II")
                                            $qid="02000000";
                                        else
                                            $qid="03000000";

                                        $qid=$qid.(string)$row["Sl_No"];
                                    }
                                    $statement = $con->prepare("UPDATE `quarter_master_entry` SET `Qtr_ID`=?, `Meter capacity`=? WHERE `Qtr_No`= '".$number. "'");
                                    $code=$code.$qid;
                                    $cap=rand(1,5);
                                    //$inp_code=(int)$code;
                                    $statement->bind_param("si",$code,$cap);
                                    if($statement->execute())
                                        echo $code;      
                                    else
                                        echo $con->error()." ".$cap;

                                    $statement->close();    
                                }
                            }
                            else{
                                //echo "Something went wrong in insertion of record. Please  try again.";
                                echo $con->error;
                                //echo $con->error();
                            }  
                            $stmt->close();
                        }
                        
                            //break;
                }
                else
                    echo "No colony information found in table!! Please try a different colony name.";
        }
               
        
    }
}
?>