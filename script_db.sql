create database conociendo_argentina;
use conociendo_argentina;

create table usuarios (
	ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	Nombres VARCHAR(100), 
    Apellidos VARCHAR(100), 
    Usuario VARCHAR(100), 
    Correo_Electronico VARCHAR(100), 
    Contraseña VARCHAR(100), 
    Fecha_Nac DATE, 
    Sexo VARCHAR(10),
    Provincia VARCHAR(100),
    Localidad VARCHAR(100)
);

alter table usuarios add Foto_Perfil VARCHAR(500);

select * from usuarios;