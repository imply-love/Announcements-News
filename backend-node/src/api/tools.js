const express = require('express');
const router = require('express').Router();
const pool = require('../core/database');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', async (req, res) => {
  try {
    const [tools] = await pool.query('SELECT * FROM tools');
    res.json(tools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { name, description, download_url } = req.body;
  const uploaderId = req.user.id;
  try {
    const [result] = await pool.query(
      'INSERT INTO tools (name, description, download_url, uploader_id) VALUES (?, ?, ?, ?)',
      [name, description, download_url, uploaderId]
    );
    res.status(201).json({ id: result.insertId, message: 'Tool uploaded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
