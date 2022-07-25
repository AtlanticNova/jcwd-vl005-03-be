-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: warehouse
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(64) NOT NULL,
  `description` varchar(255) NOT NULL,
  `basePrice` int NOT NULL,
  `price` int NOT NULL,
  `cost` int NOT NULL,
  `stock` int NOT NULL,
  `idCategory` int NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Warm Hoodie','Harga diskonn asasf asfamsf asfmnasf asfnanf jkjwberwer jbkjbr aerbkawebr aerjbakjwbr',345000,500000,25000,7,1,'http://localhost:5000/products/image-1656294204218.jpg'),(2,'Eco Smart Hoodies','commodo auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec',299000,495000,25000,29,1,'http://localhost:5000/products/image-1656595714478.jpg'),(3,'Anime Hoodie','eu, euismod ac, fermentum vel, mauris. Integer sem elit, pharetra ut, pharetra sed, hendrerit a,',305000,516000,25000,24,1,'http://localhost:5000/products/image-1657803869874.jpg'),(4,'Fleece Hoodie','id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia',315000,889000,25000,71,1,'http://localhost:5000/products/image-1658762753489.jpg'),(6,'Polo T-shirt','at fringilla purus mauris a nunc. In at pede. Cras vulputate velit eu sem. Pellentesque',195000,325000,25000,85,2,'http://localhost:5000/products/image-1658762901553.jpg'),(7,'Long Sleeve T-shirt','nunc ac mattis ornare, lectus ante dictum mi, ac mattis velit justo nec ante. Maecenas',189000,285000,25000,36,2,'http://localhost:5000/products/image-1658762812810.jpg'),(8,'Under Armour T-shirt','eros nec tellus. Nunc lectus pede, ultrices a, auctor non, feugiat nec, diam. Duis mi',165000,250000,25000,90,2,'http://localhost:5000/products/image-1658762933420.jpg'),(9,'Nauticon Bomber Jacket','neque tellus, imperdiet non, vestibulum nec, euismod in, dolor. Fusce feugiat. Lorem ipsum dolor',245000,829000,25000,85,6,'http://localhost:5000/products/image-1658762882910.jpg'),(10,'Freshood Bomber Jacket','odio. Phasellus at augue id ante dictum cursus. Nunc mauris elit, dictum eu, eleifend',325000,780000,25000,36,6,'http://localhost:5000/products/image-1658762786859.jpg'),(11,'Sandbank Bomber Jacket','ultrices. Duis volutpat nunc sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo',289000,459000,25000,90,6,'http://localhost:5000/products/image-1658762918626.jpg'),(12,'B2 Bomber Jacket','nec, cursus a, enim. Suspendisse aliquet, sem ut cursus luctus, ipsum leo elementum sem,',315000,689000,25000,23,6,'http://localhost:5000/products/image-1656595136933.jpg'),(13,'Magnifit Bomber Jacket','lorem ut aliquam iaculis, lacus pede sagittis augue, eu tempor erat neque non quam.',295000,535000,25000,12,6,'http://localhost:5000/products/image-1658762832354.jpg'),(18,'Flannel Hoodie','The DESC command is used to sort the data returned in descending order.\n\nThe following SQL statement selects all the columns from the \"Customers\" table, sorted descending by the \"CustomerName\" column.',205000,450000,25000,4,1,'http://localhost:5000/products/image-1656595690009.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-26  0:21:33
