const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  jobTitle: { type: String },
  experience: { type: String },
  skills: { type: String },
  videoUrl: { type: String },
  cvPath: { type: String },
  email: { type: String },
  phone: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
