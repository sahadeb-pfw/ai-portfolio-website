import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Health route
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API is live" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
