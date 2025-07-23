require('dotenv').config();

module.exports = {
  dbURI: process.env.DB_URI || 'mongodb://localhost:27017/rabie-ibrahim',
  port: process.env.PORT || 5000,
  // Add other environment variables here as needed
};
