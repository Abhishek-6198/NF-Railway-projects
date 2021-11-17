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
        if($_POST["input"] == "abcdef"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $dates=array();
                $sorted_dates=array();
                $sql = "SELECT * from `electric transaction`";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        if(!in_array($row["Current Date"],$dates))
                            array_push($dates,$row["Current Date"]);
                    }
                }
                else
                    echo $con->error;
                    
                if(count($dates)!=0){
                    foreach($dates as $d){
                        $date=explode("/",$d);
                        $dat=$date[2]."-".$date[1]."-".$date[0];
                        $sorted_dates[strtotime($dat)]=$d;
                    }
                    $dates=array();
                    krsort($sorted_dates);
                    foreach($sorted_dates as $key => $value){
                        array_push($dates,$value);
                    }
                    echo json_encode($dates);
                }
                else
                    echo "Records don't exist";
            }
        }
        elseif($_POST["input"] == "names"){
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
                    echo "Records don't exist";
            }
        }
        elseif($_POST["input"] == "generate_report"){
            $str="";
            $final=array();
            if(!isset($_POST["date"])){
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
                    $sql="SELECT * FROM `electric transaction` WHERE `Flag`= 1";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            if(substr($row["Qtr_ID"],0,7)==$code){
                                $temp=array();
                                $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                                $r = $con->query($sq);
                                if ($r->num_rows > 0) {
                                    while($rw = $r->fetch_assoc()) {
                                        $type=$rw["Qtr_type"];
                                    }
                                }
                                array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"]."; ".$type,$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"]);
                                array_push($final,$temp);
                            }
                        }
                    }
                    else{
                        echo $con->error;
                    } 
                }
            }
            elseif(!isset($_POST["colony"])){
                if(!$connection)
                    echo "Connection to database failed! Please try again";
                else{
                    $sql="SELECT * FROM `electric transaction` WHERE `Current Date`='".$_POST["date"]."' AND `Flag`=1";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                            $r = $con->query($sq);
                            if ($r->num_rows > 0) {
                                while($rw = $r->fetch_assoc()) {
                                    $type=$rw["Qtr_type"];
                                }
                            }
                            $temp=array();
                            array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"]."; ".$type,$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"]);
                            array_push($final,$temp);
                        }
                    }
                    else{
                        echo $con->error;
                    }      
                }
            }
            elseif(isset($_POST["date"]) && isset($_POST["colony"])){
                $c=$count=0;
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
                    $sql="SELECT * FROM `electric transaction` WHERE `Current Date`='".$_POST["date"]."' AND `Flag`=1";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        $c=$result->num_rows;
                        while($row = $result->fetch_assoc()) {
                            if(substr($row["Qtr_ID"],0,7)==$code){
                                $temp=array();
                                $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                                $r = $con->query($sq);
                                if ($r->num_rows > 0) {
                                    while($rw = $r->fetch_assoc()) {
                                        $type=$rw["Qtr_type"];
                                    }
                                }
                                array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"]."; ".$type,$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"]);
                                array_push($final,$temp);
                            }
                            else{
                                $count+=1;
                            }
                        }
                    }
                    else{
                        echo $con->error;
                    } 

                    if($c==$count){
                        $str="No such record exists.";
                    }  
                }
            }
            //echo json_encode($final);
           
            if(count($final)!=0){
                echo json_encode($final);
            }
            else{
                if($str=="")
                    echo "No records have been finalized yet.";
                else
                    echo $str;
            } 
        }
        elseif($_POST["input"] == "generate_draft"){
            $str="";
            $final=array();
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                if(!isset($_POST["date"]) && !isset($_POST["colony"])){
                    $sql="SELECT * FROM `electric transaction`  WHERE `Flag`= 0";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $temp=array();
                            $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                            $r = $con->query($sq);
                            if ($r->num_rows > 0) {
                                while($rw = $r->fetch_assoc()) {
                                    $type=$rw["Qtr_type"];
                                }
                            }
                            array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"]."; ".$type,$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"]);
                            array_push($final,$temp);
                        }
                    } 
                }
                else{
                    if(isset($_POST["date"]) && isset($_POST["colony"])){
                        $c=$count=0;
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
                            $c=$result->num_rows;
                            while($row = $result->fetch_assoc()) {
                                if(substr($row["Qtr_ID"],0,7)==$code){
                                    $temp=array();
                                    $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                                    $r = $con->query($sq);
                                    if ($r->num_rows > 0) {
                                        while($rw = $r->fetch_assoc()) {
                                            $type=$rw["Qtr_type"];
                                        }
                                    }
                                    array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"]."; ".$type,$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"]);
                                    array_push($final,$temp);
                                }
                                else{
                                    $count+=1;
                                }
                            }
                        }
                        else{
                            echo $con->error;
                        } 
    
                        if($c==$count){
                            $str="No such record exists.";
                        }  
                    }
                    elseif(isset($_POST["colony"])){
                        $sql="SELECT * FROM `colony_master` WHERE `Colony_name`='".$_POST["colony"]."'";
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
                                    $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                                    $r = $con->query($sq);
                                    if ($r->num_rows > 0) {
                                        while($rw = $r->fetch_assoc()) {
                                            $type=$rw["Qtr_type"];
                                        }
                                    }
                                    array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"]."; ".$type,$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"]);
                                    array_push($final,$temp);
                                }
                            }
                        }
                        else{
                            echo $con->error;
                        } 
                    }
                    elseif(isset($_POST["date"])){
                        $sql="SELECT * FROM `electric transaction` WHERE `Current Date`='".$_POST["date"]."' AND `Flag`=0";
                        $result = $con->query($sql);
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                                $r = $con->query($sq);
                                if ($r->num_rows > 0) {
                                    while($rw = $r->fetch_assoc()) {
                                        $type=$rw["Qtr_type"];
                                    }
                                }
                                $temp=array();
                                array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"]."; ".$type,$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"]);
                                array_push($final,$temp);
                            }
                        }
                        else{
                            echo $con->error;
                        }
                    } 
                }
                if(count($final)!=0){
                    echo json_encode($final);
                }
                else{
                    if($str=="")
                        echo "No records available.";
                    else
                        echo $str;
                } 
            }
        }
        elseif($_POST["input"] == "generate_report_foremp"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $final=array();
                $sql="SELECT * FROM `electric transaction` WHERE `EmpName`='".$_POST["id"]."' OR `EmpNo`='".$_POST["id"]."' GROUP BY `Qtr_No` ORDER BY STR_TO_DATE(`Prev Date`, '%d/%m/%Y')";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        $temp=array();
                        array_push($temp,$row["Qtr_No"],$row["Prev Date"],$row["Current Date"],$row["Prev read"],$row["Current read"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"],$row["Flag"]);
                        $sq="SELECT * FROM `employee_master` WHERE `Name`='".$_POST["id"]."' OR `EmpNo`='".$_POST["id"]."'";
                        $res = $con->query($sq);
                        if ($res->num_rows > 0) {
                            while($r = $res->fetch_assoc()) {
                                array_push($temp,$r["Name"]);
                                array_push($temp,$r["Designation"]);
                                array_push($temp,$r["BillUnit"]);
                                array_push($temp,$r["Station"]);
                                array_push($temp,$r["Date_of_ret"]);
                            }
                        }
                        array_push($final,$temp);
                    }
                }
                if(count($final)!=0){
                    echo json_encode($final);
                }
                else{
                    echo "No meter records exist for this employee";
                }
            }
        } 
    }
    $con->close();
?>