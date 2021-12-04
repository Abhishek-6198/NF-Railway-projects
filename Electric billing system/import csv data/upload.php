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
                $count=$count1=0;
                foreach($data as $d){
                    $qid="";
                    $code="";
                    $data1 = json_decode(stripslashes(json_encode($d)));
                    if(count($data1)==4){
                        $sql="SELECT * FROM `quarter_master_entry` WHERE `Qtr_No`='".$data1[0]."' AND `Colony_code`='".$data1[2]."' AND `Qtr_type`='".$data1[1]."' AND `Meter capacity (in KW)`='".$data1[5]."' AND `Book_no`='".$data1[3]."' AND `Page_No`='".$data1[4]."'";
                        $result = $con->query($sql);
                        if($result->num_rows>0){
                            $statement = $con->prepare("UPDATE `quarter_master_entry` SET `Qtr_ID`=?, `Qtr_No`, `Qtr_type`=?, `Colony_code`=?, `Book_no`, `Page_no`, `Meter capacity (in KW)`=? WHERE `Qtr_No`= '".$data1[0]."' AND `Colony_code`='".$data1[2]."' AND `Qtr_type`='".$data1[1]."' AND `Meter capacity (in KW)`='".$data1[5]."' AND `Book_no`='".$data1[3]."' AND `Page_No`='".$data1[4]."'");
                            if($data1[1]=="I"){
                                $qid="01000000";
                            }
                            elseif($data1[1]=="II"){
                                $qid="02000000";
                            }
                            elseif($data1[1]=="III"){
                                $qid="03000000";
                            }
                            elseif($data1[1]=="IV" || $data1[1]=="IV-S"){
                                $qid="04000000";
                            }
                            elseif($data1[1]=="V"){
                                $qid="05000000";
                            }
                            elseif($data1[1]=="VI" || $data1[1]=="VI-S"){
                                $qid="06000000";
                            }
                            while($row = $result->fetch_assoc()) {
                                $qid=$qid.(string)$row["Sl_No"];
                                $code=$data1[2].$qid;
                            }
                            $statement->bind_param("ssssssi",$code,$data1[0],$data1[1],$data1[2],$data1[3],$data1[4],$data1[5]);
                            if($statement->execute())
                                $count+=1;
                            $statement->close();
                        }
                        else{
                            $stmt = $con->prepare("INSERT INTO `quarter_master_entry`(`Qtr_No`, `Qtr_type`, `Colony_code`, `Book_no`, `Page_no`, `Meter capacity (in KW)`) 
                                                    VALUES (?, ?, ?, ?, ?, ?)");
                            $stmt->bind_param("sssssi", $data1[0],$data1[1],$data1[2],$data1[3],$data1[4],$data1[5]);
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
                                elseif($data1[1]=="IV" || $data1[1]=="IV-S"){
                                    $qid="04000000";
                                }
                                elseif($data1[1]=="V"){
                                    $qid="05000000";
                                }
                                elseif($data1[1]=="VI" || $data1[1]=="VI-S"){
                                    $qid="06000000";
                                }

                                $sql="SELECT * FROM `quarter_master_entry` WHERE `Qtr_No`='".$data1[0]."' AND `Colony_code`='".$data1[2]."' AND `Qtr_type`='".$data1[1]."' AND `Meter capacity (in KW)`='".$data1[3]."' AND `Book_no`='".$data1[3]."' AND `Page_No`='".$data1[4]."'";
                                $result = $con->query($sql);
                                while($row = $result->fetch_assoc()) {
                                    $qid=$qid.(string)$row["Sl_No"];
                                    $code=$data1[2].$qid;
                                }
                                $statement = $con->prepare("UPDATE `quarter_master_entry` SET `Qtr_ID`=? WHERE `Qtr_No`= '".$data1[0]."' AND `Colony_code`='".$data1[2]."' AND `Qtr_type`='".$data1[1]."' AND `Meter capacity (in KW)`='".$data1[3]."' AND `Book_no`='".$data1[3]."' AND `Page_No`='".$data1[4]."'");
                                //$code=$code.$qid;
                                $statement->bind_param("s",$code);
                                if($statement->execute())
                                    $count1+=1;
                                $statement->close();
                            }
                            $stmt->close();
                        }
                    }
                    else{
                        $cap=0;
                        $sql="SELECT * FROM `quarter_master_entry` WHERE `Qtr_No`='".$data1[0]."' AND `Colony_code`='".$data1[2]."' AND `Qtr_type`='".$data1[1]."' AND `Book_no`='".$data1[3]."' AND `Page_No`='".$data1[4]."'";
                        $result = $con->query($sql);
                        if($result->num_rows>0){
                            $statement = $con->prepare("UPDATE `quarter_master_entry` SET `Qtr_ID`=?, `Qtr_No`, `Qtr_type`=?, `Colony_code`=?, `Book_no`, `Page_no`, `Meter capacity (in KW)`=? WHERE `Qtr_No`= '".$data1[0]."' AND `Colony_code`='".$data1[2]."' AND `Qtr_type`='".$data1[1]."' AND `Book_no`='".$data1[3]."' AND `Page_No`='".$data1[4]."'");
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
                            elseif($data1[1]=="IV-S"){
                                $qid="04000000";
                                $cap=3;
                            }
                            elseif($data1[1]=="V"){
                                $qid="05000000";
                                $cap=4;
                            }
                            elseif($data1[1]=="VI" || $data1[1]=="VI-S"){
                                $qid="06000000";
                                $cap=5;
                            }
                            while($row = $result->fetch_assoc()) {
                                $qid=$qid.(string)$row["Sl_No"];
                                $code=$data1[2].$qid;
                            }
                            $statement->bind_param("ssssssi",$code,$data1[1],$data1[2],$data1[3],$data1[4],$data1[5],$cap);
                            if($statement->execute())
                                $count+=1;
                            $statement->close();
                        }
                        else{
                            $stmt = $con->prepare("INSERT INTO `quarter_master_entry`(`Qtr_No`, `Qtr_type`, `Colony_code`, `Book_no`, `Page_no`) 
                                                    VALUES (?, ?, ?, ?, ?)");
                            $stmt->bind_param("sssss", $data1[0],$data1[1],$data1[2],$data1[3],$data1[4]);
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
                                elseif($data1[1]=="IV-S"){
                                    $qid="04000000";
                                    $cap=3;
                                }
                                elseif($data1[1]=="V"){
                                    $qid="05000000";
                                    $cap=4;
                                }
                                elseif($data1[1]=="VI" || $data1[1]=="VI-S"){
                                    $qid="06000000";
                                    $cap=5;
                                }

                                $sql="SELECT * FROM `quarter_master_entry` WHERE `Qtr_No`='".$data1[0]."' AND `Colony_code`='".$data1[2]."' AND `Qtr_type`='".$data1[1]."' AND `Book_no`='".$data1[3]."' AND `Page_No`='".$data1[4]."'";
                                $result = $con->query($sql);
                                while($row = $result->fetch_assoc()) {
                                    $qid=$qid.(string)$row["Sl_No"];
                                    $code=$data1[2].$qid;
                                }
                                $statement = $con->prepare("UPDATE `quarter_master_entry` SET `Qtr_ID`=?, `Meter capacity (in KW)`=? WHERE `Qtr_No`= '".$data1[0]."' AND `Colony_code`='".$data1[2]."' AND `Qtr_type`='".$data1[1]."' AND `Book_no`='".$data1[3]."' AND `Page_No`='".$data1[4]."'");
                                //$code=$code.$qid;
                                $statement->bind_param("si",$code,$cap);
                                if($statement->execute())
                                    $count1+=1;
                                $statement->close();
                            }
                            $stmt->close();
                        }
                    }
                }
                echo $count." records updated".";"." ".$count1." records inserted";
            }
        }
        else if($_POST["input"]=="qtr_master"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $data = json_decode(stripslashes($_POST['data']));
                $count=$count1=0;
                foreach($data as $d){
                    $cap=0;
                    $data1 = json_decode(stripslashes(json_encode($d)));
                    if(count($data1)==5){
                        $sql="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$data1[0]."'";
                        $result = $con->query($sql);
                        if($result->num_rows>0){
                            $statement = $con->prepare("UPDATE `quarter_master_entry` SET `Qtr_No`=?, `Qtr_type`=?, `Colony_code`=?, `Book_no`=?, `Page_no`=?, `Meter capacity (in KW)`=? WHERE `Qtr_ID`= '".$data1[0]. "'");
                            $statement->bind_param("sssssi",$data1[1],$data1[2],$data1[3],$data1[4],$data1[5],$data1[6]);
                            if($statement->execute())
                                $count+=1;
                            $statement->close();
                        }
                        else{
                            $stmt = $con->prepare("INSERT INTO `quarter_master_entry`(`Qtr_ID`, `Qtr_No`, `Qtr_type`, `Colony_code`, `Book_no`, `Page_no`, `Meter capacity (in KW)`) 
                                                    VALUES (?, ?, ?, ?, ?, ?, ?)");
                            $stmt->bind_param("ssssssi", $data1[0],$data1[1],$data1[2],$data1[3],$data1[4], $data1[5], $data1[6]);
                            if($stmt->execute())
                                $count1+=1;
                            $stmt->close();
                        }
                    }
                    else{
                        $sql="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$data1[0]."'";
                        $result = $con->query($sql);
                        if($result->num_rows>0){
                            $statement = $con->prepare("UPDATE `quarter_master_entry` SET `Qtr_No`=?, `Qtr_type`=?, `Colony_code`=?, `Book_no`=?, `Page_no`=?,`Meter capacity (in KW)`=? WHERE `Qtr_ID`= '".$data1[0]. "'");
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
                            elseif($data1[2]=="IV-S"){
                                $cap=3;
                            }
                            elseif($data1[2]=="V"){
                                $cap=4;
                            }
                            elseif($data1[2]=="VI" || $data1[2]=="VI-S"){
                                $cap=5;
                            }
                            $statement->bind_param("sssssi",$data1[1],$data1[2],$data1[3],$data1[4],$data1[5],$cap);
                            if($statement->execute())
                                $count+=1;
                            $statement->close();
                        }
                        else{
                            $stmt = $con->prepare("INSERT INTO `quarter_master_entry`(`Qtr_ID`, `Qtr_No`, `Qtr_type`, `Colony_code`, `Book_no`=?, `Page_no`=?,`Meter capacity (in KW)`) 
                                                    VALUES (?, ?, ?, ?, ?, ?, ?)");
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
                            elseif($data1[2]=="IV-S"){
                                $cap=3;
                            }
                            elseif($data1[2]=="V"){
                                $cap=4;
                            }
                            elseif($data1[2]=="VI" || $data1[2]=="VI-S"){
                                $cap=5;
                            }
                            $stmt->bind_param("ssssssi", $data1[0],$data1[1],$data1[2],$data1[3],$data1[4],$data1[5],$data1[6],$cap);
                            if($stmt->execute())
                                $count1+=1;
                            $stmt->close();
                        }
                    }
                }
                echo $count." records updated".";"." ".$count1." records inserted";
            }
        }
        else if($_POST["input"]=="qtr_occ"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $data = json_decode(stripslashes($_POST['data']));
                $count=$count1=0;
                foreach($data as $d){
                    $data1 = json_decode(stripslashes(json_encode($d)));
                    if(count($data1)==8){
                        $id="";
                        $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_No`='".$data1[2]."' AND `Colony_code='".$data1[3]."' AND `Book_no`='".$data1[4]."' AND `Page_no`='".$data1[5]."'";
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
                                    $excel_date = $data1[6]; 
                                    $unix_date = ($excel_date - 25569) * 86400;
                                    $excel_date = 25569 + ($unix_date / 86400);
                                    $unix_date = ($excel_date - 25569) * 86400;
                                    $data1[6]= gmdate("d/m/Y", $unix_date);
                                    $excel_date = $data1[7]; 
                                    $unix_date = ($excel_date - 25569) * 86400;
                                    $excel_date = 25569 + ($unix_date / 86400);
                                    $unix_date = ($excel_date - 25569) * 86400;
                                    $data1[7]= gmdate("d/m/Y", $unix_date);
                                    $statement->bind_param("ssss",$data1[0],$data1[1],$data1[6],$data1[7]);
                                    if($statement->execute())
                                        $count+=1;
                                    $statement->close();
                                }
                                else{
                                    $stmt = $con->prepare("INSERT INTO `quarter_occupancy`(`EmpNo`, `EmpName`, `Qtr_ID`, `Occupation Date`, `Vacation Date`) 
                                                            VALUES (?, ?, ?, ?, ?)"); 
                                    $excel_date = $data1[6]; 
                                    $unix_date = ($excel_date - 25569) * 86400;
                                    $excel_date = 25569 + ($unix_date / 86400);
                                    $unix_date = ($excel_date - 25569) * 86400;
                                    $data1[6]= gmdate("d/m/Y", $unix_date);
                                    $excel_date = $data1[7]; 
                                    $unix_date = ($excel_date - 25569) * 86400;
                                    $excel_date = 25569 + ($unix_date / 86400);
                                    $unix_date = ($excel_date - 25569) * 86400;
                                    $data1[7]= gmdate("d/m/Y", $unix_date);
                                    $stmt->bind_param("sssss", $data1[0],$data1[1],$id,$data1[6],$data1[7]);
                                    if($stmt->execute())
                                        $count1+=1;
                                    $stmt->close();
                                }
                            }
                            else{
                                echo "Employee details are not there in the database.";
                                break;
                            }
                        }
                        else{
                            echo "Some quarters are not registered in quarter master.";
                            break;
                        }
                    }
                    elseif(count($data1)==7){
                        $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_No`='".$data1[2]."' AND `Colony_code`='".$data1[3]."' AND `Book_no`='".$data1[4]."' AND `Page_no`='".$data1[5]."'";
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
                                    $excel_date = $data1[6]; 
                                    $unix_date = ($excel_date - 25569) * 86400;
                                    $excel_date = 25569 + ($unix_date / 86400);
                                    $unix_date = ($excel_date - 25569) * 86400;
                                    $data1[6]= gmdate("d/m/Y", $unix_date);
                                    $statement->bind_param("ssss",$data1[0],$data1[1],$id,$data1[6]);
                                    if($statement->execute())
                                        $count+=1;
                                    $statement->close();
                                }
                                else{
                                    $stmt = $con->prepare("INSERT INTO `quarter_occupancy`(`EmpNo`, `EmpName`, `Qtr_ID`, `Occupation Date`) 
                                                            VALUES (?, ?, ?, ?)"); 
                                    $excel_date = $data1[6]; 
                                    $unix_date = ($excel_date - 25569) * 86400;
                                    $excel_date = 25569 + ($unix_date / 86400);
                                    $unix_date = ($excel_date - 25569) * 86400;
                                    $data1[6]= gmdate("d/m/Y", $unix_date);
                                    $stmt->bind_param("ssss", $data1[0],$data1[1],$id,$data1[6]);
                                    if($stmt->execute())
                                        $count1+=1;
                                    $stmt->close();
                                    $s="UPDATE `quarter_occupancy` SET `Vacation Date`=NULL WHERE `Qtr_ID`='".$id."'";
                                    $r=$con->query($s);  
                                }
                            } 
                            else{
                                echo "Employee details are not there in the database.";
                                break;
                            }
                        }  
                        else{
                            echo "Some quarters are not registered in quarter master.";
                            break;
                        }
                    }
                }
                echo $count." records updated".";"." ".$count1." records inserted";
            }
        }
        else if($_POST["input"]=="emp_entry"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $data = json_decode(stripslashes($_POST['data']));
                $count=0;
                foreach($data as $d){
                    $data1 = json_decode(stripslashes(json_encode($d)));
                    $sq="SELECT * FROM `employee_master` WHERE `EmpNo`='".$data1[0]."'";
                    $res = $con->query($sq);
                    if($res->num_rows==0){
                        $stmt = $con->prepare("INSERT INTO `employee_master`(`EmpNo`, `Name`, `Designation`, `BillUnit`, `Station`, `Date_of_ret`) 
                                                VALUES (?, ?, ?, ?, ?, ?)");
                        $excel_date = $data1[5]; 
                        $unix_date = ($excel_date - 25569) * 86400;
                        $excel_date = 25569 + ($unix_date / 86400);
                        $unix_date = ($excel_date - 25569) * 86400;
                        $data1[5]= gmdate("d/m/Y", $unix_date);
                        $stmt->bind_param("ssssss", $data1[0],$data1[1],$data1[2],$data1[3],$data1[4],$data1[5]);
                        if($stmt->execute())
                            $count+=1;
                        $stmt->close();
                    }
                }
                echo $count." records inserted.";
            }
        }
    }
    $con->close();
?>