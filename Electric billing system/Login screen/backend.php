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

    function random_strings($length_of_string)
    {
        /* String of all alphanumeric character */
        $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
 
        /* Shufle the $str_result and returns substring */
        /* of specified length */
        return substr(str_shuffle($str_result),  
                       0, $length_of_string);
    }

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
                    $sq="SELECT * FROM `employee_master` WHERE `Name` LIKE'%".$no."%' OR `EmpNo`='".$no."'";
                    $res = $con->query($sq);
                    if ($res->num_rows > 0){
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
                            $code=random_strings(8);
                            $encrypt = openssl_encrypt($code, $ciphering,$encryption_key, $options, $encryption_iv);
                            $stmt = $con->prepare("INSERT INTO `electric database users`(`User name/no`,`Password`,`User type`,`Recovery_code`) 
                                                            VALUES (?, ?, ?, ?)");
                            $stmt->bind_param("ssss", $no, $encryption, $type,$encrypt);
                            if( $stmt->execute()){
                                //echo "Inserted ".$no."'s record"."\n";
                                //intimate the code to the USER ONLY
                                $str=array();
                                while($row = $res->fetch_assoc()){
                                    array_push($str,substr($row["EmpNo"],7),substr($row["BillUnit"],4));
                                    break;
                                }
                                $password=join("",$str);                             
                                echo $password."-".$code;
                            }
                            else
                                echo $con->error;
                        }
                    }
                    else
                        echo "The User name/no should be similar to the employee name or equal to the employee number";
                }
            }
        }
        elseif($_POST["input"] == "reset_eligibility"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{ 
                $ciphering = "AES-128-CTR";
                $iv_length = openssl_cipher_iv_length($ciphering);
                $options = 0;
                $encryption_iv = '1234567891011121';
                $encryption_key = "itcmlg#123";
                $encryption = openssl_encrypt($_POST["recovery"], $ciphering,$encryption_key, $options, $encryption_iv);
                $sql="SELECT * FROM `electric database users` WHERE `Recovery_code`='".$encryption."' AND `User name/no`='".$_POST["user"]."'";
                $result = $con->query($sql);
                if ($result->num_rows > 0){
                    echo "Found";
                }
                else
                    echo "Not found";
            }
        }
        elseif($_POST["input"] == "update_password"){
            if(!$connection)
                echo "Connection to database failed! Please try again";
            else{ 
                $ciphering = "AES-128-CTR";
                $iv_length = openssl_cipher_iv_length($ciphering);
                $options = 0;
                $encryption_iv = '1234567891011121';
                $encryption_key = "itcmlg#123";
                $encryption = openssl_encrypt($_POST["recovery"], $ciphering,$encryption_key, $options, $encryption_iv);
                $sql="SELECT * FROM `electric database users` WHERE `Recovery_code`='".$encryption."' AND `User name/no`='".$_POST["user"]."'";
                $result = $con->query($sql);
                if ($result->num_rows > 0){
                    $encryption1 = openssl_encrypt($_POST["pass"], $ciphering,$encryption_key, $options, $encryption_iv);
                    $stmt = $con->prepare("UPDATE `electric database users` SET `Password`=?,`User name/no`=? WHERE `User name/no`='".$_POST["user"]."' AND `Recovery_code`='".$encryption."'");
                    $stmt->bind_param("ss",$encryption1,$_POST["user"]);
                    if($stmt->execute()){
                        echo "Updated password/username successfully";
                    }
                    else
                        echo $con->error;
                }
            }
        }
}
    $con->close();
?>