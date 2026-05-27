const mongoose = require('mongoose');
const {Schema} = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    tags: {
        type: [String],
        default: []
    },
    imageUrl: {
        type: String,
        default: '/images/default-blog.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;