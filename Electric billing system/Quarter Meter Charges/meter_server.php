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
            $empno="";
            $qtrno=array();
            $empname="";
            $read=0;
            $date="";
            $final=array();
            if(!$connection)
                    echo "Connection to database failed! Please try again";
            else{

                    $sql="SELECT * from `colony_master` WHERE `Colony_name`='".$_POST["c_name"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $code=$row["Colony_code"];
                        }
                        $sql = "SELECT * from `quarter_master_entry` WHERE `Colony_code`='".$code."' AND `Qtr_type`='".$_POST["c_type"]."'";
                        $result = $con->query($sql);
                        if ($result->num_rows > 0) {
                            //echo($result->num_rows);
                            while($row = $result->fetch_assoc()) {
                                array_push($qtrid,$row["Qtr_ID"]);
                                array_push($qtrno,$row["Qtr_No"]);
                            }

                            for($x=0; $x<count($qtrid); $x++){
                                $temp=array();
                                $sql = "SELECT * from `quarter_occupancy` WHERE `Qtr_ID`='".$qtrid[$x]."' AND `Vacation Date` IS NULL";
                                $result = $con->query($sql);
                                if ($result->num_rows > 0) {
                                    while($row = $result->fetch_assoc()) {
                                        $empno=$row["EmpNo"];
                                    }
                                }
                                else{
                                    echo "No quarters are occupied in this colony";
                                    break;
                                }

                                $sql="SELECT * from `employee_master` WHERE `EmpNo`='".$empno."'";
                                $result = $con->query($sql);
                                if ($result->num_rows > 0) {
                                    while($row = $result->fetch_assoc()) {
                                        $empname=$row["Name"];
                                    }
                                }
                                else{
                                    echo "Employee record not found";
                                    break;
                                }

                                $sql="SELECT * from `electric transaction` WHERE `Qtr_ID`='".$qtrid[$x]."'";
                                $result = $con->query($sql);
                                if ($result->num_rows > 0) {
                                    while($row = $result->fetch_assoc()) {
                                        $read=$row["Current read"];
                                        $date=$row["Current Date"];
                                    }
                                }
                                else{
                                    $sql="SELECT * from `quarter_occupancy` WHERE `Qtr_ID`='".$qtrid[$x]."'AND `Vacation Date` IS NULL";
                                    $result = $con->query($sql);
                                    if ($result->num_rows > 0) {
                                        while($row = $result->fetch_assoc()) {
                                            $read=0;
                                            $date=$row["Occupation Date"];
                                        }
                                    }
                                }
                                array_push($temp,$qtrid[$x],$empno,$qtrno[$x],$empname,$read,$date);
                                array_push($final,$temp);
                            }
                            echo json_encode($final);
                            
                        }
                        else{
                            echo "No quarters are registered for this colony.";
                        }
                    }
                    else{
                        echo "No colony record registered against this name";
                    }
                    //echo json_encode($final);
            }
        }
        elseif($_POST["input"]=="calculate_charges"){
            $charge=$_POST["current_read"];
            $charge1=0;

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
                    $charge1=$charge1*$_POST["days"]+50; //??
                    echo $charge1;
                    $sql="SELECT * from `electric transaction` WHERE `Qtr_ID`='".$_POST["qtrid"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        $sql="UPDATE `electric transaction` SET `Prev read`=?, `Prev Date`=?, `Current read`=?, `Current Date`=?, `Charge`=?  WHERE `Qtr_ID`= '".$_POST["qtrid"]. "' AND `EmpNo`= '".$_POST["empno"]."'";
                        $statement = $con->prepare($sql);
                        $statement->bind_param("isisi",$_POST["prev_met"],$_POST["prev_date"], $_POST["curr_met"], $_POST["curr_date"], $charge1);
                        if($statement->execute())
                            echo "Updated meter charge successfully"."-".$_POST["curr_met"]."-". $_POST["curr_date"]."-".$charge1;
                        else
                            $con->error();
                    }
                    else{
                        $stmt = $con->prepare("INSERT INTO `electric transaction`(`Qtr_ID`,`EmpNo`,`Prev read`, `Prev Date`, `Current read`, `Current Date`, `Charge`) 
                                                            VALUES (?, ?, ?, ?, ?, ?, ?)");
                        $stmt->bind_param("ssisisd", $_POST["qtrid"], $_POST["empno"], $_POST["prev_met"], $_POST["prev_date"], $_POST["curr_met"], $_POST["curr_date"], $charge1);
                        if($stmt->execute())
                            echo "Inserted meter charge details"."-".$_POST["curr_met"]."-". $_POST["curr_date"]."-".$charge1;
                        else
                            $con->error();
                    }
                }
            }
        }
    }
?>