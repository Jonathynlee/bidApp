
DROP DATABASE IF EXISTS itemDB;

CREATE DATABASE itemDB;

USE itemDB;

CREATE TABLE item (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  category VARCHAR(45) NULL,
  current_bid DECIMAL(10,2) NULL,
  PRIMARY KEY (id)
);

