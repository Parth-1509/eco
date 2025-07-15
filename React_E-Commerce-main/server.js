const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory user store (for local testing only)
let users = [];

// ✅ Register Route
app.post("/api/user/register", (req, res) => {
  const { name, email, password } = req.body;

  // Validate fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Save user to memory
  users.push({ name, email, password });

  return res.status(201).json({ message: "User registered successfully" });
});

// ✅ Login Route
app.post("/api/user/login", (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Find user
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  return res.status(200).json({
    message: "Login successful",
    user: { name: user.name, email: user.email },
  });
});

// 🟢 Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
