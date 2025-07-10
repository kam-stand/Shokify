import pandas as pd

FILE_PATH = "./products_asos.csv"

df = pd.read_csv(FILE_PATH)

print(df.columns)
print(len(df["sku"]))

print(len(df["name"]))

print(df.info())
# CREATING A SCRIPT TO PROCESS DATA FOR FRONT_END AND BACKEND

########### FRONT_END #################
# 1. Only need sku, category, images, name
# 2. Take the columns you need and create a Json object for each row given the params
# 3. the json object should look like:
            # {
            #     name : "coat",
            #     category : "winter", 
            #     sku: 125678,
            #     images : [https://link.com, ....],
            # }
# 4. After parsing each row you will obtain and list of JSON objects


############# BACKEND ##################
# 1. Need sku, price, size, category
# 2. The data needed for backend only is used to process transactions
# 3. Transactions: CART, PRODUCT, ORDER, SHIPPING, SEARCH