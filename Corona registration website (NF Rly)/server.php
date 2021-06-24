<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
session_start();
$otp = rand(100000, 999999);
if(isset($_POST["action"])){
  if($_POST["action"] == "get_otp"){
      $fields = array(
      "variables_values" => $otp,
      "route" => "otp",
      "numbers" => $_POST["mobile_number"],
    );

    $_SESSION["OTP"]=$otp;
    $timestamp =  $_SERVER["REQUEST_TIME"]; 
    $_SESSION['time'] = $timestamp;

    $curl = curl_init();

    curl_setopt_array($curl, array(
          CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_SSL_VERIFYHOST => 0,
          CURLOPT_SSL_VERIFYPEER => 0,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_POSTFIELDS => json_encode($fields),
          CURLOPT_HTTPHEADER => array(
                "authorization: gEGmMFC9IUqbxfnolWAvjDYrhk1TP82SyticpszK65RuOHNXVLsuLg3pMWlJZED9cCndN8z4eohmwt0F",
                "accept: */*",
                "cache-control: no-cache",
                "content-type: application/json"
          ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        echo $response;
    }
  }
  else if($_POST["action"] == "verify_otp"){
    $timestamp =  $_SERVER["REQUEST_TIME"];  
    if(($timestamp - $_SESSION['time']) <= 180){  //3 minutes timelimit for OTP
        if($_POST["otp"]==$_SESSION["OTP"]){
            $fields = array(
                  "message" => "Your OTP is verified. Please revert back to the website to proceed further.",
                  "language" => "english",
                  "route" => "q",
                  "numbers" => $_POST["mobile_number"],
                );
  
            $curl = curl_init();
  
            curl_setopt_array($curl, array(
                  CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2",
                  CURLOPT_RETURNTRANSFER => true,
                  CURLOPT_ENCODING => "",
                  CURLOPT_MAXREDIRS => 10,
                  CURLOPT_TIMEOUT => 30,
                  CURLOPT_SSL_VERIFYHOST => 0,
                  CURLOPT_SSL_VERIFYPEER => 0,
                  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                  CURLOPT_CUSTOMREQUEST => "POST",
                  CURLOPT_POSTFIELDS => json_encode($fields),
                  CURLOPT_HTTPHEADER => array(
                        "authorization: gEGmMFC9IUqbxfnolWAvjDYrhk1TP82SyticpszK65RuOHNXVLsuLg3pMWlJZED9cCndN8z4eohmwt0F",
                        "accept: */*",
                        "cache-control: no-cache",
                        "content-type: application/json"
                  ),
            ));
  
            $response = curl_exec($curl);
            $err = curl_error($curl);
  
            curl_close($curl);
  
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
            }
        }
        else{
          $response = "OTP  invalid";
          echo $response; 
        }
      }
      else{
        $response = "Your OTP has expired. Please reload the page and try again";
        echo $response;
      }
  }
  else{
    $server="localhost";
    $username="root";
    $pass="";

    $con=mysqli_connect($server,$username,$pass);
    $connection=mysqli_select_db($con,"patient information");

    if(!$connection)
        echo "Connection to database failed! Please try again";
    else{
        if(isset($_POST["action"])){
            $username=$_POST["uname"];
            $password=$_POST["pass"];
            $sql = "SELECT * FROM `staff` WHERE `Password`=".$password;
            $result = $con->query($sql);
            if ($result->num_rows > 0) {
              while($row = $result->fetch_assoc()) {
                  if($row["Username"]==$username){
                    echo '<script type="text/javascript">
                    location.href = "registration.html"
                    </script>';
                  }
              }  
            }
            else{
              echo $result->num_rows;
            } 
            }
        }

    $con->close();
  }
}
?>