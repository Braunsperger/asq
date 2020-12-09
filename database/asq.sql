CREATE DATABASE IF NOT EXISTS 
	angular_db;

USE 
	angular_db;
    
CREATE TABLE IF NOT EXISTS
	asq
    (
      id INT(11) AUTO_INCREMENT PRIMARY KEY,
      codproc INT(11) NOT NULL,
      idade INT(11) NOT NULL,
      sexo TINYINT(1) NOT NULL,
      perm TINYINT(1) NOT NULL
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO
  asq (codproc, idade, sexo, perm)
VALUES
  (1234, 10, 0, 1),
  (4567, 20, 0, 1),
  (6789, 10, 1, 1),
  (6789, 10, 1, 1),
  (1234, 20, 1, 1),
  (4567, 30, 1, 1);