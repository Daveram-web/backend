import db from "../db/db.js";


export const addStreaming =async(req,res)=>{
  try {
    const streaming = req.files?.streaming?.[0];
    const {name} = req.body;

    if(!streaming || !name){
      return res.status(404).json({
        error:"Movie Name and thumbnail venu",
        data:[],
        message:"2 fields uuh venu",
        status:0
      })
    }
    const [add]  =await db.query("INSERT INTO streaming (streaming_platform,image) VALUE (?,?)",[name,streaming.filename])
    let result = add.affectedRows  ? 1 : 0
    return res.status(200).json({
      message:"The Streaming add ",
      data:[{name : name,imageLocation : streaming}],
      status:result,
      error:[]
    })
  } catch (error) {
    return res.status(400).json({error:error.message})
  }
}


export const streamingList = async(req,res)=>{
  try {
    let [list]  = await db.query("SELECT * FROM streaming WHERE status = 0")
    let result = list.length ? 1 : 0;
    return res.status(200).json({
      message:"The streaminglist is",
      data:[list],
      error:[],
      status:result
    })
  } catch (error) {
        return res.status(400).json({
      message:"The streaminglist is not obtained",
      data:[],
      error:[{error:error.message}],
      status:0
    })
  }
}

export const editStream = async(req,res)=>{
  try {
    const streaming = req.files?.streaming?.[0]
    const {id,name} = req.body;

    if(!streaming){
      return res.status(400).json("The image illa")
    }
    if(!id || !name){
      return res.status(400).json("name or id illa ")
    }
    let fields = []
    let values = []

    if(streaming){
      fields.push("image = ?")
      values.push(streaming.filename)
    }

    if(name){
      fields.push("streaming_platform = ?")
      values.push(name)
    }
    values.push(id)

    const sql = `UPDATE streaming SET ${fields.join(",")} WHERE id = ?`
    const [updates] = await db.query(sql,values)
    let result = updates.affectedRows ? 1 : 0
    return res.status(200).json({
      message:"The value is updated",
      data:"the value is updated",
      error:[],
      status:result
    })

  } catch (error) {
    return res.status(400).json({error : error.message})
  }
}


export const addactor =async(req,res)=>{
  try {
    const actor = req.files?.actor?.[0];
    const {name} = req.body;  
    console.log('name', name)

    if(!actor || !name){
      return res.status(404).json({
        error:"actor Name and actor image venu",
        data:[],
        message:"2 fields uuh venu",
        status:0
      })
    }
    const [add]  =await db.query("INSERT INTO actor_data (actor_name,actor_image) VALUE (?,?)",[name,actor.filename])
    let result = add.affectedRows  ? 1 : 0
    return res.status(200).json({
      message:"The Streaming add ",
      data:[{name : name,imageLocation : actor.filename}],
      status:result,
      error:[]
    })
  } catch (error) {
    return res.status(400).json({error:error.message})
  }
}

export const actorList = async(req,res)=>{
  try {
    let [list]  = await db.query("SELECT * FROM actor_data ")
    let result = list.length ? 1 : 0;
    return res.status(200).json({
      message:"The actor_data is",
      data:[list],
      error:[],
      status:result
    })
  } catch (error) {
        return res.status(400).json({
      message:"The actor_data is not obtained",
      data:[],
      error:[{error:error.message}],
      status:0
    })
  }
}


export const actorById = async(req,res)=>{
  try {
    const {id} = req.params;
    let [list]  = await db.query("SELECT * FROM actor_data WHERE id =?",[id])
    let result = list.length ? 1 : 0;
    return res.status(200).json({
      message:"The actor_data is",
      data:[list],
      error:[],
      status:result
    })
  } catch (error) {
        return res.status(400).json({
      message:"The actor_data is not obtained",
      data:[],
      error:[{error:error.message}],
      status:0
    })
  }
}

