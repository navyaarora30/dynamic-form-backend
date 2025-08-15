import base from "../config/airtableAuth.js";
import Form from "../models/Form.js";

// Create Airtable record
export const createAirtableRecord = async (req, res) => {
  try {
    const { formId, name, email, message } = req.body;

    if (!formId) {
      return res.status(400).json({ message: "formId is required" });
    }

    const form = await Form.findById(formId);
    if (!form) return res.status(404).json({ message: "Form not found" });

    const tableName = form.airtable.tableName || "Submissions";

    base(tableName).create(
      [{ fields: { Name: name, Email: email, Message: message } }],
      (err, records) => {
        if (err) {
          console.error("Airtable creation error:", err);
          return res.status(500).json({ message: "Airtable error", error: err });
        }
        res.status(201).json({ message: "Record added to Airtable", records });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch Airtable records
export const getAirtableRecords = async (req, res) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(400).json({ message: "formId is required" });
    }

    const form = await Form.findById(formId);
    if (!form) return res.status(404).json({ message: "Form not found" });

    const tableName = form.airtable.tableName || "Submissions";

    base(tableName)
      .select({ view: "Grid view" })
      .firstPage((err, records) => {
        if (err) {
          console.error("Airtable fetch error:", err);
          return res.status(500).json({ message: "Airtable error", error: err });
        }
        const data = records.map((record) => record.fields);
        res.status(200).json(data);
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
