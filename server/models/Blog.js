const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    tags: {
        type: Array,
        default: []
    },
    votes: {
        type: Array,
        default: []
    },
    saved: {
        type: Array,
        default: []
    },
    shared: {
        type: Array,
        default: []
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