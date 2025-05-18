CREATE DATABASE user_db;

USE user_db;

CREATE TABLE user (
    userID VARCHAR(20),
    userPassword VARCHAR(20),
    userName VARCHAR(50),
    userBirth CHAR(6),
    userPhone VARCHAR(15),
    PRIMARY KEY (userID)
);