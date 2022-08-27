const router = require('express').Router()
const { UserModel } = require('../models/User')
const { v4: uid } = require('uuid')
const { hash, verify } = require('../utils/passwordhash')
const { handleErr, createErr } = require('../utils/errorhandle')

router.post('/login', async (req, res, next) => {
    const finduser = await UserModel.findOne({ email: req.body.email })
    const isVerified = await verify(finduser.password, req.body.password)
    if (isVerified) {
        finduser.password = undefined
        res.send(finduser)
    } else {
        next(handleErr(res,createErr(401,"Wrong Password")))
    }
})

router.post('/signup', async (req, res, next) => {
    try {
        const uuid = uid()
        const hashedpass = await hash(req.body.password)
        const newUser = new UserModel({
            uid: uuid,
            username: req.body.username,
            img: req.body.img ? req.body.img : "",
            password: hashedpass,
            email: req.body.email
        })
        await newUser.save();
        const finduser = await UserModel.findOne({ uid: uuid }, { password: 0 })
        res.status(200).send(finduser)
    } catch (err) {
        next(handleErr(res, err))
    }
})

module.exports = router