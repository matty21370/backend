const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    country: String,
    title: String,
    author: String,
    image: String,
    topic: String,
    summary: String,
    excerpt: String
});

module.exports = mongoose.model("Article", articleSchema);