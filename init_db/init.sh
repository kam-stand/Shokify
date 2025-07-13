#!/bin/bash
set -e

echo -e "Hello, we are initializing the database\n"
echo "Recall to fill in the .env file inside the products directory of the root project."

echo "Ensuring no database with 'shokify' is created in MySQL."

echo "Creating database by running '../products/create_db.py'..."

cd ../products

python3 create_db.py

echo "Creating CSV files to insert into database..."

python3 process_data.py

echo "Inserting data into products and inventory databases..."

python3 insert_data.py