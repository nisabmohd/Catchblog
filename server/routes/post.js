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
            summary: req.body.summary
        })
        const done = await newPost.save()
        res.send(done)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/allpost', async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 5;
        const result = {};
        const totalPosts = await BlogPostModel.countDocuments()
        let startIndex = pageNumber * limit;
        const endIndex = (pageNumber + 1) * limit;
        result.totalPosts = totalPosts;
        if (startIndex > 0) {
            result.previous = {
                pageNumber: pageNumber - 1,
                limit: limit,
            };
        }
        if (endIndex < (await BlogPostModel.countDocuments())) {
            result.next = {
                pageNumber: pageNumber + 1,
                limit: limit,
            };
        }
        result.data = await BlogPostModel.find().sort({ _id: -1 }).skip(startIndex).limit(limit)
        res.send(result)
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})
router.get('/morefrom', async (req, res) => {
    const { prev, uid } = req.query
    console.log(prev, uid);
    try {
        const posts = await BlogPostModel.find({ $and: [{ uid: uid }, { postid: { $ne: prev } }] }).sort({ _id: -1 }).limit(3)
        res.send(posts)
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

router.get('/trends/:uid', async(req, res) => {
    try{
        const data=await BlogPostModel.find().sort({votes:-1}).limit(4)
        res.send(data)
    }
    catch(err){
        res.status(400).send(err)
    }
})

router.get('/userpost/:uid', async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 5;
        const result = {};
        const totalPosts = await BlogPostModel.countDocuments({ uid: req.params.uid })
        let startIndex = pageNumber * limit;
        const endIndex = (pageNumber + 1) * limit;
        result.totalPosts = totalPosts;
        if (startIndex > 0) {
            result.previous = {
                pageNumber: pageNumber - 1,
                limit: limit,
            };
        }
        if (endIndex < (await BlogPostModel.countDocuments({ uid: req.params.uid }))) {
            result.next = {
                pageNumber: pageNumber + 1,
                limit: limit,
            };
        }
        result.data = await BlogPostModel.find({ uid: req.params.uid }).sort({ _id: -1 }).skip(startIndex).limit(limit)
        res.send(result)
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