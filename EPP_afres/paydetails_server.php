<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

    require "require_this.php";

    $con=mysqli_connect($server,$username,$pass);
    $connection=mysqli_select_db($con,$database);

    if(isset($_POST["value"])){
        if(!$connection)
            echo "Connection to database failed! Please try again";
        else{
            $sql="SELECT * FROM `emp_pp` WHERE `EMPNO`='".$_POST["value"]."' OR `EMPNAME` LIKE '%".$_POST["value"]."%' GROUP BY `YEARMM` ORDER BY `YEARMM`";
            $result = $con->query($sql);
            if ($result->num_rows > 0) {
                $final=array();
                while($row = $result->fetch_assoc()) {
                    $temp=array();

                    $date=$row["YEARMM"];
                    $bill=$row["BU"];
                    $empno=$row["EMPNO"];
                    $empname=$row["EMPNAME"];
                    $designation=$row["DESIGNATION"];
                    $basic=$row["BASIC"];
                    $da=$row["DA"];
                    $gp=$row["GP"];
                    $sda=$row["SDA"];
                    $hra=$row["HRA"];
                    $trans=$row["TRANS"];
                    $arbasic=$row["ARRBASIC"];
                    $arda=$row["ARRDA"];
                    $arrdatr=$row["ARR_DA_TR"];
                    $arrgp=$row["ARRGP"];
                    $arrsda=$row["ARRSDA"];
                    $leave_encash=$row["LEAVE_ENCASH"];
                    $oppay=$row["OP_PAY"];
                    $opda=$row["OP_DA"];
                    $vpf=$row["VPF"];
                    $pf=$row["PF"];
                    $aptax=$row["APTAX"];
                    $itax=$row["ITAX"];
                    $ecess=$row["ECESS"];
                    $day=$row["DAY"];
                    $plb=$row["PLB"];
                    if(!preg_match("/[a-z]/i", $date)){
                        $arr=str_split($date);
                        $s=$arr[4].$arr[5];
                        switch($s){
                            case "01":
                                $date="Jan ".$arr[0].$arr[1].$arr[2].$arr[3];
                                break;
                            case "02":
                                $date="Feb ".$arr[0].$arr[1].$arr[2].$arr[3];
                                break;
                            case "03":
                                $date="Mar ".$arr[0].$arr[1].$arr[2].$arr[3];
                                break;
                            case "04":
                                $date="Apr ".$arr[0].$arr[1].$arr[2].$arr[3];
                                break;
                            case "05":
                                $date="May ".$arr[0].$arr[1].$arr[2].$arr[3];
                                break;
                            case "06":
                                $date="Jun ".$arr[0].$arr[1].$arr[2].$arr[3];
                                break;
                            case "07":
                                $date="Jul ".$arr[0].$arr[1].$arr[2].$arr[3];
                                break;
                            case "08":
                                $date="Aug ".$arr[0].$arr[1].$arr[2].$arr[3];
                                break;
                            case "09":
                                $date="Sep ".$arr[0].$arr[1].$arr[2].$arr[3];
                                break;
                            case "10":
                                $date="Oct ".$arr[0].$arr[1].$arr[2].$arr[3];
                                break;
                            case "11":
                                $date="Nov ".$arr[0].$arr[1].$arr[2].$arr[3];
                                break;
                            case "12":
                                $date="Dec ".$arr[0].$arr[1].$arr[2].$arr[3];
                                break;
                            default:
                                $date=NULL;
                                break;
                        }
                    }

                    array_push($temp,$date,$bill,$empno,$empname,$designation,$basic,$da,$gp,$sda,$hra,$trans,$arbasic,$arda,$arrdatr,$arrgp,$arrsda,$leave_encash,$oppay,$opda,$vpf,$pf,
                    $aptax,$itax,$ecess,$day,$plb);
                    array_push($final,$temp);
                }
                if(count($final)>0)
                    echo json_encode($final);
                else
                    echo "Something went wrong.";
            }
            else
                echo "Employee doesn't exist in database.";
        }
    }
?>