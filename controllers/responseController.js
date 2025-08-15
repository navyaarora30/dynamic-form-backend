import Response from "../models/Response.js";

export const createResponse = async (req, res) => {
  try {
    const { formId, answers } = req.body;

    if (!formId || !answers) {
      return res.status(400).json({ message: "formId and answers are required" });
    }

    const newResponse = new Response({ formId, answers });
    await newResponse.save();

    res.status(201).json({ message: "Response saved", response: newResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all
export const getAllResponses = async (req, res) => {
  try {
    const responses = await Response.find();
    res.status(200).json(responses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single response
export const getResponseById = async (req, res) => {
  try {
    const response = await Response.findById(req.params.id);
    if (!response) return res.status(404).json({ message: "Response not found" });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all responses
export const getResponsesByFormId = async (req, res) => {
  try {
    const { formId } = req.params;
    if (!formId) return res.status(400).json({ message: "formId is required" });
    const responses = await Response.find({ formId });
    res.status(200).json(responses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
