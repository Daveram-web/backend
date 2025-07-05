import express from "express";
import {
  actorById,
  actorList,
  addactor,
  addCrew,
  addStreaming,
  castAdd,
  editactor,
  editStream,
  getAllMovies,
  streamingList,
  uploadMovieAssets,
} from "../controller/movieController.js";
import { uploadMovieFiles } from "../middleware/multer.js";

const movieRouter = express.Router();

movieRouter.post("/uploadMovie", (req, res) =>
  //#swagger.tags = ['Movie']
  {
    uploadMovieFiles, uploadMovieAssets(req, res);
  }
);

movieRouter.get("/movieById", (req, res) => {
  //#swagger.tags = ['Movie']
  getAllMovies(req, res);
});

{
  /**streaming */
}
movieRouter.post("/addstreaming", (req, res) => {
  //#swagger.tags = ['Movie']
  uploadMovieFiles, addStreaming(req, res);
});
movieRouter.get("/streamingList", (req, res) => {
  //#swagger.tags = ['Movie']
  streamingList(req, res);
});
movieRouter.put("/editStreaming", (req, res) => {
  //#swagger.tags = ['Movie']
  uploadMovieFiles, editStream(req, res);
});

{
  /**Actor */
}
movieRouter.post("/addActors", (req, res) => {
  //#swagger.tags = ['Movie']
  uploadMovieFiles, addactor(req, res);
});
movieRouter.get("/actorList", (req, res) => {
  //#swagger.tags = ['Movie']
  actorList(req, res);
});
movieRouter.get("/actorByid/:id", (req, res) => {
  //#swagger.tags = ['Movie']
  actorById(req, res);
});
movieRouter.put("/editActor", (req, res) => {
  //#swagger.tags = ['Movie']
  uploadMovieFiles, editactor(req, res);
});

{
  /**Crew */
}
movieRouter.post("/addCrew", (req, res) => {
  //#swagger.tags = ['Movie']
  uploadMovieFiles, addCrew(req, res);
});

{
  /**Cast */
}
movieRouter.post("/addCast", (req, res) => {
  //#swagger.tags = ['Movie']
  castAdd(req, res);
});

export default movieRouter;
