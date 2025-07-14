import csv
import json

# Input and output file paths
csv_file_path = "products_asos.csv"   # Adjust if needed
json_file_path = "products_asos.json"

# Read the CSV and convert to JSON
json_list = []
with open(csv_file_path, mode='r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        # Convert 'url' field to a list of URLs
        if 'url' in row and isinstance(row['url'], str):
            try:
                # Try parsing it as a JSON list string (e.g. '["url1", "url2"]')
                row['url'] = json.loads(row['url'].replace("'", '"'))
            except json.JSONDecodeError:
                # Otherwise treat it as comma-separated
                row['url'] = [url.strip() for url in row['url'].split(',') if url.strip()]
        json_list.append(row)

# Write the JSON list to a file
with open(json_file_path, mode='w', encoding='utf-8') as json_file:
    json.dump(json_list, json_file, indent=2)

print(f"✅ JSON saved to {json_file_path}")
