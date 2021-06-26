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
            $id=$_POST["id"];
            if($_POST["op"]=="Insert"){
                $name=$_POST["name"];
                $age=$_POST["age"];
                $no=$_POST["number"];
                $advice=$_POST["advice"];
                $medicine=$_POST["medicine"];
                $sql = "SELECT `Patient ID` FROM `patients` WHERE `Patient ID`=".$id;
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    $response="Sorry, this entry is already present in the database.";
                    echo $response;
                }
                else{
                    $stmt = $con->prepare("INSERT INTO `patients` (`Patient ID`, `Name`, `Age`, `Patients Contact number`, 
                    `Doctor's advice`, `Medicines prescribed`) VALUES (?, ?, ?, ?, ?, ?)");
                    //echo $con->error;
                    $stmt->bind_param("isisss", $id, $name, $age, $no, $advice, $medicine);
                   // $stmt->execute();
                    if( $stmt->execute())
                        echo "Record was inserted";
                    else
                        echo "Record is already present. (Hint: Please double check the patient id and contact number.)";
                    $stmt->close();
                } 
            }
            else if($_POST["op"]=="Update"){
                $name=$_POST["name"];
                $age=$_POST["age"];
                $no=$_POST["number"];
                $advice=$_POST["advice"];
                $medicine=$_POST["medicine"];
                $sql = "SELECT `Patient ID` FROM `patients` WHERE `Patient ID`=".$id;
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    $stmt = $con->prepare("UPDATE `patients` SET `Patient ID`=?, `Name`=?, `Age`=?, `Patients Contact number`=?, 
                                          `Doctor's advice`=?, `Medicines prescribed`=? WHERE `Patient ID`= ".$id);
                    $stmt->bind_param("isisss", $id, $name, $age, $no, $advice, $medicine);
                    if($stmt->execute()){
                        $response="Record has been updated";
                        echo $response;
                    }
                    else{
                        echo "Something went wrong. (Hint: Please double check the patient id and contact number.)";
                    }
                    $stmt->close();
                }
                else{
                    $response="Sorry, this entry is not present in the database. Kindly consider inserting it first.";
                    echo $response;
                }
            }
            else{
                $sql = "SELECT `Patient ID` FROM `patients` WHERE `Patient ID`=".$id;
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    $sql = "DELETE FROM `patients` WHERE `Patient ID`=".$id;

                    if ($con->query($sql) === TRUE) {
                      echo "Record deleted successfully";
                    } else {
                      echo "Error deleting record: " . $con->error;
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