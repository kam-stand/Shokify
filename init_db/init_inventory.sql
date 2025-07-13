CREATE DATABASE IF NOT EXISTS shokify_inventory;
USE shokify_inventory;

CREATE TABLE IF NOT EXISTS inventory (
    product_id INT PRIMARY KEY,
    quantity_available INT
);

LOAD DATA INFILE '/absolute/path/to/inventory.csv'
INTO TABLE inventory
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(product_id, quantity_available);
