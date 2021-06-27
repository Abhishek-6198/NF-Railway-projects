<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    $server="localhost";
    $username="root";
    $pass="";

    $con=mysqli_connect($server,$username,$pass);
    $connection=mysqli_select_db($con,"patient information");

    if(!$connection)
        echo "Connection to database failed! Please try again";
    else{
        if(isset($_POST["op"])){
            $name=$_POST["name"];
            if($_POST["op"]=="Insert"){
                $id=$_POST["id"];
                $age=$_POST["age"];
                $no=$_POST["number"];
                $advice=$_POST["advice"];
                $medicine=$_POST["medicine"];
                $sql = "SELECT `Patient ID` FROM `patients`  WHERE `Patient ID` = '" . $id . "'";
                $result = $con->query($sql);
                $rows=$result->num_rows;
                if ($rows > 0) {
                    $response="Sorry, but this id is already registered in the database.";
                    echo $response;
                }
                else{
                    $stmt = $con->prepare("INSERT INTO `patients` (`Patient ID`, `Name`, `Age`, `Patients Contact number`, 
                    `Doctor's advice`, `Medicines prescribed`) VALUES (?, ?, ?, ?, ?, ?)".';');
                    //echo $con->error;
                    $stmt->bind_param("isisss", $id, $name, $age, $no, $advice, $medicine);
                   // $stmt->execute();
                    if( $stmt->execute())
                        echo $name."'s record has been inserted successfully.";
                    else
                        echo "A patient with the same contact number already exists.";
                    $stmt->close();
                } 
            }
            else if($_POST["op"]=="Update"){
                $id=$_POST["id"];
                $age=$_POST["age"];
                $no=$_POST["number"];
                $advice=$_POST["advice"];
                $medicine=$_POST["medicine"];
                $sql = "SELECT `Name` FROM `patients` WHERE `Name` = '" . $name . "'";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    $stmt = $con->prepare("UPDATE `patients` SET `Patient ID`=?, `Age`=?, `Patients Contact number`=?, 
                                          `Doctor's advice`=?, `Medicines prescribed`=? WHERE `Name` = '" . $name . "'");
                    $stmt->bind_param("iisss", $id, $age, $no, $advice, $medicine);
                    if($stmt->execute()){
                        $response=$name."'s record has been updated";
                        echo $response;
                        //echo $sql;
                    }
                    else{
                        echo "There's already someone registered with the same id or contact number.";
                    }
                    $stmt->close();
                }
                else{
                    $response="Sorry, this entry is not present in the database. Kindly consider inserting it first.";
                    echo $response;
                    //echo $sql;
                    //echo $con->error;
                    //echo $result->num_rows;
                }
            }
            else{
                $sql = "SELECT * FROM patients  WHERE `Name` = '" . $name . "'";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    $sql = "DELETE FROM `patients`  WHERE `Name` = '" . $name . "'";

                    if ($con->query($sql) === TRUE) {
                      echo "Record deleted successfully";
                    } else {
                      echo "Error deleting record: " . $con->error;
                      echo $sql;
                    }
                    
                }
                else{
                    $response="This record is not present in the database.";
                    echo $response;
                }

            }
                
            }
        }

    $con->close();
    
?>