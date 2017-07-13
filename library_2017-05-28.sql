# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 10.0.17-MariaDB)
# Database: library
# Generation Time: 2017-05-28 13:47:36 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table appointment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `appointment`;

CREATE TABLE `appointment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户id',
  `bid` int(11) NOT NULL COMMENT '书id',
  `time` datetime NOT NULL COMMENT '预约的时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table book
# ------------------------------------------------------------

DROP TABLE IF EXISTS `book`;

CREATE TABLE `book` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT '' COMMENT '书名',
  `author` varchar(20) DEFAULT NULL COMMENT '作者',
  `type` varchar(20) DEFAULT NULL COMMENT '类别',
  `introduction` text COMMENT '简介',
  `number` char(20) DEFAULT NULL COMMENT '索书号',
  `rest` int(2) NOT NULL DEFAULT '0' COMMENT '剩余量',
  `collection` int(10) NOT NULL DEFAULT '0' COMMENT '收藏数',
  `comment` int(10) NOT NULL DEFAULT '0' COMMENT '评论数',
  `score` float NOT NULL DEFAULT '0' COMMENT '评分',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table borrow
# ------------------------------------------------------------

DROP TABLE IF EXISTS `borrow`;

CREATE TABLE `borrow` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `bid` int(11) DEFAULT NULL COMMENT '书id',
  `uid` int(11) DEFAULT NULL COMMENT '用户id',
  `btime` date NOT NULL COMMENT '借书时间',
  `rtime` date NOT NULL COMMENT '应还时间',
  `status` int(2) DEFAULT NULL COMMENT '状态：0未还，1已还',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table collection
# ------------------------------------------------------------

DROP TABLE IF EXISTS `collection`;

CREATE TABLE `collection` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户id',
  `bid` int(11) NOT NULL COMMENT '书id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(20) NOT NULL COMMENT '用户id',
  `bid` int(20) NOT NULL COMMENT '书id',
  `content` text COMMENT '评论内容',
  `score` float NOT NULL DEFAULT '0' COMMENT '评分',
  `time` datetime NOT NULL COMMENT '评论时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table message
# ------------------------------------------------------------

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sid` int(11) NOT NULL COMMENT '发送者id',
  `rid` int(11) NOT NULL COMMENT '接受者id',
  `stime` datetime NOT NULL COMMENT '发送的时间',
  `content` text NOT NULL COMMENT '消息内容',
  `isread` int(2) NOT NULL DEFAULT '0' COMMENT '是否已读',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL COMMENT '用户名',
  `wxname` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
