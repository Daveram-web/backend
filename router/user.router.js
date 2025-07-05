import express from 'express'
import { changePassword, check, editProfile, emailVerification, forgetPassword, languageAndGener, loginUser, registerUser, reportList } from '../controller/userController.js'
import { authVerify } from '../middleware/auth.js'

const userRouter = express.Router()

{/**Loin */}
//#swagger.tags = ['User']
userRouter.post("/createUser",registerUser)
//#swagger.tags = ['User']
userRouter.post("/loginUser",loginUser)
//#swagger.tags = ['User']
userRouter.get("/check",authVerify,check)
//#swagger.tags = ['User']
userRouter.post("/emailVeryfy",emailVerification)
//#swagger.tags = ['User']
userRouter.post("/forgetPassword",forgetPassword)
//#swagger.tags = ['User']
userRouter.post("/changePassword",changePassword)
//#swagger.tags = ['User']
userRouter.post("/addExtraData",languageAndGener)
//#swagger.tags = ['User']
userRouter.put("/editProfile",editProfile)


{/**Report */}
//#swagger.tags = ['User']
userRouter.get("/getReportList",authVerify,reportList)

export default userRouter