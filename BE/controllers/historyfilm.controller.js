const db = require('../config/db');

// GET: Lấy lịch sử theo user_id
const getHistoryByUserId = (req, res) => {
  const userId = req.params.user_id;
  const sql = 'SELECT `id`, `user_id`, `movie_slug`, `name`, `watched_at` FROM `history_film` WHERE user_id = ?';

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Lỗi khi lấy lịch sử:', err);
      return res.status(500).json({ error: 'Lỗi server' });
    }
    res.json(results);
  });
};

// POST: Thêm lịch sử mới
const addHistory = (req, res) => {
  const { user_id, movie_slug, name, watched_at } = req.body;

  if (!user_id || !movie_slug || !name || !watched_at) {
    return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin' });
  }

  const sql = 'INSERT INTO `history_film` (`user_id`, `movie_slug`, `name`, `watched_at`) VALUES (?, ?, ?, ?)';
  const values = [user_id, movie_slug, name, watched_at];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Lỗi khi thêm lịch sử:', err);
      return res.status(500).json({ error: 'Lỗi server' });
    }
    res.json({ message: 'Thêm lịch sử thành công', id: result.insertId });
  });
};

// DELETE: Xóa lịch sử theo id
const deleteHistory = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM `history_film` WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Lỗi khi xóa lịch sử:', err);
      return res.status(500).json({ error: 'Lỗi server' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy lịch sử để xóa' });
    }

    res.json({ message: 'Xóa lịch sử thành công' });
  });
};

module.exports = {
  getHistoryByUserId,
  addHistory,
  deleteHistory
};
