const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    source: { type: String, required: true },
    category: { type: String, required: true },
    publishedAt: { type: Date, required: true },
});

module.exports = mongoose.model('Article', ArticleSchema);
