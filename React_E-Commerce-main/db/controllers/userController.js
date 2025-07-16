const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ _id: user._id, username: user.username, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    res.json({
      token,
      _id: user._id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};
