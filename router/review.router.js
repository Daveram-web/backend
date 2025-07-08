import express from 'express'
import { userFilesUpload } from '../middleware/multer.js';
import {   Bookmark, createCommand, createReview, deleteCommand, editCommand, follow, followersList, followingList, getAllCommand, like, reportUser } from '../controller/reviewController.js';

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


{/**Command */}
reviewRouter.post("/addCommand",(req,res)=>{
    //#swagger.tags = ['Review']
    createCommand(req,res)
})
reviewRouter.post("/getCommands",(req,res)=>{
    //#swagger.tags = ['Review']
    getAllCommand(req,res)
})
reviewRouter.put("/editCommand/:id",(req,res)=>{
    //#swagger.tags = ['Review']
    editCommand(req,res)
})
reviewRouter.delete("/deleteCommand/:id",(req,res)=>{
    //#swagger.tags  = ['Review']
    deleteCommand(req,res)
})


export default reviewRouter;