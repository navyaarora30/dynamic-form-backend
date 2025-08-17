import base from "../config/airtableAuth.js";
import Form from "../models/Form.js";

// Create Airtable Record
export const createAirtableRecord = async (req, res) => {
  try {
    const { formId, name, email, message } = req.body;

    if (!formId) {
      return res.status(400).json({ message: "formId is required" });
    }

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    const tableName = form.airtable?.tableName || "Submissions";

    base(tableName).create(
      [
        {
          fields: {
            Name: name,
            Email: email,
            Message: message,
          },
        },
      ],
      (err, records) => {
        if (err) {
          console.error("Airtable creation error:", err);
          return res
            .status(500)
            .json({ message: "Airtable error", error: err });
        }

        console.log("Airtable record created:", records[0]?.id);
        res.status(201).json({
          message: "Record added to Airtable",
          recordId: records[0]?.id,
          fields: records[0]?.fields,
        });
      }
    );
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

//  Fetch Airtable Records
export const getAirtableRecords = async (req, res) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(400).json({ message: "formId is required" });
    }

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    const tableName = form.airtable?.tableName || "Submissions";

    base(tableName)
      .select({ view: "Grid view" })
      .firstPage((err, records) => {
        if (err) {
          console.error("Airtable fetch error:", err);
          return res
            .status(500)
            .json({ message: "Airtable error", error: err });
        }

        const data = records.map((record) => ({
          id: record.id,
          fields: record.fields,
        }));

        res.status(200).json(data);
      });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
