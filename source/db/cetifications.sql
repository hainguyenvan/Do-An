-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Oct 18, 2018 at 02:00 AM
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
(1, 'Hai Nguyen Van', 'hai213k57@gmail.com', 'GV001', '1994-09-08', 0, '0967135492', 'Dong Anh-Ha Noi', 'Admin', 'http://localhost:3002/file_1538552727004_2 (1).jpg', '0x0000000000112121212121212', '1234', 0, 'Admin', 1538559351919, 1538559351919),
(2, 'Vinh Nguyen Duc', 'vinh@gmail.com', 'vinh123', '2018-10-03', 0, '0967135492', 'Ha Noi', 'Admin', 'http://localhost:3002/file_1538552727004_2 (1).jpg', '6f7afe1c4543084bc3fc413c3c7fea5218e2374834672d20ceb1323c1124cd2bd5aff1d936440b0824c4730b8ade6d96cd1b9bb0f04e73f5b80bcee3fcb618a9', '1234', 0, 'Test', 1538552135683, 1539509452001),
(3, 'Nguyen Mau Thoai', 'thoai@gmail.com', 'thoai123', '2018-10-03', 0, '0967135498', 'Hung Yen', 'Tearcher', 'http://localhost:3002/file_1538552727004_2 (1).jpg', '5ad82f956caeeaf515fc5b40c7a572cde55d8e10263e7565ba4d130557b18ad73661a6b89f6f898e8b17b752e7734a98a27ad578000d85af77edf738ecdcf627', '1234', 0, 'Test 12333', 1538552727049, 1538754805631),
(6, 'Nguyen Van Anh', 'anh@gmail.com', '0010', '1994-08-10', 0, '0967344444', 'Hà Nội', 'Admin', 'http://localhost:3002/file_1539790089041_Romeo-Montague-1968-romeo-montague-1968-26656721-1152-1008.jpg', '316dabc2e771f49658178e226ba32b19d426d5b525b95d32f07c864f71c8e0aad7a903c9b65e7a7c97181a71efd8e6e25498be683a24fe75294cebef7b4c1b00', '1234', 0, 'Giảng viên mới', 1539790089098, 1539790089098);

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
(1, 'Bằng Tốt Nghiệp', 0, 1538586765996, 1538754262319),
(2, 'Bằng TOEIC', 0, 1538586842700, 1538587014816),
(3, 'Bằng Tin Học B', 0, 1538587029811, 1538587029811);

-- --------------------------------------------------------

--
-- Table structure for table `cetificate_list`
--

CREATE TABLE `cetificate_list` (
  `id` int(11) NOT NULL,
  `code` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `student_id` int(20) NOT NULL,
  `year_of_graduation` int(11) NOT NULL,
  `degree_classification` varchar(12) NOT NULL,
  `mode_of_study` varchar(12) NOT NULL,
  `author` varchar(100) NOT NULL,
  `create_by` int(12) NOT NULL,
  `update_by` int(12) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `time_create` bigint(20) NOT NULL,
  `time_update` bigint(20) NOT NULL,
  `date` varchar(12) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cetificate_list`
--

INSERT INTO `cetificate_list` (`id`, `code`, `title`, `student_id`, `year_of_graduation`, `degree_classification`, `mode_of_study`, `author`, `create_by`, `update_by`, `status`, `time_create`, `time_update`, `date`, `category_id`) VALUES
(6, '2018240227', 'Bang ToT Nghiep', 8, 2018, 'Gioi', 'Chinh Quy', 'Le Minh Son', 1, 1, 1, 1539767804780, 1539771628859, '2018-10-18', 1);

-- --------------------------------------------------------

--
-- Table structure for table `class_room`
--

CREATE TABLE `class_room` (
  `id` int(11) NOT NULL,
  `code` varchar(12) NOT NULL,
  `dsc` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `time_create` bigint(20) DEFAULT NULL,
  `time_update` bigint(20) DEFAULT NULL,
  `class_room_sign` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `class_room`
--

INSERT INTO `class_room` (`id`, `code`, `dsc`, `status`, `time_create`, `time_update`, `class_room_sign`) VALUES
(1, '001', 'TOEIC', 0, 1539684187749, 1539701706523, '2018334961'),
(2, '002', 'CNTT 2.03', 0, 1539748052674, 1539748052674, '2018350852');

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
(1, 'Admin', 0, 1538664990151, 1538754533343),
(2, 'Tearcher', 0, 1538579928453, 1539787906910),
(3, 'Test101', -1, 1539790586494, 1539790586494);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(12) NOT NULL,
  `number_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `sex` int(5) NOT NULL,
  `date_of_birth` varchar(12) NOT NULL,
  `address` varchar(255) NOT NULL,
  `time_update` bigint(20) DEFAULT NULL,
  `time_create` bigint(20) DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL,
  `update_by` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `img` varchar(255) DEFAULT NULL,
  `student_sign` varchar(10) NOT NULL,
  `hash_name` text,
  `hash_date_of_birth` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `code`, `number_id`, `email`, `phone`, `sex`, `date_of_birth`, `address`, `time_update`, `time_create`, `create_by`, `update_by`, `status`, `img`, `student_sign`, `hash_name`, `hash_date_of_birth`) VALUES
(7, 'Nguyen Van Hai', '001', '000121212121', 'hai213k57@gmail.com', '0967135492', 0, '2018-10-18', 'Dong Anh, Ha Noi', 1539790632646, 1539767761658, 1, 1, 0, 'http://localhost:3002/file_1539790632618_Romeo-Montague-1968-romeo-montague-1968-26656721-1152-1008.jpg', '2018412426', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'),
(8, 'Nguyen Van B', '002', '09009009', 'vana@gmail.com', '0967135492', 0, '2018-10-18', 'Ha Noi', 1539790642654, 1539769229307, 1, 1, 0, 'http://localhost:3002/file_1539790642636_Romeo-Montague-1968-romeo-montague-1968-26656721-1152-1008.jpg', '2018210062', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');

-- --------------------------------------------------------

--
-- Table structure for table `student_class_room`
--

CREATE TABLE `student_class_room` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `class_room_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student_class_room`
--

INSERT INTO `student_class_room` (`id`, `student_id`, `class_room_id`, `status`) VALUES
(9, 7, 2, 0),
(10, 8, 1, 0);

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_room`
--
ALTER TABLE `class_room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_class_room`
--
ALTER TABLE `student_class_room`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cetificate_category`
--
ALTER TABLE `cetificate_category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cetificate_list`
--
ALTER TABLE `cetificate_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `class_room`
--
ALTER TABLE `class_room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `student_class_room`
--
ALTER TABLE `student_class_room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
