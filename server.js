import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
console.log("ENV_CHECK_STARTUP", {
  hasGemini: !!process.env.GEMINI_API_KEY,
  hasGoogle: !!process.env.GOOGLE_API_KEY,
  hasGeminiAlt: !!process.env.GEMINI_KEY
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/env-check", (req, res) => {
  res.json({
    hasGeminiApiKey: !!process.env.GEMINI_API_KEY,
    hasGoogleApiKey: !!process.env.GOOGLE_API_KEY,
    hasGeminiKey: !!process.env.GEMINI_KEY
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const key =
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_API_KEY ||
  process.env.GEMINI_KEY;
    if (!key) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY on server" });
    }

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`;

    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await geminiRes.json();

    // If Gemini returned error, send it to frontend
    if (!geminiRes.ok) {
      return res.status(geminiRes.status).json({
        error: "Gemini API error",
        details: data?.error?.message || "Unknown Gemini error"
      });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      return res.status(500).json({
        error: "No reply generated",
        details: JSON.stringify(data)
      });
    }

    return res.json({ reply });
  } catch (err) {
    return res.status(500).json({
      error: "Chat API failed",
      details: String(err)
    });
  }
});

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
app.get("/api/chat-test", async (req, res) => {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return res.status(500).json({ error: "Missing GEMINI_API_KEY" });

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`;

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Say hello in one line" }] }]
      })
    });

    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
});
