import pandas as pd

df = pd.read_csv("haircare_only.csv")

result = df[
    (df["Problem"] == "Hair Fall") &
    (
        (df["Skin_or_Hair_Type"] == "Dry") |
        (df["Skin_or_Hair_Type"] == "All")
    )
]

print(result)