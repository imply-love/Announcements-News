const express = require('express');
const router = require('express').Router();
const pool = require('../core/database');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/:postId', authenticate, async (req, res) => {
  const postId = req.params.postId;
  try {
    const [comments] = await pool.query(
      'SELECT c.*, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.post_id = ? ORDER BY c.created_at ASC',
      [postId]
    );
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { post_id, content, is_anonymous, parent_id } = req.body;
  const userId = req.user.id;

  if (!post_id || !content) {
    return res.status(400).json({ error: 'Post ID and content are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO comments (post_id, user_id, parent_id, content, is_anonymous) VALUES (?, ?, ?, ?, ?)',
      [post_id, userId, parent_id || null, content, is_anonymous || false]
    );
    res.status(201).json({ id: result.insertId, message: 'Comment added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const [comments] = await pool.query('SELECT user_id FROM comments WHERE id = ?', [commentId]);
    if (comments.length === 0) return res.status(404).json({ error: 'Comment not found' });

    const comment = comments[0];
    if (userRole !== 'admin' && comment.user_id !== userId) {
      return res.status(403).json({ error: 'Forbidden: You can only delete your own comments' });
    }

    await pool.query('DELETE FROM comments WHERE id = ?', [commentId]);
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
