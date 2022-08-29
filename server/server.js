const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const userRoute=require('./routes/user')

const app = express()
app.use(express.json())

app.use(cors());
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.mongouri, () => {
    console.log("Connected to db");
})

app.get('/test', (req, res) => {
    res.send("hello from other side")
})

app.use('/post', postRouter)

app.use('/auth', authRouter)

app.use('/user', userRoute)

app.listen(process.env.PORT || 8000, () => {
    console.log("Server running at port", process.env.PORT || 8000);
})