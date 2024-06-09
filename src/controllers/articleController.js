// src/controllers/articleController.js
const newsService = require('../services/newsService');

exports.getArticles = async (req, res) => {
    try {
        const articles = await newsService.fetchArticles(req.query);
        res.status(200).json(articles);
    } catch (error) {
        console.error('Error in getArticles controller:', error.message);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const articles = await newsService.fetchArticles();
        const article = articles.find(article => article.id === decodeURIComponent(req.params.id));
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch article' });
    }
};

exports.searchArticles = async (req, res) => {
    try {
        const articles = await newsService.searchArticles(req.query);
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search articles' });
    }
};
