import multer from 'multer';
import path from 'path';
import fs from 'fs';

const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDirExists('./uploads/movies/thumbnail');
ensureDirExists('./uploads/movies/trailer');
ensureDirExists('./uploads/movies/streamingplatforms');
ensureDirExists('./uploads/movies/actor')
ensureDirExists('./uploads/movies/crew')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'thumbnail') {
      cb(null, './uploads/movies/thumbnail');
    } else if (file.fieldname === 'trailer') {
      cb(null, './uploads/movies/trailer');
    }else if(file.fieldname === 'streaming'){
      cb(null,'./uploads/movies/streamingplatforms')
    }
    else if(file.fieldname === 'actor'){
      cb(null,'./uploads/movies/actor')
    }
    else if(file.fieldname === 'crew'){
      cb(null,'./uploads/movies/crew')
    }
     else {
      cb(new Error('Invalid field name'), false);
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
  const filename =  Math.round(Math.random() * 1E9) + ext;
      cb(null, filename);
  },
});

export const uploadMovieFiles = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024,  
  },
}).fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'trailer', maxCount: 1 },
  {name:'streaming',maxCount:1},
  {name:'actor',maxCount:1},
  {name:'crew',maxCount:1},
]);
