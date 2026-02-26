import express from 'express'
import User from '../model/user.js'
const router = express.Router()

router.get("/register",(req,res)=>{

 res.render("register")

})

// register user

router.post("/register", async (req,res)=>{

 const {name,email,password} = req.body

 const user = await User.create({

  name,

  email,

  password

 })

 res.redirect("/login")

})

// login page

router.get("/login",(req,res)=>{

 res.render("login")

})



// login user

router.post("/login", async (req,res)=>{

 const {email,password} = req.body

 const user = await User.findOne({email,password})

 if(user){

  req.session.userId = user._id

  res.redirect("/")

 }else{

  res.send("Invalid credentials")

 }

})



// logout

router.get("/logout",(req,res)=>{

 req.session.destroy()

 res.redirect("login")

})

export default router


