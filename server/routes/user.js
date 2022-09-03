const router = require('express').Router()
const { UserModel } = require('../models/User')

router.get('/:uid', async (req, res) => {
    try {
        const find = await UserModel.findOne({ uid: req.params.uid }, { password: 0 })
        res.send(find)
    } catch (err) {
        res.status(err.code).send(err)
    }

})

// router.get('hasnotification/:uid', async (req, res) => {
//     try {
//         const find = await UserModel.findOne({ uid: req.params.uid }, { password: 0 })
//         res.send(find.notifications)
//     } catch (err) {
//         res.status(err.code).send(err)
//     }
// })

router.get("/notifications/:uid", async (req, res) => {
    try {
        const find = await UserModel.findOne({ uid: req.params.uid }, { password: 0 })
        const sortedRes=find.notifications.sort((a,b)=>{
            return Date.parse(b.date)-Date.parse(a.date)
        })
        res.send(sortedRes)
    } catch (err) {
        res.status(400).send(err)
    }
})




module.exports = router