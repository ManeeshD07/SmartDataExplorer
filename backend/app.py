# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from bson.objectid import ObjectId
import bcrypt
import os

app = Flask(__name__)
CORS(app)

# Configuration
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Change this!
jwt = JWTManager(app)

# MongoDB Setup
MONGO_URI = 'mongodb://localhost:27017/'  # Change if using MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client['HCI']
users_collection = db['users']

# Helper Functions
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed)

# Routes

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
