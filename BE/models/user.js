const db = require("../config/db"); // Đảm bảo import đúng file cấu hình kết nối

const User = {
    create: async (user) => {
        const query = 'INSERT INTO `users`(`id`, `username`, `name`, `mail`, `password`, `type`, `created`) VALUES (?, ?, ?, ?, ?, ?, ?)';
        try {
            const [result] = await db.query(query, [user.id, user.username, user.name, user.mail, user.password, user.type, user.created]);
            return result;
        } catch (err) {
            throw err;
        }
    },

    getAll: async () => {
        const query = 'SELECT * FROM `users`';
        try {
            const [rows] = await db.query(query);
            return rows;
        } catch (err) {
            throw err;
        }
    },

    getById: async (id) => {
        const query = 'SELECT * FROM `users` WHERE `id` = ?';
        try {
            const [rows] = await db.query(query, [id]);
            return rows[0]; // Trả về object user thay vì array
        } catch (err) {
            throw err;
        }
    },

    update: async (id, user) => {
        const query = 'UPDATE `users` SET `username` = ?, `name` = ?, `mail` = ?, `password` = ?, `type` = ?, `created` = ? WHERE `id` = ?';
        try {
            const [result] = await db.query(query, [user.username, user.name, user.mail, user.password, user.type, user.created, id]);
            return result;
        } catch (err) {
            throw err;
        }
    },

    delete: async (id) => {
        const query = 'DELETE FROM `users` WHERE `id` = ?';
        try {
            const [result] = await db.query(query, [id]);
            return result;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = User;
