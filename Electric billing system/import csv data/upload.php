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
        if($_POST["input"]=="qtr_master(wo id)"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $data = json_decode(stripslashes($_POST['data']));
                foreach($data as $d){
                    $qid="";
                    $code="";
                    $data1 = json_decode(stripslashes(json_encode($d)));
                    if(count($data1)==4){
                        $sql="SELECT * FROM `quarter_master_entry` WHERE `Qtr_No`='".$data1[0]."'";
                        $result = $con->query($sql);
                        if($result->num_rows>0){
                            $statement = $con->prepare("UPDATE `quarter_master_entry` SET `Qtr_ID`=?, `Qtr_type`=?, `Colony_code`=?, `Meter capacity (in KW)`=? WHERE `Qtr_No`= '".$data1[0]. "'");
                            if($data1[1]=="I"){
                                $qid="01000000";
                            }
                            elseif($data1[1]=="II"){
                                $qid="02000000";
                            }
                            elseif($data1[1]=="III"){
                                $qid="03000000";
                            }
                            elseif($data1[1]=="IV"){
                                $qid="04000000";
                            }
                            elseif($data1[1]=="V"){
                                $qid="05000000";
                            }
                            elseif($data1[1]=="VI"){
                                $qid="06000000";
                            }
                            while($row = $result->fetch_assoc()) {
                                $qid=$qid.(string)$row["Sl_No"];
                                $code=$data1[2].$qid;
                            }
                            $statement->bind_param("sssi",$code,$data1[1],$data1[2],$data1[3]);
                            $statement->execute();
                            $statement->close();
                        }
                        else{
                            $stmt = $con->prepare("INSERT INTO `quarter_master_entry`(`Qtr_No`, `Qtr_type`, `Colony_code`, `Meter capacity (in KW)`) 
                                                    VALUES (?, ?, ?, ?)");
                            $stmt->bind_param("sssi", $data1[0],$data1[1],$data1[2],$data1[3]);
                            if( $stmt->execute()){
                                if($data1[1]=="I"){
                                    $qid="01000000";
                                }
                                elseif($data1[1]=="II"){
                                    $qid="02000000";
                                }
                                elseif($data1[1]=="III"){
                                    $qid="03000000";
                                }
                                elseif($data1[1]=="IV"){
                                    $qid="04000000";
                                }
                                elseif($data1[1]=="V"){
                                    $qid="05000000";
                                }
                                elseif($data1[1]=="VI"){
                                    $qid="06000000";
                                }

                                $sql="SELECT * FROM `quarter_master_entry` WHERE `Qtr_No`='".$data1[0]."'";
                                $result = $con->query($sql);
                                while($row = $result->fetch_assoc()) {
                                    $qid=$qid.(string)$row["Sl_No"];
                                    $code=$data1[2].$qid;
                                }
                                $statement = $con->prepare("UPDATE `quarter_master_entry` SET `Qtr_ID`=? WHERE `Qtr_No`= '".$data1[0]. "'");
                                $code=$code.$qid;
                                $statement->bind_param("s",$code);
                                $statement->execute();
                                $statement->close();
                            }
                            $stmt->close();
                        }
                    }
                    else{
                        $cap=0;
                        $sql="SELECT * FROM `quarter_master_entry` WHERE `Qtr_No`='".$data1[0]."'";
                        $result = $con->query($sql);
                        if($result->num_rows>0){
                            $statement = $con->prepare("UPDATE `quarter_master_entry` SET `Qtr_ID`=?, `Qtr_type`=?, `Colony_code`=?, `Meter capacity (in KW)`=? WHERE `Qtr_No`= '".$data1[0]. "'");
                            if($data1[1]=="I"){
                                $qid="01000000";
                                $cap=1;
                            }
                            elseif($data1[1]=="II"){
                                $qid="02000000";
                                $cap=1;
                            }
                            elseif($data1[1]=="III"){
                                $qid="03000000";
                                $cap=1;
                            }
                            elseif($data1[1]=="IV"){
                                $qid="04000000";
                                $cap=2;
                            }
                            elseif($data1[1]=="V"){
                                $qid="05000000";
                                $cap=4;
                            }
                            elseif($data1[1]=="VI"){
                                $qid="06000000";
                                $cap=5;
                            }
                            while($row = $result->fetch_assoc()) {
                                $qid=$qid.(string)$row["Sl_No"];
                                $code=$data1[2].$qid;
                            }
                            $statement->bind_param("sssi",$code,$data1[1],$data1[2],$cap);
                            $statement->execute();
                            $statement->close();
                        }
                        else{
                            $stmt = $con->prepare("INSERT INTO `quarter_master_entry`(`Qtr_No`, `Qtr_type`, `Colony_code`) 
                                                    VALUES (?, ?, ?)");
                            $stmt->bind_param("sss", $data1[0],$data1[1],$data1[2]);
                            if( $stmt->execute()){
                                if($data1[1]=="I"){
                                    $qid="01000000";
                                    $cap=1;
                                }
                                elseif($data1[1]=="II"){
                                    $qid="02000000";
                                    $cap=1;
                                }
                                elseif($data1[1]=="III"){
                                    $qid="03000000";
                                    $cap=1;
                                }
                                elseif($data1[1]=="IV"){
                                    $qid="04000000";
                                    $cap=2;
                                }
                                elseif($data1[1]=="V"){
                                    $qid="05000000";
                                    $cap=4;
                                }
                                elseif($data1[1]=="VI"){
                                    $qid="06000000";
                                    $cap=5;
                                }

                                $sql="SELECT * FROM `quarter_master_entry` WHERE `Qtr_No`='".$data1[0]."'";
                                $result = $con->query($sql);
                                while($row = $result->fetch_assoc()) {
                                    $qid=$qid.(string)$row["Sl_No"];
                                    $code=$data1[2].$qid;
                                }
                                $statement = $con->prepare("UPDATE `quarter_master_entry` SET `Qtr_ID`=?, `Meter capacity (in KW)`=? WHERE `Qtr_No`= '".$data1[0]. "'");
                                $code=$code.$qid;
                                $statement->bind_param("si",$code,$cap);
                                $statement->execute();
                                $statement->close();
                            }
                            $stmt->close();
                        }
                    }
                }
            }
        }
        else if($_POST["input"]=="qtr_master"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $data = json_decode(stripslashes($_POST['data']));
                foreach($data as $d){
                    $cap=0;
                    $data1 = json_decode(stripslashes(json_encode($d)));
                    if(count($data1)==5){
                        $sql="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$data1[0]."'";
                        $result = $con->query($sql);
                        if($result->num_rows>0){
                            $statement = $con->prepare("UPDATE `quarter_master_entry` SET `Qtr_No`=?, `Qtr_type`=?, `Colony_code`=?, `Meter capacity (in KW)`=? WHERE `Qtr_ID`= '".$data1[0]. "'");
                            $statement->bind_param("sssi",$data1[1],$data1[2],$data1[3],$data1[4]);
                            $statement->execute();
                            $statement->close();
                        }
                        else{
                            $stmt = $con->prepare("INSERT INTO `quarter_master_entry`(`Qtr_ID`, `Qtr_No`, `Qtr_type`, `Colony_code`, `Meter capacity (in KW)`) 
                                                    VALUES (?, ?, ?, ?, ?)");
                            $stmt->bind_param("ssssi", $data1[0],$data1[1],$data1[2],$data1[3],$data1[4]);
                            $stmt->execute();
                            $stmt->close();
                        }
                    }
                    else{
                        $sql="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$data1[0]."'";
                        $result = $con->query($sql);
                        if($result->num_rows>0){
                            $statement = $con->prepare("UPDATE `quarter_master_entry` SET `Qtr_No`=?, `Qtr_type`=?, `Colony_code`=?, `Meter capacity (in KW)`=? WHERE `Qtr_ID`= '".$data1[0]. "'");
                            if($data1[2]=="I"){
                                $cap=1;
                            }
                            elseif($data1[2]=="II"){
                                $cap=1;
                            }
                            elseif($data1[2]=="III"){
                                $cap=1;
                            }
                            elseif($data1[2]=="IV"){
                                $cap=2;
                            }
                            elseif($data1[2]=="V"){
                                $cap=4;
                            }
                            elseif($data1[2]=="VI"){
                                $cap=5;
                            }
                            $statement->bind_param("sssi",$data1[1],$data1[2],$data1[3],$cap);
                            $statement->execute();
                            $statement->close();
                        }
                        else{
                            $stmt = $con->prepare("INSERT INTO `quarter_master_entry`(`Qtr_ID`, `Qtr_No`, `Qtr_type`, `Colony_code`, `Meter capacity (in KW)`) 
                                                    VALUES (?, ?, ?, ?, ?)");
                            if($data1[2]=="I"){
                                $cap=1;
                            }
                            elseif($data1[2]=="II"){
                                $cap=1;
                            }
                            elseif($data1[2]=="III"){
                                $cap=1;
                            }
                            elseif($data1[2]=="IV"){
                                $cap=2;
                            }
                            elseif($data1[2]=="V"){
                                $cap=4;
                            }
                            elseif($data1[2]=="VI"){
                                $cap=5;
                            }
                            $stmt->bind_param("ssssi", $data1[0],$data1[1],$data1[2],$data1[3],$cap);
                            $stmt->execute();
                            $stmt->close();
                        }
                    }
                }
            }
        }
        else if($_POST["input"]=="qtr_occ"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $data = json_decode(stripslashes($_POST['data']));
                foreach($data as $d){
                    $data1 = json_decode(stripslashes(json_encode($d)));
                    if(count($data1)==5){
                        $id="";
                        $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_No`='".$data1[2]."'";
                        $res = $con->query($sq);
                        if($res->num_rows>0){
                            while($row = $res->fetch_assoc()) {
                                $id=$row["Qtr_ID"];
                            }
                            $sq="SELECT * FROM `employee_master` WHERE `EmpNo`='".$data1[0]."'";
                            $res = $con->query($sq);
                            if($res->num_rows>0){
                                $sql="SELECT * FROM `quarter_occupancy` WHERE `Qtr_ID`='".$id."'";
                                $result = $con->query($sql);
                                if($result->num_rows>0){
                                    $statement = $con->prepare("UPDATE `quarter_occupancy` SET `EmpNo`=?, `EmpName`=?, `Occupation Date`=?, `Vacation Date`=? WHERE `Qtr_ID`= '".$id. "'");
                                    $statement->bind_param("ssss",$data1[0],$data1[1],$data1[2],$data1[3]);
                                    $statement->execute();
                                    $statement->close();
                                }
                                else{
                                    $stmt = $con->prepare("INSERT INTO `quarter_occupancy`(`EmpNo`, `EmpName`, `Qtr_ID`, `Occupation Date`, `Vacation Date`) 
                                                            VALUES (?, ?, ?, ?, ?)"); 
                                    $stmt->bind_param("sssss", $data1[0],$data1[1],$id,$data1[3],$data1[4]);
                                    $stmt->execute();
                                    $stmt->close();
                                }
                            }
                        }
                    }
                    elseif(count($data1)==4){
                        $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_No`='".$data1[2]."'";
                        $res = $con->query($sq);
                        if($res->num_rows>0){
                            while($row = $res->fetch_assoc()) {
                                $id=$row["Qtr_ID"];
                            }
                            $sq="SELECT * FROM `employee_master` WHERE `EmpNo`='".$data1[0]."'";
                            $res = $con->query($sq);
                            if($res->num_rows>0){
                                $sql="SELECT * FROM `quarter_occupancy` WHERE `EmpNo`='".$data1[0]."' AND `Vacation Date` IS NULL";
                                $result = $con->query($sql);
                                if($result->num_rows>0){
                                    $statement = $con->prepare("UPDATE `quarter_occupancy` SET `EmpNo`=?, `EmpName`=?, `Qtr_ID`=?, `Occupation Date`=? WHERE `Qtr_ID`= '".$id. "'");
                                    $statement->bind_param("ssss",$data1[0],$data1[1],$id,$data1[3]);
                                    $statement->execute();
                                    $statement->close();
                                }
                                else{
                                    $stmt = $con->prepare("INSERT INTO `quarter_occupancy`(`EmpNo`, `EmpName`, `Qtr_ID`, `Occupation Date`) 
                                                            VALUES (?, ?, ?, ?)"); 
                                    $stmt->bind_param("ssss", $data1[0],$data1[1],$id,$data1[3]);
                                    $stmt->execute();
                                    $stmt->close();
                                    $s="UPDATE `quarter_occupancy` SET `Vacation Date`=NULL WHERE `Qtr_ID`='".$id."'";
                                    $r=$con->query($s);  
                                }
                            } 
                        }  
                    }
                }
            }
        }
        else if($_POST["input"]=="emp_entry"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $data = json_decode(stripslashes($_POST['data']));
                foreach($data as $d){
                    $data1 = json_decode(stripslashes(json_encode($d)));
                    $sq="SELECT * FROM `employee_master` WHERE `EmpNo`='".$data1[0]."'";
                    $res = $con->query($sq);
                    if($res->num_rows==0){
                        $stmt = $con->prepare("INSERT INTO `employee_master`(`EmpNo`, `Name`, `Designation`, `BillUnit`, `Station`) 
                                                VALUES (?, ?, ?, ?, ?)");
                        $stmt->bind_param("sssss", $data1[0],$data1[1],$data1[2],$data1[3],$data1[4]);
                        $stmt->execute();
                        $stmt->close();
                    }
                }
            }
        }
    }
    $con->close();
?>