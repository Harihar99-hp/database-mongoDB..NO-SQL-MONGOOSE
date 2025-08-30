//install mongoose and express
// index.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // to parse JSON request body

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 2. Example Schema & Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', UserSchema);

// 3. Routes
app.get('/', (req, res) => {
  res.send('Hello, MongoDB + Node + Express!');
});

// Create user (POST)
app.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// Get users (GET)
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Start server
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
