import express from 'express'
import { changePassword, check, editProfile, emailVerification, forgetPassword, languageAndGener, loginUser, registerUser, reportList } from '../controller/userController.js'
import { authVerify } from '../middleware/auth.js'

const userRouter = express.Router()

{/**Loin */}
userRouter.post("/createUser",registerUser)
userRouter.post("/loginUser",loginUser)
userRouter.get("/check",authVerify,check)
userRouter.post("/emailVeryfy",emailVerification)
userRouter.post("/forgetPassword",forgetPassword)
userRouter.post("/changePassword",changePassword)
userRouter.post("/addExtraData",languageAndGener)
userRouter.put("/editProfile",editProfile)


{/**Report */}
userRouter.get("/getReportList",authVerify,reportList)

export default userRouter