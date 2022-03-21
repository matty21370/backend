const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: String,
    article: String,
    content: String,
    upvotes: Number,
    downvotes: Number
});

module.exports = mongoose.model("Comment", commentSchema);