const { BlogPostModel } = require('../models/Blog')

const router = require('express').Router()

router.get('/:postid', async (req, res, next) => {
    try {
        const findpost = await BlogPostModel.findone({ postid: req.body.postid })
        res.send(findpost)
    } catch (err) {
    }
})

//new Post
router.post('/new', (req, res, next) => {

})

//edit post


//delete post

// vote post

// share count

// save post

module.exports = router