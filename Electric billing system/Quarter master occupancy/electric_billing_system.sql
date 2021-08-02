-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2021 at 05:10 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `electric billing system`
--

-- --------------------------------------------------------

--
-- Table structure for table `colony_master`
--

CREATE TABLE `colony_master` (
  `Colony_code` varchar(7) NOT NULL,
  `Colony_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `colony_master`
--

INSERT INTO `colony_master` (`Colony_code`, `Colony_name`) VALUES
('0500001', 'EAST COLONY'),
('0500002', 'DALKI COLONY'),
('0500003', 'LOCO COLONY'),
('0500004', 'STATION COLONY'),
('0500005', 'AGT COLONY'),
('0500006', 'NEW COLONY'),
('0500007', '26TH COLONY'),
('0500008', 'AMBARI'),
('0500009', 'ELECTRIC COLONY'),
('0500010', 'UZANBAZAR COLONY'),
('0500011', 'KALIBARI/ GHY MODEL COLONY'),
('0500012', 'TRAFFIC COLONY'),
('0500013', 'KUKURMUTHA COLONY'),
('0500014', 'BHARALUMUKH '),
('0500015', 'WEST NAMBARI'),
('0500016', 'SARADA COLONY'),
('0500017', 'NVP COMPLEX/RPF COLONY'),
('0500018', 'NAMBARI  '),
('0500019', 'GOSALA'),
('0500020', 'B.G. COLONY'),
('0500021', 'STATION COLONY'),
('0500022', 'ADARSHA COLONY'),
('0500023', 'TEACHERS COLONY'),
('0500024', 'WEST GOTANAGAR'),
('0500025', 'NGC'),
('0500026', 'NNGE'),
('0500027', 'SATGAON'),
('0500028', 'SHILLONG/ SMITH  HILL'),
('0500029', 'WEST MALIGAON'),
('0500030', 'EAST MALIGAON'),
('0500031', 'CENTRAL GOTANAGAR'),
('0500032', 'EAST GOTANAGAR'),
('0500033', 'NEW COLONY'),
('0500034', 'INSTITUTE COLONY'),
('0500035', '3RD FG COLONY'),
('0500036', '4TH FG COLONY'),
('0500037', '5TH FG COLONY'),
('0500038', '6TH FG COLONY'),
('0500039', 'TRIANGULAR COLONY'),
('0500040', 'LOCO COLONY'),
('0500041', 'SAKUNTALA COLONY'),
('0500042', 'NEW ADABARI COLONY'),
('0500043', 'MODEL COLONY'),
('0500044', 'ADABARI COLONY'),
('0500045', 'BBC COLONY'),
('0500046', 'SHUTTLEGATE COLONY'),
('0500047', 'RESTCAMP COLONY'),
('0500048', 'ACCOUTS COLONY'),
('0500049', 'HATATH COLONY'),
('0500050', 'HARIJAN COLONY'),
('0500051', 'TEMPLE GHAT COLONY'),
('0500052', 'WATER WORKS COLONY'),
('0500053', 'KAMAKHYA COLONY'),
('0500054', 'STATION COLONY');

-- --------------------------------------------------------

--
-- Table structure for table `employee_master`
--

CREATE TABLE `employee_master` (
  `EmpNo` varchar(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Designation` varchar(50) NOT NULL,
  `BillUnit` varchar(7) NOT NULL,
  `Station` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_master`
--

INSERT INTO `employee_master` (`EmpNo`, `Name`, `Designation`, `BillUnit`, `Station`) VALUES
('12401108232', 'DWIPEN KALITA', 'AA', '0519002', 'GHY'),
('12401911600', 'KAMALESWAR BORO', 'Sr.TECH(ELECT)\r\n', '0519278', 'MLGN'),
('12401930000', 'RAJESH MINJ', 'AA', '0519002', 'GHY'),
('12401931635', 'SMT RAMA PAUL', 'KHALASI HELPER\r\n', '0519278', 'GHY'),
('12401939968', 'MANESWAR HAJONG', 'TECH-III(ELECT)\r\n', '0519278', 'GHY'),
('12401945440', 'SHRI PRANAB DAS', 'KHALASI', '0519278', 'GHY'),
('12404197690', 'BIMALENDU SHOME', 'AA', '0519002', 'GHY'),
('12404202170', 'SHRI SAMIR DEY', 'Sr. SO Acc', '0519002', 'GHY'),
('12405529189', 'PRANAB MALAKAR', 'Sr.TECH(FITTER)\r\n', '0519278', 'GHY'),
('12406500304', 'BINA PANI DEVI', 'AA', '0519002', 'GHY'),
('124NP000029', 'CHITTARANJAN  BORA', 'TECH-II(ELECT)\r\n', '0519278', 'GHY'),
('124NP000306', 'MUSTAQUE AL MAMOON', 'AA', '0519002', 'GHY'),
('124NP000451', 'ARUN KR MAHTO', 'HELPER', '0519278', 'GHY'),
('124NP000470', 'SHINMILA KHAYI', 'TECH-II(ELECT)\r\n', '0519278', 'GHY'),
('124NP000473', 'PIU ROY CHOWDHURY', 'TECH-II(ELECT)', '0519278', 'GHY');

-- --------------------------------------------------------

--
-- Table structure for table `quarter_master`
--

CREATE TABLE `quarter_master` (
  `Qtr_ID` varchar(16) NOT NULL,
  `Qtr_No` varchar(10) NOT NULL,
  `Qtr_type` varchar(5) NOT NULL,
  `Colony_code` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quarter_master`
--

INSERT INTO `quarter_master` (`Qtr_ID`, `Qtr_No`, `Qtr_type`, `Colony_code`) VALUES
('0', 'DS/84/C', 'III', '0500047'),
('1', '226/A', 'II', '0500018'),
('2', 'DS/55/I', 'I', '0500047'),
('3', '179/B', 'II', '0500019'),
('4', '106/B', 'II', '0500031'),
('5', 'DS/313A', 'I', '0500031'),
('6', 'DS/160/C', 'I', '0500022'),
('7', '25/B', 'II', '0500022'),
('8', '84/E', 'I', '0500033'),
('9', 'S&C/72/B', 'II', '0500045');

-- --------------------------------------------------------

--
-- Table structure for table `quarter_master_entry`
--

CREATE TABLE `quarter_master_entry` (
  `Sl_No` int(11) NOT NULL,
  `Qtr_ID` varchar(16) NOT NULL,
  `Qtr_No` varchar(20) NOT NULL,
  `Qtr_type` varchar(20) NOT NULL,
  `Colony_code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quarter_master_entry`
--

INSERT INTO `quarter_master_entry` (`Sl_No`, `Qtr_ID`, `Qtr_No`, `Qtr_type`, `Colony_code`) VALUES
(1, '0500031010000001', 'QMB/2', 'I', '0500031'),
(4, '0500013030000004', 'TYU/7', 'III', '0500013'),
(5, '0500042010000005', 'XCV/5', 'I', '0500042'),
(6, '0500001010000006', 'BVM/3', 'I', '0500001'),
(7, '0500018020000007', 'ULO/6', 'II', '0500018'),
(8, '0500005030000008', 'ABC/12', 'III', '0500005');

-- --------------------------------------------------------

--
-- Table structure for table `quarter_occupancy`
--

CREATE TABLE `quarter_occupancy` (
  `Sl_No` int(11) NOT NULL,
  `EmpNo` varchar(11) NOT NULL,
  `Qtr_ID` varchar(16) NOT NULL,
  `Occupation Date` varchar(10) DEFAULT NULL,
  `Vacation Date` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quarter_occupancy`
--

INSERT INTO `quarter_occupancy` (`Sl_No`, `EmpNo`, `Qtr_ID`, `Occupation Date`, `Vacation Date`) VALUES
(1, '12401945440', '0500001010000006', '14/08/2021', '31/08/2025'),
(2, '12401945440', '0500001010000006', '09/08/2021', '10/09/2021'),
(3, '124NP000470', '0500013030000004', '04/09/2021', '31/07/2021'),
(4, '12404197690', '0500001010000006', '04/08/2021', '04/07/2022'),
(5, '12401945440', '0500018020000007', '27/06/2021', '28/06/2021'),
(6, '124NP000473', '0500013030000004', '27/07/2019', '27/09/2020'),
(7, '12404197690', '0500001010000006', '25/07/2019', '23/06/2020'),
(8, '12401911600', '0500001010000006', '23/06/2019', '23/07/2019'),
(9, '12404202170', '0500001010000006', '05/06/2020', '07/06/2020'),
(10, '12401945440', '0500013030000004', '30/07/2021', '01/08/2021'),
(11, '124NP000470', '0500013030000004', '23/06/2018', '24/06/2018'),
(12, '12406500304', '0500005030000008', '02/08/2021', '03/08/2021'),
(13, '12401945440', '0500001010000006', '01/01/0001', '02/02/0002'),
(14, '12401945440', '0500042010000005', '03/08/2021', '04/08/2021');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `colony_master`
--
ALTER TABLE `colony_master`
  ADD PRIMARY KEY (`Colony_code`);

--
-- Indexes for table `employee_master`
--
ALTER TABLE `employee_master`
  ADD PRIMARY KEY (`EmpNo`);

--
-- Indexes for table `quarter_master`
--
ALTER TABLE `quarter_master`
  ADD UNIQUE KEY `Qtr_ID` (`Qtr_ID`),
  ADD KEY `Colony_code` (`Colony_code`);

--
-- Indexes for table `quarter_master_entry`
--
ALTER TABLE `quarter_master_entry`
  ADD PRIMARY KEY (`Sl_No`);

--
-- Indexes for table `quarter_occupancy`
--
ALTER TABLE `quarter_occupancy`
  ADD PRIMARY KEY (`Sl_No`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quarter_master_entry`
--
ALTER TABLE `quarter_master_entry`
  MODIFY `Sl_No` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `quarter_occupancy`
--
ALTER TABLE `quarter_occupancy`
  MODIFY `Sl_No` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `quarter_master`
--
ALTER TABLE `quarter_master`
  ADD CONSTRAINT `quarter_master_ibfk_1` FOREIGN KEY (`Colony_code`) REFERENCES `colony_master` (`Colony_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
