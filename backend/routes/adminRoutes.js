const express = require('express');
const router = express.Router();
const AdminUser = require('../models/AdminUser');
const Job = require('../models/Job');
const Candidate = require('../models/Candidate');
const VisaRequest = require('../models/VisaRequest');
const Contact = require('../models/Contact');

// POST /api/admin/login - Admin authentication
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    // In production, use proper password hashing (bcrypt)
    const admin = await AdminUser.findOne({ username, password });
    
    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Login successful',
      data: { username: admin.username, role: admin.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/dashboard - Get dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    const jobsCount = await Job.countDocuments();
    const candidatesCount = await Candidate.countDocuments();
    const visaRequestsCount = await VisaRequest.countDocuments();
    const contactsCount = await Contact.countDocuments();

    const recentJobs = await Job.find().sort({ createdAt: -1 }).limit(5);
    const recentCandidates = await Candidate.find().sort({ createdAt: -1 }).limit(5);
    const recentVisaRequests = await VisaRequest.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        statistics: {
          jobs: jobsCount,
          candidates: candidatesCount,
          visaRequests: visaRequestsCount,
          contacts: contactsCount
        },
        recent: {
          jobs: recentJobs,
          candidates: recentCandidates,
          visaRequests: recentVisaRequests
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/admin/create-admin - Create new admin user (for initial setup)
router.post('/create-admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Admin user already exists' 
      });
    }

    const newAdmin = new AdminUser({ username, password });
    const savedAdmin = await newAdmin.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Admin user created successfully',
      data: { username: savedAdmin.username, role: savedAdmin.role }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
