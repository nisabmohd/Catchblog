const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    cover: {
        type: String
    },
    title: {
        type: String,
        require: true
    },
    tags: {
        type: Array,
        default: []
    },
    votes: {
        type: Number,
        default: 0
    },
    saved: {
        type: Number,
        default: 0
    },
    shared: {
        type: Number,
        default: 0
    },
    postid: {
        type: String,
        require: true,
        unique: true
    },
    uid: {
        type: String,
        require: true,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    md: {
        type: String
    }
})

const BlogPostModel = new mongoose.model('Posts', BlogSchema)
module.exports = { BlogPostModel }