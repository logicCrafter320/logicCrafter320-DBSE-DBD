# Real Estate App

A full-stack web application for property listing, discovery, and management.  
Built as part of **DBSE-DBD (Database Software Engineering & Database Design)**.

Buyers can explore properties, calculate EMIs, save favorites, and manage wallets.  
Sellers can upload and manage property listings with location support.

---

## Features

- **Authentication**
  - Email/password signup & login
  - OTP verification
  - Google authentication
  - JWT-based session handling
  - Role-based access (Buyer / Seller)

- **Buyer**
  - Browse and search properties
  - Interactive Google Maps view
  - Save favorites
  - EMI calculator
  - Digital wallet
  - Push notifications

- **Seller**
  - Upload property listings (images, price, location, details)
  - Manage listed properties
  - View buyer interest

- **General**
  - Responsive UI (mobile-first)
  - Offline caching support
  - RESTful API backend
  - Relational MySQL database

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React, Vite, Tailwind CSS           |
| Backend    | Node.js, Express                    |
| Database   | MySQL (`mysql2`)                    |
| Auth       | JWT, OTP (Nodemailer), Google Auth  |
| Maps       | Google Maps API                     |
| Other      | Firebase Cloud Messaging (FCM)      |

---

## Project Structure

├── backend/
│   ├── server.js
│   ├── schema.sql
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── buyer/
│   │   │   ├── seller/
│   │   │   └── shared/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
Getting Started
Prerequisites
Node.js v18 or higher
MySQL Server
Git
Google Maps API key (optional, for maps)
Gmail / SMTP credentials (for OTP emails)
1. Clone the repository
Bash

git clone https://github.com/logicCrafter320/logicCrafter320-DBSE-DBD.git
cd logicCrafter320-DBSE-DBD
2. Database Setup
Create a MySQL database and run the schema:

Bash

mysql -u root -p < backend/schema.sql
Or import backend/schema.sql using MySQL Workbench / phpMyAdmin.

3. Backend Setup
Bash

cd backend
npm install
Create a .env file inside backend/:

env

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=real_estate
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
Start the server:

Bash

npm start
Backend runs at: http://localhost:5000

4. Frontend Setup
Bash

cd ../frontend
npm install
Create a .env file inside frontend/ (if required):

env

VITE_API_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
Start the development server:

Bash

npm run dev
Frontend runs at: http://localhost:5173

Usage
Open http://localhost:5173
Sign up as a Seller → upload properties
Sign up / log in as a Buyer → browse listings, use EMI calculator, save favorites
Use the map view to explore property locations
Database Overview
Main tables (see backend/schema.sql for full details):

users — buyers & sellers (role-based)
properties — listings with price, location, images, seller reference
favorites — many-to-many relation between buyers and properties
wallets / transactions — user balance and payment history
API Overview
Method	Endpoint example	Description
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login & receive JWT
POST	/api/auth/verify-otp	OTP verification
GET	/api/properties	List all properties
POST	/api/properties	Create property (Seller)
GET	/api/favorites	Get user favorites
POST	/api/favorites	Add to favorites
Full route list is available in backend/server.js.

Team
Name	Roll Number	Role
Santosh	2520030330	Developer
Ganesh	2520030252	Developer
Course: DBSE-DBD (Database Software Engineering & Database Design)

License
This project is developed for academic purposes.
Licensed under the MIT License.
