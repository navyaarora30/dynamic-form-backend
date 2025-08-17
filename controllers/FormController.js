import Form from "../models/Form.js";

// Create a new form
export const createForm = async (req, res) => {
  try {
    const { title, owner, fields } = req.body;

    // Validate required fields
    if (!title || !owner || !fields || !Array.isArray(fields)) {
      return res.status(400).json({ message: "Missing or invalid form data" });
    }

    const newForm = new Form({
      title,
      owner,
      fields,
      airtable: {
        tableName: process.env.AIRTABLE_TABLE_NAME,
        baseId: process.env.AIRTABLE_BASE_ID
      }
    });

    await newForm.save();
    res.status(201).json({ message: "Form created successfully", form: newForm });
  } catch (err) {
    console.error("❌ Error creating form:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all forms (with optional pagination)
export const getForms = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const forms = await Form.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(forms);
  } catch (err) {
    console.error("❌ Error fetching forms:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single form by ID
export const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.status(200).json(form);
  } catch (err) {
    console.error("❌ Error fetching form:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a form by ID
export const updateForm = async (req, res) => {
  try {
    const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedForm) return res.status(404).json({ message: "Form not found" });
    res.status(200).json({ message: "Form updated successfully", form: updatedForm });
  } catch (err) {
    console.error("❌ Error updating form:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a form by ID
export const deleteForm = async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.id);
    if (!deletedForm) return res.status(404).json({ message: "Form not found" });
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting form:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};