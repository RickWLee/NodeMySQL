CREATE DATABASE Bamazon;
USE DATABASE Bamazon;
CREATE TABLE `products` (
  `ItemID` INT NOT NULL AUTO_INCREMENT,
  `ProductName` VARCHAR(50) NULL,
  `DepartmentName` VARCHAR(50) NULL,
  `Price` INT NULL,
  `StockQuantity` INT NULL,
  PRIMARY KEY (`id`)
);