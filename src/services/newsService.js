const axios = require('axios');

const fetchArticles = async (query) => {
    const articles = [];

    try {
        const newsApiResponse = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                apiKey: process.env.NEWS_API_KEY,
                country: 'us',
                ...query,
            },
        });
        articles.push(...newsApiResponse.data.articles.map(article => ({
            id: article.url,
            title: article.title,
            description: article.description,
            url: article.url,
            source: 'NewsAPI',
            category: article.category || 'General',
            publishedAt: article.publishedAt,
            imageUrl: article.urlToImage,
        })));
    } catch (error) {
        console.error('Error fetching articles from NewsAPI:', error.message);
    }

    try {
        const guardianApiResponse = await axios.get('https://content.guardianapis.com/search', {
            params: {
                'api-key': process.env.GUARDIAN_API_KEY,
                'show-fields': 'trailText,thumbnail',
                ...query,
            },
        });
        articles.push(...guardianApiResponse.data.response.results.map(article => ({
            id: article.id,
            title: article.webTitle,
            description: article.fields.trailText,
            url: article.webUrl,
            source: 'The Guardian',
            category: article.sectionName,
            publishedAt: article.webPublicationDate,
            imageUrl: article.fields.thumbnail,
        })));
    } catch (error) {
        console.error('Error fetching articles from The Guardian:', error.message);
    }

    try {
        const nytApiResponse = await axios.get('https://api.nytimes.com/svc/topstories/v2/home.json', {
            params: {
                'api-key': process.env.NYT_API_KEY,
                ...query,
            },
        });
        articles.push(...nytApiResponse.data.results.map(article => ({
            id: article.url,
            title: article.title,
            description: article.abstract,
            url: article.url,
            source: 'The New York Times',
            category: article.section,
            publishedAt: article.published_date,
            imageUrl: article.multimedia?.[0]?.url || null,
        })));
    } catch (error) {
        console.error('Error fetching articles from The New York Times:', error.message);
    }

    return articles;
};

const searchArticles = async (query) => {
    const articles = [];

    try {
        const newsApiResponse = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                apiKey: process.env.NEWS_API_KEY,
                country: 'us',
                q: query.keyword,
                from: query.date,
                sources: query.source,
                domains: query.source,  // Add domains parameter if source is a domain name
            },
        });
        articles.push(...newsApiResponse.data.articles.map(article => ({
            id: article.url,
            title: article.title,
            description: article.description,
            url: article.url,
            source: 'NewsAPI',
            category: article.category || 'General',
            publishedAt: article.publishedAt,
            imageUrl: article.urlToImage,
        })));
    } catch (error) {
        console.error('Error searching articles from NewsAPI:', error.message);
    }

    try {
        const guardianApiResponse = await axios.get('https://content.guardianapis.com/search', {
            params: {
                'api-key': process.env.GUARDIAN_API_KEY,
                q: query.keyword,
                'from-date': query.date,
                section: query.category,
                'show-fields': 'trailText,thumbnail',
            },
        });
        articles.push(...guardianApiResponse.data.response.results.map(article => ({
            id: article.id,
            title: article.webTitle,
            description: article.fields.trailText,
            url: article.webUrl,
            source: 'The Guardian',
            category: article.sectionName,
            publishedAt: article.webPublicationDate,
            imageUrl: article.fields.thumbnail,
        })));
    } catch (error) {
        console.error('Error searching articles from The Guardian:', error.message);
    }

    try {
        const nytApiResponse = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
            params: {
                'api-key': process.env.NYT_API_KEY,
                q: query.keyword,
                begin_date: query.date ? query.date.replace(/-/g, '') : undefined,
                fq: query.category ? `section_name:("${query.category}")` : undefined,
                'facet_fields': 'source',
                'facet_filter': true,
            },
        });
        articles.push(...nytApiResponse.data.response.docs.map(article => ({
            id: article.web_url,
            title: article.headline.main,
            description: article.abstract,
            url: article.web_url,
            source: 'The New York Times',
            category: article.section_name,
            publishedAt: article.pub_date,
            imageUrl: article.multimedia?.[0]?.url || null,
        })));
    } catch (error) {
        console.error('Error searching articles from The New York Times:', error.message);
    }

    return articles;
};

module.exports = {
    fetchArticles,
    searchArticles,
};
