const db = require('../config/db');

const getHistoryByUserId = async (req, res) => {
  const userId = req.params.user_id;
  console.log("Lấy lịch sử của user_id:", userId);

  const sql = `
    SELECT 
      id, 
      user_id, 
      movie_slug, 
      episode_name, 
      episode_slug, 
      watched_at, 
      created_at 
    FROM history_film 
    WHERE user_id = ?
    ORDER BY watched_at DESC
  `;

  try {
    const [results] = await db.query(sql, [userId]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Không có lịch sử nào' });
    }

    return res.status(200).json(results);
  } catch (err) {
    console.error('Lỗi khi lấy lịch sử:', err);
    return res.status(500).json({ error: 'Lỗi server khi lấy lịch sử' });
  }
};




// POST: Thêm lịch sử mới
// historyController.js
const addHistory = async (req, res) => {
  const { user_id, movie_slug, name, episode_name, episode_slug, watched_at } = req.body;

  // Validate required fields (không bắt buộc "name" vì INSERT không dùng trường này)
  if (!user_id || !movie_slug || !episode_name || !watched_at) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      missing_fields: {
        user_id: !user_id,
        movie_slug: !movie_slug,
        episode_name: !episode_name,
        watched_at: !watched_at
      }
    });
  }

  try {
    // Check if this episode already exists in history
    const checkSql = 'SELECT * FROM history_film WHERE user_id = ? AND movie_slug = ? AND episode_slug = ?';
    const [existing] = await db.query(checkSql, [user_id, movie_slug, episode_slug || '']);

    if (existing.length > 0) {
      // Update existing record: chỉ cập nhật lại thời gian xem
      const updateSql = 'UPDATE history_film SET watched_at = ? WHERE id = ?';
      await db.query(updateSql, [watched_at, existing[0].id]);
      
      return res.status(200).json({
        success: true,
        message: 'Cập nhật lịch sử thành công',
        data: { ...existing[0], watched_at }
      });
    } else {
      // Tính toán created_at theo thời gian hiện tại (định dạng "YYYY-MM-DD HH:mm:ss")
      const now = new Date();
      const created_at = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      // INSERT mới vào bảng, theo cấu trúc:
      // INSERT INTO history_film (user_id, movie_slug, episode_name, episode_slug, watched_at, created_at) VALUES (?, ?, ?, ?, ?, ?)
      const insertSql = `
        INSERT INTO history_film 
        (user_id, movie_slug, episode_name, episode_slug, watched_at, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [result] = await db.query(insertSql, [
        user_id, 
        movie_slug, 
        episode_name,
        episode_slug || null,
        watched_at,
        created_at
      ]);

      return res.status(201).json({
        success: true,
        message: 'Thêm lịch sử thành công',
        data: {
          id: result.insertId,
          user_id,
          movie_slug,
          episode_name,
          episode_slug,
          watched_at,
          created_at
        }
      });
    }
  } catch (err) {
    console.error('Lỗi khi lưu lịch sử:', err);
    return res.status(500).json({
      success: false,
      error: 'Lỗi server khi lưu lịch sử',
      details: err.message
    });
  }
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
