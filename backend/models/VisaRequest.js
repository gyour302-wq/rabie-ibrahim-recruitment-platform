const mongoose = require('mongoose');

const visaRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  passportNumber: { type: String, required: true },
  serviceType: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('VisaRequest', visaRequestSchema);
