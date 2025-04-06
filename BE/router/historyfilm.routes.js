const express = require('express');
const router = express.Router();
const controller = require('../controllers/historyfilm.controller');

// Lấy lịch sử theo user_id
router.get('/history/:user_id', controller.getHistoryByUserId);

// Thêm lịch sử
router.post('/history', controller.addHistory);

// Xóa lịch sử theo id
router.delete('/history/:id', controller.deleteHistory);

module.exports = router;
