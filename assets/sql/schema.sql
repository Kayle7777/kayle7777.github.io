DROP DATABASE IF EXISTS github_db;
CREATE DATABASE github_db;
USE github_db;

CREATE TABLE readmes (
  id int AUTO_INCREMENT PRIMARY KEY,
  gitHubName varchar(50),
  name varchar(50) not null,
  repo varchar(100) not null,
  pages varchar(100),
  readme varchar(125) not null,
  date varchar(50) not null,
  description varchar(400)
);
