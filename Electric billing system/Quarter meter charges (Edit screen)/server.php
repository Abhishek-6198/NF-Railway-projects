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

        if($_POST["input"] == "names"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $codes=array();
                $sql = "SELECT * from colony_master";
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
        elseif($_POST["input"] == "types"){

            if(!$connection)
                    echo "Connection to database failed! Please try again";
            else{
                    $codes=array();
                    $sql = "SELECT * from colony_master WHERE Colony_name='".$_POST["name"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                //array_push($codes,$row["Colony_code"]);
                                $code=$row["Colony_code"];
                            }
                            $sql = "SELECT * from quarter_master_entry WHERE Colony_code='".$code."'";
                            $result = $con->query($sql);
                            if ($result->num_rows > 0) {
                                while($row = $result->fetch_assoc()) {
                                    array_push($codes,$row["Qtr_type"]);
                                }
                                //echo json_encode($codes);
                            }
                            else
                                array_push($codes,"No quarter is registered against ".$_POST["name"].". Please ensure that you've registered your quarter before proceeding.");
                            echo json_encode($codes);
                    }
                    else
                        echo "No colony code information found in table!!";
            }
        }
        elseif($_POST["input"] == "is it registered?"){
            $qtrid=array();
            $final=array();
            $flag=FALSE;
            if(!$connection)
                    echo "Connection to database failed! Please try again";
            else{

                    $sql="SELECT * from `colony_master` WHERE `Colony_name`='".$_POST["c_name"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $code=$row["Colony_code"];
                        }
                    }
                    $sql = "SELECT * from `quarter_master_entry` WHERE `Colony_code`='".$code."' AND `Qtr_type`='".$_POST["c_type"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        //echo($result->num_rows);
                        while($row = $result->fetch_assoc()) {
                            array_push($qtrid,$row["Qtr_ID"]);
                        }
                    }

                    for($x=0; $x<count($qtrid); $x++){
                        $temp=array();
                        $sql="SELECT * from `electric transaction` WHERE `Qtr_ID`='".$qtrid[$x]."' AND `Flag`=0";
                        $result = $con->query($sql);
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                array_push($temp,$row["Qtr_ID"],$row["EmpNo"],$row["EmpName"],$row["Qtr_No"],$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"]);
                                array_push($final,$temp);
                            }  
                        }
                                            
                    }

                    if(count($final)!=0)
                        echo json_encode($final);
                }           
        }
        elseif($_POST["input"]=="calculate_charges"){
            $charge=$_POST["rate"];
            $charge1=0;
            $months=0;
            $temp=array();
            $c=0;
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $sql="SELECT * from `electric rate table`";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        if($charge>$row["to_unit"]){
                            $charge1+=$row["Rate/unit"];
                            $charge=$charge-$row["to_unit"];
                        }
                        else{
                            $charge1+=$row["Rate/unit"];
                            break;
                        }
                    }
                    array_push($temp,$charge1);

                    if($_POST["days"]%30==0){
                        $months=intdiv($_POST["days"],30);
                    }
                    else{
                        if($_POST["days"]%30>15){
                            $months=intdiv($_POST["days"],30) + 1;
                        }
                        elseif($_POST["days"]%30<=15){
                            $months=intdiv($_POST["days"],30);
                        }
                    }

                    $sql="SELECT * from `quarter_master_entry` WHERE `Qtr_ID`='".$_POST["id"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $c=$months*$row["Meter capacity"]*50;
                        }
                    }
                    //$charge=$charge1;
                    $charge1=($charge1*$_POST["days"])+$c; 
                    echo $charge1."-".$c."-".$temp[0];
                }
            }
        }
        elseif($_POST["input"]=="insert_records"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $a=1;
                $stmt = $con->prepare("INSERT INTO `electric transaction`(`Qtr_ID`,`EmpNo`, `EmpName`, `Qtr_No`, `Prev read`, `Prev Date`, `Current read`, `Current Date`, `Unit consumed`, `Elec_charge`, `Fixed_charge`, `Total charge`, `Flag`) 
                                                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("ssssisisidddi", $_POST["qtrid"], $_POST["empno"], $_POST["name"], $_POST["qtr_no"], $_POST["prev_met"], $_POST["prev_date"], $_POST["curr_met"], $_POST["curr_date"], $_POST["unit_consumed"], $_POST["charge"], $_POST["fixed_charge"], $_POST["rate"], $a);
                if($stmt->execute()){
                    $sql= "DELETE from `electric transaction` WHERE `Qtr_ID`='".$_POST["qtrid"]."' AND `Flag`=0";
                    $result = $con->query($sql);
                    if($result === TRUE){
                        echo "Updated successfully";
                    }
                    else{
                        echo $con->error;
                    }
                }
                else
                    echo $con->error;
            }
        }
    }
?>