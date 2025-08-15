import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import airtableRoutes from "./routes/airtableRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/submissions", airtableRoutes);
app.use("/api/responses", responseRoutes); 

app.get("/", (req, res) => {
  res.send("API is working");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
