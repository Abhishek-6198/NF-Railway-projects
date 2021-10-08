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
        if($_POST["input"] == "sign in"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{
                $sql="SELECT * FROM `electric database users` WHERE `User name/no`='".$_POST["username"]."' AND `Password`='".$_POST["password"]."' AND `User type`='".$_POST["type"]."'";
                $result = $con->query($sql);
                if ($result->num_rows == 1) {
                    echo TRUE;
                }
                else
                    echo FALSE;
            }
        }
        elseif($_POST["input"] == "fetch"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{ 
                $final=array();
                $sql="SELECT * FROM `electric database users`";
                $result = $con->query($sql);
                if ($result->num_rows > 0){
                    while($row = $result->fetch_assoc()) {
                        $temp=array();
                        array_push($temp,$row["User name/no"],$row["Password"],$row["User type"]);
                        array_push($final,$temp);
                    }
                }
                if(count($final)!=0)
                    echo json_encode($final);
            }
        }
        elseif($_POST["input"] == "update_records"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{ 
                $data = json_decode(stripslashes($_POST['data']));
                foreach($data as $d){
                    $data1 = json_decode(stripslashes(json_encode($d)));
                    $no=$data1[0];
                    $pass=$data1[1];
                    $type=$data1[2];

                    $sql="SELECT * FROM `electric database users` WHERE `User name/no`='".$no."' OR `Password`='".$pass."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0){
                        $stmt = $con->prepare("UPDATE `electric database users` SET `User name/no`=?,`Password`=?,`User type`=? WHERE `User name/no`='".$no."' OR `Password`='".$pass."'");
                        $stmt->bind_param("sss",$no,$pass,$type);
                        if($stmt->execute()){
                            echo "Updated ".$no."'s record"."\n";
                        }
                        else
                            echo $con->error;
                    }
                    else{
                        $stmt = $con->prepare("INSERT INTO `electric database users`(`User name/no`,`Password`,`User type`) 
                                                            VALUES (?, ?, ?)");
                        $stmt->bind_param("sss", $no, $pass, $type);
                        if( $stmt->execute()){
                            echo "Inserted ".$no."'s record"."\n";
                        }
                        else
                            echo $con->error;
                    }
                }
            }
        }
    }
    $con->close();
?>