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
        if($_POST["input"]=="names"){
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
        elseif($_POST["input"]=="types"){
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
        elseif($_POST["input"]=="qrtr_no"){
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
                            //array_push($codes,$row["Qtr_type"]);
                            if($_POST["type"]==$row["Qtr_type"]){
                                array_push($codes,$row["Qtr_No"]);
                            }
                        }
                    }
                    else
                        array_push($codes,"No quarter is registered against ".$_POST["name"].". Please ensure that you've registered your quarter before proceeding.");
                    echo json_encode($codes);
                    
                }
                else
                    echo "No colony code information found in table!!";
            }
        }
        elseif($_POST["input"]=="book_no"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $books=array();
                $sql = "SELECT * from colony_master WHERE Colony_name='".$_POST["name"]."'";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        //array_push($codes,$row["Colony_code"]);
                        $code=$row["Colony_code"];
                    }
                    $sql = "SELECT * from quarter_master_entry WHERE `Colony_code`='".$code."' AND `Qtr_type`='".$_POST["type"]."' AND `Qtr_No`='".$_POST["qtrno"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            array_push($books,$row["Book_no"]);
                        }
                    }
                    echo json_encode($books);
                }
                else
                    echo "No colony code information found in table!!";
            }
            }
        }
        elseif($_POST["input"]=="page_no"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $pages=array();
                $sql = "SELECT * from colony_master WHERE Colony_name='".$_POST["name"]."'";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        //array_push($codes,$row["Colony_code"]);
                        $code=$row["Colony_code"];
                    }
                    $sql = "SELECT * from quarter_master_entry WHERE `Colony_code`='".$code."' AND `Qtr_type`='".$_POST["type"]."' AND `Book_no`='".$_POST["book"]."' AND `Qtr_No`='".$_POST["qtrno"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            array_push($pages,$row["Page_no"]);
                        }
                    }
                    echo json_encode($pages);
                }
                else
                    echo "No colony code information found in table!!";
            }
        }
        elseif($_POST["input"]=="fetch qrtr"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $final=$id=$occ=$vac=$name=$qtrno=$qtrtype=$c_code=$c_name=$book=$page=array();
                $sql="SELECT * FROM `quarter_occupancy` WHERE `EmpNo`='".$_POST["data"]."' OR `EmpName` LIKE'%".$_POST["data"]."%'";
                $result = $con->query($sql);
                if($result->num_rows>0){
                    while($row = $result->fetch_assoc()) {
                        array_push($occ,$row["Occupation Date"]);
                        if($row["Vacation Date"]==NULL)
                            array_push($vac,"Occupied");
                        else
                            array_push($vac,$row["Vacation Date"]);
                        array_push($name,$row["EmpName"]);
                        array_push($id,$row["Qtr_ID"]);
                    }

                    for($i=0; $i<count($id); $i++){
                        $sq="SELECT * FROM `quarter_master_entry` WHERE `Qtr_ID`='".$id[$i]."'";
                        $res = $con->query($sq);
                        if($res->num_rows>0){
                            while($row = $res->fetch_assoc()) {
                                array_push($qtrno,$row["Qtr_No"]);
                                array_push($qtrtype,$row["Qtr_type"]);
                                array_push($c_code,$row["Colony_code"]);
                                array_push($book,$row["Book_no"]);
                                array_push($page,$row["Page_no"]);
                            }
                        }
                    }

                    for($i=0; $i<count($c_code); $i++){
                        $sq="SELECT * FROM `colony_master` WHERE `Colony_code`='".$c_code[$i]."'";
                        $res = $con->query($sq);
                        if($res->num_rows>0){
                            while($row = $res->fetch_assoc()) {
                                array_push($c_name,$row["Colony_name"]);
                            }
                        }
                    }

                    for($i=0; $i<count($c_code); $i++){
                        $temp=array();
                        array_push($temp,$qtrno[$i],$qtrtype[$i],$c_name[$i],$name[$i],$occ[$i],$vac[$i],$book[$i],$page[$i]);
                        array_push($final,$temp);
                    }

                    if(count($final)!=0)
                        echo json_encode($final);
                }
                else
                    echo "No quarter has been occupied by this employee";
            }
        }
        elseif($_POST["input"]=="fetch emp"){
            $final=array();
            if(!$connection)
                    echo "Connection to database failed! Please try again";
            else{
                    $id="";
                    $sql = "SELECT * from colony_master WHERE Colony_name='".$_POST["c_name"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $code=$row["Colony_code"];
                        }
                    }
                    $sql = "SELECT * from `quarter_master_entry` WHERE `Qtr_No`='".$_POST["q_no"]."' AND `Colony_code`='".$code."' AND `Qtr_type`='".$_POST["c_type"]."' AND `Book_no`='".$_POST["book"]."' AND `Page_no`='".$_POST["page"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows >0) {
                        while($row = $result->fetch_assoc()) {
                            $id=$row["Qtr_ID"];
                        }

                        
                            $sql="SELECT * from `quarter_occupancy` WHERE `Qtr_ID`='".$id."'";
                            $result = $con->query($sql);
                            if ($result->num_rows > 0) {
                                while($row = $result->fetch_assoc()) {
                                    $details=array();
                                    array_push($details,$row["EmpName"]);
                                    array_push($details,$row["EmpNo"]);
                                    array_push($details,$row["Occupation Date"]);
                                    if($row["Vacation Date"]==NULL)
                                        array_push($details,"Occupied");
                                    else
                                        array_push($details,$row["Vacation Date"]);
                

                                    $sq="SELECT * from `employee_master` WHERE `EmpNo`='".$details[1]."'";
                                    $res = $con->query($sq);
                                    if ($res->num_rows > 0) {
                                        while($row = $res->fetch_assoc()) {
                                            array_push($details,$row["Designation"]);
                                            array_push($details,$row["BillUnit"]);
                                            array_push($details,$row["Station"]);
                                        }
                                    
                                    }
                
                                    array_push($final,$details);
                                }

                                

                            }

                            
                        
                        //echo $qid;
                        if(count($final)!=0){
                            
                            echo json_encode($final);
                        }
                    }
                    else
                        echo "This quarter no is not yet registered.";
            }
        }
    }
    $con->close();
?>