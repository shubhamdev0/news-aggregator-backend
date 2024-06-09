const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

router.get('/users/:id/preferences', protect, userController.getUserPreferences);
router.put('/users/:id/preferences', protect, userController.updateUserPreferences);

module.exports = router;
