const { BlogPostModel } = require('../models/Blog')
const { v4: postid } = require('uuid')

const router = require('express').Router()


router.post('/new', async (req, res) => {
    try {
        const newPost = new BlogPostModel({
            title: req.body.title,
            tags: req.body.tags.slice(1, req.body.tags.length - 1).split(','),
            postid: postid(),
            uid: req.body.uid,
            md: req.body.md,
            summary:req.body.summary
        })
        const done = await newPost.save()
        res.send(done)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/allpost', async (req, res) => {
    try {
        const allpost = await BlogPostModel.find({})
        res.send(allpost)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/:postid', async (req, res) => {
    try {
        const findpost = await BlogPostModel.findOne({ postid: req.params.postid })
        res.send(findpost)
    } catch (err) {
        res.status(400).send(err)
    }
})



//edit post
// router.put('/edit/:postid', async (req, res) => {
//     try {
//         const post = await BlogPostModel.findOne({ postid: req.params.postid })
//         if (post.uid === req.body.uid) {
//             await BlogPostModel.updateOne({ postid: req.params.uid }, {
//                 title: req.body.title,
//                 tags: req.body.tags.slice(1, req.body.tags.length - 1).split(','),
//                 postid: postid(),
//                 uid: req.body.uid,
//                 md: req.body.md
//             });
//         }
//         const done = await newPost.save()
//         res.send(done)
//     } catch (err) {
//         res.status(400).send(err)
//     }
// })


//delete post

// vote post

// share count

// save post

module.exports = router