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
            $details=array();
            if(!$connection)
                    echo "Connection to database failed! Please try again";
            else{
                    $sql = "SELECT * from `quarter_master_entry` WHERE `Qtr_No`='".$_POST["q_no"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            array_push($details,$row["Qtr_ID"]);
                        }

                        if(count($details)==1){
                            $sql="SELECT * from `quarter_occupancy` WHERE `Qtr_ID`='".$details[0]."' AND `Vacation Date` IS NULL";
                            $result = $con->query($sql);
                            if ($result->num_rows > 0) {
                                while($row = $result->fetch_assoc()) {
                                    array_push($details,$row["Occupation Date"]);
                                    array_push($details,$row["EmpNo"]);
                                }

                                $sql="SELECT * from `employee_master` WHERE `EmpNo`='".$details[2]."'";
                                $result = $con->query($sql);
                                if ($result->num_rows > 0) {
                                    while($row = $result->fetch_assoc()) {
                                        array_push($details,$row["Name"]);
                                        array_push($details,$row["Designation"]);
                                        array_push($details,$row["BillUnit"]);
                                        array_push($details,$row["Station"]);
                                    }
                                    
                                }

                            }
                        }
                        //echo $qid;
                        echo json_encode($details);
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
                   //echo json_encode($array);

                   $sql="SELECT * from `quarter_occupancy`WHERE `EmpNo`='".$_POST["emp_no"]."' AND `Vacation Date` IS NULL";
                   $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            array_push($array,$row["Qtr_ID"]);
                            array_push($array,$row["Occupation Date"]);
                        }
                    }
                    echo json_encode($array);
                }
                else{
                    echo "No employee information is registered for this no.";
                }
            }
        }
        elseif($_POST["input"] == "register"){
            //$flag=false;
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                if(isset($_POST["count"])){
                    $sql="SELECT * FROM `employee_master` WHERE `Name`= '".$_POST["emp_name"]."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $number=$row["EmpNo"];
                        }
                        $sql="UPDATE `quarter_occupancy` SET `Vacation Date`=? WHERE `Qtr_ID`= '".$_POST["qtr_id"]. "' AND (`EmpNo`= '".$number."' AND `Vacation Date`IS NULL)";
                        $statement = $con->prepare($sql);
                        //echo $_POST["occ_date"];
                        $statement->bind_param("s",$_POST["vac_date"]);
                        if($statement->execute())
                            echo "Vacation date ".$_POST["vac_date"]." added for emp no ".$number." occupying qtr id ".$_POST["qtr_id"];
                        else
                            $con->error();
                    }
                }
                else{
                    if(!isset($_POST["occ_date"])){
                        $sql="UPDATE `quarter_occupancy` SET `Vacation Date`=? WHERE `Qtr_ID`= '".$_POST["qtr_id"]. "' AND (`EmpNo`= '".$_POST["emp_no"]."' AND `Vacation Date`IS NULL)";
                        $statement = $con->prepare($sql);
                        //echo $_POST["occ_date"];
                        $statement->bind_param("s",$_POST["vac_date"]);
                        if($statement->execute())
                            echo "Vacation date ".$_POST["vac_date"]." added for emp no ".$_POST["emp_no"]." occupying qtr id ".$_POST["qtr_id"];
                        else
                            $con->error();

                    }
                    else{
                        $stmt = $con->prepare("INSERT INTO `quarter_occupancy`(`EmpNo`,`Qtr_ID`,`Occupation Date`) 
                                                            VALUES (?, ?, ?)");
                        $stmt->bind_param("sss", $_POST["emp_no"], $_POST["qtr_id"], $_POST["occ_date"]);
                        if( $stmt->execute()){
                            echo $_POST["emp_no"]." has successfully occupied the quarter ".$_POST["qtr_id"]." on ".$_POST["occ_date"];
                        }
                        else
                            $con->error();
                    }
                }
            }
        }

    }   
    $con->close();
?>