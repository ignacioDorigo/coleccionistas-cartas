CREATE DATABASE coleccionistas;

USE coleccionistas;

CREATE TABLE usuarios(
	mail VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
	edad INT NOT NULL,
	nombre VARCHAR(30) NOT NULL,
	apellido VARCHAR(30) NOT NULL,
	PRIMARY KEY (mail)
);

CREATE TABLE colecciones(
	id INTEGER NOT NULL,
	nombre VARCHAR(30) NOT NULL,
	imagen VARCHAR(100) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO colecciones(id,nombre,imagen)
VALUES(1,'Yugioh','https://i.postimg.cc/bv09FvZf/yugioh.png');
INSERT INTO colecciones(id,nombre,imagen)
VALUES(2,'Pokemon','https://i.postimg.cc/jS7XPcK5/pokemon.png');


CREATE TABLE usuarios_colecciones(
	id INTEGER AUTO_INCREMENT NOT NULL,
	id_usuario VARCHAR(50) NOT NULL,
	id_coleccion INTEGER NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (id_usuario) REFERENCES usuarios(mail),
	FOREIGN KEY (id_coleccion) REFERENCES colecciones(id)
);

CREATE TABLE usuarios_sets(
	id INTEGER AUTO_INCREMENT NOT NULL,
	mail VARCHAR (50) NOT NULL,
	id_set VARCHAR(100) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (mail) REFERENCES usuarios(mail)
);

CREATE TABLE usuarios_cards(
	id INTEGER AUTO_INCREMENT NOT NULL,
	mail VARCHAR (50) NOT NULL,
	id_set VARCHAR(100) NOT NULL,
	id_card VARCHAR(100) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (mail) REFERENCES usuarios(mail)
);

CREATE TABLE favoritos_pokemon( 
	id INTEGER AUTO_INCREMENT NOT NULL,
    mail VARCHAR(50) NOT NULL,
	id_card VARCHAR (20) NOT NULL,
    primary key (id), 
    foreign key (mail) references usuarios(mail)
);

CREATE TABLE avatares(
	mail VARCHAR(50) NOT NULL,
	foto LONGBLOB,
	PRIMARY KEY (mail),
	FOREIGN KEY (mail) REFERENCES usuarios(mail)
);