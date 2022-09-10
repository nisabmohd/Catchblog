const { BlogPostModel } = require('../models/Blog')
const { v4: id } = require('uuid')
const { UserModel } = require('../models/User')
const { v4: idnot } = require('uuid')


const router = require('express').Router()


router.get('/saved', async (req, res) => {
    try {
        const post = await UserModel.findOne({ uid: req.query.uid })
        const savedList = post.savedlist
        let savedPosts = []
        await Promise.all(savedList.map(async item => {
            const fPost = await BlogPostModel.findOne({ postid: item })
            savedPosts.push(fPost)
        }))
        res.send(savedPosts)
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})

router.put('/like', async (req, res) => {
    const { postid, uid } = req.body
    try {
        const post = await BlogPostModel.findOne({ postid: postid })
        const update = await BlogPostModel.updateOne({ postid: postid }, { $push: { votes: uid } })
        await UserModel.updateOne({ uid: post.uid }, { hasNotification: true })
        await UserModel.updateOne({ uid: post.uid }, {
            $push:
            {
                notifications: {
                    type: 1,
                    postid: postid,
                    uid: uid,
                    date: new Date().toString(),
                    id: idnot()
                }
            }
        })
        res.send(update)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.put('/unlike', async (req, res) => {
    const { postid, uid } = req.body
    try {
        const update = await BlogPostModel.updateOne({ postid: postid }, { $pull: { votes: uid } })
        res.send(update)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.put('/save', async (req, res) => {
    const { postid, uid } = req.body
    try {
        const post = await BlogPostModel.findOne({ postid: postid })
        const update = await BlogPostModel.updateOne({ postid: postid }, { $push: { saved: uid } })
        const updateUser = await UserModel.updateOne({ uid: uid }, { $push: { savedlist: postid } })

        await UserModel.updateOne({ uid: post.uid }, { hasNotification: true })
        await UserModel.updateOne({ uid: post.uid }, {
            $push:
            {
                notifications: {
                    type: 2,
                    postid: postid,
                    uid: uid,
                    date: new Date().toString(),
                    id: idnot()
                }
            }
        })

        res.send({ ...update, ...updateUser })
    } catch (err) {
        res.status(400).send(err)
    }
})


router.put('/undosave', async (req, res) => {
    const { postid, uid } = req.body
    try {
        const update = await BlogPostModel.updateOne({ postid: postid }, { $pull: { saved: uid } })
        const updateUser = await UserModel.updateOne({ uid: uid }, { $pull: { savedlist: postid } })
        res.send({ ...update, ...updateUser })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/delete', async (req, res) => {
    const { postid, uid } = req.body
    try {
        const findPost = await BlogPostModel.findOne({ postid: postid })
        if (!findPost) return res.status(400).send({ message: "No post found" })
        if (findPost.uid == uid) {
            res.send(await BlogPostModel.deleteOne({ postid: postid }))
        } else {
            res.status(401).send({ message: "Unauthorized" })
        }
    } catch (err) {
        res.status(400).send(err)
    }
})



router.post('/new', async (req, res) => {
    try {
        const postid=id()
        const newPost = new BlogPostModel({
            title: req.body.title,
            tags: req.body.tags.split(','),
            postid: postid,
            uid: req.body.uid,
            md: req.body.md,
            summary: req.body.summary
        })
        const done = await newPost.save()
        const followers = await UserModel.find({ followings: req.body.uid })
        Promise.all(followers.map(async item => {
            await UserModel.updateOne({ uid: item.uid }, { hasNotification: true })
            await UserModel.updateOne({ uid: item.uid }, {
                $push:
                {
                    notifications: {
                        type: 4,
                        postid: postid,
                        uid: req.body.uid,
                        date: new Date().toString(),
                        id: idnot()
                    }
                }
            })
        }))
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
        if (endIndex < totalPosts) {
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

router.get('/trends/:uid', async (req, res) => {
    try {
        const data = await BlogPostModel.find().sort({ votes: -1 }).limit(4)
        res.send(data)
    }
    catch (err) {
        res.status(400).send(err)
    }
})



router.get('/tags/:tags', async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 5;
        const result = {};
        const totalPosts = await BlogPostModel.countDocuments({ tags: req.params.tags })
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
        result.data = await BlogPostModel.find({ tags: req.params.tags }).sort({ _id: -1 }).skip(startIndex).limit(limit)
        res.send(result)
    } catch (err) {
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
        if (endIndex < totalPosts) {
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


module.exports = router