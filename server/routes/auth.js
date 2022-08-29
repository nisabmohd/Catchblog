const router = require('express').Router()
const { UserModel } = require('../models/User')
const { v4: uid } = require('uuid')
const { hash, verify } = require('../utils/passwordhash')

router.post('/login', async (req, res) => {
    try {
        const finduser = await UserModel.findOne({ email: req.body.email })
        const isVerified = await verify(finduser.password, req.body.password)
        if (isVerified) {
            finduser.password = undefined
            res.send(finduser)
        } else {
            res.status(401).send({message:"Wrong password"})
        }
    } catch (err) {
        res.status(400).send(err)
    }

})

router.post('/signup', async (req, res) => {
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
        res.status(400).send(err)
    }
})

module.exports = router