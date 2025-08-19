const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Configure dotenv
dotenv.config();

const app = express();

// Database Connection Function
const connect_DB = async () => {
  try {
    console.log('Attempting to connect to MongoDB with URL:', process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Successfully Connected!');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  }
};

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/user', require('./user_routes/UserRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Server start
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database first
    await connect_DB();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is up and running at port: ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
