const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Candidate = require('../models/Candidate');
const upload = require('../middlewares/uploadMiddleware');

// GET /api/jobs - Get all job listings
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/jobs/:id - Get specific job details
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/jobs - Create new job posting (admin only)
router.post('/', async (req, res) => {
  try {
    const { title, location, requirements, description } = req.body;
    const newJob = new Job({ title, location, requirements, description });
    const savedJob = await newJob.save();
    res.status(201).json({ success: true, data: savedJob });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/jobs/:id - Update job posting
router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, data: updatedJob });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/jobs/:id - Delete job posting
router.delete('/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/jobs/apply - Submit job application
router.post('/apply', upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, phone, email, jobId } = req.body;
    
    const candidateData = {
      name,
      phone,
      email,
      cvPath: req.files.cv ? req.files.cv[0].path : null,
      videoUrl: req.files.video ? req.files.video[0].path : null
    };

    const newCandidate = new Candidate(candidateData);
    const savedCandidate = await newCandidate.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully',
      data: savedCandidate 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
