import pandas as pd
import numpy as np

FILE_PATH = "./products_asos.csv"

# Load and trim dataset
df = pd.read_csv(FILE_PATH).head(100)

# Ensure required columns are present
required_columns = ['url', 'name', 'size', 'category', 'price', 'color', 'sku', 'description']
missing = [col for col in required_columns if col not in df.columns]
if missing:
    raise ValueError(f"Missing required columns in CSV: {missing}")

# Create products.csv with exact column order
def create_products_csv(df):
    products = df[required_columns].copy()
    products['id'] = range(1, len(products) + 1)  # Add unique ID starting from 1
    # Reorder columns exactly as per table definition
    ordered_columns = ['url', 'name', 'size', 'category', 'price', 'color', 'sku', 'description', 'id']
    products = products[ordered_columns]
    return products

# Create inventory.csv
def create_inventory_csv(products_df):
    inventory = pd.DataFrame({
        'product_id': products_df['id'],
        'quantity_available': np.random.randint(1, 101, size=len(products_df))  # stock: 1–100
    })
    return inventory

# Generate and save CSVs
products_df = create_products_csv(df)
inventory_df = create_inventory_csv(products_df)

products_df.to_csv("products.csv", index=False)
inventory_df.to_csv("inventory.csv", index=False)

print("✅ CSVs created:")
print(" - products.csv with columns:", list(products_df.columns))
print(" - inventory.csv with columns:", list(inventory_df.columns))
