const userService = require('../services/userService');

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
};

exports.getUserPreferences = async (req, res) => {
    try {
        const user = await userService.findUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user.preferences);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user preferences' });
    }
};

exports.updateUserPreferences = async (req, res) => {
    try {
        const user = await userService.updateUserPreferences(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user.preferences);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update user preferences' });
    }
};
