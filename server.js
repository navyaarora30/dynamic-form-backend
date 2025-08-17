import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import formRoutes from "./routes/formRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://dynamic-form-frontend-rust.vercel.app",
  "http://localhost:5173" // optional: for local dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Form Builder API is working");
});

app.use("/api", formRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });