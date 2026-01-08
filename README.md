# News Aggregator API

A secure RESTful API built with **Node.js**, **Express**, and **MongoDB** that delivers a personalized news experience. Users can manage their preferences and receive curated news feeds from the GNews API.

## 🚀 Features

* **Secure Authentication**: User registration and login using `bcrypt` for password hashing and `JWT` for secure session management.
* **Preference Management**: Endpoints to set and update personalized news categories (e.g., technology, sports, comics).
* **Personalized News Feed**: Integrated with **GNews API** to fetch real-time articles based on specific user interests.
* **Protected Routes**: Middleware implementation to ensure only authenticated users can access news and preferences.
* **Error Handling**: Comprehensive validation for missing fields, duplicate users, and unauthorized access.

## 🛠️ Tech Stack

* **Server**: Node.js & Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Security**: JSON Web Tokens (JWT) & bcrypt
* **HTTP Client**: Fetch API (Native Node.js)
* **Testing**: Tap & Supertest

## 📋 Prerequisites

* Node.js (v18.0.0 or higher)
* A running MongoDB instance (Local or Atlas)
* A GNews API Key (Available at [gnews.io](https://gnews.io/))

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd news-aggregator-api

2. **Install dependencies**:
    npm install

3. **Configure Environment Variables: Create a .env file in the root directory and add the following:**:
    PORT=3000
    DB_Host=mongodb://127.0.0.1:27017/
    DB_Name=news-aggregator
    JWT_SECRET=SHIVANSH
    GNEWS_API_KEY=c3a0670de79c45415c79089283939973

🧪 Running Tests
This project includes a comprehensive test suite to ensure all API functionalities work as expected. To run the tests:
    npm run test
    
🛣️ API Endpoints
Authentication

Method,Endpoint,Description
POST,/users/signup,Register a new user
POST,/users/login,Authenticate user and return JWT

User Preferences (Auth Required)
Method,Endpoint,Description
GET,/users/preferences,Retrieve saved news categories
PUT,/users/preferences,Update news categories

News (Auth Required)
Method,Endpoint,Description
GET,/news,Fetch articles based on preferences
