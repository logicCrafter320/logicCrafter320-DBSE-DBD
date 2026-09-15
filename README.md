<div align="center">

```text
 ██████╗ ███████╗ █████╗ ██╗      ███████╗███████╗████████╗ █████╗ ████████╗███████╗
 ██╔══██╗██╔════╝██╔══██╗██║      ██╔════╝██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
 ██████╔╝█████╗  ███████║██║      █████╗  ███████╗   ██║   ███████║   ██║   █████╗  
 ██╔══██╗██╔══╝  ██╔══██║██║      ██╔══╝  ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  
 ██║  ██║███████╗██║  ██║███████╗ ███████╗███████║   ██║   ██║  ██║   ██║   ███████╗
 ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝ ╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝
                            S Y S T E M
A Full-Stack Database-Driven Property Management & Discovery Platform
Every user is an entity. Every property is a structured record. Built with React, Node.js, and MySQL.

<br>
React
Node.js
MySQL
Tailwind
License

<br>
Overview · The Problem · How It Works · Architecture · Features · Tech Stack · Database Schema · Getting Started · Team

</div><br>
 Overview
The modern real estate market requires fast, reliable, and secure platforms to connect buyers with sellers. However, handling property coordinates, multimedia uploads, secure authentication, and real-time notifications requires a robust, well-designed backend and a highly responsive frontend.

Real Estate System solves this by bridging a high-performance React + Vite frontend with a secure, heavily-normalized MySQL & Node.js database backend.

<div align="center">
Physical World	→	Digital Architecture
Property Listing	→	Relational DB Record (Images, Pricing, Loc)
Buyer / Seller	→	Role-Based Authenticated JWT User
Location	→	Google Maps API Integration
Financial Planning	→	Dynamic EMI Calculator
</div>
[!IMPORTANT]
This project was developed as part of DBSE-DBD (Database Software Engineering & Database Design). The focus is heavily on proper relational database design, secure API routing, and a seamless client-server architecture.

<br>
 The Problem
Property discovery is often fragmented. Users need a centralized platform where they can:

Securely log in and manage profiles (Buyers vs. Sellers).
Easily estimate costs (EMI calculators).
View exact property locations on interactive maps.
Save favorites and maintain a digital wallet.
<br>
 How It Works
mermaid

flowchart LR
    C[Client<br/>React/Vite] <-->|JSON / REST API| API[API Gateway<br/>Node.js & Express]
    
    API <--> Auth[Auth Service<br/>OTP & JWT]
    API <--> Map[Location Service<br/>Google Maps API]
    API <--> Push[Notification Service<br/>FCM Push]
    
    API <--> |SQL Queries| DB[(MySQL<br/>Database)]
    
    style C fill:#0f172a,color:#38bdf8
    style API fill:#14532d,color:#4ade80
    style DB fill:#075985,color:#7dd3fc
Capability	Implementation
Authentication	JWT tokens, OTP Verification, and Google Auth
Property Mapping	GooglePropertyMap.jsx handling geocoding
Data Persistence	Relational schema.sql executed via mysql2
Financial Tools	EmiCalc.jsx for real-time mortgage math
Notifications	FCM (Firebase Cloud Messaging) integration
<br>
🏗 Architecture
mermaid

graph TD
    subgraph Frontend[" Client Presentation (React)"]
        UI[Pages: Auth, Buyer, Seller, Shared]
        Comp[Components: Modals, Nav, Maps]
        State[Services: Offline Cache, Favorites]
    end
    subgraph Backend[" Core Engine (Node.js)"]
        Routes[Express Routes]
        Mid[Middleware: Auth, Error Handling]
        Mail[Nodemailer / Communications]
    end
    subgraph Storage[" Database (MySQL)"]
        Rel[(Normalized Relational Tables)]
    end

    UI --> Comp
    Comp --> State
    State --> Routes
    Routes --> Mid
    Mid --> Rel
    Routes --> Mail

    style Frontend fill:#1e1b4b,color:#fff
    style Backend fill:#312e81,color:#fff
    style Storage fill:#4338ca,color:#fff
<br>
 Features
 Role-Based Authentication: Secure Login, Signup, and OTP Verification for Buyers and Sellers.
 Interactive Property Maps: Integrated Google Maps for precise property location viewing.
 Financial Utilities: Built-in EMI Calculator and built-in "My Wallet" management.
 Seller Dashboard: Dedicated interfaces to upload properties, manage listings, and view buyer interest.
 Buyer Tools: Save properties to Favorites, offline caching for faster loads, and advanced search filtering.
 Responsive UI: Built with Tailwind CSS, featuring bottom navigation for mobile-first experiences.
 Real-Time Alerts: FCM Push Notifications to keep users updated on property status.
<br>
 Tech Stack
<div align="center">
Category	Tools
Frontend Framework	ReactVite
Styling	Tailwind
Backend API	NodeExpress
Database	MySQLmysql2 driver
Auth & Security	JWT (jws), Nodemailer (OTP), Google Auth
Dev Environment	VSCode
</div><br>
 Database Schema Highlights
The backend relies on a strictly designed MySQL relational database (schema.sql). Key entities include:

Users Table: Handles generic data, passwords (hashed), and role differentiation (ENUM('buyer', 'seller')).
Properties Table: Linked via Foreign Key to Sellers. Stores pricing, coordinates, descriptions, and media links.
Favorites Table: Junction table tracking Many-to-Many relationships between Buyers and Properties.
Wallets/Transactions: Tracks platform currency, deposits, and status.
<br>
 Getting Started
Prerequisites
Node.js (v18+)
MySQL Server running locally or remotely
Git
Installation
Bash

# 1. Clone the repository
git clone https://github.com/logicCrafter320/logicCrafter320-DBSE-DBD.git
cd logicCrafter320-DBSE-DBD

# 2. Setup the Database
# Run the provided schema file in your MySQL environment
mysql -u root -p < backend/schema.sql

# 3. Install Backend Dependencies & Start Server
cd backend
npm install
# Create a .env file with your DB credentials, JWT secrets, etc.
npm start

# 4. Install Frontend Dependencies & Start Client
cd ../frontend
npm install
npm run dev
Quick Usage
Open http://localhost:5173 in your browser.
Sign up as a Seller to list a property (upload images, set coordinates).
Log in as a Buyer to view the property map, calculate EMIs, and save to favorites.
<br>
 Expected Outcome
 A fully functional, full-stack real estate marketplace.
 Demonstrates secure CRUD operations via Express & MySQL.
 Seamless user experience with offline caching and mobile-friendly UI.
 Implementation of third-party APIs (Google Maps, Firebase).
<br>
👥 Team
<div align="center">
Name	Roll Number	Role/Focus
Santosh	2520030330	Developer
Ganesh	2520030252	Developer
DBSE-DBD (Database Software Engineering & Database Design)

</div><br>
