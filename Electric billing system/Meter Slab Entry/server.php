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
        if($_POST["input"]=="append"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                if($_POST["to_date"]==""){
                    $sql="SELECT * FROM `electric rate table` WHERE `From Date`='".$_POST["from_date"]."' AND `from_unit`=".$_POST["from_unit"]." AND `to_unit`=".$_POST["to_unit"]." AND `Rate/unit`='".$_POST["rate"]."' AND `Unit type`='".$_POST["type"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows == 0) {
                        $stmt = $con->prepare("INSERT INTO `electric rate table`(`From Date`,`from_unit`,`to_unit`,`Rate/unit`,`Unit type`)
                                                VALUES (?,?,?,?,?)");
                        $stmt->bind_param("siiss",$_POST["from_date"],$_POST["from_unit"],$_POST["to_unit"],$_POST["rate"],$_POST["type"]);
                        if($stmt->execute()){
                            $sql="SELECT * FROM `electric rate table` WHERE `From Date`='".$_POST["from_date"]."' AND `from_unit`=".$_POST["from_unit"]." AND `to_unit`=".$_POST["to_unit"]." AND `Rate/unit`='".$_POST["rate"]."' AND `Unit type`='".$_POST["type"]."'";
                            $result = $con->query($sql);
                            if ($result->num_rows > 0){
                                while($row = $result->fetch_assoc()) {
                                    $no=$row["Sl_No"];
                                    $fdate=$row["From Date"];
                                    $funit=$row["from_unit"];
                                    $tunit=$row["to_unit"];
                                    $rate=$row["Rate/unit"];
                                    $type=$row["Unit type"];
                                }
                                echo $no."-".$fdate."-".$funit."-".$tunit."-".$rate."-".$type;
                            }
                            //echo $sql;
                        }
                        else{
                            echo $con->error;
                        }
                    }
                }
                else{
                    $sql="SELECT * FROM `electric rate table` WHERE `From Date`='".$_POST["from_date"]."' AND `To Date`='".$_POST["to_date"]."'AND `from_unit`=".$_POST["from_unit"]." AND `to_unit`=".$_POST["to_unit"]." AND `Rate/unit`='".$_POST["rate"]."' AND `Unit type`='".$_POST["type"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows == 0) {
                        $stmt = $con->prepare("INSERT INTO `electric rate table`(`From Date`,`To Date`,`from_unit`,`to_unit`,`Rate/unit`,`Unit type`)
                                                VALUES (?,?,?,?,?,?)");
                        $stmt->bind_param("ssiiss",$_POST["from_date"],$_POST["to_date"],$_POST["from_unit"],$_POST["to_unit"],$_POST["rate"],$_POST["type"]);
                        if($stmt->execute()){
                            $sql="SELECT * FROM `electric rate table` WHERE `From Date`='".$_POST["from_date"]."' AND `To Date`='".$_POST["to_date"]."'AND `from_unit`=".$_POST["from_unit"]." AND `to_unit`=".$_POST["to_unit"]." AND `Rate/unit`='".$_POST["rate"]."' AND `Unit type`='".$_POST["type"]."'";
                            $result = $con->query($sql);
                            if ($result->num_rows > 0){
                                while($row = $result->fetch_assoc()) {
                                    $no=$row["Sl_No"];
                                    $fdate=$row["From Date"];
                                    $tdate=$row["To Date"];
                                    $funit=$row["from_unit"];
                                    $tunit=$row["to_unit"];
                                    $rate=$row["Rate/unit"];
                                    $type=$row["Unit type"];
                                }
                                echo $no."-".$fdate."-".$tdate."-".$funit."-".$tunit."-".$rate."-".$type;
                            }
                        }
                        else{
                            echo $con->error;
                        }
                    }
                }
                
            }
        }
        elseif($_POST["input"]=="fetch"){
            $final=array();
            $flag=FALSE;
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $sql="SELECT * from `electric rate table`";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    $flag=TRUE;
                    while($row = $result->fetch_assoc()) {
                        $temp=array();
                        array_push($temp,$row["Sl_No"],$row["From Date"],$row["To Date"],$row["from_unit"],$row["to_unit"],$row["Rate/unit"],$row["Unit type"]);
                        array_push($final,$temp);
                    }
                }
                if($flag==TRUE)
                    echo json_encode($final);
                else
                    echo "No previous slab records found";
            }
        }
        elseif($_POST["input"]=="update"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $sql="SELECT * from `electric rate table` WHERE `From Date`='".$_POST["from_date"]."' AND `Sl_No`=".$_POST["sl_no"]."";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    if($_POST["to_date"]==""){
                        $stmt = $con->prepare("UPDATE `electric rate table` SET `From Date`=?, `from_unit`=?, `to_unit`=?, `Rate/unit`=?, `Unit type`=?  WHERE `From Date`='".$_POST["from_date"]."' AND `Sl_No`=".$_POST["sl_no"]."");
                        $stmt->bind_param("siids",$_POST["from_date"],$_POST["from_unit"],$_POST["to_unit"],$_POST["rate"],$_POST["type"]);
                        if($stmt->execute()){
                            //echo "Updated rate table";
                            $sql="SELECT * from `electric rate table` WHERE `Sl_No`=".$_POST["sl_no"]."";
                            $result = $con->query($sql);
                            if ($result->num_rows > 0) {
                                while($row = $result->fetch_assoc()) {
                                    $no=$row["Sl_No"];
                                    $fdate=$row["From Date"];
                                    $funit=$row["from_unit"];
                                    $tunit=$row["to_unit"];
                                    $rate=$row["Rate/unit"];
                                    $type=$row["Unit type"];
                                }
                                echo $no."-".$fdate."-".$funit."-".$tunit."-".$rate."-".$type;
                            }
                        }
                        else{
                            echo $con->error;
                        }
                    }
                    else{
                        $stmt = $con->prepare("UPDATE `electric rate table` SET `From Date`=?, `To Date`=?, `from_unit`=?, `to_unit`=?, `Rate/unit`=?, `Unit type`=?  WHERE `From Date`='".$_POST["from_date"]."' AND `Sl_No`=".$_POST["sl_no"]."");
                        $stmt->bind_param("ssiids",$_POST["from_date"],$_POST["to_date"],$_POST["from_unit"],$_POST["to_unit"],$_POST["rate"],$_POST["type"]);
                        if($stmt->execute()){
                            //echo "Updated rate table";
                            $sql="SELECT * from `electric rate table` WHERE `Sl_No`=".$_POST["sl_no"]."";
                            $result = $con->query($sql);
                            if ($result->num_rows > 0) {
                                while($row = $result->fetch_assoc()) {
                                    $no=$row["Sl_No"];
                                    $fdate=$row["From Date"];
                                    $tdate=$row["To Date"];
                                    $funit=$row["from_unit"];
                                    $tunit=$row["to_unit"];
                                    $rate=$row["Rate/unit"];
                                    $type=$row["Unit type"];
                                }
                                echo $no."-".$fdate."-".$tdate."-".$funit."-".$tunit."-".$rate."-".$type;
                            }
                        }
                        else{
                            echo $con->error;
                        }
                    }
                    
                }
            }
        }
    }
    $con->close();
?>