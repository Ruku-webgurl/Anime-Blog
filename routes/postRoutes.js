import express from 'express'
import Post from '../model/post.js'
import Comment from '../model/comment.js'
import user from '../model/user.js'
import isAuth from '../middleware/authHandler.js'
import upload from '../config/multer.js'


const router = express.Router()




router.get('/create', isAuth, (req, res) => {
  res.render("createPost")
})

router.post("/create", isAuth, upload.single("image"), async (req,res)=>{

 const {title, content} = req.body

 await Post.create({

  title,

  content,

  image: req.file.filename,

  user: req.session.userId

 })

 res.redirect("/")

})


router.get("/", async (req, res) => {

 const posts = await Post.find().populate("user")

 res.render("index", { posts, user: res.locals.user })

})

router.get("/post/:id", async (req,res)=>{

 const post = await Post.findById(req.params.id).populate("user").populate({
   path: "comments",
   populate: { path: "user" }
 })

 res.render("singlePost", {post})

})

router.get("/delete/:id", async (req,res)=>{

 await Post.findByIdAndDelete(req.params.id)

 res.redirect("/")

})

// edit page

router.get("/edit/:id", async (req,res)=>{

 const post = await Post.findById(req.params.id)

 res.render("editPost",{post})

})



// update

router.post("/edit/:id", async (req,res)=>{

 const {title,content} = req.body

 await Post.findByIdAndUpdate(req.params.id,{

  title,

  content

 })

 res.redirect("/")

})

router.get("/like/:id", async (req,res)=>{

 const post = await Post.findById(req.params.id)

 const userId = req.session.userId



 if(post.likes.includes(userId)){

  // unlike

  post.likes.pull(userId)

 }else{

  // like

  post.likes.push(userId)

 }



 await post.save()

 res.redirect("/")

})

// comment routes

router.post("/comment/:id", isAuth, async (req, res) => {

 const { text } = req.body

 const post = await Post.findById(req.params.id)

 const comment = await Comment.create({

  text,

  user: req.session.userId,

  post: req.params.id

 })

 post.comments.push(comment._id)

 await post.save()

 res.redirect(`/post/${req.params.id}`)

})

router.get("/deleteComment/:postId/:commentId", async (req, res) => {

 const { postId, commentId } = req.params

 await Comment.findByIdAndDelete(commentId)

 await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } })

 res.redirect(`/post/${postId}`)

})

export default router







