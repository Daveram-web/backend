import express from "express";
import {
  changePassword,
  check,
  editProfile,
  emailVerification,
  forgetPassword,
  languageAndGener,
  loginUser,
  registerUser,
  reportList,
} from "../controller/userController.js";
import { authVerify } from "../middleware/auth.js";

const userRouter = express.Router();

{
  /**Loin */
}
userRouter.post("/createUser", (req, res) => {
  //#swagger.tags = ['User']
  registerUser(req, res);
});
userRouter.post("/loginUser", (req, res) => {
  //#swagger.tags = ['User']
  loginUser(req, res);
});
userRouter.get("/check", (req, res) => {
  //#swagger.tags = ['User']
  check(req, res);
});
userRouter.post("/emailVeryfy", (req, res) => {
  //#swagger.tags = ['User']
  emailVerification(req, res);
});
userRouter.post("/forgetPassword", (req, res) => {
  //#swagger.tags = ['User']
  forgetPassword(req, res);
});
userRouter.post("/changePassword", (req, res) => {
  //#swagger.tags = ['User']
  changePassword(req, res);
});
userRouter.post("/addExtraData", (req, res) => {
  //#swagger.tags = ['User']
  languageAndGener(req, res);
});
userRouter.put("/editProfile", (req, res) => {
  //#swagger.tags = ['User']
  editProfile(req, res);
});

{
  /**Report */
}
userRouter.get("/getReportList", (req, res) => {
  //#swagger.tags = ['User']
  authVerify, reportList(req, res);
});

export default userRouter;