export const editactor = async(req,res)=>{
  try {
    const actor = req.files?.actor?.[0]
    const {id,name} = req.body;

    if(!actor){
      return res.status(400).json("The image illa")
    }
    if(!id || !name){
      return res.status(400).json("name or id illa ")
    }
    let fields = []
    let values = []

    if(actor){
      fields.push("actor_image = ?")
      values.push(actor.filename)
    }

    if(name){
      fields.push("actor_name = ?")
      values.push(name)
    }
    values.push(id)

    const sql = `UPDATE actor_data SET ${fields.join(",")} WHERE id = ?`
    const [updates] = await db.query(sql,values)
    let result = updates.affectedRows ? 1 : 0
    return res.status(200).json({
      message:"The value is updated",
      data:"the value is updated",
      error:[],
      status:result
    })

  } catch (error) {
    return res.status(400).json({error : error.message})
  }
}

export const addCrew = async(req,res)=>{
  try {
    const crew = req.files?.crew?.[0]
    const {name,designation} = req.body;
    if(!crew){
      return res.status(400).json({
        message:"Crew Image illa",
        status:0,
        data:[],
        error:"Image illa"
      })
    }
    let [add] = await db.query("INSERT INTO  crew_data(name,designation,image) VALUE(?,?,?)",[name,designation,crew.filename])
    let result =  add.affectedRows ? 1 : 0
    return res.status(200).json({
      message:"The Crew data is added",
      status:result,
      data:[{name:name,designation:designation,imagePath:crew.filename}],
      error:[]
    }) 
  } catch (error) {
        return res.status(400).json({
      message:"The Crew data is not added",
      status:result,
      data:[],
      error:[{error:error.message}]
    }) 
  }
}


export const castAdd = async(req,res)=>{
  try {
    const {actor_id,charector_name} = req.body;
    if(!actor_id){
      return res.status(400).json("actor Id illa")
    }
    if(!charector_name){
      return res.status(400).json("chanretor name illa")
    }
    let [add] = await db.query("INSERT INTO cast_data(actor_data_id,charector_name) VALUES (?,?)",[actor_id,charector_name])
    let result = add.affectedRows ? 1 :  0;
    return res.status(200).json({
      status:result,
      data:"Added",
      error:[],
      message:"added"
    })
  } catch (error) {
    return res.status(400).status({error:error.message})
  }
}


export const uploadMovieAssets = async (req, res) => {
  try {
    const {title,castData,crew,gener,language,release_date,description,country,year,streaming} = req.body;
const thumbnail = req.files?.thumbnail?.[0];
const trailer = req.files?.trailer?.[0];

    
   
    if (!title ||!castData ||!crew ||!gener ||!language ||!release_date ||!description ||!country ||!year ||!streaming) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const castD = typeof castData === "string" ? castData.split(",") : castData;
    const crewD = typeof crew === "string" ? crew.split(",") : crew;
    const generD = typeof gener === "string" ? gener.split(",") : gener;
    const langD = typeof language === "string" ? language.split(",") : language;
    const streamD = typeof streaming === "string" ? streaming.split(",") : streaming;

    if (!thumbnail || !trailer) {
      return res.status(400).json({
        message: "Both thumbnail and trailer are required",
        status: 0,
        error: [],
      });
    }

  
    const movieInsertValues = [
  title,
  castD.join(','),
  crewD.join(','),
  generD.join(','),
  langD.join(','),
  release_date,
  description,
  country,
  thumbnail.filename,
  trailer.filename,
  year,
  streamD.join(',')
];

    const sql  = "INSERT INTO movie(title,cast_data_id,crew_id,gener_id,language_id,release_date,description,country,thumbnail_image,trailer_path,year,streaming_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"
    const [add] = await db.query(sql,movieInsertValues)
    let result = add.affectedRows ?  1 :0

    return res.status(200).json({
      status: result,
      message: "Movie uploaded successfully",
      data: {
        title,
        thumbnail: thumbnail.filename,
        trailer: trailer.filename,
        cast: castD,
        crew: crewD,
        gener: generD,
        language: langD,
        streaming: streamD,
      },
      error: [],
    });

  } catch (error) {
    return res.status(500).json({
      message: "Upload failed",
      status: 0,
      error: error.message,
    });
  }
};


// export const getAllMovies = async (req, res) => {
//   try {
//     const [movies] = await db.query(`SELECT * FROM movie 
//       LEFT JOIN 
      
//       ORDER BY id DESC`);

//     return res.status(200).json({
//       status: 1,
//       message: "Movies fetched successfully",
//       data: movies,
//       error: []
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: 0,
//       message: "Failed to fetch movies",
//       error: error.message,
//       data: []
//     });
//   }
// };


