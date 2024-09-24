ALTER USER 'root'@'localhost' IDENTIFIED BY 'admin';
CREATE DATABASE IF NOT EXISTS dev;
CREATE DATABASE IF NOT EXISTS test;

USE test;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,    
    name VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255),
    age int NOT NULL
);
CREATE TABLE IF NOT EXISTS games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    duration DOUBLE NOT NULL,
    user_id INT,
    score INT,
    risk_score INT,
    zone1_duration TIME,
    zone2_duration TIME,
    zone3_duration TIME
    FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON UPDATE RESTRICT ON DELETE CASCADE    
);