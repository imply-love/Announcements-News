const express = require('express');
const router = require('express').Router();
const pool = require('../core/database');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.get('/', async (req, res) => {
  const type = req.query.type || 'announcement';
  try {
    const [posts] = await pool.query('SELECT * FROM posts WHERE type = ? ORDER BY is_pinned DESC, created_at DESC', [type]);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { content, type, is_anonymous } = req.body;
  const userId = req.user.id;
  try {
    const [result] = await pool.query(
      'INSERT INTO posts (user_id, content, type, is_anonymous) VALUES (?, ?, ?, ?)',
      [userId, content, type, is_anonymous || false]
    );
    res.status(201).json({ id: result.insertId, message: 'Post created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const [posts] = await pool.query('SELECT user_id FROM posts WHERE id = ?', [postId]);
    if (posts.length === 0) return res.status(404).json({ error: 'Post not found' });

    const post = posts[0];
    if (userRole !== 'admin' && post.user_id !== userId) {
      return res.status(403).json({ error: 'Forbidden: You can only delete your own posts' });
    }

    await pool.query('DELETE FROM posts WHERE id = ?', [postId]);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
