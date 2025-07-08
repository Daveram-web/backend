import express from 'express'
import { userFilesUpload } from '../middleware/multer.js';
import {   Bookmark, createReview, follow, followersList, followingList, like, reportUser } from '../controller/reviewController.js';

const reviewRouter = express.Router()

//#swagger.tags = ['Review']
reviewRouter.post("/createReview", userFilesUpload,createReview);



{/**WatchList */}
reviewRouter.post("/addWatchList",(req,res)=>{
    //#swagger.tags = ['Review']
    Bookmark(req,res)
})

{/**Follow */}
reviewRouter.post("/follow",(req,res)=>{
    //#swagger.tags = ['Review']
    follow(req,res)
})
reviewRouter.get("/followersList/:id",(req,res)=>{
    //#swagger.tags = ['Review']
    followersList(req,res)
})

reviewRouter.get("/followingList/:id",(req,res)=>{
    //#swagger.tags = ['Review']
    followingList(req,res)
})

{/**LIke */}
reviewRouter.post("/like",(req,res)=>{
    //#swagger.tags = ['Review']
    like(req,res)
})




{/**Report */}
reviewRouter.post("/reportUser",(req,res)=>{
    //#swagger.tags = ["Review"]
    reportUser(req,res)
})

export default reviewRouter;