export const getAllMovies = async (req, res) => {
  try {
    const [movies] = await db.query(`
      SELECT 
        id,
        title,
        cast_data_id,
        crew_id,
        gener_id,
        language_id,
        release_date,
        description,
        country,
        thumbnail_image,
        trailer_path,
        year,
        streaming_id
      FROM movie
      ORDER BY id DESC
    `);

    const results = [];

    for (const movie of movies) {
      const castIds = movie.cast_data_id?.split(',').filter(Boolean).map(Number) || [];
      const crewIds = movie.crew_id?.split(',').filter(Boolean).map(Number) || [];
      const generIds = movie.gener_id?.split(',').filter(Boolean).map(Number) || [];
      const langIds = movie.language_id?.split(',').filter(Boolean).map(Number) || [];
      const streamIds = movie.streaming_id?.split(',').filter(Boolean).map(Number) || [];

      const [cast] = await db.query(`
        SELECT cd.id, cd.charector_name, ad.actor_name, ad.actor_image
        FROM cast_data cd
        JOIN actor_data ad ON cd.actor_data_id = ad.id
        WHERE cd.id IN (?)
      `, [castIds]);

      const [crew] = await db.query(`
        SELECT id, name, designation, image
        FROM crew_data
        WHERE id IN (?)
      `, [crewIds]);

      const [genres] = await db.query(`
        SELECT id, name
        FROM gener
        WHERE id IN (?)
      `, [generIds]);

      const [languages] = await db.query(`
        SELECT id, name
        FROM language
        WHERE id IN (?)
      `, [langIds]);

      const [streaming] = await db.query(`
        SELECT id, streaming_platform, image
        FROM streaming
        WHERE id IN (?)
      `, [streamIds]);

      results.push({
        id: movie.id,
        title: movie.title,
        cast,
        crew,
        genres,
        languages,
        release_date: movie.release_date,
        description: movie.description,
        country: movie.country,
        thumbnail: movie.thumbnail_image,
        trailer: movie.trailer_path,
        year: movie.year,
        streaming,
      });
    }

    res.status(200).json({
      status: 1,
      message: "Movies fetched successfully",
      data: results,
      error: []
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to fetch movies",
      error: error.message,
      data: []
    });
  }
};


// export const getAllMovies = async (req, res) => {
//   try {
//     const [movies] = await db.query(`
//       SELECT 
//         m.id,
//         m.title,
//         m.release_date,
//         m.description,
//         m.country,
//         m.thumbnail_image AS thumbnail,
//         m.trailer_path AS trailer,
//         m.year,

//         GROUP_CONCAT(DISTINCT CONCAT(ad.actor_name, ' (', cd.charector_name, ')')) AS cast,
//         GROUP_CONCAT(DISTINCT CONCAT(cr.name, ' (', cr.designation, ')')) AS crew,
//         GROUP_CONCAT(DISTINCT g.name) AS genres,
//         GROUP_CONCAT(DISTINCT l.name) AS languages,
//         GROUP_CONCAT(DISTINCT s.streaming_platform) AS streaming

//       FROM movie m

//       LEFT JOIN movie_cast mc ON mc.movie_id = m.id
//       LEFT JOIN cast_data cd ON mc.cast_data_id = cd.id
//       LEFT JOIN actor_data ad ON cd.actor_data_id = ad.id

//       LEFT JOIN movie_crew mcr ON mcr.movie_id = m.id
//       LEFT JOIN crew_data cr ON mcr.crew_id = cr.id

//       LEFT JOIN movie_gener mg ON mg.movie_id = m.id
//       LEFT JOIN gener g ON mg.gener_id = g.id

//       LEFT JOIN movie_language ml ON ml.movie_id = m.id
//       LEFT JOIN language l ON ml.language_id = l.id

//       LEFT JOIN movie_streaming ms ON ms.movie_id = m.id
//       LEFT JOIN streaming s ON ms.streaming_id = s.id

//       GROUP BY m.id
//       ORDER BY m.id DESC
//     `);

//     res.status(200).json({
//       status: 1,
//       message: "Movies fetched successfully",
//       data: movies,
//       error: []
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 0,
//       message: "Failed to fetch movies",
//       error: error.message,
//       data: []
//     });
//   }
// };
