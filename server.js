import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// ---- Simple in-memory rate limit ----
// 1 IP -> max 20 chat requests per 10 minutes
const ipStore = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQ = 20;

function rateLimitChat(req, res, next) {
  const ip =
    req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "unknown";

  const now = Date.now();
  const record = ipStore.get(ip) || { count: 0, start: now };

  // Reset window
  if (now - record.start > WINDOW_MS) {
    record.count = 0;
    record.start = now;
  }

  record.count += 1;
  ipStore.set(ip, record);

  if (record.count > MAX_REQ) {
    return res.status(429).json({
      error: "Too many requests",
      details: "Please wait a few minutes before sending more messages."
    });
  }

  next();
}

// Health route (safe)
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API is live" });
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/api/chat", rateLimitChat, async (req, res) => {
  try {
    const { message } = req.body || {};
    const text = String(message || "").trim();

    if (!text) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Basic bad-content guard
    const blocked = ["hack", "ddos", "malware", "exploit"];
    const lower = text.toLowerCase();
    if (blocked.some((w) => lower.includes(w))) {
      return res.status(400).json({
        error: "Blocked content",
        details: "Please send a safe and normal message."
      });
    }

    const key = process.env.GROQ_API_KEY;
    if (!key) {
      return res.status(500).json({ error: "Missing GROQ_API_KEY on server" });
    }

    // Timeout protection (12 seconds)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly AI assistant for a student portfolio website. Keep replies clear, short, and helpful."
          },
          { role: "user", content: text }
        ],
        temperature: 0.7,
        max_tokens: 300
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);
    const data = await groqRes.json();

    if (!groqRes.ok) {
      return res.status(groqRes.status).json({
        error: "Groq API error",
        details: data?.error?.message || "Unknown Groq error"
      });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(500).json({
        error: "Empty AI reply",
        details: "Try again in a moment."
      });
    }

    return res.json({ reply });
  } catch (err) {
    if (String(err).includes("AbortError")) {
      return res.status(504).json({
        error: "Timeout",
        details: "AI response took too long. Please try again."
      });
    }

    return res.status(500).json({
      error: "Chat API failed",
      details: "Unexpected server error. Please try again."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
