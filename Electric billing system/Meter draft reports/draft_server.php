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
                $sql = "SELECT * from `electric transaction`";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        //array_push($codes,$row["Colony_name"]);
                        $code=substr($row["Qtr_ID"],0,7);
                        $sq="SELECT * from `colony_master` WHERE `Colony_code`='".$code."'";
                        $res=$con->query($sq);
                        if($res->num_rows > 0){
                            while($r = $res->fetch_assoc()) {
                                array_push($codes,$r["Colony_name"]);
                            }
                        }
                    }
                    echo json_encode($codes);
                }
                else
                    echo "No colony name information found in table!!";
            }
        }
        elseif($_POST["input"] == "generate_report"){
            $final=array();
            if(!isset($_POST["date"])){
                if(!$connection)
                    echo "Connection to database failed! Please try again";
                else{
                    $sql="SELECT * FROM `colony_master` WHERE `Colony_name`='".$_POST["colony"]."'";
                    //echo $sql;
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $code=$row["Colony_code"];
                        }
                    }
                    $sql="SELECT * FROM `electric transaction` WHERE `Flag`= 0";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            if(substr($row["Qtr_ID"],0,7)==$code){
                                $temp=array();
                                array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"],$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"]);
                                array_push($final,$temp);
                            }
                        }
                    }
                }
            }
            elseif(!isset($_POST["colony"])){
                if(!$connection)
                    echo "Connection to database failed! Please try again";
                else{
                    $sql="SELECT * FROM `electric transaction` WHERE `Current Date`='".$_POST["date"]."' AND `Flag`=0";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $temp=array();
                            array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"],$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"]);
                            array_push($final,$temp);
                        }
                    }
                }
            }
            elseif(isset($_POST["date"]) && isset($_POST["colony"])){
                if(!$connection)
                    echo "Connection to database failed! Please try again";
                else{
                    $sql="SELECT * FROM `colony_master` WHERE `Colony_name`='".$_POST["colony"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $code=$row["Colony_code"];
                        }
                    }
                    $sql="SELECT * FROM `electric transaction` WHERE `Current Date`='".$_POST["date"]."' AND `Flag`=0";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            if(substr($row["Qtr_ID"],0,7)==$code){
                                $temp=array();
                                array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"],$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"]);
                                array_push($final,$temp);
                            }
                        }
                    }
                }
            }
            echo json_encode($final);
        }
    }
?>