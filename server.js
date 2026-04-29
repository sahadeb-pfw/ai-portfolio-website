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

app.get("/api/env-check", (req, res) => {
  res.json({
    hasOpenRouterKey: !!process.env.OPENROUTER_API_KEY
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body || {};

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const key = process.env.OPENROUTER_API_KEY;
    if (!key) {
      return res.status(500).json({ error: "Missing OPENROUTER_API_KEY on server" });
    }

    const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://sahadeb-pfw.github.io/ai-portfolio-website/",
        "X-Title": "AI Portfolio Website"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await orRes.json();

    if (!orRes.ok) {
      return res.status(orRes.status).json({
        error: "OpenRouter API error",
        details: data?.error?.message || "Unknown OpenRouter error"
      });
    }

    const reply = data?.choices?.[0]?.message?.content || "No response generated.";
    return res.json({ reply });
  } catch (err) {
    return res.status(500).json({
      error: "Chat API failed",
      details: String(err)
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
