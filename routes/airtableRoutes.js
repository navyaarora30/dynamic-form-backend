import express from "express";
import { createAirtableRecord, getAirtableRecords } from "../controllers/airtableController.js";

const router = express.Router();

// POST: Create Airtable record
router.post("/", createAirtableRecord);

// GET: Fetch Airtable records by formId
router.get("/:formId", getAirtableRecords);

export default router;