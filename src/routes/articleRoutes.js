const express = require('express');
const { getArticles, getArticleById, searchArticles, getArticleOptions } = require('../controllers/articleController');
const router = express.Router();

router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.get('/search', searchArticles);
router.get('/options', getArticleOptions);

module.exports = router;
