-- DROP DATABASE IF EXISTS semillero_sas;
-- CREATE DATABASE semillero_sas;
-- USE semillero_sas;
-- Eliminar
DROP TABLE IF EXISTS vehiculo;

DROP TABLE IF EXISTS linea;

DROP TABLE IF EXISTS marca;

CREATE TABLE marca(
        nombre
        SET (
                "Mazda",
                "Toyota",
                "Chevrolet",
                "Suzuki",
                "Volkswagen",
                "Audi",
                "BMW",
                "Ford",
                "Mercedes-Benz",
                "Tesla"
            ) NOT NULL UNIQUE,
            descripcion TEXT,
            estado
        SET ("S", "N") NOT NULL,
            CONSTRAINT `pk_name_marca` PRIMARY KEY (nombre)
    );

CREATE TABLE
    linea(
        id_linea INT(6) AUTO_INCREMENT,
        descripcion VARCHAR(200),
        estado
        SET ("S", "N") NOT NULL, nombre_marca
        SET (
                "Mazda",
                "Toyota",
                "Chevrolet",
                "Suzuki",
                "Volkswagen",
                "Audi",
                "BMW",
                "Ford",
                "Mercedes-Benz",
                "Tesla"
            ) NOT NULL UNIQUE,
            CONSTRAINT `pk_id_linea` PRIMARY KEY (id_linea),
            CONSTRAINT `fk_marca_linea` FOREIGN KEY (nombre_marca) REFERENCES marca(nombre)
    );

CREATE TABLE
    vehiculo(
        num_placa VARCHAR(6) NOT NULL UNIQUE,
        modelo DATE NOT NULL,
        fch_vence_seg DATE NOT NULL,
        fch_vence_tecno DATE NOT NULL,
        linea INT(6) NOT NULL,
        url_img VARCHAR(300) NOT NULL,
        CONSTRAINT `pk_placa_vehiculo` PRIMARY KEY (num_placa),
        CONSTRAINT `fk_marca_vehiculo` FOREIGN KEY (linea) REFERENCES linea(id_linea)
    );

INSERT INTO marca (nombre, descripcion, estado)
VALUES (
        "Mazda",
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S"
    ), (
        "Toyota",
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S"
    ), (
        "Ford",
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S"
    ), (
        "Suzuki",
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "N"
    ), (
        "Chevrolet",
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S"
    ), (
        "Volkswagen",
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S"
    ), (
        "Audi",
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S"
    ), (
        "BMW",
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S"
    ), (
        "Mercedes-Benz",
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S"
    ), (
        "Tesla",
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S"
    );

INSERT INTO
    linea (descripcion, estado, nombre_marca)
VALUES (
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S",
        "Tesla"
    ), (
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S",
        "Mazda"
    ), (
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S",
        "Mercedes-Benz"
    ), (
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S",
        "BMW"
    ), (
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S",
        "Audi"
    ), (
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S",
        "Volkswagen"
    ), (
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S",
        "Chevrolet"
    ), (
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S",
        "Suzuki"
    ), (
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S",
        "Toyota"
    ), (
        "Lorem sit amet consectetur adipisicing elit. Reprehenderit, eos!",
        "S",
        "Ford"
    );

INSERT INTO
    vehiculo (
        num_placa,
        modelo,
        fch_vence_seg,
        fch_vence_tecno,
        linea,
        url_img
    )
VALUES (
        "GGU149",
        "2005-04-19",
        "2005-04-19",
        "2005-04-19",
        6,
        "hola.com"
    ), (
        "HUG30F",
        "2022",
        "2023-03-09T05:00:00.000Z",
        "2023-04-29T05:00:00.000Z",
        6,
        "Prueba.com"
    ), (
        "HUG30G",
        "2022",
        "2030-03-09T05:00:00.000Z",
        "2030-04-29T05:00:00.000Z",
        3,
        "Prueba.com"
    ), (
        "PEG01E",
        "2030",
        "2023-03-09T05:00:00.000Z",
        "2023-04-29T05:00:00.000Z",
        6,
        "Prueba.com"
    ), (
        "RIO342",
        "2030",
        "2023-03-09T05:00:00.000Z",
        "2023-04-29T05:00:00.000Z",
        6,
        "Prueba.com"
    ), (
        "RIO842",
        "2030",
        "2023-03-09T05:00:00.000Z",
        "2023-04-29T05:00:00.000Z",
        6,
        "Prueba.com"}];

SELECT MIN(modelo)
FROM vehiculo;

SELECT MAX(modelo)
FROM vehiculo;

SELECT COUNT(modelo)
FROM vehiculo;

SELECT SUM(modelo)
FROM vehiculo;

SELECT AVG(modelo)
FROM vehiculo;

SELECT
    vehiculo.num_placa,
    vehiculo.modelo,
    linea.descripcion,
    marca.descripcion
FROM ( (
        linea
        INNER JOIN vehiculo
        ON vehiculo.linea = linea.id_linea
    )
    INNER JOIN marca
    ON marca.nombre = linea.nombre_marca
);

SELECT COUNT(estado)
FROM linea;

SELECT *
FROM vehiculo
WHERE
    fch_vence_seg >= "2025" AND
    fch_vence_seg <= "2040";