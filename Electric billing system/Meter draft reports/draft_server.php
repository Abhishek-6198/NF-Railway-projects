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
                                $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."' ORDER BY `Page_no`";
                                $r = $con->query($sq);
                                if ($r->num_rows > 0) {
                                    while($rw = $r->fetch_assoc()) {
                                        $type=$rw["Qtr_type"];
                                        $book=$rw["Book_no"];
                                        $page=$rw["Page_no"];
                                    }
                                    $abc="SELECT * FROM `installment_procurement` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                                    $def = $con->query($abc);
                                    if ($def->num_rows > 0) {
                                        while($rows = $def->fetch_assoc()) {
                                            $installment=$rows["Installment"];
                                        }
                                    }
                                }
                                array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"]."; ".$type,$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"],$book,$page,$installment);
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
                            $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."' ORDER BY `Page_no`";
                            $r = $con->query($sq);
                            if ($r->num_rows > 0) {
                                while($rw = $r->fetch_assoc()) {
                                    $type=$rw["Qtr_type"];
                                    $book=$rw["Book_no"];
                                    $page=$rw["Page_no"];
                                }
                                $abc="SELECT * FROM `installment_procurement` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                                    $def = $con->query($abc);
                                    if ($def->num_rows > 0) {
                                        while($rows = $def->fetch_assoc()) {
                                            $installment=$rows["Installment"];
                                        }
                                    }
                            }
                            $temp=array();
                            array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"]."; ".$type,$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"],$book,$page,$installment);
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
                                $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."' ORDER BY `Page_no`";
                                $r = $con->query($sq);
                                if ($r->num_rows > 0) {
                                    while($rw = $r->fetch_assoc()) {
                                        $type=$rw["Qtr_type"];
                                        $book=$rw["Book_no"];
                                        $page=$rw["Page_no"];
                                    }
                                    $abc="SELECT * FROM `installment_procurement` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                                    $def = $con->query($abc);
                                    if ($def->num_rows > 0) {
                                        while($rows = $def->fetch_assoc()) {
                                            $installment=$rows["Installment"];
                                        }
                                    }
                                }
                                array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"]."; ".$type,$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"],$book,$page,$installment);
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
                            $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."' ORDER BY `Page_no`";
                            $r = $con->query($sq);
                            if ($r->num_rows > 0) {
                                while($rw = $r->fetch_assoc()) {
                                    $type=$rw["Qtr_type"];
                                    $book=$rw["Book_no"];
                                    $page=$rw["Page_no"];
                                }
                                $abc="SELECT * FROM `installment_procurement` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                                    $def = $con->query($abc);
                                    if ($def->num_rows > 0) {
                                        while($rows = $def->fetch_assoc()) {
                                            $installment=$rows["Installment"];
                                        }
                                    }
                            }
                            array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"]."; ".$type,$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"],$book,$page,$installment);
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
                                    $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."' ORDER BY `Page_no`";
                                    $r = $con->query($sq);
                                    if ($r->num_rows > 0) {
                                        while($rw = $r->fetch_assoc()) {
                                            $type=$rw["Qtr_type"];
                                            $book=$rw["Book_no"];
                                            $page=$rw["Page_no"];
                                        }
                                        $abc="SELECT * FROM `installment_procurement` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                                    $def = $con->query($abc);
                                    if ($def->num_rows > 0) {
                                        while($rows = $def->fetch_assoc()) {
                                            $installment=$rows["Installment"];
                                        }
                                    }
                                    }
                                    array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"]."; ".$type,$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"],$book,$page,$installment);
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
                                    $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."' ORDER BY `Page_no`";
                                    $r = $con->query($sq);
                                    if ($r->num_rows > 0) {
                                        while($rw = $r->fetch_assoc()) {
                                            $type=$rw["Qtr_type"];
                                            $book=$rw["Book_no"];
                                            $page=$rw["Page_no"];
                                        }
                                        $abc="SELECT * FROM `installment_procurement` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                                    $def = $con->query($abc);
                                    if ($def->num_rows > 0) {
                                        while($rows = $def->fetch_assoc()) {
                                            $installment=$rows["Installment"];
                                        }
                                    }
                                    }
                                    array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"]."; ".$type,$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"],$book,$page,$installment);
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
                                $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."' ORDER BY `Page_no`";
                                $r = $con->query($sq);
                                if ($r->num_rows > 0) {
                                    while($rw = $r->fetch_assoc()) {
                                        $type=$rw["Qtr_type"];
                                        $book=$rw["Book_no"];
                                        $page=$rw["Page_no"];
                                    }
                                    $abc="SELECT * FROM `installment_procurement` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                                    $def = $con->query($abc);
                                    if ($def->num_rows > 0) {
                                        while($rows = $def->fetch_assoc()) {
                                            $installment=$rows["Installment"];
                                        }
                                    }
                                }
                                $temp=array();
                                array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"]."; ".$type,$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"],$book,$page,$installment);
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
                        $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."' ORDER BY `Page_no`";
                        $res = $con->query($sq);
                        if ($res->num_rows > 0) {
                            while($r = $res->fetch_assoc()) {
                                $book=$r["Book_no"];
                                $page=$r["Page_no"];
                            }
                            $abc="SELECT * FROM `installment_procurement` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                                    $def = $con->query($abc);
                                    if ($def->num_rows > 0) {
                                        while($rows = $def->fetch_assoc()) {
                                            $installment=$rows["Installment"];
                                        }
                                    }
                        }
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
                        array_push($temp,$book,$page,$installment);
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
        elseif($_POST["input"] == "generate_finalreport_foremp"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $c=0;;
                $final=$temp=array();
                $sql="SELECT * FROM `electric transaction` WHERE (`EmpName`='".$_POST["id"]."' OR `EmpNo`='".$_POST["id"]."') AND `Flag`=1";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    $c+=1;
                    while($row = $result->fetch_assoc()) {
                        //array_push($temp,$row["Qtr_No"],$row["Prev Date"],$row["Current Date"],$row["Prev read"],$row["Current read"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"],$row["Flag"]);
                        $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$row["Qtr_ID"]."' ORDER BY `Page_no`";
                        $res = $con->query($sq);
                        if ($res->num_rows > 0) {
                            while($r = $res->fetch_assoc()) {
                                $book=$r["Book_no"];
                                $page=$r["Page_no"];
                            }
                            $abc="SELECT * FROM `installment_procurement` WHERE `Qtr_ID`='".$row["Qtr_ID"]."'";
                                    $def = $con->query($abc);
                                    if ($def->num_rows > 0) {
                                        while($rows = $def->fetch_assoc()) {
                                            $installment=$rows["Installment"];
                                        }
                                    }
                        }
                        $qtrno=$row["Qtr_No"];
                        $prev_date=$row["Prev Date"];
                        $curr_date=$row["Current Date"];
                        $prev_read=$row["Prev read"];
                        $curr_read=$row["Current read"];
                        $unit_consum=$row["Unit consumed"];
                        $elec_charge=$row["Elec_charge"];
                        $fix_charge=$row["Fixed_charge"];
                        $tot_charge=$row["Total charge"];
                        $flag=$row["Flag"];
                    }
                    array_push($temp,$qtrno,$prev_date,$curr_date,$prev_read,$curr_read,$unit_consum,$elec_charge,$fix_charge,$tot_charge,$flag);
                    $sq="SELECT * FROM `employee_master` WHERE `Name`='".$_POST["id"]."' OR `EmpNo`='".$_POST["id"]."'";
                    $res = $con->query($sq);
                    if ($res->num_rows > 0) {
                        $c+=1;
                        while($r = $res->fetch_assoc()) {
                            array_push($temp,$r["Name"]);
                            array_push($temp,$r["Designation"]);
                            array_push($temp,$r["BillUnit"]);
                            array_push($temp,$r["Station"]);
                            //array_push($temp,$r["Date_of_ret"]);
                        }
                    }
                    array_push($temp,$book,$page,$installment);
                    array_push($final,$temp);
                    if(count($final)!=0 && $c==2){
                        echo json_encode($final);
                        //echo $sql;
                    }
                    else
                        echo "Unable to retrieve data";
                }
                else
                    echo "Please calculate the latest electric bill of this employee and finalize in the confirmation section";
                  
            }
        }
        elseif($_POST["input"] == "update_vacdate"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $statement = $con->prepare("UPDATE `quarter_occupancy` SET `Vacation Date`=? WHERE (`EmpNo`='".$_POST["id"]."' OR `EmpName`='".$_POST["id"]."') AND `Vacation Date` IS NULL");
                $statement->bind_param("s",$_POST["date"]);
                if($statement->execute())
                    echo "Vacation date updated";
                else
                    echo "Something went wrong!";
                $statement->close();
            }
        }
        elseif($_POST["input"] == "check_vacdate"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $date="";
                $sq="SELECT * FROM `electric transaction` WHERE (`EmpName`='".$_POST["id"]."' OR `EmpNo`='".$_POST["id"]."') AND `Flag`=1 GROUP BY `Qtr_No` ORDER BY STR_TO_DATE(`Prev Date`, '%d/%m/%Y')";
                $result = $con->query($sq);
                if ($result->num_rows > 0) {
                    while($r = $result->fetch_assoc()) {
                        $date=$r["Current Date"];
                    }
                }
                $sql="SELECT * FROM `quarter_occupancy` WHERE (`EmpNo`='".$_POST["id"]."' OR `EmpName`='".$_POST["id"]."') AND `Vacation Date` IS NULL";
                $res = $con->query($sql);
                if ($res->num_rows > 0) {
                    echo "present"." ".$date;
                }
                elseif($res->num_rows == 0)
                    echo "doesn't exist";
            }
        }
    }
    $con->close();
?>