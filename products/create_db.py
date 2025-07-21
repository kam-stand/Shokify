import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

ROOT_USER = os.getenv("MYSQL_ROOT_USER")
ROOT_PASSWORD = os.getenv("MYSQL_ROOT_PASSWORD")
HOST = os.getenv("MYSQL_HOST")

# Initial connection (no DB specified)
mydb = mysql.connector.connect(
    host=HOST,
    user=ROOT_USER,
    password=ROOT_PASSWORD
)
mycursor = mydb.cursor()

def create_database(cursor, db_name):
    cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name}")
    print(f"✅ Database '{db_name}' created or already exists.")

def create_products_db(name="shokify_product"):
    create_database(mycursor, name)
    conn = mysql.connector.connect(
        host=HOST,
        user=ROOT_USER,
        password=ROOT_PASSWORD,
        database=name
    )
    cursor = conn.cursor()
    cursor.execute("""
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
    )
""")

    print(f"✅ 'products' table created in {name}")
    conn.close()

def create_inventory_db(name="shokify_inventory"):
    create_database(mycursor, name)
    conn = mysql.connector.connect(
        host=HOST,
        user=ROOT_USER,
        password=ROOT_PASSWORD,
        database=name
    )
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS inventory (
            product_id INT PRIMARY KEY,
            quantity_available INT
        )
    """)
    print(f"✅ 'inventory' table created in {name}")
    conn.close()
def create_order_db(name="shokify_order"):
    create_database(mycursor, name)
    conn = mysql.connector.connect(
        host=HOST,
        user=ROOT_USER,
        password=ROOT_PASSWORD,
        database=name
    )
    cursor = conn.cursor()

    # Orders Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            order_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            status VARCHAR(50),
            total DECIMAL(10,2)
        )
    """)

    # Order Items Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS order_items (
            item_id INT AUTO_INCREMENT PRIMARY KEY,
            order_id INT,
            product_id INT,
            quantity INT,
            price_at_time DECIMAL(10,2),
            FOREIGN KEY (order_id) REFERENCES orders(order_id)
        )
    """)

    # Cart Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS cart (
            cart_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT
        )
    """)

    # Cart Items Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS cart_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            cart_id INT,
            product_id INT,
            quantity INT,
            FOREIGN KEY (cart_id) REFERENCES cart(cart_id)
        )
    """)

    print(f"✅ 'orders', 'order_items', 'cart', and 'cart_items' tables created in {name}")
    conn.close()


def create_user_db(name="shokify_user"):
    create_database(mycursor, name)
    conn = mysql.connector.connect(
        host=HOST,
        user=ROOT_USER,
        password=ROOT_PASSWORD,
        database=name
    )
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(255) UNIQUE,
            password_hash VARCHAR(255),
            role VARCHAR(50)
        )
    """)
    print(f"✅ 'users' table created in {name}")
    conn.close()


# Call all the setup functions
create_products_db()
create_inventory_db()
create_order_db()
create_user_db()

print("🎉 All databases and tables are set up!")
