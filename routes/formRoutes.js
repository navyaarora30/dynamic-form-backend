import express from "express";
import {
  createForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
} from "../controllers/FormController.js";

const router = express.Router();

// Create route
router.post("/", createForm);

// Get all route
router.get("/", getForms);

// Get route
router.get("/:id", getFormById);

// Update route
router.put("/:id", updateForm);

// Delete route
router.delete("/:id", deleteForm);

export default router;
