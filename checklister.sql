/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 8.0.35 : Database - checklister
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`checklister` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `checklister`;

/*Table structure for table `checkout` */

DROP TABLE IF EXISTS `checkout`;

CREATE TABLE `checkout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `condutor` tinytext,
  `placa` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `veiculo` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `observacao` text,
  `listCheckout` longtext NOT NULL,
  `usuario` tinytext,
  `dataHora` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `checkout` */

insert  into `checkout`(`id`,`condutor`,`placa`,`veiculo`,`observacao`,`listCheckout`,`usuario`,`dataHora`) values 
(6,'Juliano','CBFR856','Fiat Uno mille 2010','','[{\"name\":\"Nível de óleo\",\"check\":true},{\"name\":\"Nível fluido de freio\",\"check\":true},{\"name\":\"Freio de estacionamento\",\"check\":false},{\"name\":\"TRIÂNGULO DE SINALIZAÇÃO\",\"check\":true},{\"name\":\"EXTINTOR DE INCÊNDIO\",\"check\":false},{\"name\":\"PORTAS – TRAVAS\",\"check\":false},{\"name\":\"NÍVEL DA ÁGUA DO RADIADOR\",\"check\":false},{\"name\":\"PNEUS (ESTADO/CALIBRAGEM)\",\"check\":true},{\"name\":\"PNEU RESERVA (ESTEPE)\",\"check\":true},{\"name\":\"BANCOS ENCOSTO/ASSENTOS\",\"check\":false},{\"name\":\"FECHAMENTO DAS JANELAS\",\"check\":true},{\"name\":\"Lavador de para brisa\",\"check\":false},{\"name\":\"Lanternas traseiras (seta)\",\"check\":false}]','admin','2025-06-18 16:18:33'),
(7,'Jean','PVWG883','Etios Preto','Trocar estofado','[{\"name\":\"Nível de óleo\",\"check\":true},{\"name\":\"Nível fluido de freio\",\"check\":true},{\"name\":\"Freio de estacionamento\",\"check\":false},{\"name\":\"TRIÂNGULO DE SINALIZAÇÃO\",\"check\":true},{\"name\":\"EXTINTOR DE INCÊNDIO\",\"check\":false},{\"name\":\"PORTAS – TRAVAS\",\"check\":true},{\"name\":\"NÍVEL DA ÁGUA DO RADIADOR\",\"check\":true},{\"name\":\"PNEUS (ESTADO/CALIBRAGEM)\",\"check\":true},{\"name\":\"PNEU RESERVA (ESTEPE)\",\"check\":true},{\"name\":\"BANCOS ENCOSTO/ASSENTOS\",\"check\":false},{\"name\":\"FECHAMENTO DAS JANELAS\",\"check\":true},{\"name\":\"Lavador de para brisa\",\"check\":true},{\"name\":\"Lanternas traseiras (seta)\",\"check\":true},{\"name\":\"Banco\",\"check\":false}]','admin','2025-06-18 12:49:25');

/*Table structure for table `grupo_check` */

DROP TABLE IF EXISTS `grupo_check`;

CREATE TABLE `grupo_check` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `grupo_check` */

insert  into `grupo_check`(`id`,`descricao`) values 
(1,'Nível de óleo'),
(2,'Nível fluido de freio'),
(5,'Freio de estacionamento'),
(6,'TRIÂNGULO DE SINALIZAÇÃO'),
(7,'EXTINTOR DE INCÊNDIO'),
(8,'PORTAS – TRAVAS'),
(9,'NÍVEL DA ÁGUA DO RADIADOR'),
(10,'PNEUS (ESTADO/CALIBRAGEM)'),
(11,'PNEU RESERVA (ESTEPE)'),
(12,'BANCOS ENCOSTO/ASSENTOS'),
(13,'FECHAMENTO DAS JANELAS'),
(14,'Lavador de para brisa'),
(15,'Lanternas traseiras (seta)'),
(17,'CONDIÇÕES LATARIA'),
(18,'LIMPEZA');

/*Table structure for table `motoristas` */

DROP TABLE IF EXISTS `motoristas`;

CREATE TABLE `motoristas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `motoristas` */

insert  into `motoristas`(`id`,`descricao`) values 
(10,'Jean'),
(11,'Andre'),
(12,'Alexandre'),
(13,'Anderson'),
(14,'Walter'),
(15,'Lucas'),
(16,'Wendel'),
(17,'Ademar'),
(18,'Guilherme'),
(19,'Sandro');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` tinytext NOT NULL,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`user`,`password`) values 
(2,'usuario','$2b$10$dkM70uGRT2IFRa4l.dCMA.JKFBKut7DopqbS4f/zr1tAScDpYVGtu'),
(4,'admin','$2b$10$lxznRC3Q.7KhYrzUMv7PY..gx2t4ZQHFr.OKKxpXhlGDRv.WS4oUK'),
(5,'Robson','$2b$10$wctn71en4hvS.GmzlV29Su1aenvwpKq7ZpyLkDPRHRL6ClmwmUf8m'),
(6,'Jean','$2b$10$mxf9TCCh6AixX0Qu5T7uU.kFUi7lVznB9s09Bu.OhSFFTH.YH4YYO'),
(7,'Andre','$2b$10$Dwp/6B3Hb1DHglSqrnp/EObUV5jDgmGcwCVqoP6uzE1ddMW/ZjB9S'),
(8,'Braulio','$2b$10$ZMHqodhnXBeezHH4MbCQQ.aT/N8uSNBqnJ6aIuhFJ8S2R5galaNUm');

/*Table structure for table `veiculos` */

DROP TABLE IF EXISTS `veiculos`;

CREATE TABLE `veiculos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `placa` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `veiculos` */

insert  into `veiculos`(`id`,`descricao`,`placa`) values 
(6,'Fiat Uno mille 2011','CBFR857'),
(8,'Etios Preto','PVWG883'),
(9,'Saveiro Preta','OXI8518'),
(10,'Etios Prata','QXC8197'),
(11,'Etios Chumbo','RGC6C25'),
(12,'Saveiro Branca','TDG6J52'),
(13,'Etios BH1','1111111');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
