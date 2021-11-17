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
                $ciphering = "AES-128-CTR";
                $iv_length = openssl_cipher_iv_length($ciphering);
                $options = 0;
                $encryption_iv = '1234567891011121';
                $encryption_key = "itcmlg#123";
                $encryption = openssl_encrypt($_POST["password"], $ciphering,$encryption_key, $options, $encryption_iv);
                $sql="SELECT * FROM `electric database users` WHERE `User name/no`='".$_POST["username"]."' AND `Password`='".$encryption."'";
                $result = $con->query($sql);
                if ($result->num_rows == 1) {
                    while($row = $result->fetch_assoc()) {
                        $type=$row["User type"];
                    }
                    echo $type;
                }
                else
                    echo $con->error();
            }
        }
        elseif($_POST["input"] == "fetch"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{ 
                $final=array();
                $decryption_iv = '1234567891011121';
                $options = 0;
                $decryption_key = "itcmlg#123";
                $ciphering = "AES-128-CTR";
                $sql="SELECT * FROM `electric database users`";
                $result = $con->query($sql);
                if ($result->num_rows > 0){
                    while($row = $result->fetch_assoc()) {
                        $temp=array();
                        $decryption=openssl_decrypt ($row["Password"], $ciphering, $decryption_key, $options, $decryption_iv);
                        array_push($temp,$row["User name/no"],$decryption,$row["User type"]);
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
                    $ciphering = "AES-128-CTR";
                    $iv_length = openssl_cipher_iv_length($ciphering);
                    $options = 0;
                    $encryption_iv = '1234567891011121';
                    $encryption_key = "itcmlg#123";
                    $encryption = openssl_encrypt($pass, $ciphering,$encryption_key, $options, $encryption_iv);
                    //$decryption=openssl_decrypt ($encryption, $ciphering, $encryption_key, $options, $encryption_iv);
                    $sql="SELECT * FROM `electric database users` WHERE `User name/no`='".$no."' OR `Password`='".$encryption."'";
                    $result = $con->query($sql);
                    if ($result->num_rows > 0){
                        $stmt = $con->prepare("UPDATE `electric database users` SET `User name/no`=?,`Password`=?,`User type`=? WHERE `User name/no`='".$no."' OR `Password`='".$encryption."'");
                        $stmt->bind_param("sss",$no,$encryption,$type);
                        if($stmt->execute()){
                            echo "Updated ".$no."'s record"."\n";
                        }
                        else
                            echo $con->error;
                    }
                    else{
                        $stmt = $con->prepare("INSERT INTO `electric database users`(`User name/no`,`Password`,`User type`) 
                                                            VALUES (?, ?, ?)");
                        $stmt->bind_param("sss", $no, $encryption, $type);
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