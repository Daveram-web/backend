import express from 'express';
import { actorById, actorList, addactor, addCrew, addStreaming, castAdd, editactor, editStream, getAllMovies, streamingList, uploadMovieAssets } from '../controller/movieController.js';
import { uploadMovieFiles } from '../middleware/multer.js';

const movieRouter = express.Router();

//#swagger.tags = ['Movie']
movieRouter.post('/uploadAssets', uploadMovieFiles, uploadMovieAssets);

//#swagger.tags = ['Movie']
movieRouter.get('/all', getAllMovies);

{/**streaming */}
//#swagger.tags = ['Movie']
movieRouter.post("/addstreaming",uploadMovieFiles,addStreaming)
//#swagger.tags = ['Movie']
movieRouter.get("/streamingList",streamingList)
//#swagger.tags = ['Movie']
movieRouter.put("/editStreaming",uploadMovieFiles,editStream)


{/**Actor */}
//#swagger.tags = ['Movie']
movieRouter.post("/addActors",uploadMovieFiles,addactor)
//#swagger.tags = ['Movie']
movieRouter.get("/actorList",actorList)
//#swagger.tags = ['Movie']
movieRouter.get("/actorByid/:id",actorById)
//#swagger.tags = ['Movie']
movieRouter.put("/editActor",uploadMovieFiles,editactor)



{/**Crew */}
//#swagger.tags = ['Movie']
movieRouter.post("/addCrew",uploadMovieFiles,addCrew)

{/**Cast */}
//#swagger.tags = ['Movie']
movieRouter.post("/addCast",castAdd)

export default movieRouter;
