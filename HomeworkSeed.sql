CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE `products` (
  `ItemID` INT NOT NULL AUTO_INCREMENT,
  `ProductName` VARCHAR(50) NULL,
  `DepartmentName` VARCHAR(50) NULL,
  `Price` DECIMAL(10,2) NULL,
  `StockQuantity` INT NULL,
  PRIMARY KEY (`ItemID`)
);



INSERT INTO `Products` (`ProductName`, `DepartmentName`, `Price`,`StockQuantity`)
VALUES ('toy train set','Kid', '50.00', '100'), 
('macbook pro','electronic', '1500.00', '50'),
('milk','food','3.25','100'),
('Sofa','furniture','1200','10'),
('stove','kitchen','350.00', '20'),
('LCD TV 70 inch','electronic','999.99', '10'),
('dinning table','furniture','500.00', '15'),
('egg','food','1.85', '200'),
('banana','food','1.25', '500'),
('starwars lego set','toy','60.00', '40');




USE Bamazon;
Select * from products;

USE Bamazon;
drop table products;