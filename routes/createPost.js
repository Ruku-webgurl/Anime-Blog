// import express from 'express'
// import Post from '../model/post.js'

// import isAuth from '../middleware/authHandler.js'
// import upload from '../config/multer.js'


// const router = express.Router()

// router.get('/create', isAuth, (req, res) => {
//   res.render("createPost")
// })

// router.post("/create", isAuth, upload.single("image"), async (req,res)=>{

//  const {title, content} = req.body

//  await Post.create({

//   title,

//   content,

//   image: req.file.filename,

//   user: req.session.userId

//  })

//  res.redirect("/")

// })


// export default router