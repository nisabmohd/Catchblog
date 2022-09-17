const router = require('express').Router()
const { UserModel } = require('../models/User')
const { v4: idnot } = require('uuid')
const { hash } = require('../utils/passwordhash')
const { paginate } = require('../utils/paginate')

router.get('/:uid', async (req, res) => {
    try {
        const find = await UserModel.findOne({ uid: req.params.uid }, { password: 0 })
        res.send(find)
    } catch (err) {
        res.status(err.code).send(err)
    }

})

router.get('/followers/:uid', async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 12;
        const result = {};
        const user = await UserModel.findOne({ uid: req.params.uid })
        const totalPosts = user.followers.length;
        let startIndex = pageNumber * limit;
        const endIndex = (pageNumber + 1) * limit;
        result.total = totalPosts;
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
        allFollowers = user.followers.reverse()
        const newArr = paginate(allFollowers, req.query.limit, req.query.page)
        var followersObj = []
        Promise.all(newArr.map(async item => {
            const tempObj = await UserModel.findOne({ uid: item }, { notifications: 0, password: 0, savedlist: 0, hasNotification: 0, email: 0 })
            followersObj.push(tempObj)
        })).then(() => {
            result.data = followersObj
            res.send(result)
        })
    } catch (err) {

    }
})

router.get('/followings/:uid', async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 12;
        const result = {};
        const user = await UserModel.findOne({ uid: req.params.uid })
        const totalPosts = user.followings.length;
        let startIndex = pageNumber * limit;
        const endIndex = (pageNumber + 1) * limit;
        result.total = totalPosts;
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
        allFollowers = user.followers.reverse()
        const newArr = paginate(allFollowers, req.query.limit, req.query.page)
        var followersObj = []
        Promise.all(newArr.map(async item => {
            const tempObj = await UserModel.findOne({ uid: item }, { notifications: 0, password: 0, savedlist: 0, hasNotification: 0, email: 0 })
            followersObj.push(tempObj)
        })).then(() => {
            result.data = followersObj
            res.send(result)
        })
    } catch (err) {

    }
})

router.get('/hasnotification/:uid', async (req, res) => {
    try {
        const find = await UserModel.findOne({ uid: req.params.uid })
        res.send(find.hasNotification)
    } catch (err) {
        console.log(err);
        res.status(err.code).send(err)
    }
})

router.put('/readnotification/:uid', async (req, res) => {
    try {
        await UserModel.updateOne({ uid: req.params.uid }, { hasNotification: false })
        res.send({ message: true })
    } catch (err) {
        console.log(err);
        res.status(err.code).send(err)
    }
})

router.put('/follow', async (req, res) => {
    const { currUser, fUser, } = req.body
    try {
        await UserModel.updateOne({ uid: currUser }, { $push: { followings: fUser } })
        await UserModel.updateOne({ uid: fUser }, { $push: { followers: currUser } })
        await UserModel.updateOne({ uid: fUser }, { hasNotification: true })
        await UserModel.updateOne({ uid: fUser }, {
            $push:
            {
                notifications: {
                    type: 3,
                    uid: currUser,
                    date: new Date().toString(),
                    id: idnot()
                }
            }
        })
        res.send({ message: true })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.put('/unfollow', async (req, res) => {
    const { currUser, fUser, } = req.body
    try {
        await UserModel.updateOne({ uid: currUser }, { $pull: { followings: fUser } })
        await UserModel.updateOne({ uid: fUser }, { $pull: { followers: currUser } })
        res.send({ message: true })
    } catch (err) {
        res.status(400).send(err)
    }
})


router.get("/notifications/:uid", async (req, res) => {
    try {
        const find = await UserModel.findOne({ uid: req.params.uid }, { password: 0 })
        const sortedRes = find.notifications.sort((a, b) => {
            return Date.parse(b.date) - Date.parse(a.date)
        })
        res.send(sortedRes)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.put('/edit/:uid', async (req, res) => {
    try {
        const find = await UserModel.findOne({ uid: req.params.uid })
        if (!req.body.password) {
            console.log(req.body);
            await UserModel.updateOne({ uid: req.params.uid }, { $set: { ...find._doc, ...req.body } })
        }
        else {
            console.log(req.body);
            const hashedpass = await hash(req.body.password)
            console.log(hashedpass);
            await UserModel.updateOne({ uid: req.params.uid }, {
                $set: { ...{ ...find._doc, ...req.body }, password: hashedpass }
            })
        }
        res.send(await UserModel.findOne({ uid: req.params.uid }, { password: 0 }))
    } catch (err) {
        res.status(400).send(err)
    }
})



module.exports = router