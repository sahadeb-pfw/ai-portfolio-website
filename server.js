import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API is live" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body || {};

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY on server" });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;

    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await geminiRes.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join(" ") ||
      "Sorry, I could not generate a response right now.";

    return res.json({ reply });
  } catch (err) {
    return res.status(500).json({ error: "Chat API failed", details: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
