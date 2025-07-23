const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// GET /api/candidates - Get all candidate profiles
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json({ success: true, data: candidates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/candidates/:id - Get specific candidate details
router.get('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    res.json({ success: true, data: candidate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/candidates - Create new candidate profile (if candidates submit directly)
router.post('/', async (req, res) => {
  try {
    const candidateData = req.body;
    const newCandidate = new Candidate(candidateData);
    const savedCandidate = await newCandidate.save();
    res.status(201).json({ success: true, data: savedCandidate });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/candidates/:id - Update candidate profile
router.put('/:id', async (req, res) => {
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCandidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    res.json({ success: true, data: updatedCandidate });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/candidates/:id - Delete candidate profile
router.delete('/:id', async (req, res) => {
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!deletedCandidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    res.json({ success: true, message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
