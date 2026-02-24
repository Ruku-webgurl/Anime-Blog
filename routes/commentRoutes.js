import Comment from "../model/comment.js"



// add comment

router.post("/comment/:postId", async (req,res)=>{

 await Comment.create({

  text: req.body.text,

  user: req.session.userId,

  post: req.params.postId

 })

 res.redirect("/post/"+req.params.postId)

})
