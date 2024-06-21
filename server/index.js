import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import path from 'path'
import dotenv from 'dotenv'
import UserModel from './models/UserModel.js'
import postModel from './models/PostModel.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET,PUT,POST,DELETE'],
    credentials: true,
}));
app.use(cookieParser())
app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URI)

app.post('/register', async (req, res) => {

    const { username, email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    try {
        const user = await UserModel.create({ username, email, password: hash })
        res.json(user)
    } catch (error) {
        console.log(error.message);
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email: email })
    if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
            if (response) {
                const token = jwt.sign({ email: user.email, username: user.username },"jwt-secret-key", { expiresIn: '1d' })
                res.cookie('token', token)
                return res.json('success')
            } else {
                return res.json('email or password incorrect')
            }
        })
    } else {
        res.json('User not exist')
    }
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.json("the token is missing")
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) {
                return res.json("the token is wrong")
            } else {
                req.email = decoded.email
                req.username = decoded.username
                next()
            }
        })
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})

app.post('/create', verifyUser, upload.single('file'), async (req, res) => {

    try {
        const result = await postModel.create({ title: req.body.title, desc: req.body.title, file: req.file.filename })
        res.json(result)
    } catch (error) {
        console.log(error.message);
    }
})

app.get('/', verifyUser, (req, res) => {
    return res.json({ email: req.email, username: req.username })
})

app.get('/getposts', async (req, res) => {

    try {
        const posts = await postModel.find()
        res.json(posts)
    } catch (error) {
        console.log(error.message);
    }

})

app.get('/getpostbyid/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await postModel.findById({ _id: id })
        res.json(post)
    } catch (error) {
        console.log(error.message);
    }
})

app.put('/editpost/:id', async (req, res) => {
    const id = req.params.id

    try {
        await postModel.findByIdAndUpdate({ _id: id }, { title: req.body.title, desc: req.body.desc })
        res.json("success")
    } catch (error) {
        console.log(error.message);
    }
})

app.delete('/deletepost/:id', async (req, res) => {
    const id = req.params.id
    try {
        await postModel.findByIdAndDelete({ _id: id })
        res.json('successfully deleted')
    } catch (error) {
        console.log(error.message);
    }

})

app.get('/logout', (req, res) => {

    res.clearCookie('token')
    res.json("success")

})


app.listen(5000, () => {
    console.log('server running on url http://localhost:5000');
})