// src/routes/articleRoutes.js
const express = require('express');
const { getArticles, getArticleById, searchArticles } = require('../controllers/articleController');
const router = express.Router();

router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.get('/search', searchArticles);

module.exports = router;
