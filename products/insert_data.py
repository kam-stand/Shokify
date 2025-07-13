import pandas as pd
import mysql.connector
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

ROOT_USER = os.getenv("MYSQL_ROOT_USER")
ROOT_PASSWORD = os.getenv("MYSQL_ROOT_PASSWORD")
HOST = os.getenv("MYSQL_HOST")

# Load CSVs
products_df = pd.read_csv("products.csv")
inventory_df = pd.read_csv("inventory.csv")

def insert_products():
    conn = mysql.connector.connect(
        host=HOST,
        user=ROOT_USER,
        password=ROOT_PASSWORD,
        database="shokify_product"
    )
    cursor = conn.cursor()

    insert_query = """
        INSERT IGNORE INTO products (url, name, size, category, price, color, sku, description, id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    data = [
        (
            row['url'], row['name'], row['size'], row['category'],
            row['price'], row['color'], row['sku'], row['description'], int(row['id'])
        )
        for _, row in products_df.iterrows()
    ]

    cursor.executemany(insert_query, data)
    conn.commit()
    print(f"✅ Inserted {cursor.rowcount} new rows into shokify_product.products")
    conn.close()

def insert_inventory():
    conn = mysql.connector.connect(
        host=HOST,
        user=ROOT_USER,
        password=ROOT_PASSWORD,
        database="shokify_inventory"
    )
    cursor = conn.cursor()

    insert_query = """
        INSERT IGNORE INTO inventory (product_id, quantity_available)
        VALUES (%s, %s)
    """

    data = [
        (int(row['product_id']), int(row['quantity_available']))
        for _, row in inventory_df.iterrows()
    ]

    cursor.executemany(insert_query, data)
    conn.commit()
    print(f"✅ Inserted {cursor.rowcount} new rows into shokify_inventory.inventory")
    conn.close()

# Run both inserts
insert_products()
insert_inventory()
