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
            $final=array();
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $data = json_decode(stripslashes($_POST['data']));
                foreach($data as $d){
                    $data1 = json_decode(stripslashes(json_encode($d)));
                    $prev_date=$data1[2];
                    $curr_date=$data1[3];
                    $qtr_id=$data1[1];
                    $rate=$data1[0];
                
                    $total_period=array();
                    $days=$months=0;
                    $counter1=$charge1=0;
                    $flag=FALSE;
                    $units=$unit_per_day=0;
                    $from_dates=array();
                    $to_dates=array();
                    $prev=explode("/",$prev_date); //find out the no of days from the prev met read date to curr met read date
                    $curr=explode("/",$curr_date);
                    $pr=$prev[2]."-".$prev[1]."-".$prev[0];
                    $cu=$curr[2]."-".$curr[1]."-".$curr[0];
                    while (strtotime($pr) <= strtotime($cu)) {
                        $d = DateTime::createFromFormat("Y-m-d", $pr);
                        array_push($total_period,$d);
                        $pr = date('Y-m-d', strtotime($pr. ' + 1 day'));
                    }
                    $sql="SELECT * FROM `electric rate table`";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            if($counter1==$result->num_rows)
                                break;
                            else{
                                $flag1=$flag2=$flag3=$flag4=$flag5=$flag6=FALSE;
                                if($flag==FALSE){
                                    $sq="SELECT * from `electric rate table` WHERE `From Date`='".$row["From Date"]."'";
                                    array_push($from_dates,$row["From Date"]);
                                    if($row["To Date"]!="")
                                        array_push($to_dates,$row["To Date"]);
                                    $flag=TRUE;
                                }
                                else{
                                    $s="SELECT * from `electric rate table` WHERE `From Date` NOT IN ( '" . implode( "', '" , $from_dates ) . "' )";
                                    $res = $con->query($s);
                                    if ($res->num_rows > 0) {
                                        while($row = $res->fetch_assoc()) {
                                            $new_period=$row["From Date"];
                                            if($row["To Date"]!=""){
                                                $to_period=$row["To Date"];
                                                array_push($to_dates,$to_period);
                                            }
                                            break;
                                        }
                                    }
                                    $sq="SELECT * FROM `electric rate table` WHERE `From Date`='".$new_period."'";
                                    array_push($from_dates,$new_period);
                                }    
                            }
                            //echo $sq."\n";
                            $r = $con->query($sq);
                            if ($r->num_rows > 0) {
                                $counter1+=$r->num_rows;
                                while($row = $r->fetch_assoc()) {
                                    $row_prev=explode("/",$row["From Date"]);
                                    $rp=$row_prev[2]."-".$row_prev[1]."-".$row_prev[0];
                                    $prev=explode("/",$prev_date);
                                    $pr=$prev[2]."-".$prev[1]."-".$prev[0];

                                    if($row["To Date"]!=""){
                                        $slabs=array();
                                        $row_curr=explode("/",$row["To Date"]);
                                        $rc=$row_curr[2]."-".$row_curr[1]."-".$row_curr[0];
                                        while (strtotime($rp) <= strtotime($rc)) { 
                                            $d = DateTime::createFromFormat("Y-m-d", $rp);
                                            array_push($slabs,$d);
                                            $rp = date('Y-m-d', strtotime($rp. ' + 1 day'));
                                        }
                                        $row_prev=explode("/",$row["From Date"]);
                                        $rp=$row_prev[2]."-".$row_prev[1]."-".$row_prev[0];
                                        $prev=explode("/",$prev_date);
                                        $pr=$prev[2]."-".$prev[1]."-".$prev[0];

                                        if(strtotime($rp)<strtotime($pr)){
                                            $row_curr=explode("/",$row["To Date"]);
                                            $curr=explode("/",$curr_date);
                                            $rc=$row_curr[2]."-".$row_curr[1]."-".$row_curr[0];
                                            $cu=$curr[2]."-".$curr[1]."-".$curr[0];
                                            if(strtotime($rc)>strtotime($pr) && strtotime($rc)<strtotime($cu)){ //from date less than prev date and to date lies in between prev date and curr date
                                                while(strtotime($pr)<=strtotime($rc)){
                                                    if($flag1==FALSE)
                                                        $days+=1;
                                                    $pr = date('Y-m-d', strtotime($pr. ' + 1 day'));
                                                }
                                                $flag1=TRUE;
                                                if($units==0){
                                                    $unit_per_day=$rate/$days;
                                                }
                                                else
                                                    $unit_per_day=$units;
                                                if($unit_per_day>$row["to_unit"]){
                                                    $unit_per_day=$unit_per_day-$row["to_unit"];
                                                    $units=$unit_per_day;
                                                    $charge1+=$row["to_unit"]*floatval($row["Rate/unit"]);
                                                }
                                                else{
                                                    $charge1+=$unit_per_day*floatval($row["Rate/unit"]);
                                                    $units=0;
                                                    break;
                                                }
                                            }
                                            elseif(strtotime($rc)>strtotime($cu)){//from date less than prev date and to date greater than curr date
                                                //whole period
                                                if($flag2==FALSE)
                                                    $days+=count($total_period);
                                                $flag2=TRUE;
                                                if($units==0){
                                                    $unit_per_day=$rate/$days;
                                            }
                                            else
                                                $unit_per_day=$units;
                                            if($unit_per_day>$row["to_unit"]){
                                                $unit_per_day=$unit_per_day-$row["to_unit"];
                                                $units=$unit_per_day;
                                                $charge1+=$row["to_unit"]*floatval($row["Rate/unit"]);
                                            }
                                            else{
                                                $charge1+=$unit_per_day*floatval($row["Rate/unit"]);
                                                $units=0;
                                                break;
                                            }
                                        }
                                    }
                                    elseif(strtotime($rp)>strtotime($pr)){
                                        $row_curr=explode("/",$row["To Date"]);
                                        $curr=explode("/",$curr_date);
                                        $rc=$row_curr[2]."-".$row_curr[1]."-".$row_curr[0];
                                        $cu=$curr[2]."-".$curr[1]."-".$curr[0];
                                        if(strtotime($rc)>strtotime($pr) && strtotime($rc)<strtotime($cu)){//both from date and to date lies inside period
                                            //slab period
                                            if($flag3==FALSE)
                                                $days+=count($slabs);
                                            $flag3=TRUE;
                                            if($units==0){
                                                $unit_per_day=$rate/$days;
                                            }
                                            else
                                                $unit_per_day=$units;
                                            if($unit_per_day>$row["to_unit"]){
                                                $unit_per_day=$unit_per_day-$row["to_unit"];
                                                $units=$unit_per_day;
                                                $charge1+=$row["to_unit"]*floatval($row["Rate/unit"]);
                                            }
                                            else{
                                                $charge1+=$unit_per_day*floatval($row["Rate/unit"]);
                                                $units=0;
                                                break;
                                            }
                                        }
                                        elseif(strtotime($rc)>strtotime($cu)){//from date lies inside period but to date greater than period end date
                                            while(strtotime($rp)<=strtotime($cu)){
                                                if($flag4==FALSE)
                                                    $days+=1;
                                                $rp = date('Y-m-d', strtotime($rp. ' + 1 day'));
                                            }
                                            $flag4=TRUE;
                                            if($units==0){
                                                $unit_per_day=$rate/$days;
                                            }
                                            else
                                                $unit_per_day=$units;
                                            if($unit_per_day>$row["to_unit"]){
                                                $unit_per_day=$unit_per_day-$row["to_unit"];
                                                $units=$unit_per_day;
                                                $charge1+=$row["to_unit"]*floatval($row["Rate/unit"]);
                                            }
                                            else{
                                                $charge1+=$unit_per_day*floatval($row["Rate/unit"]);
                                                $units=0;
                                                break;
                                            }
                                        }   
                                    }
                                }
                                else{
                                    $curr=explode("/",$curr_date);
                                    $cu=$curr[2]."-".$curr[1]."-".$curr[0];
                                    if(strtotime($rp)>strtotime($pr) && strtotime($rp)<strtotime($cu)){//from date lies between total period
                                        while(strtotime($rp)<=strtotime($cu)){
                                            if($flag5==FALSE)
                                                $days+=1;
                                            $rp = date('Y-m-d', strtotime($rp. ' + 1 day'));
                                        }
                                        $flag5=TRUE;
                                        if($units==0){
                                            $unit_per_day=$rate/$days;
                                        }
                                        else
                                            $unit_per_day=$units;
                                        if($unit_per_day>$row["to_unit"]){
                                            $unit_per_day=$unit_per_day-$row["to_unit"];
                                            $units=$unit_per_day;
                                            $charge1+=$row["to_unit"]*floatval($row["Rate/unit"]);
                                        }
                                        else{
                                            $charge1+=$unit_per_day*floatval($row["Rate/unit"]);
                                            $units=0;
                                            break;
                                        }
                                    }
                                    elseif(strtotime($rp)<strtotime($pr)){
                                        //total period
                                        if($flag6==FALSE)
                                            $days+=count($total_period);
                                        $flag6=TRUE;
                                        if($units==0){
                                            $unit_per_day=$rate/$days;
                                        }
                                        else
                                            $unit_per_day=$units;
                                        if($unit_per_day>$row["to_unit"]){
                                            $unit_per_day=$unit_per_day-$row["to_unit"];
                                            $units=$unit_per_day;
                                            $charge1+=$row["to_unit"]*floatval($row["Rate/unit"]);
                                        }
                                        else{
                                            $charge1+=$unit_per_day*floatval($row["Rate/unit"]);
                                            $units=0;
                                            break;
                                        }
                                    }
                                }
                                   
                            }
                            
                        }
                    }
                }
                $electric_charge=$charge1;
                //echo $electric_charge;

                    if($days%30==0){
                        $months=intdiv($days,30);
                    }
                    else{
                        if($days%30>15){
                            $months=intdiv($days,30) + 1;
                        }
                        elseif($days%30<=15){
                            $months=intdiv($days,30);
                        }
                    }

                    $sql="SELECT * from `quarter_master_entry` WHERE `Qtr_ID`='".$qtr_id."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $fixed_charge=$months*$row["Meter capacity"]*50;
                        }
                    }
                    $total_charge=($electric_charge*$days)+$fixed_charge; 
                    //echo $total_charge."-".$fixed_charge."-".$electric_charge;
                    $temp=array();
                    array_push($temp,$total_charge,$fixed_charge,$electric_charge);
                    array_push($final,$temp);
                }
                if(count($final)!=0)
                    echo json_encode($final);
            }
        }
        elseif($_POST["input"]=="insert_records"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $stmt = $con->prepare("INSERT INTO `electric transaction`(`Qtr_ID`,`EmpNo`, `EmpName`, `Qtr_No`, `Prev read`, `Prev Date`, `Current read`, `Current Date`, `Unit consumed`, `Elec_charge`, `Fixed_charge`, `Total charge`) 
                                                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("ssssisisiddd", $_POST["qtrid"], $_POST["empno"], $_POST["name"], $_POST["qtr_no"], $_POST["prev_met"], $_POST["prev_date"], $_POST["curr_met"], $_POST["curr_date"], $_POST["unit_consumed"], $_POST["charge"], $_POST["fixed_charge"], $_POST["rate"]);
                if($stmt->execute())
                    echo $_POST["curr_met"]."-".$_POST["curr_date"];
                else
                    echo $con->error;
            }
        }
        elseif($_POST["input"]=="edit_records"){
            $qtrid=array();
            $final=array();
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $sql="SELECT * from `colony_master` WHERE `Colony_name`='".$_POST["name"]."'";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        $code=$row["Colony_code"];
                    } 
                }
                $sql = "SELECT * from `quarter_master_entry` WHERE `Colony_code`='".$code."' AND `Qtr_type`='".$_POST["type"]."'";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        array_push($qtrid,$row["Qtr_ID"]);
                    }
                }
                for($i=0;$i<count($qtrid);$i++){
                    $sql="SELECT * from `electric transaction` WHERE `Qtr_ID`='".$qtrid[$i]."' AND `Flag`=0";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $temp=array();
                            array_push($temp,$row["EmpNo"],$row["EmpName"],$row["Qtr_No"],$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"]);
                            array_push($final,$temp);
                        }
                        //echo $result->num_rows;
                    }
                }
                
            }
            if(count($final)!=0)
                echo json_encode($final);
            else
                echo "Report cannot be generated as no data exists";
        }
    }
    $con->close();
?>