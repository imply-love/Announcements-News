const express = require('express');
const cors = require('cors');
const config = require('./core/config');
const authRoutes = require('./api/auth');
const postRoutes = require('./api/posts');
const toolRoutes = require('./api/tools');
const commentRoutes = require('./api/comments');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/tools', toolRoutes);
app.use('/comments', commentRoutes);

app.listen(config.PORT, '0.0.0.0', () => {
  console.log(`Node.js Backend running on http://0.0.0.0:${config.PORT}`);
});
