import db from "../db/db.js";

export const createGener = async(req,res)=>{
    try {
        const {name} = req.body;
        let [create] = await db.query("INSERT INTO gener(name) VALUE (?)",[name])
        let result = create.affectedRows ? 1 : 0
        return res.status(200).json({
            result:result,
            message:"Has Added",
            })

    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

export const editGener = async(req,res)=>{
    try {
        const {name,id} = req.body;
        let [edit] = await db.query("UPDATE  gener SET name = ? WHERE id =?",[name,id])
        let result = edit.affectedRows ? 1 : 0
        return res.status(200).json({
            result:result,
            message:"Has Edited",
            })

    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

export const deleteGener = async(req,res)=>{
    try {
        const {id} = req.body;
        let [edit] = await db.query("UPDATE  gener SET status = 0 WHERE id =?",[id])
        let result = edit.affectedRows ? 1 : 0
        return res.status(200).json({
            result:result,
            message:"Has deleted",
            })

    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}




export const addLanguage = async(req,res)=>{
    try {
        const {name} = req.body;
        let [add]  = await db.query("INSERT INTO language(name) VALUE(?)",[name])
        const result = add.affectedRows ? 1 : 0
        return res.status(200).json({
            message:"has Added",
            result:result
        }) 
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

export const editLanguage = async(req,res)=>{
    try {
        const {name,id} = req.body;
        let [edit]  = await db.query("UPDATE  language SET name = ? WHERE id  = ? ",[name,id])
        const result = edit.affectedRows ? 1 : 0
        return res.status(200).json({
            message:"has edited",
            result:result
        }) 
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

export const deleteLanguage = async(req,res)=>{
    try {
        const {id} = req.body;
        let [deletes] = await db.query("UPDATE language SET status = 0 WHERE id = ? ",[id])
        const result = deletes.affectedRows ? 1 : 0
        return res.status(200).json({
            message:"has edited",
            result:result
        }) 
    } catch (error) {
        return res.status(400).json({error: error.message})
}
}

export const addReportList = async(req,res)=>{
    try {
        const {title} = req.body;
        const [add] = await db.query("INSERT INTO report_list(title) VALUE (?)",[title])
        let result  =  add.affectedRows ? 1 : 0 
        console.log('add', add)
        console.log('result', result)
        return res.status(200).json({
            status : result,
            message  :"The Report List is added",

        }) 
    } catch (error) {
        return res.status(400).json({error  :error.message})
    }
}

export const editReportList  = async(req,res)=>{
    try {
        const {id,title}= req.body
        let [edit] = await db.query("UPDATE SET title = ? WHERE id = ?",[title,id])
        let result = edit.affectedRows ? 1 : 0 ;
        return res.status(200).json({
            message:"The value is editied",
            status:result
        })
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
} 