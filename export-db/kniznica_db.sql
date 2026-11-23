-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: kniznica_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `kniznica_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `kniznica_db` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_slovak_ci */;

USE `kniznica_db`;

--
-- Table structure for table `knihy`
--

DROP TABLE IF EXISTS `knihy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knihy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` varchar(150) NOT NULL,
  `autor` varchar(120) NOT NULL,
  `rok` int(11) NOT NULL,
  `cena` decimal(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_slovak_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knihy`
--

LOCK TABLES `knihy` WRITE;
/*!40000 ALTER TABLE `knihy` DISABLE KEYS */;
INSERT INTO `knihy` VALUES (11,'Jánošík','Janko Kral',1890,15.00),(12,'Antifona','Sofokles',2,25.00),(13,'Odyseus','Homer',-500,25.00),(14,'Harry Pottr','J. K. Rowling',1990,10.00);
/*!40000 ALTER TABLE `knihy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pouzivatelia`
--

DROP TABLE IF EXISTS `pouzivatelia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pouzivatelia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meno` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `heslo_hash` varchar(255) NOT NULL,
  `vytvoreny` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_slovak_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pouzivatelia`
--

LOCK TABLES `pouzivatelia` WRITE;
/*!40000 ALTER TABLE `pouzivatelia` DISABLE KEYS */;
INSERT INTO `pouzivatelia` VALUES (1,'hraneck','hrk@gmail.com','$2b$10$Qukx9h5.EFPW4qdYGTJke.LV/m8soSpdHNH1EhcnlInix6VcSpCxu','2026-11-23 10:02:40'),(2,'drew taylor','taylor@gmail.com','$2b$10$UfhjKqAMZJgMMjDj0yNAUe/5nv0z.DqPoy1LOJ7PjGBQNiOjSrzRi','2026-11-23 10:11:37');
/*!40000 ALTER TABLE `pouzivatelia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'kniznica_db'
--

--
-- Dumping routines for database 'kniznica_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-23 13:27:43
