CREATE DATABASE  IF NOT EXISTS `acadrev2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `acadrev2`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: acadrev2
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `authorities`
--

DROP TABLE IF EXISTS `authorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authorities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `description` text,
  `logo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authorities`
--

LOCK TABLES `authorities` WRITE;
/*!40000 ALTER TABLE `authorities` DISABLE KEYS */;
INSERT INTO `authorities` VALUES (2,'Palestine HEA','contact@psauth.org','https://www.psauth.org','Official authority for PS institutions','/logos/psauth.png','2025-05-15 21:38:00');
/*!40000 ALTER TABLE `authorities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colleges`
--

DROP TABLE IF EXISTS `colleges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colleges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `address` text,
  `logo` varchar(255) DEFAULT NULL,
  `head_name` varchar(255) DEFAULT NULL,
  `university_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_college_name_per_university` (`name`,`university_id`),
  KEY `university_id` (`university_id`),
  CONSTRAINT `colleges_ibfk_1` FOREIGN KEY (`university_id`) REFERENCES `universities` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colleges`
--

LOCK TABLES `colleges` WRITE;
/*!40000 ALTER TABLE `colleges` DISABLE KEYS */;
INSERT INTO `colleges` VALUES (1,'College of Arts','arts@birzeit.edu','https://www.birzeit.edu/en/faculties/arts','Birzeit, West Bank, Palestine','/logos/birzeit-arts.png','Dr. Ahmad Natsheh',2,'2025-05-15 22:33:00'),(2,'College of Engineering and Technology','eng@birzeit.edu','https://www.birzeit.edu/en/faculties/engineering','Birzeit, West Bank, Palestine','/logos/birzeit-eng.png','Dr. Samah Abu Awwad',2,'2025-05-15 22:33:00'),(3,'College of Law and Public Administration','law@birzeit.edu','https://www.birzeit.edu/en/faculties/law','Birzeit, West Bank, Palestine','/logos/birzeit-law.png','Dr. Reem Al-Botmeh',2,'2025-05-15 22:33:00'),(4,'College of Medicine and Health Sciences','medicine@najah.edu','https://www.najah.edu/en/academic/colleges/medicine','Nablus, West Bank, Palestine','/logos/najah-med.png','Dr. Khalil Issa',3,'2025-05-15 22:33:00'),(5,'College of Engineering and Information Technology','eng@najah.edu','https://www.najah.edu/en/academic/colleges/engineering','Nablus, West Bank, Palestine','/logos/najah-eng.png','Dr. Mohammad Naser',3,'2025-05-15 22:33:00'),(6,'College of Humanities','humanities@najah.edu','https://www.najah.edu/en/academic/colleges/humanities','Nablus, West Bank, Palestine','/logos/najah-hum.png','Dr. Fatima Darwish',3,'2025-05-15 22:33:00'),(7,'College of Medicine','medicine@alquds.edu','https://www.alquds.edu/en/faculties/medicine','Abu Dis, Jerusalem, Palestine','/logos/alquds-med.png','Dr. Hani Abdeen',4,'2025-05-15 22:33:00'),(8,'College of Arts','arts@alquds.edu','https://www.alquds.edu/en/faculties/arts','Abu Dis, Jerusalem, Palestine','/logos/alquds-arts.png','Dr. Ayman Yousef',4,'2025-05-15 22:33:00'),(9,'College of Science and Technology','science@alquds.edu','https://www.alquds.edu/en/faculties/science','Abu Dis, Jerusalem, Palestine','/logos/alquds-sci.png','Dr. Mona Khader',4,'2025-05-15 22:33:00'),(10,'College of Agriculture','agri@hebron.edu','https://www.hebron.edu/en/faculties/agriculture','Hebron, West Bank, Palestine','/logos/hebron-agri.png','Dr. Nael Salman',5,'2025-05-15 22:33:00'),(11,'College of Arts','arts@hebron.edu','https://www.hebron.edu/en/faculties/arts','Hebron, West Bank, Palestine','/logos/hebron-arts.png','Dr. Ibrahim Abu Jafar',5,'2025-05-15 22:33:00'),(12,'College of Sharia','sharia@hebron.edu','https://www.hebron.edu/en/faculties/sharia','Hebron, West Bank, Palestine','/logos/hebron-sharia.png','Dr. Mohammad Al-Hasan',5,'2025-05-15 22:33:00'),(13,'College of Engineering','eng@ppu.edu','https://www.ppu.edu/en/faculties/engineering','Hebron, West Bank, Palestine','/logos/ppu-eng.png','Dr. Ali Jaber',6,'2025-05-15 22:33:00'),(14,'College of Information Technology','it@ppu.edu','https://www.ppu.edu/en/faculties/it','Hebron, West Bank, Palestine','/logos/ppu-it.png','Dr. Samer Arandi',6,'2025-05-15 22:33:00'),(15,'College of Applied Sciences','science@ppu.edu','https://www.ppu.edu/en/faculties/science','Hebron, West Bank, Palestine','/logos/ppu-sci.png','Dr. Amjad Barham',6,'2025-05-15 22:33:00'),(16,'Faculty of Arts','arts@bethlehem.edu','https://www.bethlehem.edu/academics/arts','Bethlehem, West Bank, Palestine','/logos/bethlehem-arts.png','Dr. Jamil Khader',7,'2025-05-15 22:33:00'),(17,'Faculty of Nursing and Health Sciences','nursing@bethlehem.edu','https://www.bethlehem.edu/academics/nursing','Bethlehem, West Bank, Palestine','/logos/bethlehem-nursing.png','Dr. Mariam Awad',7,'2025-05-15 22:33:00'),(18,'Faculty of Business Administration','business@bethlehem.edu','https://www.bethlehem.edu/academics/business','Bethlehem, West Bank, Palestine','/logos/bethlehem-business.png','Dr. Fadi Kattan',7,'2025-05-15 22:33:00'),(20,'Ameer College','ameryasen45@gmail.com','','','https://drive.google.com/file/d/1N_oo6JZB8KZEOoSlKpW_E9ghCMZgIUIW/view?usp=drive_link','ameer yasen 7',17,'2025-05-20 23:16:31');
/*!40000 ALTER TABLE `colleges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `address` text,
  `logo` varchar(255) DEFAULT NULL,
  `head_name` varchar(255) DEFAULT NULL,
  `college_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `college_id` (`college_id`),
  CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Department of Fine Arts','finearts@birzeit.edu',NULL,NULL,NULL,'Dr. Laila Khaled',1,'2025-05-15 22:33:00'),(2,'Department of Music','music@birzeit.edu',NULL,NULL,NULL,'Dr. Rami Odeh',1,'2025-05-15 22:33:00'),(3,'Department of Literature','literature@birzeit.edu',NULL,NULL,NULL,'Dr. Sana Daraghmeh',1,'2025-05-15 22:33:00'),(4,'Department of Civil Engineering','civileng@birzeit.edu',NULL,NULL,NULL,'Dr. Khaled Jaber',2,'2025-05-15 22:33:00'),(5,'Department of Mechanical Engineering','mecheng@birzeit.edu',NULL,NULL,NULL,'Dr. Nidal Shweiki',2,'2025-05-15 22:33:00'),(6,'Department of Electrical Engineering','eleceng@birzeit.edu',NULL,NULL,NULL,'Dr. Hisham Darwish',2,'2025-05-15 22:33:00'),(7,'Department of Public Law','publiclaw@birzeit.edu',NULL,NULL,NULL,'Dr. Wael Abu Shanab',3,'2025-05-15 22:33:00'),(8,'Department of International Law','intlaw@birzeit.edu',NULL,NULL,NULL,'Dr. Nour Hamdan',3,'2025-05-15 22:33:00'),(9,'Department of Public Administration','pubadmin@birzeit.edu',NULL,NULL,NULL,'Dr. Fadi Qawasmi',3,'2025-05-15 22:33:00'),(10,'Department of General Medicine','genmed@najah.edu',NULL,NULL,NULL,'Dr. Rania Amr',4,'2025-05-15 22:33:00'),(11,'Department of Surgery','surgery@najah.edu',NULL,NULL,NULL,'Dr. Tamer Salah',4,'2025-05-15 22:33:00'),(12,'Department of Public Health','pubhealth@najah.edu',NULL,NULL,NULL,'Dr. Aseel Mansour',4,'2025-05-15 22:33:00'),(13,'Department of Computer Engineering','compeng@najah.edu',NULL,NULL,NULL,'Dr. Basel Hamed',5,'2025-05-15 22:33:00'),(14,'Department of Software Engineering','softeng@najah.edu',NULL,NULL,NULL,'Dr. Anas Toma',5,'2025-05-15 22:33:00'),(15,'Department of Network Systems','networks@najah.edu',NULL,NULL,NULL,'Dr. Saed Tarapiah',5,'2025-05-15 22:33:00'),(16,'Department of History','history@najah.edu',NULL,NULL,NULL,'Dr. Maher Zayed',6,'2025-05-15 22:33:00'),(17,'Department of Philosophy','philosophy@najah.edu',NULL,NULL,NULL,'Dr. Rula Halawani',6,'2025-05-15 22:33:00'),(18,'Department of Sociology','sociology@najah.edu',NULL,NULL,NULL,'Dr. Khaled Amayreh',6,'2025-05-15 22:33:00'),(19,'Department of Clinical Medicine','clinmed@alquds.edu',NULL,NULL,NULL,'Dr. Imad Dweikat',7,'2025-05-15 22:33:00'),(20,'Department of Biomedical Sciences','biomed@alquds.edu',NULL,NULL,NULL,'Dr. Suhair Ereqat',7,'2025-05-15 22:33:00'),(21,'Department of Medical Research','medresearch@alquds.edu',NULL,NULL,NULL,'Dr. Ziad Abdeen',7,'2025-05-15 22:33:00'),(22,'Department of Visual Arts','visualarts@alquds.edu',NULL,NULL,NULL,'Dr. Samira Salameh',8,'2025-05-15 22:33:00'),(23,'Department of Performing Arts','performingarts@alquds.edu',NULL,NULL,NULL,'Dr. Nabil Al-Khatib',8,'2025-05-15 22:33:00'),(24,'Department of Cultural Studies','culturalstudies@alquds.edu',NULL,NULL,NULL,'Dr. Aida Nassar',8,'2025-05-15 22:33:00'),(25,'Department of Physics','physics@alquds.edu',NULL,NULL,NULL,'Dr. Mohammad Sabri',9,'2025-05-15 22:33:00'),(26,'Department of Chemistry','chemistry@alquds.edu',NULL,NULL,NULL,'Dr. Hala Jarrar',9,'2025-05-15 22:33:00'),(27,'Department of Biology','biology@alquds.edu',NULL,NULL,NULL,'Dr. Fuad Hashwa',9,'2025-05-15 22:33:00'),(28,'Department of Agronomy','agronomy@hebron.edu',NULL,NULL,NULL,'Dr. Yasser Haddad',10,'2025-05-15 22:33:00'),(29,'Department of Horticulture','horticulture@hebron.edu',NULL,NULL,NULL,'Dr. Rezq Basheer',10,'2025-05-15 22:33:00'),(30,'Department of Animal Science','animalscience@hebron.edu',NULL,NULL,NULL,'Dr. Adnan Shqueir',10,'2025-05-15 22:33:00'),(31,'Department of Arabic Studies','arabic@hebron.edu',NULL,NULL,NULL,'Dr. Issam Halayqa',11,'2025-05-15 22:33:00'),(32,'Department of English Literature','englishlit@hebron.edu',NULL,NULL,NULL,'Dr. Ahmad Atawneh',11,'2025-05-15 22:33:00'),(33,'Department of History and Archaeology','historyarch@hebron.edu',NULL,NULL,NULL,'Dr. Jehad Abu Salim',11,'2025-05-15 22:33:00'),(34,'Department of Islamic Studies','islamicstudies@hebron.edu',NULL,NULL,NULL,'Dr. Saber Al-Kilani',12,'2025-05-15 22:33:00'),(35,'Department of Sharia Law','sharialaw@hebron.edu',NULL,NULL,NULL,'Dr. Wael Al-Zard',12,'2025-05-15 22:33:00'),(36,'Department of Comparative Religion','comparativereligion@hebron.edu',NULL,NULL,NULL,'Dr. Munir Fakhouri',12,'2025-05-15 22:33:00'),(37,'Department of Industrial Engineering','indeng@ppu.edu',NULL,NULL,NULL,'Dr. Tamer Haddad',13,'2025-05-15 22:33:00'),(38,'Department of Chemical Engineering','chemeng@ppu.edu',NULL,NULL,NULL,'Dr. Maher Al-Jabari',13,'2025-05-15 22:33:00'),(39,'Department of Structural Engineering','structeng@ppu.edu',NULL,NULL,NULL,'Dr. Muath Abu Sadah',13,'2025-05-15 22:33:00'),(40,'Department of Cybersecurity','cybersecurity@ppu.edu',NULL,NULL,NULL,'Dr. Mohammed Awad',14,'2025-05-15 22:33:00'),(41,'Department of Data Science','datascience@ppu.edu',NULL,NULL,NULL,'Dr. Iyad Tumar',14,'2025-05-15 22:33:00'),(42,'Department of Artificial Intelligence','ai@ppu.edu',NULL,NULL,NULL,'Dr. Labib Arafeh',14,'2025-05-15 22:33:00'),(43,'Department of Applied Physics','appliedphysics@ppu.edu',NULL,NULL,NULL,'Dr. Wael Abu Arafeh',15,'2025-05-15 22:33:00'),(44,'Department of Environmental Science','envscience@ppu.edu',NULL,NULL,NULL,'Dr. Issam A. Al-Khatib',15,'2025-05-15 22:33:00'),(45,'Department of Mathematics','mathematics@ppu.edu',NULL,NULL,NULL,'Dr. Jihad Asad',15,'2025-05-15 22:33:00'),(46,'Department of Creative Writing','creativewriting@bethlehem.edu',NULL,NULL,NULL,'Dr. Hanadi Ibrahim',16,'2025-05-15 22:33:00'),(47,'Department of Modern Languages','modernlanguages@bethlehem.edu',NULL,NULL,NULL,'Dr. Michel Hanania',16,'2025-05-15 22:33:00'),(48,'Department of Anthropology','anthropology@bethlehem.edu',NULL,NULL,NULL,'Dr. Rana Sobh',16,'2025-05-15 22:33:00'),(49,'Department of Pediatric Nursing','pediatricnursing@bethlehem.edu',NULL,NULL,NULL,'Dr. Muna Abu Ramadan',17,'2025-05-15 22:33:00'),(50,'Department of Community Health','communityhealth@bethlehem.edu',NULL,NULL,NULL,'Dr. Rania Abu Seir',17,'2025-05-15 22:33:00'),(51,'Department of Mental Health Nursing','mentalhealthnursing@bethlehem.edu',NULL,NULL,NULL,'Dr. Hala Yamani',17,'2025-05-15 22:33:00'),(52,'Department of Finance','finance@bethlehem.edu',NULL,NULL,NULL,'Dr. Simon Awad',18,'2025-05-15 22:33:00'),(53,'Department of Marketing','marketing@bethlehem.edu',NULL,NULL,NULL,'Dr. Grace Khoury',18,'2025-05-15 22:33:00'),(54,'Department of Management','management@bethlehem.edu',NULL,NULL,NULL,'Dr. Nabil Abu Hantash',18,'2025-05-15 22:33:00'),(56,'Ameer Depratment',NULL,NULL,NULL,NULL,'Ameer Yasen',20,'2025-05-29 23:16:29');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domains`
--

DROP TABLE IF EXISTS `domains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domains` (
  `id` int NOT NULL,
  `domain_ar` varchar(200) DEFAULT NULL,
  `domain_en` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domains`
--

LOCK TABLES `domains` WRITE;
/*!40000 ALTER TABLE `domains` DISABLE KEYS */;
INSERT INTO `domains` VALUES (1,'أهداف البرنامج ومخرجات التعلم',NULL),(2,'المنهاج الدراسي',NULL),(3,'التعليم والتعلم',NULL),(4,'أعضاء هيئة التدريس',NULL),(5,'المكتبة ومصادر التعلم',NULL),(6,'تقدم الطلبة وتقويم أدائهم',NULL),(7,'المرافق والخدمات المساندة',NULL),(8,'إدارة البرنامج الأكاديمي',NULL),(9,'البحث العلمي والتواصل الخارجي',NULL),(10,'إدارة الجودة وتحسينها',NULL);
/*!40000 ALTER TABLE `domains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dom_id` int DEFAULT NULL,
  `area_id` int DEFAULT NULL,
  `response_id` int DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `descripe` text,
  `location` varchar(500) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (2,NULL,NULL,5,'My Document.pdf',NULL,'uploads\\evidence\\1750351131080-My_Document.pdf','application/pdf','2025-06-19 16:38:51'),(3,NULL,NULL,5,'5504.pdf',NULL,'uploads\\evidence\\1750377061155-5504.pdf','application/pdf','2025-06-19 23:51:01'),(4,NULL,NULL,7,'My Document.pdf',NULL,'uploads\\evidence\\1750378517476-My_Document.pdf','application/pdf','2025-06-20 00:15:17'),(5,NULL,NULL,7,'11197.pdf',NULL,'uploads\\evidence\\1750380033325-11197.pdf','application/pdf','2025-06-20 00:40:33');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indicators`
--

DROP TABLE IF EXISTS `indicators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `indicators` (
  `id` int NOT NULL,
  `domain` int DEFAULT NULL,
  `text` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indicators`
--

LOCK TABLES `indicators` WRITE;
/*!40000 ALTER TABLE `indicators` DISABLE KEYS */;
INSERT INTO `indicators` VALUES (1,1,'يتوفر في  البرنامج الأكاديمي أهداف واضحة ومحددة.'),(2,1,'تم ترجمة رسالة  البرنامج الأكاديمي إلى أهداف إجرائية قابلة للقياس.'),(3,1,'شارك أعضاء هيئة التدريس والطلبة في وضع رسالة  البرنامج الأكاديمي.'),(4,1,'تستند رسالة  البرنامج الأكاديمي إلى أهداف الكلية ورسالتها في عملية التخطيط واتخاذ القرار.'),(5,1,'أهداف  البرنامج الأكاديمي ومخرجات التعلم  قابلة للقياس.'),(6,1,'رسالة  البرنامج الأكاديمي وأهدافه ومخرجات تعلمه مصادق عليها من مجلس الكلية.'),(7,1,'رسالة  البرنامج الأكاديمي وأهدافه ومخرجات تعلمه منشورة ومعلنة ومعروفة للمجتمع، وأعضاء هيئة التدريس، والإداريين، والطلبة.'),(8,1,'تتضمن أهداف  البرنامج الأكاديمي مخرجات التعلم المتوقعة من الخريجين.'),(9,1,'تركز أهداف  البرنامج الأكاديمي  ومخرجات التعلم على إتاحة فرص الدراسة والتخصص والتعمق في ميدان المعرفة.'),(10,1,'تركز أهداف  البرنامج الأكاديمي ومخرجات التعلم  على تشجيع البحث العلمي والاستقلال الفكري وتنمية روح العمل الجماعي.'),(11,1,'تتضمن أهداف  البرنامج الأكاديمي ومخرجات التعلم التعرف على التكنولوجيا المتقدمة وتنمية القدرا ت على استيعابها واستخدامها في مجال التخصص.'),(12,1,'تعنى أهداف  البرنامج الأكاديمي ومخرجات التعلم بالربط بين التعليم الأكاديمي وقطاعات العمل المختلفة.'),(13,1,'تركز أهداف  البرنامج الأكاديمي ومخرجات التعلم على إدخال أساليب حديثة في نظام التعلم التي تزيد من قدرة الطالب على الإبداع والابتكار.'),(14,2,'يتواءم المنهاج الدراسي ومقرراته مع الفلسفة العامة للمؤسسة التعليمية، وتحقق رسالتها وأهدافها، وحاجات الطلبة والمجتمع.'),(15,2,'يقوم القسم بالتعريف الكامل بمكونات كل برنامج دراسي من حيث  النظام المتبع      ( فصلي، سنوي، ساعات معتمدة).'),(16,2,'يتأكد القسم من وضوح الأدوار والمسؤوليات المختلفة للأجهزة المشاركة في تصميم برامجه ومراجعتها (مجلس القسم، واللجان، وغيرها ).'),(17,2,'يهتم القسم بمدى ملاءمة البرامج الأكاديمية لاحتياجات المجتمع، وسوق العمل، ومتطلبات التنمية المعرفية.'),(18,2,'يتاكد القسم من أن مخرجات تعلم البرنامج الأكاديمي متوافقة مع المعايير المحلية والعالمية في التعليم العالي من خلال تقويم المخرجات التعليمية والبرامج الأكاديمية والمقررات الدراسية والشهادات. '),(19,2,'يراعى في تصميم البرنامج الأكاديمي ملاحظات وآراء المتخصصين والممارسين والمستفيدين.'),(20,2,'يتم مراجعة التخصصات والبرامج الأكاديمية التي نفذها القسم بصورة دورية.'),(21,2,'يوجد في القسم نظام معتمد لتقويم نتائج التدريب الميداني للطلبة.'),(22,2,'يكلف القسم الطلبة بإعداد مشروع تخرج في نهاية المرحلة الجامعية.'),(23,2,'يمتلك القسم ملفات متكاملة عن كل مقرر من المقررات الدراسية يتضمن بيانات مفصلة عنه.'),(24,2,'يتوفر في القسم حقيبة وثائقية عن المقررات الدراسية لآخر فصلين دراسيين تتضمن (توصيف المقرر، نسخة من واجبات الطلبة، التمارين، المشروعات، الاختبارات، توزيع الدرجات، وغيرها).'),(25,2,'يوفر القسم المناهج الدراسية المتطورة التي تواكب تطورات العصر وتتأكد من جودتها والتحسين المستمر لها.'),(26,2,'يقارن القسم ما يدرس في كل مقرر دراسي بنظيره في المؤسسات التعليمية المتميزة.'),(27,2,'يضع القسم قائمة بأسماء الكتب المعتمدة كمصادر لكل مقرر دراسي.'),(28,2,'يحقق المنهاج الدراسي ومحتوياته المهارات المطلوبة لسوق العمل.'),(29,2,'تحقق المناهج الدراسية المقررة مهارات تنمية التفكير العلمي والتعلم الذاتي.'),(30,2,'يراعي  المنهاج الدراسي المبادىء الأساسية والنظريات والاتجاهات والمدارس الفكرية في مجال التخصص.'),(31,2,'يراعي  المنهاج الدراسي المعارف العلمية العميقة الخصبة في تدريس الموضوعات الأساسية في التخصص.'),(32,2,'يراعي  المنهاج الدراسي القدرة على استخدام المفاهيم والمصطلحات والمحتوى استخداماً سليماً.'),(33,2,'يراعي  المنهاج الدراسي الخبرة في توظيف المعارف والمهارات التي اكتسبها الطالب خلال الدراسة في المجال الوظيفي أو إكمال دراسته العليا.'),(34,2,'يراعي  المنهاج الدراسي التطورات والاتجاهات الحديثة والقضايا المعاصرة المرتبطة في مجال التخصص.'),(35,2,'يراعي  المنهاج الدراسي الربط  بين معرفته الأكاديمية ذات العلاقة بالتخصص وبين المجالات المعرفية الأخرى.'),(36,3,'توجد خطة موثقة  ومعلنة لاستراتيجية التعليم والتعلم تحقق رسالتها وأهدافها.'),(37,3,'يتوفر في القسم رؤية واضحة بمستوى المعلومات والمعارف المطلوب توفيرها بما يتحقق مع رسالته ورؤيته المستقبلية.'),(38,3,'توجد آلية لمراجعة استراتيجية التعليم والتعلم في ضوء نتائج الامتحانات ونتائج استطلاع أراء الطلبة وأعضاء هيئة التدريس.'),(39,3,'يتم تحديث وتنويع الأجهزة والأدوات بما يتماشى مع متطلبات كل مجال معرفي.'),(40,3,'يتأكد القسم من أن الأساليب التعليمية المستخدمة ترتبط بأهداف البرنامج الأكاديمي، وبالمحتوى التعليمي والنتائج التعليمية المستهدفة.'),(41,3,'تستخدم أساليب التعليم المتنوعة كالمحاضرة، والمناقشة، والعصف الذهني، وكتابة المشاريع، وغيرها.'),(42,3,'تشمل المقررات الدراسية  مجالات معينة لتنمية التعلم الذاتي.'),(43,3,'توجد إجراءات معتمدة من مجلس القسم بخصوص الكتاب الجامعي المعتمد لكل مقرر دراسي.'),(44,3,'يوفر القسم برامج فعالة للتدريب الميداني للطلاب بناءً على احتياجاتهم الفعلية وما هو مستهدف.'),(45,3,'يستخدم القسم آليات محددة وواضحة لتنفيذ ومتابعة وتقويم برامج التدريب الميداني.'),(46,3,'برامج التدريب الميداني للطلاب متنوعة وتشمل التخصصات المختلفة.'),(47,3,'تستخدم نماذج مناسبة لإجراء عملية تقويم الطلاب أثناء التدريب وبعده. '),(48,3,'يتم التأكد من فاعلية التدريب الميداني في تحقيق نتائج التدريب المستهدفة (استطلاع أراء الطلاب/ تحليل نتائج التقويم).'),(49,3,'يجري القسم أبحاثاً تقويمية عن الأساليب المستخدمة في تعليم الطلبة.'),(50,4,'للقسم رؤية واضحة لحاجاته من أعضاء هيئة التدريس.'),(51,4,'يوفر  القسم العدد الكافي من أعضاء هيئة التدريس المؤهلين لتنفيذ البرامج الأكاديمية والخدمات التربوية.'),(52,4,'يعتمد  القسم معايير واضحة وشفافة لاختيار أعضاء هيئة التدريس.'),(53,4,'توفر برامج التطوير المهني والتعليم المستمر لأعضاء هيئة التدريس فيه.'),(54,4,'ينظم القسم إحصاءات وبيانات لأعضاء هيئة التدريس والهيئة المساعدة موزعة حسب المؤهلات الأكاديمية، والدرجات العلمية، والخبرة، الخ.'),(55,4,'يطبق القسم تعليمات ساعات التدريس المحددة لأعضاء هيئة التدريس وفق درجاتهم العلمية.'),(56,4,'يحدد القسم لكل عضو هيئة تدريس مجموعة من الطلبة لإرشادهم أكاديمياً خلال سنوات الدراسة.'),(57,4,'يتيح القسم الفرصة لمشاركة أعضاء هيئة التدريس في اللجان العلمية الدائمة والموقتة داخل القسم وخارجه.'),(58,5,'يوفر القسم مكتبة، وقاعة إنترنت، وقواعد بيانات إلكترونية، وغيرها.'),(59,5,'يوفر القسم إرشادات لاستخدام الأجهزة المتوفرة في المعامل والورش والمختبرات.'),(60,5,'يوفر القسم التقنيات والأجهزة التعليمية المطلوبة في عملية التدريس ( أجهزة عرض البيانات، وعرض الشفافيات، وعرض الشرائح، والفيديو، وغيرها).'),(61,5,'يتم تخزين المعلومات الخاصة بالطلبة ودرجاتهم في الحاسوب.'),(62,5,'يتوفر في القسم مكتبة أفلام وشفافيات تعليمية.'),(63,5,'توفر المكتبة الوقت اللازم لتقديم المساعدة للمستفيدين منها.'),(64,5,'مدى ملاءمة مقتنيات المكتبة والمقررات الدراسية للبرنامج الأكاديمي.'),(65,5,'يتوفر في المكتبة نظام تصنيف وفق مكتبة الكونغرس أو نظام ديوي العشري.'),(66,5,'تحصل المكتبة على المقتنيات من المراجع والدوريات في مجال التخصص.'),(67,5,'يستخدم الحاسوب في المكتبة لأغراض البحث وإعارة الكتب.'),(68,6,'يعتمد القسم معايير عالية الجودة في انتقاء الطلاب.'),(69,6,'يحرص القسم على قبول أعداد الطلاب وفقاً لخططه المقررة.'),(70,6,'يعتمد القسم اختبارات للطلاب للتأكد من استعداداتهم العلمية والذهنية.'),(71,6,'يطبق القسم تعليمات الجزاءات السلوكية على الطلاب.'),(72,6,'يُحتفظ بملف خاص لكل طالب يحتوي على معلومات عن سلوكه ونشاطه ومستواه الأكاديمي والاجتماعي.'),(73,6,'يوزع القسم أدلة إرشادية على الطلاب الجدد من أجل تعريفهم بالقسم ومرافقه.'),(74,6,'يشارك القسم طلبته في صناعة القرار وحل المشكلات المتعلقة بالقضايا الطلابية والجوانب الأكاديمية.'),(75,6,'يُعرّف القسم أسواق العمل بكفاءات خريجيه ويسعى لتوفير فرص عمل لهم.'),(76,6,'يوفر القسم الإحصاءات عن أعداد الطلاب وتوزيعهم حسب النوع، والمراحل الدراسية، والبرامج الدراسية، والحالة الاجتماعية والاقتصادية، الخ.'),(77,6,'يعتمد القسم برامج اجتماعية وترفيهية هادفة لطلابه.'),(78,6,'يستطلع القسم آراء الطلاب في جودة التعليم والتعلم.'),(79,6,'يستطلع القسم آراء الطلاب في تقويم العملية التدريسية.'),(80,6,'يسعى القسم إلى جذب واختيار الطلاب المتميزين وتشجيعهم على الالتحاق في برامجه الأكاديمية.'),(81,6,'يُقوّم القسم مستوى التحصيل الأكاديمي لطلبته ويعرضها على مجلسه.'),(82,6,'يستطلع القسم آراء جهات التوظيف في نوعية ومستوى الخريجين في جميع التخصصات لتحديد جوانب النقص في المهارات من أجل العمل على معالجتها وتصحيحها.'),(83,6,'يدقق القسم في الخلفية الأكاديمية للطلاب عند التسجيل في  البرنامج الأكاديمي.'),(84,6,'يجري القسم دراسات يستطلع فيها آراء الطلاب بشكل دوري حول الخدمات التكميلية (الأنشطة الرياضية، والسكن الداخلي، والمطاعم، ومواقف السيارات، وغيرها ).'),(85,6,'يهتم القسم بالأنشطة اللامنهجية لتعميق العلاقة بين أعضاء هيئة التدريس والطلاب.'),(86,6,'تتواءم  أساليب تقويم الطلاب مع محتوى المقررات الدراسية المعلنة لهم.'),(87,6,'تقيس الامتحانات المستويات المعرفية المختلفة لدى الطلاب.'),(88,6,'أساليب تقويم الطلاب متنوعة ولا تقتصر على الاختبارات التحريرية.'),(89,6,'أساليب التقويم المتبعة مع الطلاب قادرة على قياس النتائج التعليمية المستهدفة.'),(90,6,'أساليب التقويم المتبعة تتوافق مع محتوى المقررات الدراسية المعلنة للطلاب. '),(91,6,'يتم الاستفادة من تحليل نتائج تقويم الطلاب وملاحظات المراجعين الخارجيين على مستوى البرامج الأكاديمية والمقررات الدراسية في اتخاذ الإجراءات التصحيحية وفى تطوير البرامج والمقررات الدراسية.'),(92,6,'تعلن جداول الامتحانات في مواعيد مناسبة للطلاب.'),(93,6,'تتناسب جداول الامتحانات مع احتياجات الطلاب ورغباتهم. '),(94,6,'تعلن نتائج الامتحانات في المواعيد المناسبة دون تأخير.'),(95,6,'توجد تغذية راجعة للطلاب حول نتائج التقويم.'),(96,6,'يتم مراجعة التغذية الراجعة واتخاذ إجراءات تصحيحية في ضوء نتائج الطلاب.'),(97,6,'توجد آلية معلنة ومطبقة للتعامل مع شكاوى الطلاب من نتائج الامتحانات وتظلماتهم. '),(98,6,'يعتمد القسم أساليب مختلفة للتقويم. '),(99,6,'يستخدم القسم نظام الممتحنيين الخارجيين لتقويم الطلبة.'),(100,6,'تتوافق امتحانات الطلبة مع محتوى المقررات الدراسية.'),(101,7,'أبنية القسم مصممة لذات الغرض المستخدمة لها.'),(102,7,'حجم مباني القسم تتناسب والقدرة الاستيعابية للطلبة.'),(103,7,' يتوفر في القسم القاعات المناسبة للدراسة من حيث المساحة والتهوية والإضاءة وغيرها.'),(104,7,'يوفر القسم المكاتب والأماكن اللائقة لأعضاء هيئة التدريس. '),(105,7,'يوفر القسم مكتبة، وقاعة إنترنت، وقواعد معلومات، وغيرها.'),(106,7,'يوفر القسم شروط الأمن والسلامة في مرافقه كافة.'),(107,7,'يوفر القسم إرشادات لاستخدام الأجهزة المتوفرة في المعامل والورش والمختبرات.'),(108,7,'يوفر القسم الفرصة لأعضاء هيئة التدريس في التدريب على أنواع التقنيات التعليمية المتوافرة في القسم.'),(109,7,'يستخدم القسم التقنيات الحديثة في الأعمال الإدارية والمكتبية.'),(110,7,'يتم تخزين واسترجاع المعلومات الخاصة بالطلبة ودرجاتهم باستخدام قواعد بيانات وأنظمة معلومات مناسبة وحديثة.'),(111,7,'يتوفر في القسم قاعة ندوات وقاعات أخرى حسب طبيعة البرنامج الأكاديمي وحاجاته.'),(112,7,'يتوفر في القسم قاعة اجتماعات.'),(113,7,'يتوفر في القسم استراحة لأعضاء هيئة التدريس.'),(114,8,'تمتلك قيادة  البرنامج الأكاديمي خصائص قيادية تتناسب ومتطلبات الجودة الشاملة للبرنامج الأكاديمي.'),(115,8,'تهتم قيادة  البرنامج الأكاديمي بتوفير الأجواء العلمية الملائمة والعلاقات الإنسانية داخل القسم لإنجاح العملية التعليمية.'),(116,8,'تستخدم قيادة  البرنامج الأكاديمي الموارد البشرية والمادية والتقنية استخداماً أمثل.'),(117,8,'تعمل قيادة  البرنامج الأكاديمي على تلبية احتياجاتها من الاختصاصات العلمية الجديدة.'),(118,8,'تدعم قيادة  البرنامج الأكاديمي آليات النهوض بالبحث العلمي.'),(119,8,'تأخذ قيادة  البرنامج الأكاديمي آراء ومقترحات ممثلي الأطراف المجتمعية في تطوير أداء  البرنامج الأكاديمي.'),(120,8,'تحرص قيادة  البرنامج الأكاديمي على وجود علاقة عمل فاعلة بين الإدارة العليا وأعضاء هيئة التدريس.'),(121,8,'تمارس قيادة  البرنامج الأكاديمي كافة الصلاحيات الممنوحة لها.'),(122,8,'تهتم قيادة  البرنامج الأكاديمي بتعزيز التفاعل مع مؤسسات المجتمع المحلي.'),(123,8,'تهتم قيادة  البرنامج الأكاديمي بآراء ممثلي الطلبة في المجالس المتخصصة.'),(124,8,'تحرص قيادة  البرنامج الأكاديمي على حل المشكلات التي تواجه العمل.'),(125,8,'تحرص قيادة  البرنامج الأكاديمي على الأخذ بآراء ومقترحات العاملين في القسم وبحث شكواهم.'),(126,8,'تعمل قيادة  البرنامج الأكاديمي على متابعة أدائها ميدانياً.'),(127,8,'تشجع قيادة  البرنامج الأكاديمي المبادرات من أجل تحسين الأداء في العمل.'),(128,8,'يوجد لدى قيادة  البرنامج الأكاديمي نظام معلومات يلبي حاجات التخطيط والمتابعة واتخاذ القرارات.'),(129,8,'يمتلك القسم خطط عمل مستقبلية توضح فيها كيفية تحقيق أهدافه.'),(130,8,'تتصف خطط القسم بالمرونة لاستيعاب المستجدات التربوية.'),(131,8,'يتم مراجعة خطط القسم دورياً وتعديلها.'),(132,8,'يحرص القسم على إشراك أعضاء هيئة التدريس والمختصين والجهات المستفيدة من الخريجين في إعداد الخطط السنوية واتخاذ القرارات.'),(133,8,'يقدم القسم خطة شاملة لجميع الفروع والشعب ضمن برنامجه الأكاديمي.'),(134,8,'خطط  البرنامج الأكاديمي قابلة للتحويل إلى مشاريع تطبيقية.'),(135,8,'يوفر القسم نظاماً للتدقيق الداخلي لنتائج الخطط من أجل التحسين المستمر.'),(136,8,'يهيىء القسم الإحصائيات المطلوبة عن أعداد الموظفين، وهيئة التدريس، ومؤهلاتهم، وخبراتهم، وسيرهم الذاتية، وغيرها.'),(137,9,'يعتمد القسم آليات واضحة ومعلنة لمتابعة تنفيذ خطته البحثية.'),(138,9,'تتواءم خطة القسم البحثية وإمكاناته البشرية والمادية المتاحة.'),(139,9,'يوثق القسم خطته البحثية ويعتمدها في مجلس القسم.'),(140,9,'يوفر القسم بيئة مناسبة للبحث العلمي تشجع أعضاء هيئة التدريس على تنفيذ البحوث العلمية المتصلة بحاجات المجتمع وسوق العمل.'),(141,9,'يشجع القسم على إجراء البحوث العلمية المشتركة.'),(142,9,'يتعاون القسم مع المؤسسات العلمية والبحثية في إجراء البحوث المشتركة.'),(143,9,'يستخدم القسم أنشطته في البحث العلمي في معالجة مشكلات المجتمع وتنميته.'),(144,9,'يمنح القسم الأولويات للأبحاث العلمية الميدانية ذات المردود المادي والاقتصادي للمجتمع المحلي ومؤسساته.'),(145,9,'يشجع القسم البحوث المبتكرة التي تفتح الأفاق العلمية أو التطبيقية الجديدة.'),(146,9,'يعتمد القسم وسائل لتحفيز الباحثين ورعايتهم ودعمهم.'),(147,9,'يشجع القسم أعضاء هيئة التدريس للحصول على المنح البحثية داخل البلد وخارجه.'),(148,9,'يشجع القسم أعضاء هيئة التدريس للمشاركة في المؤتمرات والندوات والحلقات الدراسية.'),(149,9,'يساهم القسم من خلال فرق العمل البحثية في خدمة قطاعات الانتاج المختلفة بالمجتمع المحلي.'),(150,9,'يستفيد القسم من نتائج البحث العلمي في تطوير المقررات الدراسية.'),(151,9,'تتوفر في القسم برامج لتنمية المهارات البحثية ( برامج تنمية مهارات منهجية البحث العلمي) لمساعدي البحث.'),(152,9,'يشجع القسم مساعدي البحث والطلبة على المشاركة في المشاريع البحثية.'),(153,9,'يخصص القسم ميزانية مالية خاصة لدعم البحث العلمي ونشره.'),(154,9,'يوفر القسم الأجهزة والأدوات اللازمة للعمليات البحثية ويضع القواعد التي تضمن كفاءة استخدامها.'),(155,9,'يشارك الطلبة في المؤتمرات والندوات العلمية.'),(156,9,'يشارك الطلبة في المشاريع البحثية.'),(157,9,'يسعى القسم إلى ترسيخ علاقة جيدة لطلابه مع مؤسسات المجتمع قبل خروجهم إلى سوق العمل.'),(158,9,'يسعى القسم في إقامة الندوات العلمية والثقافية والتنموية والتدريبية.'),(159,9,'يقدم القسم الاستشارات لمؤسسات المجتمع العام والخاص.'),(160,9,'يحفز القسم أعضاء هيئة التدريس للمساهمة في خدمة المجتمع.'),(161,9,'يحرص القسم على مشاركة أعضاء هيئة التدريس في المؤتمرات والندوات والحلقات النقاشية.'),(162,9,'يجري القسم استطلاع آراء المؤسسات التي يعمل بها خريجو القسم للتعرف على كفاءة الخريجين بصورة دورية.'),(163,9,'يسعى القسم إلى تقديم خدماته المتخصصة لقطاعات المجتمع المختلفة.'),(164,10,'تتوفر في الكلية وحدة لضمان الجودة.'),(165,10,'يتوفر لدى القسم أدلة تخصصية لجودة البرامج الأكاديمية ويطبق بموجبها آليات العمل.'),(166,10,'يجري القسم تقويماً ذاتياً لبرامجه التخصصية وبشكل دوري.'),(167,10,'توجد للقسم علاقة وطيدة مع مؤسسات الاعتماد البرامجية.'),(168,10,'يتوفر لدى القسم نظامٌ للتقويم الذاتي والخارجي.'),(169,10,'تتوفر آليات مفعلة للاستمرار في تحسين العملية التدريسية وتطويرها.'),(170,10,'تتوفر آليات مفعلة لتقويم أداء أعضاء هيئة التدريس.'),(171,10,'تتوفر آليات للتطوير الأكاديمي المستمر لأعضاء هيئة التدريس والكوادر المساندة.'),(172,10,'تتوفر آليات واضحة لقبول الطلاب في التخصص.'),(173,10,'تطبق آليات وإجراءات إدارة الجودة وفاعليتها في تحسين الجودة.'),(174,10,'يوثق القسم كافة بياناته وإجراءاته ذات العلاقة في عملية التقويم والتطوير.'),(175,10,'يستخدم القسم نتائج التقويم والتطوير والتحسين وفق تخطيط زمني محدد.'),(176,10,'خضع  البرنامج الأكاديمي لتقويم الأداء من قبل جهات خارجية.'),(177,10,'يهتم القسم بنتائج تقارير التقويم ويستفيد منها في وضع خطط التحسين والتطوير لكافة مجالات أداء الكلية.'),(178,10,'يوفر القسم الدعم المالي والمعنوي لإجراء الدراسات التقويمية.');
/*!40000 ALTER TABLE `indicators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `language` varchar(100) DEFAULT NULL,
  `dep` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `evaluator_name` varchar(255) DEFAULT NULL,
  `evaluator_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `dep` (`dep`),
  KEY `evaluator_id` (`evaluator_id`),
  CONSTRAINT `programs_ibfk_1` FOREIGN KEY (`dep`) REFERENCES `departments` (`id`) ON DELETE SET NULL,
  CONSTRAINT `programs_ibfk_2` FOREIGN KEY (`evaluator_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
INSERT INTO `programs` VALUES (1,'Crop Production Management','english',28,'2024-01-15 06:00:00','Red',NULL),(2,'Sustainable Agriculture','arabic',28,'2024-01-15 07:00:00','Blue',NULL),(3,'Soil Science and Fertility','english',28,'2024-01-15 08:00:00','Green',NULL),(4,'Livestock Management','english',30,'2024-01-16 06:00:00','Yellow',NULL),(5,'Animal Nutrition','arabic',30,'2024-01-16 07:00:00','Purple',NULL),(6,'Cultural Anthropology','english',48,'2024-01-17 06:00:00','Orange',NULL),(7,'Archaeological Methods','arabic',48,'2024-01-17 07:00:00','Pink',NULL),(8,'Social Evolution Studies','english',48,'2024-01-17 08:00:00','Brown',NULL),(9,'Quantum Mechanics Applications','english',43,'2024-01-18 06:00:00','Silver',NULL),(10,'Laser Technology','arabic',43,'2024-01-18 07:00:00','Gold',NULL),(11,'Classical Arabic Literature','arabic',31,'2024-01-19 06:00:00','Crimson',NULL),(12,'Modern Arabic Poetry','arabic',31,'2024-01-19 07:00:00','Turquoise',NULL),(13,'Arabic Linguistics','english',31,'2024-01-19 08:00:00','Violet',NULL),(14,'Machine Learning Fundamentals','english',42,'2024-01-20 06:00:00','Cyan',NULL),(15,'Neural Network Design','english',42,'2024-01-20 07:00:00','Magenta',NULL),(16,'Cell Biology and Genetics','english',27,'2024-01-21 06:00:00','Lime',NULL),(17,'Ecology and Conservation','arabic',27,'2024-01-21 07:00:00','Navy',NULL),(18,'Molecular Biology','english',27,'2024-01-21 08:00:00','Maroon',NULL),(19,'Medical Diagnostics','english',20,'2024-01-22 06:00:00','Teal',NULL),(20,'Pharmacology Research','arabic',20,'2024-01-22 07:00:00','Coral',NULL),(21,'Process Design and Control','english',38,'2024-01-23 06:00:00','Indigo',NULL),(22,'Petrochemical Engineering','arabic',38,'2024-01-23 07:00:00','Olive',NULL),(23,'Organic Chemistry Advanced','english',26,'2024-01-24 06:00:00','Khaki',NULL),(24,'Analytical Chemistry','arabic',26,'2024-01-24 07:00:00','Plum',NULL),(25,'Physical Chemistry','english',26,'2024-01-24 08:00:00','Salmon',NULL),(26,'Structural Design','english',4,'2024-01-25 06:00:00','Tan',NULL),(27,'Transportation Engineering','arabic',4,'2024-01-25 07:00:00','Beige',NULL),(28,'Internal Medicine Practice','english',19,'2024-01-26 06:00:00','Ivory',NULL),(29,'Emergency Medicine','arabic',19,'2024-01-26 07:00:00','Mint',NULL),(30,'Diagnostic Imaging','english',19,'2024-01-26 08:00:00','Peach',NULL),(31,'Public Health Policy','english',50,'2024-01-27 06:00:00','Rose',NULL),(32,'Community Outreach Programs','arabic',50,'2024-01-27 07:00:00','Azure',NULL),(33,'World Religions Study','english',36,'2024-01-28 06:00:00','Scarlet',NULL),(34,'Religious Philosophy','arabic',36,'2024-01-28 07:00:00','Lavender',NULL),(35,'Digital Systems Design','english',13,'2024-01-29 06:00:00','Amber',NULL),(36,'Computer Architecture','arabic',13,'2024-01-29 07:00:00','Ruby',NULL),(37,'Embedded Systems','english',13,'2024-01-29 08:00:00','Jade',NULL),(38,'Fiction Writing Workshop','english',46,'2024-01-30 06:00:00','Emerald',NULL),(39,'Poetry and Verse','arabic',46,'2024-01-30 07:00:00','Sapphire',NULL),(40,'Middle Eastern Culture','arabic',24,'2024-01-31 06:00:00','Topaz',NULL),(41,'Globalization Studies','english',24,'2024-01-31 07:00:00','Onyx',NULL),(42,'Network Security','english',40,'2024-02-01 06:00:00','Pearl',NULL),(43,'Ethical Hacking','english',40,'2024-02-01 07:00:00','Diamond',NULL),(44,'Big Data Analytics','english',41,'2024-02-02 06:00:00','Steel',NULL),(45,'Statistical Modeling','arabic',41,'2024-02-02 07:00:00','Copper',NULL),(46,'Power Systems','english',6,'2024-02-03 06:00:00','Bronze',NULL),(47,'Control Systems','arabic',6,'2024-02-03 07:00:00','Platinum',NULL),(48,'Electronics Design','english',6,'2024-02-03 08:00:00','Titanium',NULL),(49,'Shakespeare Studies','english',32,'2024-02-04 06:00:00','Mahogany',NULL),(50,'Modern British Literature','english',32,'2024-02-04 07:00:00','Cherry',NULL),(51,'Climate Change Studies','english',44,'2024-02-05 06:00:00','Forest',NULL),(52,'Environmental Monitoring','arabic',44,'2024-02-05 07:00:00','Ocean',NULL),(53,'Investment Analysis','english',52,'2024-02-06 06:00:00','Sunset',NULL),(54,'Islamic Banking','arabic',52,'2024-02-06 07:00:00','Dawn',NULL),(55,'Painting and Drawing','english',1,'2024-02-07 06:00:00','Aqua',NULL),(56,'Sculpture Techniques','arabic',1,'2024-02-07 07:00:00','Fuchsia',NULL),(57,'Art History','english',1,'2024-02-07 08:00:00','Chartreuse',NULL),(58,'Family Medicine','english',10,'2024-02-08 06:00:00','Burgundy',NULL),(59,'Preventive Medicine','arabic',10,'2024-02-08 07:00:00','Wheat',NULL),(60,'Medieval History','english',16,'2024-02-09 06:00:00','Slate',NULL),(61,'Islamic History','arabic',16,'2024-02-09 07:00:00','Sepia',NULL),(62,'Archaeological Excavation','english',33,'2024-02-10 06:00:00','Mustard',NULL),(63,'Ancient Civilizations','arabic',33,'2024-02-10 07:00:00','Periwinkle',NULL),(64,'Garden Design','english',29,'2024-02-11 06:00:00','Lilac',NULL),(65,'Plant Breeding','arabic',29,'2024-02-11 07:00:00','Mauve',NULL),(66,'Operations Research','english',37,'2024-02-12 06:00:00','Celadon',NULL),(67,'Quality Control Systems','arabic',37,'2024-02-12 07:00:00','Vermillion',NULL),(68,'Human Rights Law','english',8,'2024-02-13 06:00:00','Cobalt',NULL),(69,'International Trade Law','arabic',8,'2024-02-13 07:00:00','Ultramarine',NULL),(70,'Quranic Studies','arabic',34,'2024-02-14 06:00:00','Crimson',NULL),(71,'Islamic Jurisprudence','arabic',34,'2024-02-14 07:00:00','Cerulean',NULL),(72,'Islamic Philosophy','english',34,'2024-02-14 08:00:00','Viridian',NULL),(73,'Comparative Literature','english',3,'2024-02-15 06:00:00','Ochre',NULL),(74,'Literary Criticism','arabic',3,'2024-02-15 07:00:00','Umber',NULL),(75,'Strategic Management','english',54,'2024-02-16 06:00:00','Sienna',NULL),(76,'Human Resource Management','arabic',54,'2024-02-16 07:00:00','Bisque',NULL),(77,'Digital Marketing','english',53,'2024-02-17 06:00:00','Taupe',NULL),(78,'Consumer Behavior','arabic',53,'2024-02-17 07:00:00','Vanilla',NULL),(79,'Advanced Calculus','english',45,'2024-02-18 06:00:00','Saffron',NULL),(80,'Number Theory','arabic',45,'2024-02-18 07:00:00','Cinnamon',NULL),(81,'Thermodynamics','english',5,'2024-02-19 06:00:00','Paprika',NULL),(82,'Fluid Mechanics','arabic',5,'2024-02-19 07:00:00','Cardamom',NULL),(83,'Machine Design','english',5,'2024-02-19 08:00:00','Ginger',NULL),(84,'Clinical Trials','english',21,'2024-02-20 06:00:00','Nutmeg',NULL),(85,'Biostatistics','arabic',21,'2024-02-20 07:00:00','Clove',NULL),(86,'Psychiatric Care','english',51,'2024-02-21 06:00:00','Rosemary',NULL),(87,'Community Mental Health','arabic',51,'2024-02-21 07:00:00','Thyme',NULL),(88,'French Language Studies','english',47,'2024-02-22 06:00:00','Sage',NULL),(89,'Spanish Literature','english',47,'2024-02-22 07:00:00','Basil',NULL),(90,'Music Theory','english',2,'2024-02-23 06:00:00','Mint',NULL),(91,'Traditional Arabic Music','arabic',2,'2024-02-23 07:00:00','Parsley',NULL),(92,'Network Administration','english',15,'2024-02-24 06:00:00','Dill',NULL),(93,'Wireless Networks','arabic',15,'2024-02-24 07:00:00','Oregano',NULL),(94,'Child Health Care','english',49,'2024-02-25 06:00:00','Chive',NULL),(95,'Pediatric Emergency Care','arabic',49,'2024-02-25 07:00:00','Fennel',NULL),(96,'Theater Performance','english',23,'2024-02-26 06:00:00','Lavender',NULL),(97,'Dance Studies','arabic',23,'2024-02-26 07:00:00','Chamomile',NULL),(98,'Ethics and Morality','english',17,'2024-02-27 06:00:00','Jasmine',NULL),(99,'Logic and Reasoning','arabic',17,'2024-02-27 07:00:00','Honeysuckle',NULL),(100,'Quantum Physics','english',25,'2024-02-28 06:00:00','Iris',NULL),(101,'Astrophysics','arabic',25,'2024-02-28 07:00:00','Daisy',NULL),(102,'Government Policy','english',9,'2024-03-01 06:00:00','Tulip',NULL),(103,'Public Service Management','arabic',9,'2024-03-01 07:00:00','Daffodil',NULL),(104,'Epidemiology','english',12,'2024-03-02 06:00:00','Lily',NULL),(105,'Health Promotion','arabic',12,'2024-03-02 07:00:00','Sunflower',NULL),(106,'Constitutional Law','english',7,'2024-03-03 06:00:00','Marigold',NULL),(107,'Administrative Law','arabic',7,'2024-03-03 07:00:00','Peony',NULL),(108,'Islamic Legal Theory','arabic',35,'2024-03-04 06:00:00','Hibiscus',NULL),(109,'Comparative Jurisprudence','english',35,'2024-03-04 07:00:00','Orchid',NULL),(110,'Social Research Methods','english',18,'2024-03-05 06:00:00','Carnation',NULL),(111,'Urban Sociology','arabic',18,'2024-03-05 07:00:00','Poppy',NULL),(112,'Software Development','english',14,'2024-03-06 06:00:00','Begonia',NULL),(113,'Database Systems','arabic',14,'2024-03-06 07:00:00','Azalea',NULL),(114,'Building Design','english',39,'2024-03-07 06:00:00','Camellia',NULL),(115,'Seismic Engineering','arabic',39,'2024-03-07 07:00:00','Gardenia',NULL),(116,'General Surgery','english',11,'2024-03-08 06:00:00','Magnolia',NULL),(117,'Minimally Invasive Surgery','arabic',11,'2024-03-08 07:00:00','Wisteria',NULL),(118,'Digital Art Creation','english',22,'2024-03-09 06:00:00','Jasmine',NULL),(119,'Photography Techniques','arabic',22,'2024-03-09 07:00:00','Violet',NULL),(120,'Leadership Studies','english',56,'2024-03-10 06:00:00','Primrose',NULL),(121,'Strategic Planning','arabic',56,'2024-03-10 07:00:00','Zinnia',NULL),(122,'Ameer Program','Arabic',56,'2025-05-30 23:22:36',NULL,NULL);
/*!40000 ALTER TABLE `programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qlt_responses`
--

DROP TABLE IF EXISTS `qlt_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qlt_responses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `indicator_id` int NOT NULL,
  `domain_id` int NOT NULL,
  `program_id` int NOT NULL,
  `university_id` int DEFAULT NULL,
  `college_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `response` text,
  `comment` text,
  `reviewer_comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `indicator_id` (`indicator_id`),
  KEY `domain_id` (`domain_id`),
  KEY `program_id` (`program_id`),
  KEY `fk_qlt_responses_user` (`user_id`),
  CONSTRAINT `fk_qlt_responses_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `qlt_responses_ibfk_1` FOREIGN KEY (`indicator_id`) REFERENCES `indicators` (`id`),
  CONSTRAINT `qlt_responses_ibfk_2` FOREIGN KEY (`domain_id`) REFERENCES `domains` (`id`),
  CONSTRAINT `qlt_responses_ibfk_3` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qlt_responses`
--

LOCK TABLES `qlt_responses` WRITE;
/*!40000 ALTER TABLE `qlt_responses` DISABLE KEYS */;
INSERT INTO `qlt_responses` VALUES (6,1,1,122,NULL,20,56,'Yes','gg',NULL,'2025-06-19 23:51:32',19,NULL),(7,2,1,122,NULL,20,56,'Yes',NULL,NULL,'2025-06-20 00:15:06',19,NULL),(8,3,1,122,NULL,20,56,'Yes',NULL,NULL,'2025-06-20 00:16:45',19,NULL),(9,4,1,122,NULL,20,56,'Yes',NULL,NULL,'2025-06-20 00:16:45',19,NULL),(10,5,1,122,NULL,20,56,'Yes',NULL,NULL,'2025-06-20 00:16:45',19,NULL),(11,6,1,122,NULL,20,56,'Yes',NULL,NULL,'2025-06-20 00:16:45',19,NULL),(12,8,1,122,NULL,20,56,'Yes',NULL,NULL,'2025-06-20 00:16:45',19,NULL),(13,7,1,122,NULL,20,56,'Yes',NULL,NULL,'2025-06-20 00:16:45',19,NULL),(14,9,1,122,NULL,20,56,'Yes',NULL,NULL,'2025-06-20 00:16:45',19,NULL),(15,10,1,122,NULL,20,56,'Yes',NULL,NULL,'2025-06-20 00:16:45',19,NULL),(16,11,1,122,NULL,20,56,'Yes',NULL,NULL,'2025-06-20 00:16:45',19,NULL),(17,12,1,122,NULL,20,56,'Yes',NULL,NULL,'2025-06-20 00:16:45',19,NULL),(18,13,1,122,NULL,20,56,'Yes',NULL,NULL,'2025-06-20 00:16:45',19,NULL);
/*!40000 ALTER TABLE `qlt_responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qnt_areas`
--

DROP TABLE IF EXISTS `qnt_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qnt_areas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text_ar` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qnt_areas`
--

LOCK TABLES `qnt_areas` WRITE;
/*!40000 ALTER TABLE `qnt_areas` DISABLE KEYS */;
INSERT INTO `qnt_areas` VALUES (2,'البنية التحتية للقسم الأكاديمي'),(3,'التعليم الذي يقدمه البرنامج الأكاديمي والبرامج التخصصية'),(4,'الموظفون الإداريون في القسم وفق المؤهل العلمي'),(5,'المكتبة'),(6,'المخصصات المالية للقسم'),(7,'أعضاء هيئة التدريس المتفرغين للبرنامج الأكاديمي'),(8,'أعضاء هيئة التدريس غير المتفرغين للبرنامج الأكاديمي'),(9,'مساعدو أعضاء هيئة التدريس (المعيدون) موزعون حسب المؤهل'),(10,'الترقيات العلمية لأعضاء هيئة التدريس في القسم'),(11,'تقويم الأداء لأعضاء هيئة التدريس'),(12,'مدى مساهمة المؤسسة في إثراء أداء هيئة التدريس'),(13,'متوسط ساعات العبء التدريسي لأعضاء هيئة التدريس'),(14,'أعداد الطلبة في القسم موزعين حسب النوع الاجتماعي'),(15,'أعداد الطلبة حسب المستوى الدراسي'),(16,'أعداد الطلبة المفصولين والمنسحبين والمحولين'),(17,'تقديرات الطلبة الخريجين خلال الأعوام الثلاثة الأخيرة'),(18,'نسبة الطلبة إلى أعضاء هيئة التدريس'),(19,'عدد الطلبة المتوقع تخرجهم في العام الأكاديمي الحالي'),(20,'متطلبات البرنامج الأكاديمي من المقررات الدراسية'),(21,'البحث العلمي والأنشطة الأكاديمية'),(22,'الجوائز العلمية التي حصل عليها البرنامج خلال السنوات الخمس الأخيرة'),(23,'الإنجازات التي حققها القسم في مجال خدمة المجتمع');
/*!40000 ALTER TABLE `qnt_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qnt_headers`
--

DROP TABLE IF EXISTS `qnt_headers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qnt_headers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `num` int NOT NULL,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qnt_headers`
--

LOCK TABLES `qnt_headers` WRITE;
/*!40000 ALTER TABLE `qnt_headers` DISABLE KEYS */;
INSERT INTO `qnt_headers` VALUES (1,2,'أبنية القسم'),(2,2,'العدد'),(3,2,'متوسط المساحة ( متر مربع )'),(4,2,'متوسط عدد المستخدمين فيها'),(5,2,'متوسط ساعات التشغيل أو الإستخدام'),(6,3,'اسم القسم (البرنامج العام)'),(7,3,'اسم الفرع (البرنامج التخصصي)'),(8,3,'تاريخ التأسيس'),(9,3,'عدد طلبة الدراسات الدنيا'),(10,3,'عدد طلبة الدراسات العليا'),(11,3,'عدد أعضاء هيئة التدريس الماجستير'),(12,3,'عدد أعضاء هيئة التدريس الدكتوراه'),(13,4,'المؤهل العلمي'),(14,4,'عدد الموظفين على الملاك الدائم'),(15,4,'عدد الموظفين بعقود'),(16,5,'الموارد المادية الخاصة بالبرنامج الأكاديمي'),(17,5,'العدد'),(18,6,'المخصصات المالية للقسم لعام التقويم (بالدولار)'),(19,6,'المخصصات المالية للقسم للعام الذي يسبق التقويم (بالدولار)'),(20,7,'الرتبة العلمية'),(21,7,'العدد'),(22,7,'النسبة المئوية'),(23,8,'الرتبة العلمية'),(24,8,'العدد'),(25,8,'النسبة المئوية'),(26,9,'العنوان الوظيفي'),(27,9,'العدد'),(28,9,'النسبة المئوية'),(29,10,'الترقيات العلمية التي أحرزها أعضاء هيئة التدريس'),(30,10,'العدد'),(31,11,'تقويم الأداء السنوي لأعضاء هيئة التدريس للعام الذي يسبق التقويم'),(32,11,'العدد'),(33,11,'النسبة المئوية'),(34,12,'طبيعة العمل'),(35,12,'متوسط ساعات العمل الأسبوعية'),(36,12,'أستاذ'),(37,12,'أستاذ مشارك'),(38,12,'أستاذ مساعد'),(39,13,'الرتبة العلمية'),(40,13,'عدد ساعات النصاب المحددة'),(41,13,'عدد ساعات العبء الإضافي'),(42,14,'اسم البرنامج الأكاديمي'),(43,14,'ذكور'),(44,14,'إناث'),(45,15,'اسم البرنامج الأكاديمي'),(46,15,'اسم القسم'),(47,15,'عدد الطلبة في مستوى السنة'),(48,15,'الأولى'),(49,15,'الثانية'),(50,15,'الثالثة'),(51,15,'الرابعة'),(52,15,'الخامسة'),(53,15,'السادسة'),(54,16,'العام الدراسي'),(55,16,'مجموع الطلبة المفصولين'),(56,16,'مجموع الطلبة المنسحبين'),(57,16,'مجموع الطلبة المؤجلين'),(58,17,'التقدير'),(59,17,'ممتاز'),(60,17,'جيد جداً'),(61,17,'جيد'),(62,17,'متوسط'),(63,17,'ضعيف'),(64,17,'المجموع'),(65,18,'المؤشر'),(66,18,'العدد في عام التقويم'),(67,18,'العدد في العام السابق للتقويم'),(68,18,'نسبة أعداد أعضاء هيئة التدريس إلى الطلبة'),(69,18,'نسبة الزيادة أو النقصان عن العام الذي يسبق التقويم'),(70,19,'عدد الخريجين موزعين حسب الجنس'),(71,19,'المعدل العام للطلبة الخريجين'),(72,19,'عدد الخريجين الذين يواصلون تعليمهم في مستوى الدراسات العليا'),(73,19,'نسبة الطلبة المسجلين إلى الخريجين'),(74,19,'متوسط بقاء الطالب المتخرج في البرنامج الأكاديمي مقدرة بالسنوات'),(75,20,'نوع المقررات الدراسية'),(76,20,'عدد الساعات المعتمدة'),(77,20,'النسبة المئوية'),(78,21,'المؤشر'),(79,21,'العدد'),(80,22,'اسم الجائزة'),(81,22,'الجهة المانحة (محلية/عربية/عالمية)'),(82,22,'مجال التخصص'),(83,22,'اسم عضو هيئة التدريس'),(84,22,'تاريخ الحصول عليها'),(85,23,'الإنجاز'),(86,23,'العدد');
/*!40000 ALTER TABLE `qnt_headers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qnt_items`
--

DROP TABLE IF EXISTS `qnt_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qnt_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `area_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `area_id` (`area_id`),
  CONSTRAINT `qnt_items_ibfk_1` FOREIGN KEY (`area_id`) REFERENCES `qnt_areas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qnt_items`
--

LOCK TABLES `qnt_items` WRITE;
/*!40000 ALTER TABLE `qnt_items` DISABLE KEYS */;
INSERT INTO `qnt_items` VALUES (1,2,'المكتبة'),(2,2,'القاعات الدراسية'),(3,2,'المختبرات البحثية'),(4,2,'مختبرات الحاسوب'),(5,2,'مكائن ومعدات'),(6,2,'المراكز (تقنيات التعليم، الاختبارات والمقاييس)'),(7,2,'الورش الفنية'),(8,2,'مكاتب الإداريين'),(9,2,'مكاتب أعضاء هيئة التدريس'),(10,4,'ماجستير أو أعلى'),(11,4,'دبلوم عالي'),(12,4,'بكالوريوس'),(13,4,'دبلوم فني'),(14,4,'ثانوية عامة'),(15,4,'دون الثانوية'),(16,5,'الكتب الورقية'),(17,5,'الكتب الإلكترونية'),(18,5,'الموسوعات والمعاجم'),(19,5,'الدوريات'),(20,5,'قواعد البيانات الإلكترونية'),(21,5,'الأجهزة المخصصة للبحث'),(22,5,'المقاعد المخصصة للمطالعة'),(23,5,'مجموع الموظفين في المكتبة'),(24,7,'أستاذ'),(25,7,'أستاذ مشارك'),(26,7,'أستاذ مساعد'),(27,7,'مدرس'),(28,7,'رتب أخرى (كرسي اليونسكو، متميز، شرف، الخ).'),(29,8,'أستاذ'),(30,8,'أستاذ مشارك'),(31,8,'أستاذ مساعد'),(32,8,'مدرس'),(33,8,'رتب أخرى (كرسي اليونسكو، متميز، شرف، الخ).'),(34,10,'أرتبة أستاذ'),(35,10,'رتبة أستاذ مشارك'),(36,10,'رتبة أستاذ مساعد'),(37,11,'ممتاز'),(38,11,'جيد جدا'),(39,11,'جيد'),(40,11,'متوسط'),(41,12,'التدريس'),(42,12,'الساعات المكتبية مع الطلبة'),(43,12,'الإشراف على الرسائل العلمية'),(44,12,'البحث العلمي'),(45,12,'إرشاد الطلبة'),(46,12,'عضوية اللجان'),(47,12,'خدمة المجتمع'),(48,12,'مجموع الساعات'),(49,13,'أستاذ'),(50,13,'أستاذ مشارك'),(51,13,'أستاذ مساعد'),(52,13,'مدرس'),(53,17,'عدد الطلبة لعام التقويم'),(54,17,'النسبة المئوية لعام التقويم'),(55,17,'عدد الطلبة للعام السابق'),(56,17,'النسبة المئوية للعام السابق'),(57,17,'عدد الطلبة قبل عامين'),(58,17,'النسبة المئوية قبل عامين'),(59,18,'مجموع الطلبة في البكالوريوس'),(60,18,'مجموع الطلبة في الدراسات العليا'),(61,18,'مجموع أعضاء هيئة التدريس'),(62,18,'مجموع الفنيين في المختبرات'),(63,18,'مجموع أعداد الإداريين'),(64,19,'ذكور'),(65,19,'إناث'),(66,19,'المجموع'),(67,20,'متطلبات الجامعة'),(68,20,'متطلبات الكلية'),(69,20,'متطلبات القسم التخصصية'),(70,20,'متطلبات القسم الاختيارية'),(71,20,'المتطلبات الحرة'),(72,20,'المجموع'),(73,21,'البحوث العلمية المنشورة في مجلات دولية متخصصة ومحكمة.'),(74,21,'البحوث العلمية المنشورة في مجلات عربية محكمة.'),(75,21,'البحوث العلمية المنشورة في مجلات محلية محكمة.'),(76,21,'المؤلفات الموافق لأعضاء هيئة التدريس.'),(77,21,'الكتب المرجعية لأعضاء هيئة التدريس.'),(78,21,'الكتب المترجمة لأعضاء هيئة التدريس.'),(79,21,'أعضاء هيئة التدريس المراجعين بمجلات بحثية.'),(80,21,'رسائل الدبلوم العالي التي تم مناقشتها.'),(81,21,'رسائل الماجستير التي تم مناقشتها.'),(82,21,'رسائل الدكتوراه التي تم مناقشتها.'),(83,21,'المؤتمرات والندوات وورش العمل والحلقات الدراسية التي نظمها القسم أو الكلية.'),(84,21,'المؤتمرات والندوات وورش العمل والحلقات الدراسية التي شارك بها أعضاء هيئة التدريس خارج المؤسسة وداخلها.'),(85,21,'عدد أعضاء هيئة التدريس المشاركين في المؤتمرات وورش العمل والندوات الدراسية.'),(86,21,'المؤتمرات الدولية التي شارك بها أعضاء هيئة التدريس.'),(87,23,'المعارض الفنية، والصناعية، ومعارض الكتب.'),(88,23,'الندوات الثقافية، والمؤتمرات، والحلقات العلمية.'),(89,23,'الاستشارات العلمية المقدمة لمؤسسات المجتمع المحلي.'),(90,23,'معالجة مشكلات وقضايا اجتماعية.'),(91,23,'تطوير شبكات وبرامج حاسوبية.'),(92,23,'اللجان العلمية، والثقافية، والتقنية المؤقتة والدائمة التي يشارك بها أعضاء هيئة التدريس والإداريين من القسم مع المؤسسات والوزارات والنقابات والاتحادات.'),(93,23,'المساهمة في الجمعيات العلمية.');
/*!40000 ALTER TABLE `qnt_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qnt_responses`
--

DROP TABLE IF EXISTS `qnt_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qnt_responses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `header_id` int NOT NULL,
  `item_id` int NOT NULL,
  `program_id` int NOT NULL,
  `user_id` int NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_entry` (`header_id`,`item_id`,`program_id`,`user_id`),
  KEY `item_id` (`item_id`),
  KEY `program_id` (`program_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `qnt_responses_ibfk_1` FOREIGN KEY (`header_id`) REFERENCES `qnt_headers` (`id`),
  CONSTRAINT `qnt_responses_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `qnt_items` (`id`),
  CONSTRAINT `qnt_responses_ibfk_3` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`),
  CONSTRAINT `qnt_responses_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qnt_responses`
--

LOCK TABLES `qnt_responses` WRITE;
/*!40000 ALTER TABLE `qnt_responses` DISABLE KEYS */;
INSERT INTO `qnt_responses` VALUES (1,1,1,122,19,'105','2025-06-04 00:29:43','2025-06-19 15:19:14'),(2,2,1,122,19,'12','2025-06-04 00:29:43','2025-06-04 00:29:43'),(3,3,1,122,19,'12','2025-06-04 00:29:43','2025-06-04 00:29:43'),(8,4,1,122,19,'52','2025-06-05 12:39:56','2025-06-05 12:51:50'),(21,5,1,122,19,'100','2025-06-05 12:52:11','2025-06-05 12:52:11'),(23,1,2,122,19,'50','2025-06-05 12:52:27','2025-06-05 12:52:27'),(30,1,3,122,19,'1','2025-06-05 12:52:59','2025-06-05 12:52:59'),(31,1,4,122,19,'54','2025-06-05 12:52:59','2025-06-05 12:52:59'),(32,1,5,122,19,'5','2025-06-05 12:52:59','2025-06-05 12:52:59'),(33,1,6,122,19,'5','2025-06-05 12:52:59','2025-06-05 12:52:59'),(34,1,7,122,19,'54','2025-06-05 12:52:59','2025-06-05 12:52:59'),(35,1,8,122,19,'4','2025-06-05 12:52:59','2025-06-05 12:52:59'),(36,1,9,122,19,'4','2025-06-05 12:52:59','2025-06-05 12:52:59'),(38,2,2,122,19,'45','2025-06-05 12:52:59','2025-06-05 12:52:59'),(39,2,3,122,19,'15','2025-06-05 12:52:59','2025-06-05 12:52:59'),(40,2,4,122,19,'5','2025-06-05 12:52:59','2025-06-05 12:52:59'),(41,2,5,122,19,'45','2025-06-05 12:52:59','2025-06-05 12:52:59'),(42,2,6,122,19,'45','2025-06-05 12:52:59','2025-06-05 12:52:59'),(43,2,7,122,19,'54','2025-06-05 12:52:59','2025-06-05 12:52:59'),(44,2,8,122,19,'54','2025-06-05 12:52:59','2025-06-05 12:52:59'),(45,2,9,122,19,'5','2025-06-05 12:52:59','2025-06-05 12:52:59'),(47,3,2,122,19,'654','2025-06-05 12:52:59','2025-06-05 12:52:59'),(48,3,3,122,19,'5','2025-06-05 12:52:59','2025-06-05 12:52:59'),(49,3,4,122,19,'456','2025-06-05 12:52:59','2025-06-05 12:52:59'),(50,3,5,122,19,'4','2025-06-05 12:52:59','2025-06-05 12:52:59'),(51,3,6,122,19,'45','2025-06-05 12:52:59','2025-06-05 12:52:59'),(52,3,7,122,19,'54','2025-06-05 12:52:59','2025-06-05 12:52:59'),(53,3,8,122,19,'54','2025-06-05 12:52:59','2025-06-05 12:52:59'),(54,3,9,122,19,'454','2025-06-05 12:52:59','2025-06-05 12:52:59'),(56,4,2,122,19,'2','2025-06-05 12:52:59','2025-06-05 12:52:59'),(57,4,3,122,19,'54','2025-06-05 12:52:59','2025-06-05 12:52:59'),(58,4,4,122,19,'45','2025-06-05 12:52:59','2025-06-05 12:52:59'),(59,4,5,122,19,'54','2025-06-05 12:52:59','2025-06-05 12:52:59'),(60,4,6,122,19,'4','2025-06-05 12:52:59','2025-06-05 12:52:59'),(61,4,7,122,19,'5','2025-06-05 12:52:59','2025-06-05 12:52:59'),(62,4,8,122,19,'54','2025-06-05 12:52:59','2025-06-05 12:52:59'),(63,4,9,122,19,'54','2025-06-05 12:52:59','2025-06-05 12:52:59'),(65,5,2,122,19,'3','2025-06-05 12:52:59','2025-06-05 12:52:59'),(66,5,3,122,19,'6','2025-06-05 12:52:59','2025-06-05 12:52:59'),(67,5,4,122,19,'46','2025-06-05 12:52:59','2025-06-05 12:52:59'),(68,5,5,122,19,'54','2025-06-05 12:52:59','2025-06-05 12:52:59'),(69,5,6,122,19,'54','2025-06-05 12:52:59','2025-06-05 12:52:59'),(70,5,7,122,19,'45','2025-06-05 12:52:59','2025-06-05 12:52:59'),(71,5,8,122,19,'5','2025-06-05 12:52:59','2025-06-05 12:52:59'),(72,5,9,122,19,'5','2025-06-05 12:52:59','2025-06-05 12:52:59'),(73,6,1,122,19,'123','2025-06-05 13:09:22','2025-06-05 13:09:22'),(74,7,1,122,19,'123','2025-06-05 13:09:22','2025-06-05 13:09:22'),(75,8,1,122,19,'123','2025-06-05 13:09:22','2025-06-05 13:09:22'),(76,9,1,122,19,'123','2025-06-05 13:09:22','2025-06-05 13:09:22'),(77,10,1,122,19,'123','2025-06-05 13:09:22','2025-06-05 13:09:22'),(78,11,1,122,19,'123','2025-06-05 13:09:22','2025-06-05 13:09:22'),(79,12,1,122,19,'123','2025-06-05 13:09:22','2025-06-05 13:09:22');
/*!40000 ALTER TABLE `qnt_responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` int NOT NULL,
  `dom` int DEFAULT NULL,
  `result` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,1,'  وجود هدفٍ عام للبرنامج الأكاديمي موثقٍ ومعلنٍ عنه بشكل واضح، ومعمم على الجهات المعنية، وأن يحدد هذا الهدف المعارف والمهارات المتوخاة، وبما يتوافق مع حاجات سوق العمل.'),(2,1,'	وجود أهداف تفصيلية موثقة ومعممة تنبثق عن الهدف العام للبرنامج الأكاديمي.'),(3,1,'‌انسجام أهداف البرنامج الأكاديمي مع السياسة العامة للمؤسسة التعليمية.'),(4,1,'وجود مخرجات تعلم من معارف ومهارات قابلة للقياس والتحقق، موثقة ومعممة، وبما ينسجم مع الأهداف المعلنة للبرنامج الأكاديمي.'),(5,1,'استناد أهداف البرنامج ومخرجات التعلم إلى أسس مرجعية على المستوى المحلي والإقليمي والعالمي.'),(6,1,'  وجود آليات وأدوات لقياس مخرجات التعلم والاستفادة منها في مراجعة البرنامج الأكاديمي وتقويمه.'),(7,1,'مدى تحقيق الطلبة الخريجين لمخرجات التعلم.'),(8,1,'مشاركة الجهات المعنية من: أعضاء هيئة التدريس، والطلبة، والخريجين، وأفراد من المجتمع المحلي في عملية تصميم أهداف البرنامج الأكاديمي ومراجعته.'),(9,1,'فهم واستيعاب أعضاء هيئة التدريس والطلبة لأهداف البرنامج الأكاديمي ومخرجات التعلم'),(10,2,'توافق الخطة الدراسية مع أهداف البرنامج الأكاديمي ومخرجات التعلم.'),(11,2,'وجود خطة دراسية تفصيلية للبرنامج الأكاديمي تبين المقررات الدراسية وتصنيفها وتسلسلها، وتوضح عدد ساعات الدراسة المتوقعة من الطالب لكل مقرر دراسي.'),(12,2,'استناد الخطة الدراسية إلى مرجعيات محلية وإقليمية وعالمية.'),(13,2,'تغطية الخطة الدراسية لحقول المعرفة المختلفة في التخصص.'),(14,2,'وجود خطة دراسية تفصيلية لكل مقرر دراسي، تتضمن كل من( الوصف العام للمقرر الدراسي، بيان نسبة النظري والعملي للمقرر الدراسي، الهدف العام والأهداف التفصيلية، مخرجات التعلم، المحتويات التفصيلية للمقرر الدراسي، الجدول الزمني للمحاضرات، أساليب التدريس والتقويم، الكتاب المعتمد والمراجع المساندة).'),(15,2,'توثيق المنهاج الدراسي وإعلانه بكافة تفاصيله لأصحاب العلاقة.'),(16,2,'حداثة المنهاج الدراسي واتساقه مع التوجهات الحديثة في التخصص والبحث العلمي ذات العلاقة به.'),(17,2,'مراجعة المنهاج الدراسي بشكل دوري.'),(18,2,'التوازن بين الشمولية والعمق معاً في المحتوى العلمي للمقررات الدراسية.'),(19,3,'تنوع أساليب التدريس بما يلائم المنهاج المقرر.'),(20,3,'فاعلية أساليب التدريس والتعلم المستخدمة في تحقيق أهداف البرنامج الأكاديمي ومخرجات التعلم.'),(21,3,'مدى تغطية الجوانب النظرية والعملية بما يلائم طبيعة محتوى المقرر الدراسي.'),(22,3,'إثراء العملية التدريسية بمخرجات البحث العلمي الخاص بأعضاء هيئة التدريس ومدى مرونة المنهاج الدراسي لتحقيق ذلك.'),(23,3,'مدى مساهمة أساليب التدريس والتعلم في إكساب وتطوير المهارات الأساسية التي يتطلبها سوق العمل.'),(24,3,'تعزيز التعلم الذاتي لدى الطلبة.'),(25,3,'التفاعل الإيجابي بين الطلبة وأعضاء هيئة التدريس.'),(26,3,'التفاعل الإيجابي  بين الطلبة وتنمية روح الفريق الواحد لديهم.'),(27,3,'استخدام  تكنولوجيا المعلومات والاتصالات في العملية التدريسية.'),(28,3,'وجود نظام لتقويم العملية التدريسية بشكل دوري والإجراءات المترتبة على ذلك.'),(29,4,'توفر كادر تدريسي متفرغ مناسب من حيث العدد والخبرة وتنوع التخصصات.'),(30,4,'تغطية أعضاء هيئة التدريس لكافة المجالات المعرفية للتخصص.'),(31,4,'التأهيل التربوي والمهني والأكاديمي لأعضاء هيئة التدريس الجدد.'),(32,4,'التطوير الأكاديمي المستمر لأعضاء هيئة التدريس لمواكبة التطورات الحديثة في مجال التخصص.'),(33,4,'التواصل بين أعضاء هيئة التدريس والكوادر الفنية والإدارية المساندة.'),(34,4,'التواصل بين أعضاء هيئة التدريس والطلبة.'),(35,4,'وجود آليات مناسبة للتعيين والترقية.'),(36,4,'وجود نظام متكامل لتقويم أعضاء الهيئة التدريسية دورياً والارتقاء بهم.'),(37,4,'مدى ثبات الكادر التدريسي ونسبة استمرارهم في عملهم.'),(38,4,'مدى مشاركة أعضاء الهيئة التدريسية في المؤتمرات والنشاطات العلمية.'),(39,4,'مدى حرية ومسئولية أعضاء الهيئة التدريسية في تقويم وتطوير المنهاج الدراسي.'),(40,4,'توفر البيئة والوقت لأعضاء الهيئة التدريسية للتطوير المهني والنشاط البحثي.'),(41,4,'وجود آلية لاستقطاب أعضاء هيئة تدريس من ذوي الكفاءة.'),(42,4,'مدى تفعيل إجازات التفرغ العلمي وأية حوافز أخرى متوفرة لأعضاء هيئة التدريس.'),(43,5,'توفر الأجهزة والتجهيزات والمواد والبرمجيات المناسبة للتخصص.'),(44,5,'ملاءمة مصادر التعلم للتخصص.'),(45,5,'حسن استخدام مصادر التعلم في العملية التعليمية.'),(46,5,'  توفر الكتب والدوريات وتنوعها وحداثتها وتغطيتها لجميع مجالات المعرفة في التخصص.'),(47,5,'توفر مكتبة متكاملة من حيث أوعية المعلومات والتجهيزات والكوادر الفنية المتخصصة لخدمة التخصص.'),(48,5,'الاشتراك في قواعد المعلومات الإلكترونية في مجال التخصص.'),(49,5,'وجود نظام إلكتروني لإدارة المحتوى التعليمي وتوفر المواد الإلكترونية.'),(50,5,'توفر نظام إلكتروني للبحث عن المعلومات في المكتبة بالإضافة إلى المكتبات الإلكترونية.'),(51,6,'مدى تحصيل الطلبة لمخرجات التعلم التي تؤهلهم للحصول على الدرجة العلمية.'),(52,6,'قدرة الطلبة على اجتياز امتحانات الكفاءة عند التخرج، إن وجدت.'),(53,6,'مدى نجاح الطلبة الخريجين في سوق العمل ودرجة إنجازهم.'),(54,6,'تقدم الطلبة وإكتسابهم المهارات اللازمة لكل مستوى دراسي.'),(55,6,'توفر إجراءات تمكن الطلبة من مراجعة علاماتهم ومناقشتها.'),(56,6,'قدرة أساليب التقويم المستخدمة على تحديد مستويات الطلبة. '),(57,6,'تنوع أساليب تقويم أداء الطلبة وملاءمتها للتخصص.'),(58,6,'مساهمة أساليب التقويم في التعلم والاستفادة من التغذية الراجعة.'),(59,6,'الشفافية والعدالة في أساليب التقويم.'),(60,6,'وجود ممتحنين أو مقومين داخليين وخارجيين.'),(61,6,'قدرة أساليب التقويم على قياس مخرجات التعلم.'),(62,7,'توفر قاعات تدريس مناسبة مزودة بالأدوات والتجهيزات اللازمة للتخصص.'),(63,7,'توفر مكاتب مناسبة لأعضاء هيئة التدريس.'),(64,7,'توفر مختبرات مناسبة مجهزة بالأجهزة اللازمة للتخصص.'),(65,7,'توفر مرافق متكاملة (ملاعب، مطاعم، معارض، قاعات نشاطات، صالات رياضية، مصليات،....الخ).'),(66,7,'تزويد الهيئة التدريسية بخدمة مناسبة للإنترنت والطباعة وأية خدمات إلكترونية أخرى ضرورية للتخصص.'),(67,7,'مدى استطاعة الهيئة التدريسية والفنية والإدارية والطلبة من استخدام أنظمة المعلومات الإلكترونية المساندة حسب طبيعة الحاجة.'),(68,7,'فاعلية مكتب توظيف الخريجين وتأهيلهم بالمهارات المطلوبة لسوق العمل.'),(69,7,'توفر وحدة للإرشاد النفسي المتخصص.'),(70,7,'فاعلية مكتب الإرشاد الأكاديمي والنفسي للطلبة.'),(71,7,'تغطية الحرم الجامعي بخدمة إنترنت عامة للطلاب والعاملين.'),(72,7,'مراعاة المرافق والخدمات المساندة لذوي الاحتياجات الخاصة.'),(73,7,'توفر كافة الخدمات الإدارية والمرافق اللازمة لأعضاء هيئة التدريس في القسم.'),(74,8,'وجود نشرة تعريفية للقسم تحتوي على أهداف القسم ورؤيته ورسالته ومدى الالتزام بها.'),(75,8,'وجود رئيس قسم ذي خبرة أكاديمية وإدارية مناسبة قي مجال التخصص لإدارة القسم والارتقاء به. '),(76,8,'وجود مجلس قسم ولجان مساندة تجتمع بانتظام وتوثق أعمالها وتتابع قراراتها.'),(77,8,'توفر بيئة مناسبة تشجع العمل بروح الفريق الواحد.'),(78,8,'مشاركة الطلبة في اتخاذ القرار، والحصول على التغذية الراجعة منهم.'),(79,8,'توفر سكرتاريا وكادر إداري كافٍ ومناسب لضمان حسن سير العمل في القسم.'),(80,8,'توفر الكوادر الفنية المؤهلة لخدمة البرنامج الأكاديمي.'),(81,8,'تنمية وتطوير المهارات والقدرات الفنية والمهنية للكوادر المساندة في مجال التخصص لمواكبة التطورات الحديثة.'),(82,8,'توفر أرشيف متكامل للقسم.'),(83,8,'وجود برنامج تعريفي وتوجيهي للطلبة الجدد.'),(84,8,'وجود دعم أكاديمي للطلاب خارج نطاق المحاضرات.'),(85,8,'توفر شروط  تكافؤ الفرص في قبول الطلبة.'),(86,8,'توفر موازنة مالية خاصة بالبرنامج الأكاديمي / القسم.'),(87,8,'وجود استقلال أكاديمي وإداري ومالي لتحقيق أهداف القسم.'),(88,9,'نشاط البحث العلمي لأعضاء هيئة التدريس.'),(89,9,'مدى مساهمة أعضاء هيئة التدريس في خدمة المجتمع.'),(90,9,'علاقة ونشاط القسم الأكاديمي مع مؤسسات المجتمع المحلي ذات العلاقة.'),(91,9,'أي إتفاقيات وتعاون مع المجتمع المحلي والمؤسسات التعليمية ومراكز الأبحاث.'),(92,9,'تمثيل المؤسسات المختلفة ذات العلاقة في المجالس واللجان.'),(93,9,'التواصل مع الطلبة الخريجين ووجود نادي خريجين لهم.'),(94,9,'مدى استعانة القسم بمحاضرين غير متفرغين من أصحاب الخبرة العملية في الشركات والمؤسسات ذات العلاقة.'),(95,9,'توفر بيئة داعمة ومحفزة للبحث العلمي.'),(96,9,'مدى تفعيل إجازات التفرغ العلمي لأعضاء هيئة التدريس.'),(97,9,'مدى تفعيل إجازات الزيارة العلمية لأعضاء هيئة التدريس من القسم وإليه.'),(98,9,'مدى مشاركة الطلبة في أنشطة البحث العلمي.'),(99,9,'وجود نظام ابتعاث للطلبة المتميزين. '),(100,10,'وجود آليات ملائمة ومفعلة للاستمرار في تحسين وتطوير العملية التدريسية.'),(101,10,'وجود وحدة فاعلة لضمان الجودة.'),(102,10,'وجود تقويم ذاتي في الجامعة على مستوى التخصصات.'),(103,10,'وجود دليل ضمان جودة لتوثيق الآليات والإجراءات وتحديد المسؤليات.'),(104,10,'وجود علاقة مع مؤسسات الاعتماد المهنية في مجال التخصص. '),(105,10,'وجود نظام تقويم داخلي وخارجي.'),(106,10,'وجود آليات للتطوير الأكاديمي والمهني والتربوي المستمر لأعضاء هيئة التدريس والكوادر المساندة.'),(107,10,'وجود آليات واضحة وملائمة للتخصص لقبول الطلبة.'),(108,10,'مدى تطبيق آليات وإجراءات إدارة الجودة وفاعليتها في تحسين الجودة.'),(109,10,'مدى توثيق القسم لكافة إجراءاته وللبيانات ذات العلاقة في عملية تقويمه وتطويره.'),(110,10,'مدى استخدام نتائج التقويم للتطوير والتحسين وبخطة زمنية موثقة.');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_result`
--

DROP TABLE IF EXISTS `report_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_result` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ind` int DEFAULT NULL,
  `domain` int DEFAULT NULL,
  `program` int DEFAULT NULL,
  `result` text,
  `weak` text,
  `improve_weak` text,
  `power` text,
  `improve_power` text,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_result`
--

LOCK TABLES `report_result` WRITE;
/*!40000 ALTER TABLE `report_result` DISABLE KEYS */;
INSERT INTO `report_result` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-20 19:34:31'),(2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-20 19:34:37'),(3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-20 19:34:42'),(4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-20 19:34:52'),(5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-20 19:34:57'),(6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-20 19:36:03'),(7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-20 19:36:07'),(8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-21 18:24:48'),(9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-21 18:24:50'),(10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-21 18:24:53'),(11,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-21 18:25:17'),(12,NULL,NULL,NULL,'{\"requirementFulfillment\":\"<p>Hello my name is ameer yasen</p>\"}',NULL,NULL,NULL,NULL,'2025-06-21 22:42:30'),(13,9,1,122,'<p>My name is Ameer Yasen</p>','<p>jjk</p>','','<p>I am strong and indebendint</p>','','2025-06-21 23:25:53'),(14,6,1,122,'','<p>lets try the short cut</p>','','<p>this is another test</p>','','2025-06-21 22:54:32');
/*!40000 ALTER TABLE `report_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revoked_tokens`
--

DROP TABLE IF EXISTS `revoked_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revoked_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` text NOT NULL,
  `revoked_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revoked_tokens`
--

LOCK TABLES `revoked_tokens` WRITE;
/*!40000 ALTER TABLE `revoked_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `revoked_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universities`
--

DROP TABLE IF EXISTS `universities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `address` text,
  `logo` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `tax` varchar(100) DEFAULT NULL,
  `head_name` varchar(255) DEFAULT NULL,
  `authority_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `authority_id` (`authority_id`),
  CONSTRAINT `universities_ibfk_1` FOREIGN KEY (`authority_id`) REFERENCES `authorities` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universities`
--

LOCK TABLES `universities` WRITE;
/*!40000 ALTER TABLE `universities` DISABLE KEYS */;
INSERT INTO `universities` VALUES (2,'Birzeit University','info@birzeit.edu','https://www.birzeit.edu','Birzeit, West Bank, Palestine','/logos/birzeit.png','+970 2 298 2000','PS-TAX-BZU01','Dr. Talal Shahwan',2,'2025-05-15 21:48:00'),(3,'An-Najah National University','info@najah.edu','https://www.najah.edu','Nablus, West Bank, Palestine','/logos/najah.png','+970 9 234 5113','PS-TAX-ANU01','Prof. Abdel Nasser Zaid',2,'2025-05-15 21:48:00'),(4,'Al-Quds University','info@alquds.edu','https://www.alquds.edu','Abu Dis, Jerusalem, Palestine','/logos/alquds.png','+970 2 275 6200','PS-TAX-AQU01','Prof. Imad Abu Kishk',2,'2025-05-15 21:48:00'),(5,'Hebron University','info@hebron.edu','https://www.hebron.edu','Hebron, West Bank, Palestine','/logos/hebron.png','+970 2 222 0995','PS-TAX-HBU01','Dr. Salah Al-Zaro',2,'2025-05-15 21:48:00'),(6,'Palestine Polytechnic University','info@ppu.edu','https://www.ppu.edu','Hebron, West Bank, Palestine','/logos/ppu.png','+970 2 223 3050','PS-TAX-PPU01','Dr. Mustafa Abu Safa',2,'2025-05-15 21:48:00'),(7,'Bethlehem University','info@bethlehem.edu','https://www.bethlehem.edu','Bethlehem, West Bank, Palestine','/logos/bethlehem.png','+970 2 274 1241','PS-TAX-BTU01','Brother Peter Bray',2,'2025-05-15 21:48:00'),(17,'AmeerUniversity','ameryasen45@gmail.com',NULL,'Ameer street\n',NULL,'123',NULL,'Ameer Yasen 3',2,'2025-05-19 20:53:28');
/*!40000 ALTER TABLE `universities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','authority','university','college','department') NOT NULL,
  `authority_id` int DEFAULT NULL,
  `university_id` int DEFAULT NULL,
  `college_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `authority_id` (`authority_id`),
  KEY `university_id` (`university_id`),
  KEY `college_id` (`college_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`authority_id`) REFERENCES `authorities` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`university_id`) REFERENCES `universities` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_ibfk_4` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_ibfk_5` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@acadrev.com','$2a$15$I7ZrVOpLzB51VvJ8PLJfK.0wrAXyD2BszFNtIYHbCxIFQlS/h8Rg6','admin',NULL,NULL,NULL,NULL,1,'2025-05-15 21:23:59'),(4,'ameer','ameer@acadrev.com','$2a$15$uoWt/a4h6CvRqCCwrMD7N.IobB2M94cA0ogF2AlagUKhtP2GqCGSe','admin',NULL,NULL,NULL,NULL,1,'2025-05-15 21:26:45'),(6,'taqi','admdin@acadrev.com','$2a$08$SUOdqY4P2Y/1Jq3QVra3jecFrPvBY4wOOi8FCBC4schDQEb0dFC8e','admin',NULL,NULL,NULL,NULL,1,'2025-05-16 13:21:41'),(8,'ameerauth','auth1@acadrev.com','$2a$08$gObIvPYFJ.sgqkTQ5myrWOTZV3tmivkyq3sUQCFnyU5deTkGzqFuq','authority',2,NULL,NULL,NULL,1,'2025-05-16 23:12:49'),(10,'ameerUni','ameryasen45@gmail.com','$2b$10$7BS/uBB9lNFlArke3K7FkerkcB7qcWWF2UTTt6h7w5Uf3PEMWzw.e','university',2,17,NULL,NULL,1,'2025-05-19 20:53:28'),(12,'ameerCollege','ameer@gmail.com','$2b$10$qKdroPcjE38KupXWirkPFOUh8JG9yiKYEFqNel66uPMSTDc1dd3eq','college',NULL,17,20,NULL,1,'2025-05-20 23:16:31'),(13,'test','test@gmail.com','$2b$10$zDO7mggNTwiM684n4rGpveQhzqi70eW.RaYOYKY589jnuwRdTFMHG','college',NULL,17,NULL,NULL,1,'2025-05-20 23:41:02'),(14,'test2','test2@gmail.com','$2b$10$dP/LG07HAJGcgWbXPHs22uglJyoGH85wbZ6GxkPjyLlLN0SfJaA16','college',NULL,17,NULL,NULL,1,'2025-05-20 23:47:36'),(17,'marco','marco@gmail.com','$2b$10$K3lQ//MP/t9fDxppp32J/.sTYtRnmJa6WxTk4s2hp1AuQUBhFogUu','college',NULL,17,NULL,NULL,1,'2025-05-23 17:04:08'),(19,'ameerDep','admin@department.com','$2b$10$IWVb2fYKXwLJD52tLLGoCOfA93GZ0JcOw/no.t0kL1dpbwH8EMh6W','department',NULL,NULL,20,56,1,'2025-05-29 23:16:29');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-22  4:52:06
