const jwt = require('jsonwebtoken');
const config = require('./config');

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, config.JWT_SECRET, {
    expiresIn: '24h',
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};
