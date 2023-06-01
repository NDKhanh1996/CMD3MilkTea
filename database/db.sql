CREATE DATABASE case_md3;
USE case_md3;
    
CREATE TABLE products(
productId INT PRIMARY KEY AUTO_INCREMENT,
productName VARCHAR(255) NOT NULL,
price INT NOT NULL,
quantity INT NOT NULL,
description VARCHAR(255) NOT NULL,
categoryId INT,
FOREIGN KEY(categoryId) REFERENCES categories(categoryId),
image TEXT
);

CREATE TABLE categories(
    categoryId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    categoryName VARCHAR(255)
);

CREATE TABLE users(
    userId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);