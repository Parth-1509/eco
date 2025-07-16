require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  maxPoolSize: 10
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.error('❌ Connection Failed:', err.message);
  process.exit(1);
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// API routes
const userRoutes = require('./routes/User');


app.use('/api/users', userRoutes);

// 404 Catch-all
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Serverconst
 PORT = process.env.BACKEND_PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🛡️  CORS-enabled for ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});
