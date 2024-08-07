# Instrucciones para instalación de aplicación

1. Descargar el proyecto con el siguiente comando
  ```
     git clone git@github.com:Desarollo-Web/backend-web-integral.git
  ```
2. Una vez descargado cambiarse al directorio de proyecto con el siguiente comando
```
     cd backend-web-integral
```
7.   Instalar dependencias
```
     npm install
```
8.   Construir el proyecto con comando
```  
     npm run build
```
10.   Ejecutar aplicación
```  
     npm run dev
```




## Configuración de la Base de Datos

1. Crear la base de datos llamada **backend**
```
create database backend;
use backend;
```
2. Crear la tabla  **tbl_usuario**
```
create table tbl_usuario(
  username varchar(30) primary key,
  password varchar(20) not null,
  role varchar(30) not null
);
```
3.   Insertar un registro
```
Insert into tbl_usuario(username, password, role) Values
 ('gbarron','12345678', 'profesor');
```
4.   
