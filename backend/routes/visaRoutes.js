const express = require('express');
const router = express.Router();
const VisaRequest = require('../models/VisaRequest');

// GET /api/visa-requests - Get all visa service requests (admin view)
router.get('/', async (req, res) => {
  try {
    const visaRequests = await VisaRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data: visaRequests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/visa-requests/:id - Get specific visa request details
router.get('/:id', async (req, res) => {
  try {
    const visaRequest = await VisaRequest.findById(req.params.id);
    if (!visaRequest) {
      return res.status(404).json({ success: false, message: 'Visa request not found' });
    }
    res.json({ success: true, data: visaRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/visa-requests - Submit visa service request
router.post('/', async (req, res) => {
  try {
    const { name, passportNumber, serviceType, phone, notes } = req.body;
    
    // Validate required fields
    if (!name || !passportNumber || !serviceType || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, passport number, service type, and phone are required' 
      });
    }

    const newVisaRequest = new VisaRequest({
      name,
      passportNumber,
      serviceType,
      phone,
      notes
    });

    const savedVisaRequest = await newVisaRequest.save();
    res.status(201).json({ 
      success: true, 
      message: 'Visa service request submitted successfully',
      data: savedVisaRequest 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/visa-requests/:id - Update visa request (admin only)
router.put('/:id', async (req, res) => {
  try {
    const updatedVisaRequest = await VisaRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVisaRequest) {
      return res.status(404).json({ success: false, message: 'Visa request not found' });
    }
    res.json({ success: true, data: updatedVisaRequest });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/visa-requests/:id - Delete visa request
router.delete('/:id', async (req, res) => {
  try {
    const deletedVisaRequest = await VisaRequest.findByIdAndDelete(req.params.id);
    if (!deletedVisaRequest) {
      return res.status(404).json({ success: false, message: 'Visa request not found' });
    }
    res.json({ success: true, message: 'Visa request deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
