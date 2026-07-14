from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# ================= USER STORAGE =================
users = []
history = {}

# ================= LOAD DATASET =================
try:
    df = pd.read_csv("haircare_only.csv")
    df.fillna("", inplace=True)

    df["Category"] = df["Category"].str.strip().str.lower()
    df["Problem"] = df["Problem"].str.strip().str.lower()
    df["Skin_or_Hair_Type"] = df["Skin_or_Hair_Type"].str.strip().str.lower()

    print("✅ Dataset Loaded Successfully")

except Exception as e:
    print("❌ Dataset Error:", e)
    df = pd.DataFrame()

# ================= HOME =================
@app.route("/")
def home():
    return jsonify({
        "message": "AI Beauty Care Backend Running"
    })

# ================= SIGNUP =================
@app.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()

        username = data.get("username", "").strip()
        password = data.get("password", "").strip()

        if not username or not password:
            return jsonify({
                "message": "Username and password required"
            }), 400

        for user in users:
            if user["username"] == username:
                return jsonify({
                    "message": "User already exists"
                }), 400

        users.append({
            "username": username,
            "password": password
        })

        history[username] = []

        return jsonify({
            "message": "Signup successful"
        }), 200

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500

# ================= LOGIN =================
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        username = data.get("username", "").strip()
        password = data.get("password", "").strip()

        for user in users:
            if user["username"] == username and user["password"] == password:
                return jsonify({
                    "message": "Login successful",
                    "username": username
                }), 200

        return jsonify({
            "message": "Invalid username or password"
        }), 401

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500

# ================= RECOMMEND =================
@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.get_json()

        problem = data.get("problem", "").strip().lower()
        hair_type = data.get("hair_type", "").strip().lower()
        username = data.get("username", "").strip()

        if df.empty:
            return jsonify({
                "message": "Dataset not available"
            }), 500

        filtered = df[
            (df["Category"] == "haircare") &
            (df["Problem"] == problem) &
            (
                (df["Skin_or_Hair_Type"] == hair_type) |
                (df["Skin_or_Hair_Type"] == "all")
            )
        ]

        if filtered.empty:
            return jsonify({
                "message": "No recommendation found"
            }), 404

        recommendations = []

        for _, row in filtered.head(3).iterrows():
            item = {
                "ingredients": row["Ingredients"],
                "preparation": row["Preparation"],
                "usage": row["Usage"],
                "frequency": row["Frequency"],
                "precautions": row["Precautions"]
            }
            recommendations.append(item)

        if username in history:
            history[username].append({
                "problem": problem,
                "hair_type": hair_type
            })

        return jsonify({
            "count": len(recommendations),
            "recommendations": recommendations
        }), 200

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500

# ================= DASHBOARD =================
@app.route("/dashboard/<username>", methods=["GET"])
def dashboard(username):
    if username not in history:
        return jsonify({
            "history": []
        })

    return jsonify({
        "history": history[username]
    })

# ================= CHATBOT =================
@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json()
    message = data.get("message", "").lower()

    reply = "I can help with hair fall, dandruff, dry hair and beauty care."

    if "hair fall" in message:
        reply = "Hair fall can be reduced using onion juice, amla and coconut oil."

    elif "dandruff" in message:
        reply = "Use neem, aloe vera or tea tree oil for dandruff."

    elif "dry hair" in message:
        reply = "Use coconut oil, curd or aloe vera for dry hair."

    return jsonify({
        "reply": reply
    })

# ================= RUN =================
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)