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
            $final=array();
            $flag=FALSE;
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $data = json_decode(stripslashes($_POST['data']));
                //echo $data;
                foreach($data as $d){
                    $data1 = json_decode(stripslashes(json_encode($d)));
                    if($data1[1]=="" && $data1[3]==""){
                        $sql="SELECT * FROM `electric rate table` WHERE `From Date`='".$data1[0]."' AND `from_unit`=".$data1[2]." AND `Rate/unit`='".$data1[4]."' AND `Unit type`='".$data1[5]."'";
                        $result = $con->query($sql);
                        if ($result->num_rows == 0) {
                            $stmt = $con->prepare("INSERT INTO `electric rate table`(`From Date`,`from_unit`,`Rate/unit`,`Unit type`)
                                                    VALUES (?,?,?,?)");
                            $stmt->bind_param("siss",$data1[0],$data1[2],$data1[4],$data1[5]);
                            $stmt->execute();
                        }

                    }
                    elseif($data1[1]=="" || $data1[3]==""){
                        if($data1[1]==""){
                            $sql="SELECT * FROM `electric rate table` WHERE `From Date`='".$data1[0]."' AND `from_unit`=".$data1[2]." AND `to_unit`=".$data1[3]." AND `Rate/unit`='".$data1[4]."' AND `Unit type`='".$data1[5]."'";
                            $result = $con->query($sql);
                            if ($result->num_rows == 0) {
                                $stmt = $con->prepare("INSERT INTO `electric rate table`(`From Date`,`from_unit`,`to_unit`,`Rate/unit`,`Unit type`)
                                                        VALUES (?,?,?,?,?)");
                                $stmt->bind_param("siiss",$data1[0],$data1[2],$data1[3],$data1[4],$data1[5]);
                                $stmt->execute();
                            }
                        }
                        elseif($data1[3]==""){
                            $sql="SELECT * FROM `electric rate table` WHERE `From Date`='".$data1[0]."' AND `To Date`='".$data1[1]."' AND `from_unit`='".$data1[2]."' AND `Rate/unit`='".$data1[4]."' AND `Unit type`='".$data1[5]."'";
                            $result = $con->query($sql);
                            if ($result->num_rows == 0) {
                                $stmt = $con->prepare("INSERT INTO `electric rate table`(`From Date`,`To Date`,`from_unit`,`Rate/unit`,`Unit type`)
                                                        VALUES (?,?,?,?,?)");
                                $stmt->bind_param("ssiss",$data1[0],$data1[1],$data1[2],$data1[4],$data1[5]);
                                $stmt->execute();
                            }
                        }
                    }
                    else{
                        $sql="SELECT * FROM `electric rate table` WHERE `From Date`='".$data1[0]."' AND `To Date`='".$data1[1]."' AND `from_unit`='".$data1[2]."' AND `to_unit`='".$data1[3]."' AND `Rate/unit`='".$data1[4]."' AND `Unit type`='".$data1[5]."'";
                        $result = $con->query($sql);
                        if ($result->num_rows == 0) {
                            $stmt = $con->prepare("INSERT INTO `electric rate table`(`From Date`,`To Date`,`from_unit`,`to_unit`,`Rate/unit`,`Unit type`)
                                                    VALUES (?,?,?,?,?,?)");
                            $stmt->bind_param("ssiiss",$data1[0],$data1[1],$data1[2],$data1[3],$data1[4],$data1[5]);
                            $stmt->execute();
                        }
                    }    
                }
                $sql="SELECT * FROM `electric rate table`";
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
                    if($_POST["to_date"]=="" && $_POST["to_unit"]==""){
                        $stmt = $con->prepare("UPDATE `electric rate table` SET `From Date`=?, `from_unit`=?, `Rate/unit`=?, `Unit type`=?  WHERE `From Date`='".$_POST["from_date"]."' AND `Sl_No`=".$_POST["sl_no"]."");
                        $stmt->bind_param("siss",$_POST["from_date"],$_POST["from_unit"],$_POST["rate"],$_POST["type"]);
                        if($stmt->execute()){
                            //echo "Updated rate table";
                            $sql="SELECT * from `electric rate table` WHERE `Sl_No`=".$_POST["sl_no"]."";
                            $result = $con->query($sql);
                            if ($result->num_rows > 0) {
                                while($row = $result->fetch_assoc()) {
                                    if($row["To Date"]!='NULL'){
                                        $sql="UPDATE `electric rate table` SET `To Date` = NULL WHERE `Sl_No`='".$_POST["sl_no"]."'";
                                        $res = $con->query($sql);
                                    }
                                    if($row["to_unit"]!='NULL'){
                                        $sql="UPDATE `electric rate table` SET `to_unit` = NULL WHERE `Sl_No`='".$_POST["sl_no"]."'";
                                        $res1 = $con->query($sql);
                                    }
                                    $no=$row["Sl_No"];
                                    $fdate=$row["From Date"];
                                    $funit=$row["from_unit"];
                                    $rate=$row["Rate/unit"];
                                    $type=$row["Unit type"];
                                }
                                echo $no."-".$fdate."-".$funit."-".$rate."-".$type;
                            }
                        }
                        else{
                            echo $con->error;
                        }
                    }
                    elseif($_POST["to_date"]=="" || $_POST["to_unit"]==""){
                        if($_POST["to_date"]==""){
                            $stmt = $con->prepare("UPDATE `electric rate table` SET `From Date`=?, `from_unit`=?, `to_unit`=?, `Rate/unit`=?, `Unit type`=?  WHERE `From Date`='".$_POST["from_date"]."' AND `Sl_No`=".$_POST["sl_no"]."");
                            $stmt->bind_param("siiss",$_POST["from_date"],$_POST["from_unit"],$_POST["to_unit"],$_POST["rate"],$_POST["type"]);
                            if($stmt->execute()){
                                //echo "Updated rate table";
                                $sql="SELECT * from `electric rate table` WHERE `Sl_No`=".$_POST["sl_no"]."";
                                $result = $con->query($sql);
                                if ($result->num_rows > 0) {
                                    while($row = $result->fetch_assoc()) {
                                        if($row["To Date"]!='NULL'){
                                            $sql="UPDATE `electric rate table` SET `To Date` = NULL WHERE `Sl_No`='".$_POST["sl_no"]."'";
                                            $res = $con->query($sql);
                                        }
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
                        elseif($_POST["to_unit"]==""){
                            $stmt = $con->prepare("UPDATE `electric rate table` SET `From Date`=?, `To Date`=?, `from_unit`=?, `Rate/unit`=?, `Unit type`=?  WHERE `From Date`='".$_POST["from_date"]."' AND `Sl_No`=".$_POST["sl_no"]."");
                            $stmt->bind_param("ssiss",$_POST["from_date"],$_POST["to_date"],$_POST["from_unit"],$_POST["rate"],$_POST["type"]);
                            if($stmt->execute()){
                                //echo "Updated rate table";
                                $sql="SELECT * from `electric rate table` WHERE `Sl_No`=".$_POST["sl_no"]."";
                                $result = $con->query($sql);
                                if ($result->num_rows > 0) {
                                    while($row = $result->fetch_assoc()) {
                                        if($row["to_unit"]!=NULL){
                                            $sql="UPDATE `electric rate table` SET `to_unit` = NULL WHERE `Sl_No`='".$_POST["sl_no"]."'";
                                            $res = $con->query($sql);
                                        }
                                        $no=$row["Sl_No"];
                                        $fdate=$row["From Date"];
                                        $tdate=$row["To Date"];
                                        $funit=$row["from_unit"];
                                        $rate=$row["Rate/unit"];
                                        $type=$row["Unit type"];
                                    }
                                    echo $no."-".$fdate."-".$tdate."-".$funit."-".$rate."-".$type;
                                }
                            }
                            else{
                                echo $con->error;
                            }
                        }
                        
                    }
                    else{
                        $stmt = $con->prepare("UPDATE `electric rate table` SET `From Date`=?, `To Date`=?, `from_unit`=?, `to_unit`=?, `Rate/unit`=?, `Unit type`=?  WHERE `From Date`='".$_POST["from_date"]."' AND `Sl_No`=".$_POST["sl_no"]."");
                        $stmt->bind_param("ssiiss",$_POST["from_date"],$_POST["to_date"],$_POST["from_unit"],$_POST["to_unit"],$_POST["rate"],$_POST["type"]);
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