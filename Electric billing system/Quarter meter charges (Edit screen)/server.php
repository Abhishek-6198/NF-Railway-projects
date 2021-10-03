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
            $final=array();
            $flag=FALSE;
            if(!$connection)
                    echo "Connection to database failed! Please try again";
            else{

                    $sql="SELECT * from `colony_master` WHERE `Colony_name`='".$_POST["c_name"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $code=$row["Colony_code"];
                        }
                    }
                    $sql = "SELECT * from `quarter_master_entry` WHERE `Colony_code`='".$code."' AND `Qtr_type`='".$_POST["c_type"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        //echo($result->num_rows);
                        while($row = $result->fetch_assoc()) {
                            array_push($qtrid,$row["Qtr_ID"]);
                        }
                    }

                    for($x=0; $x<count($qtrid); $x++){
                        $sql="SELECT * from `electric transaction` WHERE `Qtr_ID`='".$qtrid[$x]."' AND `Flag`=0";
                        $result = $con->query($sql);
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                $temp=array();
                                array_push($temp,$row["Qtr_ID"],$row["EmpNo"],$row["EmpName"],$row["Qtr_No"],$row["Prev read"],$row["Current read"],$row["Prev Date"],$row["Current Date"],$row["Unit consumed"],$row["Elec_charge"],$row["Fixed_charge"],$row["Total charge"]);
                                array_push($final,$temp);
                            }  
                        }
                                            
                    }

                    if(count($final)!=0)
                        echo json_encode($final);
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
                        $cap=$electric_charge=0;
                        $new_period=$to_period="";
                        $prev_date=$data1[2];
                        $curr_date=$data1[3];
                        $qtr_id=$data1[1];
                        $rate=$data1[0];
                        $fixed_charge=0;
                        $total_period=$fd=array();
                        $days=$months=0;
                        $charge1=0;
                        $flag=FALSE;
                        $units=$unit_per_day=$u=0;
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
                        $sql="SELECT * from `quarter_master_entry` WHERE `Qtr_ID`='".$qtr_id."'";
                        $result = $con->query($sql);
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                $cap=$row["Meter capacity (in KW)"];
                            }
                        }
    
                        $unit_per_day=$rate/count($total_period);
                        
                        $sql="SELECT * FROM `electric rate table`";
                        $result = $con->query($sql);
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                $u=$unit_per_day;
                                $flag1=$flag2=$flag3=$flag4=$flag5=$flag6=$flag7=$flag8=$flag9=$flag10=$flag11=FALSE;
                                if($flag==FALSE){
                                    $sq="SELECT * from `electric rate table` WHERE `From Date`='".$row["From Date"]."' AND `Load (in KW)`='".$cap."'";
                                    array_push($from_dates,$row["From Date"]);
                                    if($row["To Date"]!=NULL)
                                        array_push($to_dates,$row["To Date"]);
                                    $flag=TRUE;
                                }
                                else{
                                    $s="SELECT * from `electric rate table` WHERE `From Date` NOT IN ( '" . implode( "', '" , $from_dates ) . "' )";
                                    $res = $con->query($s);
                                    if ($res->num_rows > 0) {
                                        while($row = $res->fetch_assoc()) {
                                            $new_period=$row["From Date"];
                                            if($row["To Date"]!=NULL){
                                                $to_period=$row["To Date"];
                                                array_push($to_dates,$to_period);
                                            }
                                            break;
                                        }
                                    }
                                    $sq="SELECT * FROM `electric rate table` WHERE `From Date`='".$new_period."'AND `Load (in KW)`='".$cap."'";
                                    //echo $new_period;
                                    array_push($from_dates,$new_period);
                                    /*if($charge1!=0)
                                        echo $charge1."\n";*/
                                    $electric_charge+=round($charge1*$days,2);
                                    //echo $charge1." x ".$days." = ".$electric_charge."\n";
                                    $days=$charge1=0;
                                }        
                                
                                $fd=array_unique($from_dates);
                                if(count($fd)!=count($from_dates))
                                    break;
                                //echo $sq."\n";
                                $r = $con->query($sq);
                                if ($r->num_rows > 0) {
                                    while($row = $r->fetch_assoc()) {
                                        $row_prev=explode("/",$row["From Date"]);
                                        $rp=$row_prev[2]."-".$row_prev[1]."-".$row_prev[0];
                                        $prev=explode("/",$prev_date);
                                        $pr=$prev[2]."-".$prev[1]."-".$prev[0];
    
                                        if($row["To Date"]!=NULL){
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
                                                    $c=0;
                                                    while(strtotime($pr)<=strtotime($rc)){
                                                        if($flag1==FALSE)
                                                            $days+=1;
                                                        $c+=1;
                                                        $pr = date('Y-m-d', strtotime($pr. ' + 1 day'));
                                                    }
                                                    $flag1=TRUE;
                                                    if($row["to_unit"]!=NULL){
                                                        if($u>($row["to_unit"]-$row["from_unit"])){
                                                            $u=$u-($row["to_unit"]-$row["from_unit"]);
                                                            $charge1+=($row["to_unit"]-$row["from_unit"])*floatval($row["Rate/unit"]);
                                                            if($flag11==FALSE)
                                                                $fixed_charge+=floatval($row["Fixed charge"]);
                                                            $flag11=TRUE;
                                                            if(strtotime($cu)<=strtotime($rc)){
                                                                $flag10=TRUE;
                                                            }
                                                        }
                                                        else{
                                                            $charge1+=$u*floatval($row["Rate/unit"]);
                                                            if($flag11==FALSE)
                                                                $fixed_charge+=floatval($row["Fixed charge"]);
                                                            $flag11=TRUE;
                                                            if(strtotime($cu)<=strtotime($rc)){
                                                                $flag10=TRUE;
                                                            }
                                                            break;
                                                        }
                                                    }
                                                    else{
                                                        $charge1+=$u*floatval($row["Rate/unit"]);
                                                        if($flag11==FALSE)
                                                            $fixed_charge+=floatval($row["Fixed charge"]);
                                                        $flag11=TRUE;
                                                        if(strtotime($cu)<=strtotime($rc)){
                                                            $flag10=TRUE;
                                                        }
                                                        break;
                                                    }
                                                }
                                                elseif(strtotime($rc)>strtotime($cu) || strtotime($rc)==strtotime($cu)){//from date less than prev date and to date greater than curr date
                                                    //whole period
                                                    if($flag2==FALSE)
                                                        $days+=count($total_period);
                                                    $flag2=TRUE;
                                                    if($row["to_unit"]!=NULL){
                                                        if($u>($row["to_unit"]-$row["from_unit"])){
                                                            $u=$u-($row["to_unit"]-$row["from_unit"]);
                                                            $charge1+=($row["to_unit"]-$row["from_unit"])*floatval($row["Rate/unit"]);
                                                            if($flag11==FALSE)
                                                                $fixed_charge+=floatval($row["Fixed charge"]);
                                                            $flag11=TRUE;
                                                            if(strtotime($cu)<=strtotime($rc)){
                                                                $flag10=TRUE;
                                                            }
                                                        }
                                                        else{
                                                            $charge1+=$u*floatval($row["Rate/unit"]);
                                                            if($flag11==FALSE)
                                                                $fixed_charge+=floatval($row["Fixed charge"]);
                                                            $flag11=TRUE;
                                                            if(strtotime($cu)<=strtotime($rc)){
                                                                $flag10=TRUE;
                                                            }
                                                            break;
                                                        }
                                                    }
                                                    else{
                                                        $charge1+=$u*floatval($row["Rate/unit"]);
                                                        if($flag11==FALSE)
                                                            $fixed_charge+=floatval($row["Fixed charge"]);
                                                        $flag11=TRUE;
                                                        if(strtotime($cu)<=strtotime($rc)){
                                                            $flag10=TRUE;
                                                        }
                                                        break;
                                                    }
                                                }
                                                elseif(strtotime($rc)<strtotime($pr)){
                                                    continue;
                                                }
                                                elseif(strtotime($rc)==strtotime($pr)){
                                                    if($flag7==FALSE)
                                                        $days+=1;
                                                    $flag7=TRUE;
                                                    if($row["to_unit"]!=NULL){
                                                        if($u>($row["to_unit"]-$row["from_unit"])){
                                                            $u=$u-($row["to_unit"]-$row["from_unit"]);
                                                            $charge1+=($row["to_unit"]-$row["from_unit"])*floatval($row["Rate/unit"]);
                                                            if($flag11==FALSE)
                                                                $fixed_charge+=floatval($row["Fixed charge"]);
                                                            $flag11=TRUE;
                                                            if(strtotime($cu)<=strtotime($rc)){
                                                                $flag10=TRUE;
                                                            }
                                                        }
                                                        else{
                                                            $charge1+=$u*floatval($row["Rate/unit"]);
                                                            if($flag11==FALSE)
                                                                $fixed_charge+=floatval($row["Fixed charge"]);
                                                            $flag11=TRUE;
                                                            if(strtotime($cu)<=strtotime($rc)){
                                                                $flag10=TRUE;
                                                            }
                                                            break;
                                                        }
                                                    }
                                                    else{
                                                        $charge1+=$u*floatval($row["Rate/unit"]);
                                                        if($flag11==FALSE)
                                                            $fixed_charge+=floatval($row["Fixed charge"]);
                                                        $flag11=TRUE;
                                                        if(strtotime($cu)<=strtotime($rc)){
                                                            $flag10=TRUE;
                                                        }
                                                        break;
                                                    }
                                                }
                                            }
                                            elseif(strtotime($rp)>strtotime($pr)){
                                                $row_curr=explode("/",$row["To Date"]);
                                                $curr=explode("/",$curr_date);
                                                $rc=$row_curr[2]."-".$row_curr[1]."-".$row_curr[0];
                                                $cu=$curr[2]."-".$curr[1]."-".$curr[0];
                                                if((strtotime($rc)>strtotime($pr) && strtotime($rc)<strtotime($cu)) || (strtotime($rc)==strtotime($cu))){//both from date and to date lies inside period
                                                    //slab period
                                                    if($flag3==FALSE)
                                                        $days+=count($slabs);
                                                    $flag3=TRUE;
                                                    if($row["to_unit"]!=NULL){
                                                        if($u>($row["to_unit"]-$row["from_unit"])){
                                                            $u=$u-($row["to_unit"]-$row["from_unit"]);
                                                            $charge1+=($row["to_unit"]-$row["from_unit"])*floatval($row["Rate/unit"]);
                                                            if($flag11==FALSE)
                                                                $fixed_charge+=floatval($row["Fixed charge"]);
                                                            $flag11=TRUE;
                                                            if(strtotime($cu)<=strtotime($rc)){
                                                                $flag10=TRUE;
                                                            }
                                                        }
                                                        else{
                                                            $charge1+=$u*floatval($row["Rate/unit"]);
                                                            if($flag11==FALSE)
                                                                $fixed_charge+=floatval($row["Fixed charge"]);
                                                            $flag11=TRUE;
                                                            if(strtotime($cu)<=strtotime($rc)){
                                                                $flag10=TRUE;
                                                            }
                                                            break;
                                                        }
                                                    }
                                                    else{
                                                        $charge1+=$u*floatval($row["Rate/unit"]);
                                                        if($flag11==FALSE)
                                                            $fixed_charge+=floatval($row["Fixed charge"]);
                                                        $flag11=TRUE;
                                                        if(strtotime($cu)<=strtotime($rc)){
                                                            $flag10=TRUE;
                                                        }
                                                        break;
                                                    }
                                                }
                                                elseif(strtotime($rc)>strtotime($cu)){//from date lies inside period but to date greater than period end date
                                                    $c=0;
                                                    
                                                    //echo DateTime::createFromFormat("Y-m-d", $rp)->format('d/M/Y')." - ".DateTime::createFromFormat("Y-m-d", $cu)->format('d/M/Y')."\n";
                                                    while(strtotime($rp)<=strtotime($cu)){
                                                        if($flag4==FALSE)
                                                            $days+=1;
                                                        $c+=1;
                                                        $rp = date('Y-m-d', strtotime($rp. ' + 1 day'));
                                                    }
                                                    //echo $c;
                                                    $flag4=TRUE;
                                                    if($row["to_unit"]!=NULL){
                                                        if($u>($row["to_unit"]-$row["from_unit"])){
                                                            $u=$u-($row["to_unit"]-$row["from_unit"]);
                                                            $charge1+=($row["to_unit"]-$row["from_unit"])*floatval($row["Rate/unit"]);
                                                            if($flag11==FALSE)
                                                                $fixed_charge+=floatval($row["Fixed charge"]);
                                                            $flag11=TRUE;
                                                            if(strtotime($cu)<=strtotime($rc)){
                                                                $flag10=TRUE;
                                                            }
                                                        }
                                                        else{
                                                            $charge1+=$u*floatval($row["Rate/unit"]);
                                                            if($flag11==FALSE)
                                                                $fixed_charge+=floatval($row["Fixed charge"]);
                                                            $flag11=TRUE;
                                                            if(strtotime($cu)<=strtotime($rc)){
                                                                $flag10=TRUE;
                                                            }
                                                            break;
                                                        }
                                                    }
                                                    else{
                                                        $charge1+=$u*floatval($row["Rate/unit"]);
                                                        if($flag11==FALSE)
                                                            $fixed_charge+=floatval($row["Fixed charge"]);
                                                        $flag11=TRUE;
                                                        if(strtotime($cu)<=strtotime($rc)){
                                                            $flag10=TRUE;
                                                        }
                                                        break;
                                                    }
                                                }   
                                            }
                                            elseif(strtotime($rp)==strtotime($pr)){
                                                $row_curr=explode("/",$row["To Date"]);
                                                $curr=explode("/",$curr_date);
                                                $rc=$row_curr[2]."-".$row_curr[1]."-".$row_curr[0];
                                                $cu=$curr[2]."-".$curr[1]."-".$curr[0];
                                                if((strtotime($rc)>strtotime($pr) && strtotime($rc)<strtotime($cu)) || (strtotime($rc)==strtotime($cu))){//both from date and to date lies inside period
                                                    //slab period
                                                    if($flag8==FALSE)
                                                        $days+=count($slabs);
                                                    $flag8=TRUE;
                                                    if($row["to_unit"]!=NULL){
                                                        if($u>($row["to_unit"]-$row["from_unit"])){
                                                            $u=$u-($row["to_unit"]-$row["from_unit"]);
                                                            $charge1+=($row["to_unit"]-$row["from_unit"])*floatval($row["Rate/unit"]);
                                                            if($flag11==FALSE)
                                                                $fixed_charge+=floatval($row["Fixed charge"]);
                                                            $flag11=TRUE;
                                                            if(strtotime($cu)<=strtotime($rc)){
                                                                $flag10=TRUE;
                                                            }
                                                        }
                                                        else{
                                                            $charge1+=$u*floatval($row["Rate/unit"]);
                                                            if($flag11==FALSE)
                                                                $fixed_charge+=floatval($row["Fixed charge"]);
                                                            $flag11=TRUE;
                                                            if(strtotime($cu)<=strtotime($rc)){
                                                                $flag10=TRUE;
                                                            }
                                                            break;
                                                        }
                                                    }
                                                    else{
                                                        $charge1+=$u*floatval($row["Rate/unit"]);
                                                        if($flag11==FALSE)
                                                            $fixed_charge+=floatval($row["Fixed charge"]);
                                                        $flag11=TRUE;
                                                        if(strtotime($cu)<=strtotime($rc)){
                                                            $flag10=TRUE;
                                                        }
                                                        break; 
                                                    }
                                                }
                                                elseif(strtotime($rc)>strtotime($cu)){//from date lies inside period but to date greater than period end date
                                                    $c=0;
                                                    while(strtotime($rp)<=strtotime($cu)){
                                                        if($flag9==FALSE)
                                                            $days+=1;
                                                        $c+=1;
                                                        $rp = date('Y-m-d', strtotime($rp. ' + 1 day'));
                                                    }
                                                    //echo $c;
                                                    $flag9=TRUE;
                                                    if($row["to_unit"]!=NULL){
                                                        if($u>($row["to_unit"]-$row["from_unit"])){
                                                            $u=$u-($row["to_unit"]-$row["from_unit"]);
                                                            $charge1+=($row["to_unit"]-$row["from_unit"])*floatval($row["Rate/unit"]);
                                                            if($flag11==FALSE)
                                                                $fixed_charge+=floatval($row["Fixed charge"]);
                                                            $flag11=TRUE;
                                                            if(strtotime($cu)<=strtotime($rc)){
                                                                $flag10=TRUE;
                                                            }
                                                        }
                                                        else{
                                                            $charge1+=$u*floatval($row["Rate/unit"]);
                                                            if($flag11==FALSE)
                                                                $fixed_charge+=floatval($row["Fixed charge"]);
                                                            $flag11=TRUE;
                                                            if(strtotime($cu)<=strtotime($rc)){
                                                                $flag10=TRUE;
                                                            }
                                                            break;
                                                        }
                                                    }
                                                    else{
                                                        $charge1+=$u*floatval($row["Rate/unit"]);
                                                        if($flag11==FALSE)
                                                            $fixed_charge+=floatval($row["Fixed charge"]);
                                                        $flag11=TRUE;
                                                        if(strtotime($cu)<=strtotime($rc)){
                                                            $flag10=TRUE;
                                                        }
                                                        break;
                                                    }
                                                }   
                                            }
                                        }
                                        else{
                                            $curr=explode("/",$curr_date);
                                            $cu=$curr[2]."-".$curr[1]."-".$curr[0];
                                            if(strtotime($rp)>strtotime($pr) && strtotime($rp)<strtotime($cu)){//from date lies between total period
                                                $c=0;
                                                while(strtotime($rp)<=strtotime($cu)){
                                                    if($flag5==FALSE)
                                                        $days+=1;
                                                    $c+=1;
                                                    $rp = date('Y-m-d', strtotime($rp. ' + 1 day'));
                                                }
                                                $flag5=TRUE;
                                                if($row["to_unit"]!=NULL){
                                                    if($u>($row["to_unit"]-$row["from_unit"])){
                                                        $u=$u-($row["to_unit"]-$row["from_unit"]);
                                                        $charge1+=($row["to_unit"]-$row["from_unit"])*floatval($row["Rate/unit"]);
                                                        if($flag11==FALSE)
                                                            $fixed_charge+=floatval($row["Fixed charge"]);
                                                        $flag11=TRUE;
                                                    }
                                                    else{
                                                        $charge1+=$u*floatval($row["Rate/unit"]);
                                                        if($flag11==FALSE)
                                                            $fixed_charge+=floatval($row["Fixed charge"]);
                                                        $flag11=TRUE;
                                                        break;
                                                    }
                                                }
                                                else{
                                                    $charge1+=$u*floatval($row["Rate/unit"]);
                                                    if($flag11==FALSE)
                                                        $fixed_charge+=floatval($row["Fixed charge"]);
                                                    $flag11=TRUE;
                                                    break;
                                                }
                                            }
                                            elseif(strtotime($rp)<strtotime($pr)){
                                                //total period
                                                if($flag6==FALSE)
                                                    $days+=count($total_period);
                                                $flag6=TRUE;
                                                if($row["to_unit"]!=NULL){
                                                    if($u>($row["to_unit"]-$row["from_unit"])){
                                                        $u=$u-($row["to_unit"]-$row["from_unit"]);
                                                        $charge1+=($row["to_unit"]-$row["from_unit"])*floatval($row["Rate/unit"]);
                                                        if($flag11==FALSE)
                                                            $fixed_charge+=floatval($row["Fixed charge"]);
                                                        $flag11=TRUE;
                                                    }
                                                    else{
                                                        $charge1+=$u*floatval($row["Rate/unit"]);
                                                        if($flag11==FALSE)
                                                            $fixed_charge+=floatval($row["Fixed charge"]);
                                                        $flag11=TRUE;
                                                        break;
                                                    }
                                                }
                                                else{
                                                    $charge1+=$u*floatval($row["Rate/unit"]);
                                                    if($flag11==FALSE)
                                                        $fixed_charge+=floatval($row["Fixed charge"]);
                                                    $flag11=TRUE;
                                                    break;
                                                }
                                            }
                                        }
                                       
                                    }
                                    if($flag10==TRUE)
                                        break;
                                }
                            }
                        }
                        //$electric_charge=round($charge1);
                        //echo $electric_charge;
    
                        /*if($days%30==0){
                            $months=intdiv($days,30);
                        }
                        else{
                            if($days%30>15){
                                $months=intdiv($days,30) + 1;
                            }
                            elseif($days%30<=15){
                                $months=intdiv($days,30);
                            }
                        }*/
                        //$fixed_charge=$days*$fixed_charge;
                        $fixed_charge=round(count($total_period)*$fixed_charge,2);
                        //$fixed_charge=round($fixed_charge);
                        $total_charge=round($electric_charge+$fixed_charge,2);
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
            $flag=FALSE;
            $count=$count1=0;
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $a=1;
                $data = json_decode(stripslashes($_POST['data']));
                foreach($data as $d){
                    $data1 = json_decode(stripslashes(json_encode($d)));
                    $stmt = $con->prepare("UPDATE `electric transaction` SET `Current read`=?,`Current Date`=?,`Unit consumed`=?,`Elec_charge`=?,`Fixed_charge`=?,`Total charge`=?, `Flag`=? WHERE `Qtr_ID`='".$data1[0]."'");
                    $stmt->bind_param("isiissi", $data1[6], $data1[5], $data1[1], $data1[2], $data1[3], $data1[4],$a);
                    if($stmt->execute()){
                        $count1+=1;
                    }
                    else{
                        $flag=TRUE;
                        break;
                    }   
                    $count+=1; 
                }
                if($count==$count1)
                    echo "Updated successfully";
                if($flag==TRUE)
                    echo $con->error; 
            }
        }
        elseif($_POST["input"]=="update_records"){
            $flag=FALSE;
            $count=$count1=0;
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $data = json_decode(stripslashes($_POST['data']));
                foreach($data as $d){
                    $data1 = json_decode(stripslashes(json_encode($d)));
                    $stmt = $con->prepare("UPDATE `electric transaction` SET `Current read`=?,`Current Date`=?,`Unit consumed`=?,`Elec_charge`=?,`Fixed_charge`=?,`Total charge`=? WHERE `Qtr_ID`='".$data1[0]."'");
                    $stmt->bind_param("isissi", $data1[6], $data1[5], $data1[1], $data1[2], $data1[3], $data1[4]);
                    if($stmt->execute()){
                        $count1+=1;
                    }
                    else{
                        $flag=TRUE;
                        break;
                    }   
                    $count+=1; 
                }
                if($count==$count1)
                    echo "Updated successfully";
                if($flag==TRUE)
                    echo $con->error; 
            }
        }
    }
    $con->close();
?>