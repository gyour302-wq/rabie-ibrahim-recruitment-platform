const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET /api/contact - Get all contact form submissions (admin view)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/contact/:id - Get specific contact submission
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact submission not found' });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }

    const newContact = new Contact({
      name,
      email,
      message
    });

    const savedContact = await newContact.save();
    res.status(201).json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      data: savedContact 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/contact/:id - Delete contact submission
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ success: false, message: 'Contact submission not found' });
    }
    res.json({ success: true, message: 'Contact submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
