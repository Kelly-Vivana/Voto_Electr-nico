
/*CREACION DE LA BASE DE DATOS*/
CREATE DATABASE `voto_electrónico`

/*CREACION DE LA TABLA USUARIO*/
CREATE TABLE `usuarios` (
  `Identificacion` int(10) NOT NULL,
  `Contraseña` varchar(50) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  PRIMARY KEY (`Identificacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
/*DATOS AGREGADOS A LA TABLA USUARIO*/
INSERT INTO `usuarios`(`Identificacion`, `Contraseña`, `Correo`) 
VALUES(0930567060, sha2('Prinsesa97', 256), 'kelly.villacresp@ug.edu.ec');

/*CREACION DE LA TABLA CANDIDATO*/
CREATE TABLE `candidato` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Cargo` varchar(50) NOT NULL,
  `Lista` int(2) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
/*DATOS AGREGADOS A LA TABLA CANDIDATO*/
INSERT INTO `candidato` (`ID`, `Nombre`, `Cargo`, `Lista`) 
VALUES ('1', 'Ronald Vera Baque', 'Docente', '1');