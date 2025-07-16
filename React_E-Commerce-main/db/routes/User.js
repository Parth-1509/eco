const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// 👇 THIS defines the /register route
router.post('/register', registerUser);

// Optional: test route
router.get('/test', (req, res) => {
  res.send("User route working ✅");
});

router.post('/login', loginUser);

module.exports = router;
