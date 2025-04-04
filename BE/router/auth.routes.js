const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// Test routes với middleware phân quyền
router.get('/test/user', [authMiddleware.verifyToken, authMiddleware.isUser], (req, res) => {
  res.send('User Content');
});

router.get('/test/admin', [authMiddleware.verifyToken, authMiddleware.isAdmin], (req, res) => {
  res.send('Admin Content');
});

module.exports = router;