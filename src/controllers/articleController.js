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

exports.getArticleOptions = async (req, res) => {
    try {
        const articles = await newsService.fetchArticles({});
        const sources = [...new Set(articles.map(article => article.source))];
        const categories = [...new Set(articles.map(article => article.category))];
        const authors = [...new Set(articles.map(article => article.author))];
        res.status(200).json({ sources, categories, authors });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch article options' });
    }
};
