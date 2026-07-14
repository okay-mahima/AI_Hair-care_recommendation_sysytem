import pandas as pd

df = pd.read_csv("organic_naturalcare.csv/dataset.csv")

hair_df = df[df["Category"] == "Haircare"]

hair_df.to_csv("haircare_only.csv", index=False)

print(hair_df.head())
print("Haircare dataset saved")

