<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

if(isset($_POST["input"])){
    $server="localhost";
    $username="root";
    $pass="";

    $con=mysqli_connect($server,$username,$pass);
    $connection=mysqli_select_db($con,"electric billing system");

    if($_POST["input"] == "code"){
        

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

    elseif($_POST["input"] == "type"){

        if(!$connection)
                echo "Connection to database failed! Please try again";
        else{
                $codes=array();
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
    }

    elseif($_POST["input"] == "id"){
        if(!$connection)
                echo "Connection to database failed! Please try again";
        else{
                //$codes=array();
                $sql = "SELECT * from colony_master WHERE Colony_name= '".($_POST["name"]). "'";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            //array_push($codes,$row["Qtr_type"]);
                            //echo $row["Colony_code"];
                            $code=$row["Colony_code"];
                            //make the uniqe qtr_id
                            //$qtr_id="'".($code)."00000"
                            $sql = "SELECT * from quarter_entry_master WHERE Qtr_No= '".($_POST["number"]). "'";
                            $result = $con->query($sql);
                            if($result->num_rows > 0){
                                echo "This Quarter number already exists, try a different one.";
                            }
                            else{
                                $stmt = $con->prepare("INSERT INTO quarter_master_entry(Qtr_No, Qtr_type, Colony_code) 
                                                       VALUES (?, ?, ?)".';');
                                $stmt->bind_param("sss", $_POST["number"], $_POST["type"], $code);
                                if( $stmt->execute())
                                    echo "Colony details have been inserted. Your colony code is ".$code;
                                else
                                    echo "Something went wrong. Please  try again.";
                                $stmt->close();
                            }
                        }
                        //echo json_encode($codes);
                }
                else
                    echo "No colony information found in table!! Please try a different colony name.";
        }
    }
}
?>