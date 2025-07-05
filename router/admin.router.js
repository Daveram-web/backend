import express from "express";
import {
  addLanguage,
  addReportList,
  createGener,
  deleteGener,
  deleteLanguage,
  editGener,
  editLanguage,
  editReportList,
} from "../controller/adminController.js";

const adminRoute = express.Router();

{
  /*Gener */
}
adminRoute.post("/addGener", (req, res) => {
  // #swagger.tags = ['Admin']
  createGener;
});
adminRoute.put("/editGener", (req, res) => {
  // #swagger.tags = ['Admin']
  editGener;
});

adminRoute.delete("/deleteGener", (req, res) => {
  // #swagger.tags = ['Admin']
  deleteGener;
});
{
  /*Language */
}
adminRoute.post("/addLang", (req, res) => {
  // #swagger.tags = ['Admin']
  addLanguage;
});

adminRoute.put("/editLang", (req, res) => {
  // #swagger.tags = ['Admin']
  editLanguage;
});

adminRoute.delete("/deleteLan", (req, res) => {
  // #swagger.tags = ['Admin']
  deleteLanguage;
});

{
  /**Report APIS */
}
adminRoute.post("/addReport", (req, res) => {
  // #swagger.tags = ['Admin']
  addReportList;
});

adminRoute.put("/editReport", (req, re) => {
  // #swagger.tags = ['Admin']
  editReportList;
});

export default adminRoute;
