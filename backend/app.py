# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from bson.objectid import ObjectId
from collections import Counter
import bcrypt
import os
import pandas as pd


app = Flask(__name__)
CORS(app)

# Configuration
# app.config['JWT_SECRET_KEY'] = ''
jwt = JWTManager(app)

# MongoDB Setup
MONGO_URI = 'mongodb://localhost:27017/'
client = MongoClient(MONGO_URI)
db = client['HCI']
users_collection = db['users']

# # Load EV sales data (assuming the CSV is stored in the same directory)
# EV_SALES_CSV = 'ev_sales_data.csv'
# ev_sales_df = pd.read_csv(EV_SALES_CSV)  # You can process or filter the data here

# Helper Functions
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed)

# Routes

# Data Collection
df = pd.read_csv("../Data/Groceries_dataset.csv")
print(df.head())
@app.route('/api/ev_sales', methods=['GET'])
@jwt_required()
def get_ev_sales():
    # Count occurrences of each 'itemDescription'
    item_counts = Counter(df['itemDescription'])

    # Convert the counter to a list of dictionaries for JSON serialization
    item_counts_data = sorted(
        [{'itemDescription': item, 'Count': count} for item, count in item_counts.items()],
        key=lambda x: x['Count'], 
        reverse=True
    )[:15]
    
    # # Converting DataFrame to dictionary
    # data = df.to_dict(orient='records')
    return jsonify(item_counts_data)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"msg": "Username and password required"}), 400

    if users_collection.find_one({"username": username}):
        return jsonify({"msg": "Username already exists"}), 409

    hashed_pw = hash_password(password)
    user_id = users_collection.insert_one({
        "username": username,
        "password": hashed_pw
    }).inserted_id

    return jsonify({"msg": "User created", "user_id": str(user_id)}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"msg": "Username and password required"}), 400

    user = users_collection.find_one({"username": username})
    if not user or not check_password(password, user['password']):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user['_id']))
    return jsonify({"access_token": access_token}), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    user = users_collection.find_one({"_id": ObjectId(current_user)})
    return jsonify({"logged_in_as": user['username']}), 200

if __name__ == '__main__':
    app.run(debug=True)
