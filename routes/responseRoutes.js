import express from "express";
import {
  createResponse,
  getAllResponses,
  getResponseById,
  getResponsesByFormId,
} from "../controllers/responseController.js";

const router = express.Router();

//create route
router.post("/", createResponse);

//Get all route
router.get("/", getAllResponses);

//Get route
router.get("/form/:formId", getResponsesByFormId);

//Get route
router.get("/:id", getResponseById);

export default router;
