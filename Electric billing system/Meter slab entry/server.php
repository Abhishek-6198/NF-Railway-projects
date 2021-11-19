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
                    if($data1[2]=="" && $data1[4]==""){
                        $sql="SELECT * FROM `electric rate table` WHERE `Load (in KW)`='".$data1[0]."' AND `From Date`='".$data1[1]."' AND `from_unit`=".$data1[3]." AND `Rate/unit`='".$data1[5]."' AND `Unit type`='".$data1[6]."' AND `Fixed charge`='".$data1[7]."'";
                        $result = $con->query($sql);
                        if ($result->num_rows == 0) {
                            $stmt = $con->prepare("INSERT INTO `electric rate table`(`Load (in KW)`,`From Date`,`from_unit`,`Rate/unit`,`Unit type`,`Fixed charge`)
                                                    VALUES (?,?,?,?,?,?)");
                            $stmt->bind_param("isisss",$data1[0],$data1[1],$data1[3],$data1[5],$data1[6],$data1[7]);
                            $stmt->execute();
                        }

                    }
                    elseif($data1[2]=="" || $data1[4]==""){
                        if($data1[2]==""){
                            $sql="SELECT * FROM `electric rate table` WHERE `Load (in KW)`='".$data1[0]."' AND `From Date`='".$data1[1]."' AND `from_unit`=".$data1[3]." AND `to_unit`=".$data1[4]." AND `Rate/unit`='".$data1[5]."' AND `Unit type`='".$data1[6]."'AND `Fixed charge`='".$data1[7]."'";
                            $result = $con->query($sql);
                            if ($result->num_rows == 0) {
                                $stmt = $con->prepare("INSERT INTO `electric rate table`(`Load (in KW)`,`From Date`,`from_unit`,`to_unit`,`Rate/unit`,`Unit type`,`Fixed charge`)
                                                        VALUES (?,?,?,?,?,?,?)");
                                $stmt->bind_param("isiisss",$data1[0],$data1[1],$data1[3],$data1[4],$data1[5],$data1[6],$data1[7]);
                                $stmt->execute();
                            }
                        }
                        elseif($data1[4]==""){
                            $sql="SELECT * FROM `electric rate table` WHERE `Load (in KW)`='".$data1[0]."' AND `From Date`='".$data1[1]."' AND `To Date`='".$data1[2]."' AND `from_unit`='".$data1[3]."' AND `Rate/unit`='".$data1[5]."' AND `Unit type`='".$data1[6]."'AND `Fixed charge`='".$data1[7]."'";
                            $result = $con->query($sql);
                            if ($result->num_rows == 0) {
                                $stmt = $con->prepare("INSERT INTO `electric rate table`(`Load (in KW)`,`From Date`,`To Date`,`from_unit`,`Rate/unit`,`Unit type`,`Fixed charge`)
                                                        VALUES (?,?,?,?,?,?,?)");
                                $stmt->bind_param("ississs",$data1[0],$data1[1],$data1[2],$data1[3],$data1[5],$data1[6],$data1[7]);
                                $stmt->execute();
                            }
                        }
                    }
                    else{
                        $sql="SELECT * FROM `electric rate table` WHERE `Load (in KW)`='".$data1[0]."' AND `From Date`='".$data1[1]."' AND `To Date`='".$data1[2]."' AND `from_unit`='".$data1[3]."' AND `to_unit`='".$data1[4]."' AND `Rate/unit`='".$data1[5]."' AND `Unit type`='".$data1[6]."' AND `Fixed charge`='".$data1[7]."'";
                        $result = $con->query($sql);
                        if ($result->num_rows == 0) {
                            $stmt = $con->prepare("INSERT INTO `electric rate table`(`Load (in KW)`,`From Date`,`To Date`,`from_unit`,`to_unit`,`Rate/unit`,`Unit type`,`Fixed charge`)
                                                    VALUES (?,?,?,?,?,?,?,?)");
                            $stmt->bind_param("issiisss",$data1[0],$data1[1],$data1[2],$data1[3],$data1[4],$data1[5],$data1[6],$data1[7]);
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
                        array_push($temp,$row["Sl_No"],$row["Load (in KW)"],$row["From Date"],$row["To Date"],$row["from_unit"],$row["to_unit"],$row["Rate/unit"],$row["Unit type"],$row["Fixed charge"]);
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
                        array_push($temp,$row["Sl_No"],$row["Load (in KW)"],$row["From Date"],$row["To Date"],$row["from_unit"],$row["to_unit"],$row["Rate/unit"],$row["Unit type"],$row["Fixed charge"]);
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
                        $stmt = $con->prepare("UPDATE `electric rate table` SET `Load (in KW)`=?, `From Date`=?, `from_unit`=?, `Rate/unit`=?, `Unit type`=?, `Fixed charge`=?  WHERE `From Date`='".$_POST["from_date"]."' AND `Sl_No`=".$_POST["sl_no"]."");
                        $stmt->bind_param("isisss",$_POST["load"],$_POST["from_date"],$_POST["from_unit"],$_POST["rate"],$_POST["type"],$_POST["fcharge"]);
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
                                    $load=$row["Load (in KW)"];
                                    $fdate=$row["From Date"];
                                    $funit=$row["from_unit"];
                                    $rate=$row["Rate/unit"];
                                    $type=$row["Unit type"];
                                    $fcharge=$row["Fixed charge"];
                                }
                                echo $no."-".$load."-".$fdate."-".$funit."-".$rate."-".$type."-".$fcharge;
                            }
                        }
                        else{
                            echo $con->error;
                        }
                    }
                    elseif($_POST["to_date"]=="" || $_POST["to_unit"]==""){
                        if($_POST["to_date"]==""){
                            $stmt = $con->prepare("UPDATE `electric rate table` SET `Load (in KW)`=?, `From Date`=?, `from_unit`=?, `to_unit`=?, `Rate/unit`=?, `Unit type`=?, `Fixed charge`=?  WHERE `From Date`='".$_POST["from_date"]."' AND `Sl_No`=".$_POST["sl_no"]."");
                            $stmt->bind_param("isiisss",$_POST["load"],$_POST["from_date"],$_POST["from_unit"],$_POST["to_unit"],$_POST["rate"],$_POST["type"],$_POST["fcharge"]);
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
                                        $load=$row["Load (in KW)"];
                                        $fdate=$row["From Date"];
                                        $funit=$row["from_unit"];
                                        $tunit=$row["to_unit"];
                                        $rate=$row["Rate/unit"];
                                        $type=$row["Unit type"];
                                        $fcharge=$row["Fixed charge"];
                                    }
                                    echo $no."-".$load."-".$fdate."-".$funit."-".$tunit."-".$rate."-".$type."-".$fcharge;
                                }
                            }
                            else{
                                echo $con->error;
                            }
                        }
                        elseif($_POST["to_unit"]==""){
                            $stmt = $con->prepare("UPDATE `electric rate table` SET `Load (in KW)`=?, `From Date`=?, `To Date`=?, `from_unit`=?, `Rate/unit`=?, `Unit type`=?, `Fixed charge`=?  WHERE `From Date`='".$_POST["from_date"]."' AND `Sl_No`=".$_POST["sl_no"]."");
                            $stmt->bind_param("ississs",$_POST["load"],$_POST["from_date"],$_POST["to_date"],$_POST["from_unit"],$_POST["rate"],$_POST["type"],$_POST["fcharge"]);
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
                                        $load=$row["Load (in KW)"];
                                        $fdate=$row["From Date"];
                                        $tdate=$row["To Date"];
                                        $funit=$row["from_unit"];
                                        $rate=$row["Rate/unit"];
                                        $type=$row["Unit type"];
                                        $fcharge=$row["Fixed charge"];
                                    }
                                    echo $no."-".$load."-".$fdate."-".$tdate."-".$funit."-".$rate."-".$type."-".$fcharge;
                                }
                            }
                            else{
                                echo $con->error;
                            }
                        }
                        
                    }
                    else{
                        $stmt = $con->prepare("UPDATE `electric rate table` SET `Load (in KW)`=?, `From Date`=?, `To Date`=?, `from_unit`=?, `to_unit`=?, `Rate/unit`=?, `Unit type`=?, `Fixed charge`=?  WHERE `From Date`='".$_POST["from_date"]."' AND `Sl_No`=".$_POST["sl_no"]."");
                        $stmt->bind_param("issiisss",$_POST["load"],$_POST["from_date"],$_POST["to_date"],$_POST["from_unit"],$_POST["to_unit"],$_POST["rate"],$_POST["type"],$_POST["fcharge"]);
                        if($stmt->execute()){
                            //echo "Updated rate table";
                            $sql="SELECT * from `electric rate table` WHERE `Sl_No`=".$_POST["sl_no"]."";
                            $result = $con->query($sql);
                            if ($result->num_rows > 0) {
                                while($row = $result->fetch_assoc()) {
                                    $no=$row["Sl_No"];
                                    $load=$row["Load (in KW)"];
                                    $fdate=$row["From Date"];
                                    $tdate=$row["To Date"];
                                    $funit=$row["from_unit"];
                                    $tunit=$row["to_unit"];
                                    $rate=$row["Rate/unit"];
                                    $type=$row["Unit type"];
                                    $fcharge=$row["Fixed charge"];
                                }
                                echo $no."-".$load."-".$fdate."-".$tdate."-".$funit."-".$tunit."-".$rate."-".$type."-".$fcharge;
                            }
                        }
                        else{
                            echo $con->error;
                        }
                    }
                }
            }
        }
        elseif($_POST["input"]=="calculate_fcharge"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $sql="SELECT * from `electric rate table` WHERE `From Date`='".$_POST["from_date"]."' AND `Load (in KW)`=1";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        $total_charge=$row["Fixed charge"]*$_POST["load"];
                        break;
                    }
                    echo $total_charge;
                }
                else  {
                    $arr=array();
                    $flag=FALSE;
                    $sql="SELECT * FROM `electric rate table` WHERE `To Date`IS NULL";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        $flag=TRUE;
                    }
                    if($flag){
                        $sql="SELECT * FROM `electric rate table` ORDER BY STR_TO_DATE(`From Date`, '%d/%m/%Y')";
                        $result = $con->query($sql);
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                array_push($arr,$row["From Date"]);
                            }
                            $fixedDate = implode('', array_reverse(explode('/', $arr[count($arr)-1])));
                            $variableDate = implode('', array_reverse(explode('/', $_POST["from_date"])));
                            if($fixedDate<$variableDate)
                                echo "Close prev slab";
                            else
                                echo "No_record";
                        }
                        
                    }
                }  
                   
            }
        }
    }
    $con->close();
?>
