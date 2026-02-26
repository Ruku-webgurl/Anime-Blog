import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
import path from "path"
import session from "express-session"
import MongoStore from "connect-mongo"
import express from 'express'
import User from './model/user.js'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'

import { fileURLToPath } from "url"

const app = express()

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err))

// session
app.use(session({

 secret: process.env.SESSION_SECRET,

 resave: false,

 saveUninitialized: false,

 store: MongoStore.create({

   mongoUrl: process.env.MONGO_URI

 })

}))

app.use(async (req, res, next) => {

 if (req.session.userId) {

  const user = await User.findById(req.session.userId)

  res.locals.user = user

 } else {

  res.locals.user = null

 }

 next()

})




app.use(express.json())
app.use(express.urlencoded({extended: true}));
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//ej
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))



app.use(express.static(path.join(__dirname, "uploads")))
app.use('/', postRoutes)
app.use('/auth', authRoutes)






const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
 console.log(`Server running on ${PORT}`)
)