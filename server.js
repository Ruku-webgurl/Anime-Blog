
import mongoose from "mongoose"
import path from "path"
import session from "express-session"
import MongoStore from "connect-mongo"
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import { fileURLToPath } from "url"

const app = express()

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/blog")

.then(()=> console.log("MongoDB connected"))

.catch((err)=> console.log(err))


// session
app.use(session({

 secret: "secretkey",

 resave: false,

 saveUninitialized: false,

 store: MongoStore.create({

   mongoUrl: "mongodb://127.0.0.1:27017/blog"

 })

}))




app.use(express.json())
app.use(express.urlencoded({extended: true}));
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//ej
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// root handled by postRoutes which renders `index` with `posts`

app.use(express.static("uploads"))
app.use('/', authRoutes)
app.use('/', postRoutes)





app.listen(5000, () => console.log("server running on 5000"))