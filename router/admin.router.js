import express from 'express'
import { addLanguage, addReportList, createGener, deleteGener, deleteLanguage, editGener, editLanguage, editReportList } from '../controller/adminController.js'

const adminRoute = express.Router()
{/*Gener */}
adminRoute.post("/addGener",createGener)
adminRoute.put("/editGener",editGener)
adminRoute.delete("/deleteGener",deleteGener)

{/*Language */}
adminRoute.post("/addLang",addLanguage);
adminRoute.put("/editLang",editLanguage)
adminRoute.delete("/deleteLan",deleteLanguage)


{/**Report APIS */}
adminRoute.post("/addReport",addReportList)
adminRoute.put("/editReport",editReportList)
    
export  default adminRoute;