CREATE DATABASE `voto_electrónico`
CREATE TABLE `usuarios` (
  `Identificacion` int(10) NOT NULL,
  `Contraseña` varchar(50) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  PRIMARY KEY (`Identificacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
INSERT INTO `usuarios`(`Identificacion`, `Contraseña`, `Correo`) VALUES(0930567060, sha2('Prinsesa97', 256), 'kelly.villacresp@ug.edu.ec');