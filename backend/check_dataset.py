import pandas as pd

df = pd.read_csv("organic_naturalcare.csv/dataset.csv")


print(df["Skin_or_Hair_Type"].unique())