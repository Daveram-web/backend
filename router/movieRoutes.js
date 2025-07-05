import express from 'express';
import { actorById, actorList, addactor, addCrew, addStreaming, castAdd, editactor, editStream, getAllMovies, streamingList, uploadMovieAssets } from '../controller/movieController.js';
import { uploadMovieFiles } from '../middleware/multer.js';

const movieRouter = express.Router();

movieRouter.post('/uploadAssets', uploadMovieFiles, uploadMovieAssets);

movieRouter.get('/all', getAllMovies);

{/**streaming */}
movieRouter.post("/addstreaming",uploadMovieFiles,addStreaming)
movieRouter.get("/streamingList",streamingList)
movieRouter.put("/editStreaming",uploadMovieFiles,editStream)


{/**Actor */}
movieRouter.post("/addActors",uploadMovieFiles,addactor)
movieRouter.get("/actorList",actorList)
movieRouter.get("/actorByid/:id",actorById)
movieRouter.put("/editActor",uploadMovieFiles,editactor)



{/**Crew */}
movieRouter.post("/addCrew",uploadMovieFiles,addCrew)

{/**Cast */}
movieRouter.post("/addCast",castAdd)

export default movieRouter;
