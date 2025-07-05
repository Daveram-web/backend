import express from 'express'
import { addLanguage, addReportList, createGener, deleteGener, deleteLanguage, editGener, editLanguage, editReportList } from '../controller/adminController.js'

const adminRoute = express.Router()

{/*Gener */}
// #swagger.tags = ['Admin']
adminRoute.post("/addGener",createGener)
// #swagger.tags = ['Admin']
adminRoute.put("/editGener",editGener)
// #swagger.tags = ['Admin']
adminRoute.delete("/deleteGener",deleteGener)
{/*Language */}
// #swagger.tags = ['Admin']
adminRoute.post("/addLang",addLanguage);
// #swagger.tags = ['Admin']
adminRoute.put("/editLang",editLanguage)
// #swagger.tags = ['Admin']
adminRoute.delete("/deleteLan",deleteLanguage)
{/**Report APIS */}
// #swagger.tags = ['Admin']
adminRoute.post("/addReport",addReportList)
// #swagger.tags = ['Admin']
adminRoute.put("/editReport",editReportList)
 
export  default adminRoute;


