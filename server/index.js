const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Configure dotenv early
dotenv.config();

// Extensive logging for debugging
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('Directory contents:', fs.readdirSync('.'));

// Robust module resolution
let connect_DB;
try {
  // Try multiple potential paths
  const possiblePaths = [
    path.join(__dirname, 'connect_DB', 'connect_DB.js'),
    path.join(__dirname, 'connect_DB.js'),
    './connect_DB/connect_DB.js'
  ];

  for (const modulePath of possiblePaths) {
    try {
      console.log(`Attempting to resolve module from: ${modulePath}`);
      connect_DB = require(modulePath);
      console.log(`Successfully loaded connect_DB from: ${modulePath}`);
      break;
    } catch (resolveError) {
      console.log(`Failed to load from ${modulePath}:`, resolveError.message);
    }
  }

  if (!connect_DB) {
    throw new Error('Could not find connect_DB module');
  }
} catch (error) {
  console.error('Critical error loading connect_DB module:', error);
  process.exit(1);
}

// Extensive environment logging
console.log('Environment Variables:');
console.log('DB_URL:', process.env.DB_URL ? 'Present' : 'Missing');
console.log('PORT:', process.env.PORT);

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/user', require('./user_routes/UserRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

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
