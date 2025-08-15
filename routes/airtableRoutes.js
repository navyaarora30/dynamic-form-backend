import express from "express";
import { createAirtableRecord, getAirtableRecords } from "../controllers/airtableController.js";

const router = express.Router();

router.post("/", createAirtableRecord);

router.get("/:formId", getAirtableRecords);

export default router;
