const router = require('express').Router()
const { UserModel } = require('../models/User')
const { v4: idnot } = require('uuid')
const { hash, verify } = require('../utils/passwordhash')
const { otpModel } = require('../models/Otp')
const { main } = require('../utils/mail')
const {AddMinutesToDate}=require('../utils/date')


router.get('/:uid', async (req, res) => {
    try {
        const find = await UserModel.findOne({ uid: req.params.uid }, { password: 0 })
        res.send(find)
    } catch (err) {
        res.status(err.code).send(err)
    }

})

router.put('/password/otp', async (req, res) => {
    const { email } = req.body
    const otp = Math.ceil(Math.random() * 1000000).toString()
    const hashedOtp=await hash(otp)
    const find = await otpModel.findOne({ email })
    if (!find) {
        const newotp = new otpModel({
            email, otp:hashedOtp,expiry:AddMinutesToDate(new Date(),5)
        })
        await newotp.save()
    } else {
        await otpModel.updateOne({ email }, { otp:hashedOtp,expiry:AddMinutesToDate(new Date(),5) })
    }
    await main(otp, email)
    res.send({ status: true })
})

router.put('/verifyotp', async (req, res) => {
    const { otp, email, password } = req.body
    const otpdata=await otpModel.findOne({ email })
    if(otpdata.otp<new Date()) return res.status(401).send({ message: "Wrong otp" });
    const valid = await verify(otpdata.otp, otp) 
    if (!valid) {
        return res.status(401).send({ message: "Wrong otp" });
    }
    const result = await UserModel.updateOne({ email }, { password: await hash(password) })
    if(result.modifiedCount===0) return res.send({message:'No account found'})
    if (result) res.send({ message: "done" })
})

router.get('/followers/:uid', async (req, res) => {
    try {
        const user = await UserModel.findOne({ uid: req.params.uid })
        allFollowers = user.followers.reverse()
        var followersObj = []
        Promise.all(allFollowers.map(async item => {
            const tempObj = await UserModel.findOne({ uid: item }, { notifications: 0, password: 0, savedlist: 0, hasNotification: 0, email: 0 })
            followersObj.push(tempObj)
        })).then(() => {
            res.send(followersObj)
        })
    } catch (err) {
        res.status(err.code).send(err)
    }
})

router.get('/followings/:uid', async (req, res) => {
    try {
        const user = await UserModel.findOne({ uid: req.params.uid })
        allFollowers = user.followings.reverse()
        var followersObj = []
        Promise.all(allFollowers.map(async item => {
            const tempObj = await UserModel.findOne({ uid: item }, { notifications: 0, password: 0, savedlist: 0, hasNotification: 0, email: 0 })
            followersObj.push(tempObj)
        })).then(() => {
            res.send(followersObj)
        })
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