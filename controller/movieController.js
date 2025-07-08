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
    console.log('req.body', req.body)
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


export const getById = async (req, res) => {
  try {
    const {id} = req.params;
    const [movies] = await db.query(`
      SELECT 
        
        title,
        ratting,
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
      FROM movie WHERE id = ? AND status = 0 
      ORDER BY id DESC
    `,[id]);

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
        ratting : movie.ratting,
        cast,
        crew,
        genres,
        languages,
        streaming,
        release_date: movie.release_date,
        description: movie.description,
        country: movie.country,
        thumbnail: movie.thumbnail_image,
        trailer: movie.trailer_path,
        year: movie.year,
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

export const editMovie = async(req,res)=>{
  try {
    const {id} = req.params;
    const {title,castData,crew,gener,language,release_date,description,country,year,streaming}= req.body;
    const thumbnail = req.files?.thumbnail?.[0]
    const trailer = req.files?.trailer?.[0]
   const castD = typeof castData === "string" ? castData.split(",") : castData;
    const crewD = typeof crew === "string" ? crew.split(",") : crew;
    const generD = typeof gener === "string" ? gener.split(",") : gener;
    const langD = typeof language === "string" ? language.split(",") : language;
    const streamD = typeof streaming === "string" ? streaming.split(",") : streaming;

    
    let fields = [];
    let values = [];

    if(title){
      fields.push("title = ?")
      values.push(title)
    }

    if(castData){
      fields.push("cast_data_id = ? ")
      values.push(castD.join(','))
    }
    if(crew){
      fields.push("crew_id =?")
      values.push(crewD.join(','))
    }
    if(gener){
      fields.push("gener_id=?")
      values.push(generD.join(','))
    }
    if(language){
      fields.push("language_id = ?")
      values.push(langD.join(','))
    }

    if(release_date){
      fields.push("release_date = ?")
      values.push(release_date)
    }
    if(description){
      fields.push("description=?")
      values.push(description)
    }
    if(country){
      fields.push("country = ? ")
      values.push(country)
    }

    if(thumbnail){
      fields.push("thumbnail_image = ?")
      values.push(thumbnail?.filename)
    }

    if(trailer){
      fields.push("trailer_path = ?")
      values.push(trailer?.filename)
    }
    if(year){
      fields.push("year = ?")
      values.push(year)
    }
    if(streaming){
      fields.push("streaming_id = ?")
      values.push(streamD.join(','))
    }

    values.push(id)
    const sql = `UPDATE movie SET ${fields.join(",")} WHERE id = ?`
    let [update] = await db.query(sql,values)
    let result = update.affectedRows ? 1 : 0
    return res.status(200).json({
      message : "The value is updated",
      status : result,
      error : [],
      data:[]
    })

  } catch (error) {
    return res.status(400).json({
      error:error.message
    })
  }
}


export const deleteMovieById = async(req,res)=>{
  try {
    const {id} = req.params;
    const [deletes] = await db.query("UPDATE movie SET status = 1 WHERE id = ?",[id]) 
    let result = deletes.affectedRows ? 1  : 0 
    return res.status(200).json({
      message:"The Movie is deleted",
      status:result,
      error:[],
      data:[]
    })
  } catch (error) {
    return res.status(400).json({error:error.message})
  }
}




{/**Need to Upgrade the api and add 3 more result for the api AS Recommended ,Latest and Most Popular */}
export const movieList = async(req,res)=>{

  try {
    const {offset} = req.body;
    const [list] = await db.query("SELECT * FROM movie LIMIT = 18 OFFSET = ? ORDER BY DESC",[offset])
    let result = list.length ? 1 : 0

  } catch (error) {
    
  }
}
