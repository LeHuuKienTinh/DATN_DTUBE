const User = require("../../models/user");

const userController = {
    create: async (req, res) => {
        try {
            const { id, username, name, mail, password, type, created } = req.body;
            const newUser = { id, username, name, mail, password, type, created };
            const result = await User.create(newUser);
            res.status(201).json({ message: "User created successfully", result });
        } catch (err) {
            res.status(500).json({ message: "Error creating user", error: err });
        }
    },

    getAll: async (req, res) => {
        try {
            const users = await User.getAll();
            res.status(200).json({ users });
        } catch (err) {
            res.status(500).json({ message: "Error fetching users", error: err });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.getById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ user });
        } catch (err) {
            res.status(500).json({ message: "Error fetching user", error: err });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { username, name, mail, password, type, created } = req.body;
            const updatedUser = { username, name, mail, password, type, created };
            const result = await User.update(id, updatedUser);
            res.status(200).json({ message: "User updated successfully", result });
        } catch (err) {
            res.status(500).json({ message: "Error updating user", error: err });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await User.delete(id);
            res.status(200).json({ message: "User deleted successfully", result });
        } catch (err) {
            res.status(500).json({ message: "Error deleting user", error: err });
        }
    }
};

module.exports = userController;
