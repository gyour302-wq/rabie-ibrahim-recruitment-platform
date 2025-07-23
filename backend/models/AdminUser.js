const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In production, this should be hashed
  role: { type: String, default: 'admin' }
}, { timestamps: true });

module.exports = mongoose.model('AdminUser', adminUserSchema);
