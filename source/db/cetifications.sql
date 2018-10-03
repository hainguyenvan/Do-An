-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Oct 03, 2018 at 05:19 PM
-- Server version: 5.7.21
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cetifications`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `date_of_birth` varchar(15) NOT NULL,
  `sex` int(11) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `position` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `sign` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `dsc` varchar(100) NOT NULL,
  `time_create` bigint(20) DEFAULT NULL,
  `time_update` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `name`, `email`, `code`, `date_of_birth`, `sex`, `phone`, `address`, `position`, `img`, `sign`, `password`, `status`, `dsc`, `time_create`, `time_update`) VALUES
(1, 'Hai Nguyen Van', 'hai213k57@gmail.com', 'hainv123', '1994-09-08', 0, '0967135492', 'Dong Anh-Ha Noi', 'Admin', 'http://localhost:3002/file_1538552727004_2 (1).jpg', '0x0123456789', '1234', 0, 'Admin', NULL, 1538559351919),
(2, 'Vinh Nguyen Duc', 'vinh@gmail.com', 'vinh123', '2018-10-03', 0, '0967135492', 'Ha Noi', 'Admin', 'http://localhost:3002/file_1538552727004_2 (1).jpg', '6f7afe1c4543084bc3fc413c3c7fea5218e2374834672d20ceb1323c1124cd2bd5aff1d936440b0824c4730b8ade6d96cd1b9bb0f04e73f5b80bcee3fcb618a9', '1234', 0, 'Test', 1538552135683, 1538552135683),
(3, 'Nguyen Mau Thoai', 'thoai@gmail.com', 'thoai123', '2018-10-03', 0, '0967135498', 'Hung Yen', 'Tearcher', 'http://localhost:3002/file_1538552727004_2 (1).jpg', '5ad82f956caeeaf515fc5b40c7a572cde55d8e10263e7565ba4d130557b18ad73661a6b89f6f898e8b17b752e7734a98a27ad578000d85af77edf738ecdcf627', '1234', -1, 'Test 12333', 1538552727049, 1538580752386);

-- --------------------------------------------------------

--
-- Table structure for table `cetificate_category`
--

CREATE TABLE `cetificate_category` (
  `ID` int(11) NOT NULL,
  `dsc` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `time_create` bigint(20) NOT NULL,
  `time_update` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cetificate_category`
--

INSERT INTO `cetificate_category` (`ID`, `dsc`, `status`, `time_create`, `time_update`) VALUES
(1, 'Bằng Tốt Nghiệp', 0, 1538586765996, 1538586814308),
(2, 'Bằng TOEIC', 0, 1538586842700, 1538587014816),
(3, 'Bằng Tin Học B', 0, 1538587029811, 1538587029811);

-- --------------------------------------------------------

--
-- Table structure for table `cetificate_list`
--

CREATE TABLE `cetificate_list` (
  `ID` int(11) NOT NULL,
  `code` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `date_of_birth` varchar(12) NOT NULL,
  `year_of_graduation` int(11) NOT NULL,
  `degree_classification` varchar(12) NOT NULL,
  `mode_of_study` varchar(12) NOT NULL,
  `author` varchar(100) NOT NULL,
  `create_by` varchar(12) NOT NULL,
  `update_by` varchar(12) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `time_create` bigint(20) NOT NULL,
  `time_update` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `id` int(11) NOT NULL,
  `dsc` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `time_create` bigint(20) DEFAULT NULL,
  `time_update` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`id`, `dsc`, `status`, `time_create`, `time_update`) VALUES
(1, 'Admin', 0, NULL, NULL),
(2, 'Tearcher', 0, 1538579928453, 1538580337484);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cetificate_category`
--
ALTER TABLE `cetificate_category`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `cetificate_list`
--
ALTER TABLE `cetificate_list`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cetificate_category`
--
ALTER TABLE `cetificate_category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cetificate_list`
--
ALTER TABLE `cetificate_list`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
