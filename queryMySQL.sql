CREATE DATABASE coleccionistas;

USE coleccionistas;

CREATE TABLE usuarios(
	mail VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	edad INT NOT NULL,
	nombre VARCHAR(30) NOT NULL,
	apellido VARCHAR(30) NOT NULL,
	PRIMARY KEY (mail),
);