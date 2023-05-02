require('dotenv').config()
const express = require('express')
const blogRouter = require('./routes/blogRoutes')
const userRouter = require('./routes/userRoutes')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

// create express app
const app = express()



app.use(express.json())
app.use('/public', express.static('public'))
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
  }
app.use(cors(corsOptions))
// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     next()
// })


// router
app.use('/api/blogs', blogRouter)
app.use('/api/user', userRouter)
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/404.html'))
})


// connect and listen to DB
mongoose.connect(process.env.DATABASE_URI)
.then(() => {
    console.log('Connected to DB')
    app.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT}`)
    })
})
.catch((err) => {
    // console.log(err)
})