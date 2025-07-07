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
  createGener(req, res);
});
adminRoute.put("/editGener", (req, res) => {
  // #swagger.tags = ['Admin']
  //#swagger.tags = ['Admin']
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: { type: "string" }
          },
          example: {
            name: "Comedy"
          }
        }
      }
    }
  }
  */
  editGener(req, res);
});

adminRoute.delete("/deleteGener", (req, res) => {
  // #swagger.tags = ['Admin']
  deleteGener(req, res);
});
{
  /*Language */
}
adminRoute.post("/addLang", (req, res) => {
  // #swagger.tags = ['Admin']
  addLanguage(req, res);
});

adminRoute.put("/editLang", (req, res) => {
  // #swagger.tags = ['Admin']
  editLanguage(req, res);
});

adminRoute.delete("/deleteLan", (req, res) => {
  // #swagger.tags = ['Admin']
  deleteLanguage(req, res);
});

{
  /**Report APIS */
}
adminRoute.post("/addReport", (req, res) => {
  // #swagger.tags = ['Admin']
  addReportList(req, res);
});

adminRoute.put("/editReport", (req, re) => {
  // #swagger.tags = ['Admin']
  editReportList(req, res);
});

export default adminRoute;
