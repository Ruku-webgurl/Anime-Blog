import User from '../model/user.js'
const isAuth = async (req,res,next)=>{
if(req.session.userId){

  const user = await User.findById(req.session.userId)

  res.locals.user = user

 }else{

  res.locals.user = null

 }

 next()

}

export default isAuth
