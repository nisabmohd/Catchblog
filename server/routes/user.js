const router = require('express').Router()
const { UserModel } = require('../models/User')
const { v4: idnot } = require('uuid')

router.get('/:uid', async (req, res) => {
    try {
        const find = await UserModel.findOne({ uid: req.params.uid }, { password: 0 })
        res.send(find)
    } catch (err) {
        res.status(err.code).send(err)
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
        res.send(await UserModel.updateOne({ uid: req.params.uid }, { $set: { ...find._doc, ...req.body } }))
    } catch (err) {
        res.status(400).send(err)
    }
})



module.exports = router