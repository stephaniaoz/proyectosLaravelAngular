CREATE DATABASE IF NOT EXIST iusercontable;
USE iusercontable;

CREATE TABLE users(
  users_id int(255) auto_increment not null,
  users_email varchar(255),
  users_role varchar(20),
  users_name varchar(255),
  users_surname varchar(255),
  users_password varchar(255),
  created_at datetime DEFAULT NULL,
  updated_at datetime DEFAULT NULL,
  users_remember_token varchar(255),
  CONSTRAINT pk_users PRIMARY KEY(users_id)
)ENGINE=InnoDb;

CREATE TABLE pais(
  pais_id int(255) auto_increment not null,
  pais_nombre varchar(255) not null,
  pais_status varchar(30),
  created_at datetime DEFAULT NULL,
  updated_at datetime DEFAULT NULL,
  user_id int(255) not null,
  CONSTRAINT pk_pais PRIMARY KEY(pais_id),
  CONSTRAINT fk_pais_users FOREIGN KEY(user_id) REFERENCES users(users_id)
)ENGINE=InnoDb;
