import pandas as pd

df = pd.read_csv("haircare_only.csv")

print("Problems:")
print(df["Problem"].unique())

print("\nHair Types:")
print(df["Skin_or_Hair_Type"].unique())