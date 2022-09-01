const { BlogPostModel } = require('../models/Blog')
const { UserModel } = require('../models/User')

const router = require('express').Router()

router.get('/:q', async (req, res) => {
    try {
        let result = {}
        result.users = await UserModel.find({ username: { $regex: req.params.q, $options : 'i' } }).sort({ _id: -1 })
        result.posts = await BlogPostModel.find({ $or: [{ tags: { $regex: req.params.q, $options : 'i' }}, { title: { $regex: req.params.q, $options : 'i' } }, { summary: { $regex: req.params.q, $options : 'i' } }] }).sort({ _id: -1 })
        res.send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})
module.exports = router