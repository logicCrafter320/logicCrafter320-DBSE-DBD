require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'real_estate_jwt_secret_2025';

const otpStore = new Map();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'real_estate',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function initDB() {
  try {
    const conn = await db.getConnection();
    console.log('✅ Connected to MySQL Database (real_estate) successfully!');
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50) DEFAULT '',
        password VARCHAR(255) DEFAULT '',
        role ENUM('buyer', 'seller') DEFAULT 'buyer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS properties (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price DECIMAL(12,2) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description TEXT,
        bedrooms INT DEFAULT 3,
        bathrooms INT DEFAULT 2,
        area_sqft INT DEFAULT 1200,
        image_url TEXT,
        seller_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    conn.release();
  } catch (err) {
    console.error('⚠️ MySQL Init Error:', err.message);
  }
}
initDB();

function generateOTP(email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000;
  otpStore.set(email.toLowerCase(), { otp, expiresAt });

  console.log(`\n==============================================`);
  console.log(`📲 [OTP GENERATED] Email: ${email}`);
  console.log(`🔑 Verification Code: ${otp}`);
  console.log(`⏱️ Valid for 10 minutes`);
  console.log(`==============================================\n`);
  return otp;
}

// Google Auth
const handleGoogleAuth = async (req, res) => {
  try {
    const { email, name, role } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const targetRole = role === 'seller' ? 'seller' : 'buyer';
    const userEmail = email.trim().toLowerCase();
    const userName = name || 'Google User';

    let user;
    try {
      let [rows] = await db.query('SELECT * FROM users WHERE email = ?', [userEmail]);
      if (rows.length === 0) {
        const [result] = await db.query(
          'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
          [userName, userEmail, targetRole]
        );
        user = { id: result.insertId, name: userName, email: userEmail, role: targetRole };
        console.log(`✅ GOOGLE USER: ${userEmail} as ${targetRole}`);
      } else {
        user = rows[0];
        if (user.role !== targetRole) {
          await db.query('UPDATE users SET role = ? WHERE id = ?', [targetRole, user.id]);
          user.role = targetRole;
        }
      }
    } catch {
      user = { id: Date.now(), name: userName, email: userEmail, role: targetRole };
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Google Auth Server Error' });
  }
};
app.post('/auth/google', handleGoogleAuth);
app.post('/api/auth/google', handleGoogleAuth);

// Login
const handleLogin = async (req, res) => {
  try {
    const { email, role } = req.body;
    const userEmail = email ? email.trim().toLowerCase() : '';
    const targetRole = role === 'seller' ? 'seller' : 'buyer';
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [userEmail]);
    let user = rows.length > 0 ? rows[0] : { id: 1, name: 'User', email: userEmail, role: targetRole };
    if (user.role !== targetRole) {
      await db.query('UPDATE users SET role = ? WHERE id = ?', [targetRole, user.id]);
      user.role = targetRole;
    }
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch {
    res.status(500).json({ error: 'Login Error' });
  }
};
app.post('/auth/login', handleLogin);
app.post('/api/auth/login', handleLogin);

// Signup + OTP
const handleSignup = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    const userEmail = email ? email.trim().toLowerCase() : '';
    const userRole = role === 'seller' ? 'seller' : 'buyer';
    if (!userEmail) return res.status(400).json({ error: 'Email is required' });

    try {
      const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [userEmail]);
      if (existing.length > 0) {
        return res.status(400).json({ error: 'Email already registered. Please log in.' });
      }
      await db.query(
        'INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
        [name || 'New User', userEmail, phone || '', password || '', userRole]
      );
    } catch (e) {
      console.warn('Signup DB:', e.message);
    }

    generateOTP(userEmail);
    res.json({ message: 'Signup successful! OTP generated.', email: userEmail });
  } catch {
    res.status(500).json({ error: 'Signup Server Error' });
  }
};
app.post('/auth/signup', handleSignup);
app.post('/api/auth/signup', handleSignup);

// Send / Resend OTP
const handleSendOTP = async (req, res) => {
  try {
    const userEmail = req.body.email ? req.body.email.trim().toLowerCase() : '';
    if (!userEmail) return res.status(400).json({ error: 'Email is required.' });
    generateOTP(userEmail);
    res.json({ message: 'OTP generated. Check backend terminal.', email: userEmail });
  } catch {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};
app.post('/auth/send-otp', handleSendOTP);
app.post('/api/auth/send-otp', handleSendOTP);

// Forgot Password → generates OTP in backend
const handleForgotPassword = async (req, res) => {
  try {
    const userEmail = req.body.email ? req.body.email.trim().toLowerCase() : '';
    if (!userEmail) return res.status(400).json({ error: 'Email is required.' });

    console.log(`\n🔐 FORGOT PASSWORD request for: ${userEmail}`);
    generateOTP(userEmail);

    res.json({
      message: 'Password reset code generated. Check backend terminal for OTP.',
      email: userEmail
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send reset code' });
  }
};
app.post('/auth/forgot-password', handleForgotPassword);
app.post('/api/auth/forgot-password', handleForgotPassword);

// Verify OTP (signup + reset)
const handleVerifyOTP = async (req, res) => {
  try {
    const { email, otp, purpose } = req.body;
    const userEmail = email ? email.trim().toLowerCase() : '';
    const storedData = otpStore.get(userEmail);

    if (!storedData) {
      return res.status(400).json({ message: 'No OTP requested or it expired.' });
    }
    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(userEmail);
      return res.status(400).json({ message: 'OTP expired. Request a new code.' });
    }
    if (storedData.otp !== String(otp).trim()) {
      return res.status(400).json({ message: 'Invalid OTP code.' });
    }

    otpStore.delete(userEmail);

    let user = { id: 1, name: 'User', email: userEmail, role: 'buyer' };
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [userEmail]);
      if (rows.length > 0) user = rows[0];
    } catch (_) {}

    console.log(`✅ [OTP VERIFIED] ${userEmail} (purpose: ${purpose || 'signup'}) as ${user.role}`);

    // For password reset we don't force login token if you prefer — still return success
    if (purpose === 'reset') {
      return res.json({
        message: 'Reset code verified successfully',
        email: userEmail,
        verified: true
      });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'OTP verification failed' });
  }
};
app.post('/auth/verify-otp', handleVerifyOTP);
app.post('/api/auth/verify-otp', handleVerifyOTP);

// Properties
app.get(['/properties', '/api/properties'], async (req, res) => {
  try {
    const [properties] = await db.query('SELECT * FROM properties ORDER BY id DESC');
    res.json(properties);
  } catch {
    res.json([]);
  }
});

app.post(['/properties', '/api/properties'], async (req, res) => {
  try {
    const { title, price, location, description, bedrooms, bathrooms, area_sqft, image_url } = req.body;
    const [result] = await db.query(
      'INSERT INTO properties (title, price, location, description, bedrooms, bathrooms, area_sqft, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, price, location, description || '', bedrooms || 3, bathrooms || 2, area_sqft || 1200, image_url || '']
    );
    res.json({ message: 'Property uploaded successfully', id: result.insertId });
  } catch {
    res.status(500).json({ error: 'Failed to create property' });
  }
});

app.post(['/properties/:id/favorite', '/api/properties/:id/favorite'], (req, res) => {
  res.json({ message: 'Property saved to favorites' });
});

app.listen(5000, () => {
  console.log(`\n🚀 Backend running on http://localhost:${5000}`);
  console.log(`📲 OTP + Forgot Password active — codes print here.\n`);
});