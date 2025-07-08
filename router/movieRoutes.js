import express from "express";
import {
  actorById,
  actorList,
  addactor,
  addCrew,
  addStreaming,
  castAdd,
  deleteMovieById,
  editactor,
  editMovie,
  editStream,
  getById,
  getLatestMovies,
  getPopularMovies,
  getRecommendedMovies,
  movieList,
  searchApi,
  streamingList,
  uploadMovieAssets,
} from "../controller/movieController.js";
import { uploadMovieFiles } from "../middleware/multer.js";

const movieRouter = express.Router();

{/**Movie Routes */}
//#swagger.tags = ['Movie']
movieRouter.post("/uploadMovie",uploadMovieFiles, uploadMovieAssets)


movieRouter.get("/movieList/:user_id",(req,res)=>{
  //#swagger.tags = ['Movie']
  movieList(req,res)
})
movieRouter.get("/movieById/:id", (req, res) => {
  //#swagger.tags = ['Movie']
  getById(req, res);
});
movieRouter.get("/recommended/:user_id",(req,res)=>{
  //#swagger.tags = ['Movie']
  getRecommendedMovies(req,res)
})
movieRouter.get("/latest",(req,res)=>{
  //#swagger.tags = ['Movie']
  getLatestMovies(req,res)
})
movieRouter.get("/popular",(req,res)=>{
  //#swagger.tags = ['Movie']
  getPopularMovies(req,res)
})
movieRouter.post("/searchApi",(req,res)=>{
  //#swagger.tags = ["Movie"]
  searchApi(req,res)
})





movieRouter.put("/editById/:id",(req,res)=>{
  //#swagger.tags = ['Movie']
  editMovie(req,res)})

movieRouter.delete("/deleteMovieById/:id",(req,res)=>{
  //#swagger.tags = ['Movie']
  deleteMovieById(req,res)
})


{/**streaming */}
//#swagger.tags = ['Movie']
movieRouter.post("/addstreaming",uploadMovieFiles, addStreaming);
movieRouter.get("/streamingList", (req, res) => {
  //#swagger.tags = ['Movie']
  streamingList(req, res);
});

 //#swagger.tags = ['Movie']
movieRouter.put("/editStreaming",uploadMovieFiles, editStream);

{/**Actor */}

//#swagger.tags = ['Movie']
movieRouter.post("/addActors",uploadMovieFiles, addactor);

movieRouter.get("/actorList", (req, res) => {
  //#swagger.tags = ['Movie']
  actorList(req, res);
});
movieRouter.get("/actorByid/:id", (req, res) => {
  //#swagger.tags = ['Movie']
  actorById(req, res);
});
//#swagger.tags = ['Movie']
movieRouter.put("/editActor", uploadMovieFiles, editactor);
{/**Crew */}
//#swagger.tags = ['Movie']
movieRouter.post("/addCrew",uploadMovieFiles, addCrew);



{/**Cast */}
movieRouter.post("/addCast", (req, res) => {
  //#swagger.tags = ['Movie']
  castAdd(req, res);
});

export default movieRouter;
