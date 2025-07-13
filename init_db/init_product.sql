-- Create database if not exists
CREATE DATABASE IF NOT EXISTS shokify_product;
USE shokify_product;

-- Create table
CREATE TABLE IF NOT EXISTS products (
    url TEXT,
    name VARCHAR(255),
    size VARCHAR(50),
    category VARCHAR(100),
    price DECIMAL(10,2),
    color VARCHAR(50),
    sku VARCHAR(100),
    description TEXT,
    id INT PRIMARY KEY
);

-- Load CSV data into table
LOAD DATA INFILE '/absolute/path/to/products.csv'
INTO TABLE products
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(url, name, size, category, price, color, sku, description, id);
