const { BlogPostModel } = require('../models/Blog')
const { UserModel } = require('../models/User')

const router = require('express').Router()

router.get('/post/:q', async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 5;
        const totalPosts = await BlogPostModel.countDocuments({ $or: [{ tags: { $regex: req.params.q, $options: 'i' } }, { title: { $regex: req.params.q, $options: 'i' } }, { summary: { $regex: req.params.q, $options: 'i' } }] })
        let result = {}
        let startIndex = pageNumber * limit;
        const endIndex = (pageNumber + 1) * limit;
        result.totalPosts = totalPosts;
        if (startIndex > 0) {
            result.previous = {
                pageNumber: pageNumber - 1,
                limit: limit,
            };
        }
        if (endIndex < totalPosts) {
            result.next = {
                pageNumber: pageNumber + 1,
                limit: limit,
            };
        }
        result.posts = await BlogPostModel.find({ $or: [{ tags: { $regex: req.params.q, $options: 'i' } }, { title: { $regex: req.params.q, $options: 'i' } }, { summary: { $regex: req.params.q, $options: 'i' } }] }).sort({ _id: -1 }).skip(startIndex).limit(limit)
        res.send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/user/:q', async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 5;
        const totalUsers = await UserModel.countDocuments({ username: { $regex: req.params.q, $options: 'i' } })
        let result = {}
        let startIndex = pageNumber * limit;
        const endIndex = (pageNumber + 1) * limit;
        result.totalUsers = totalUsers;
        if (startIndex > 0) {
            result.previous = {
                pageNumber: pageNumber - 1,
                limit: limit,
            };
        }
        if (endIndex < totalUsers) {
            result.next = {
                pageNumber: pageNumber + 1,
                limit: limit,
            };
        }
        result.users = await UserModel.find({ username: { $regex: req.params.q, $options: 'i' } }).sort({ _id: -1 }).skip(startIndex).limit(limit)
        res.send(result)
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})

module.exports = router