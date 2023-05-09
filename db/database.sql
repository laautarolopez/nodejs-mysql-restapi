CREATE DATABASE IF NOT EXISTS companiadb;

USE companiadb;

CREATE TABLE empleado(
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) DEFAULT NULL,
    salario INT DEFAULT NULL,
    PRIMARY KEY (id)
);

DESCRIBE empleado;