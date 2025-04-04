const db = require('../config/db');

class User {
  static async create({ username, name, mail, password, type = '2' }) {
    const [result] = await db.execute(
      'INSERT INTO users (username, name, mail, password, type) VALUES (?, ?, ?, ?, ?)',
      [username, name, mail, password, type]
    );
    return result.insertId;
  }

  static async findByUsername(username) {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  static async findByMail(mail) {
    const [rows] = await db.execute('SELECT * FROM users WHERE mail = ?', [mail]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT id, username, name, mail, type, created FROM users WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = User;