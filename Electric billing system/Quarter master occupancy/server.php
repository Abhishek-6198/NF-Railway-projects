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
                            /*else{
                                $sql = "SELECT * from quarter_master";
                                $result = $con->query($sql);
                                if ($result->num_rows > 0) {
                                    while($row = $result->fetch_assoc()) {
                                        array_push($codes,$row["Qtr_type"]);
                                    }
                                    echo json_encode($codes);
                                }
                                else
                                    echo "No quarter type information found in table!!";
                            }
                            //echo json_encode($codes);*/
                    }
                    else
                        echo "No colony code information found in table!!";
            }
        }
        elseif($_POST["input"] == "numbers"){

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
                                //echo json_encode($codes);
                            }
                            else
                                array_push($codes,"No quarter is registered against ".$_POST["name"].". Please ensure that you've registered your quarter before proceeding.");
                            echo json_encode($codes);
                            /*else{
                                $sql = "SELECT * from quarter_master";
                                $result = $con->query($sql);
                                if ($result->num_rows > 0) {
                                    while($row = $result->fetch_assoc()) {
                                        array_push($codes,$row["Qtr_type"]);
                                    }
                                    echo json_encode($codes);
                                }
                                else
                                    echo "No quarter type information found in table!!";
                            }
                            //echo json_encode($codes);*/
                    }
                else
                    echo "No colony code information found in table!!";
            }
        }
        elseif($_POST["input"] == "is it registered?"){

            if(!$connection)
                    echo "Connection to database failed! Please try again";
            else{
                    $sql = "SELECT * from `quarter_master_entry` WHERE `Qtr_No`='".$_POST["q_no"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                $qid=$row["Qtr_ID"];
                                $type=$row["Qtr_type"];
                                $code=$row["Colony_code"];
                            }
                            $sql = "SELECT * from `colony_master` WHERE `Colony_code`='".$code."'";
                            $result = $con->query($sql);
                            if ($result->num_rows > 0) {
                                while($row = $result->fetch_assoc()) {
                                    $name=$row["Colony_name"];
                                }
                                if($name==$_POST["c_name"] && $type==$_POST["c_type"]){
                                    $sql = "SELECT * from `quarter_occupancy` WHERE `Qtr_ID`='".$qid."'";
                                    $result = $con->query($sql);
                                    if ($result->num_rows > 0) {
                                        while($row = $result->fetch_assoc()) {
                                            $vac_date=$row["Vacation Date"];
                                            $emp_no=$row["EmpNo"];
                                        }
                                        if(date("Y-m-d")>$vac_date)
                                            echo $qid;
                                        else{
                                            echo "The quarter is already registered against ".$emp_no." and will be vacated only after ".date("d/m/Y",strtotime($vac_date)).".";
                                        }
                                    }
                                    else
                                        echo $qid;
                                }    
                                else
                                    echo "This quarter no is registered with the colony name: ".$name." and quarter_type: ".$type.". Please rectify your selection.";
                            }
                            
                    }
                    else
                        echo "This quarter no is not yet registered.";
            }
        }
        elseif($_POST["input"] == "emp"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $sql = "SELECT * from `employee_master` WHERE `EmpNo`='".$_POST["emp_no"]."'";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    $array=array();
                    //echo "<table><tr><th>Name</th><th>Designation</th><th>Bill Unit</th><th>Station</th></tr>";
                    while($row = $result->fetch_assoc()) {
                        $name=$row["Name"];
                        $des=$row["Designation"];
                        $billunit=$row["BillUnit"];
                        $station=$row["Station"];
                        array_push($array,$name);
                        array_push($array,$des);
                        array_push($array,$billunit);
                        array_push($array,$station);
                        //echo "<tr><td>".$name."</td><td>".$des."</td><td>".$billunit."</td><td>".$station."</td></tr>";
                    } 
                   // echo "</table>";
                   echo json_encode($array);
                }
                else{
                    echo "No employee information is registered for this no.";
                }
            }
        }
        elseif($_POST["input"] == "register"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $sql = "SELECT * from `quarter_occupancy` WHERE `EmpNo`='".$_POST["emp_no"]."'";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        $qid=$row["Qtr_ID"];
                    } 
                   echo "This employee no is already registered against the quarter ID: ".$qid;
                }
                else{
                    //$handle->execute(array(":date"=>date("Y-d-m", strtotime($_POST["occ_date"])), PDO::PARAM_STR));
                    //var_dump($_POST["occ_date"]);
                    //echo $_POST["occ_date"];
                    //$occ_date = DateTime::createFromFormat('Y -d -m', $_POST['occ_date']);
                    //$vac_date = DateTime::createFromFormat('Y -d -m', $_POST['vac_date']);
                    $occ_date=date('Y-m-d', strtotime($_POST["occ_date"]));
                    $vac_date=date('Y-m-d', strtotime($_POST["vac_date"]));
                    echo $occ_date." ".$vac_date;
                    $stmt = $con->prepare("INSERT INTO quarter_occupancy(EmpNo, Qtr_ID, `Occupation Date`, `Vacation Date`) 
                                            VALUES (?, ?, ?, ?)");
                    $stmt->bind_param("ssss", $_POST["emp_no"], $_POST["qtr_id"], $occ_date, $vac_date);
                    if( $stmt->execute()){
                        if($_POST["days"]!=0)
                            echo "The quarter id ".$_POST["qtr_id"]." has been registered against the employee no ".$_POST["emp_no"]." for a period of ".$_POST["days"]." days successfully.";
                        else
                            echo "The quarter id ".$_POST["qtr_id"]." has been registered against the employee no ".$_POST["emp_no"]." for today itself.";
                    }
                    else{
                        echo $con->error;
                    }

                    $stmt->close();
                }
            }
        }

    }   
    $con->close();
?>