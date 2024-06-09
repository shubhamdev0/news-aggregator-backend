const User = require('../models/User');

/**
 * Create a new user
 * @param {Object} userData - The data of the user to create
 * @returns {Object} - The created user
 */
const createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

/**
 * Find a user by email
 * @param {String} email - The email of the user to find
 * @returns {Object} - The found user
 */
const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

/**
 * Find a user by ID
 * @param {String} id - The ID of the user to find
 * @returns {Object} - The found user
 */
const findUserById = async (id) => {
    return await User.findById(id);
};

/**
 * Update user preferences
 * @param {String} userId - The ID of the user to update
 * @param {Object} preferences - The new preferences of the user
 * @returns {Object} - The updated user
 */
const updateUserPreferences = async (userId, preferences) => {
    return await User.findByIdAndUpdate(userId, { preferences }, { new: true });
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    updateUserPreferences,
};
