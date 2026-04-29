import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════
   TOOL DEFINITIONS — Enhanced with metadata
   ═══════════════════════════════════════════════════════ */
const tools = [
  { id: 'text-to-image', name: 'Text to Image', icon: '🖼️', category: 'Generate', color: '#6366f1', description: 'Generate stunning images from text descriptions using AI', status: 'demo' as const },
  { id: 'text-to-video', name: 'Text to Video', icon: '🎬', category: 'Generate', color: '#818cf8', description: 'Transform text prompts into dynamic video content', status: 'demo' as const },
  { id: 'photo-editor', name: 'Photo Editor', icon: '📷', category: 'Edit', color: '#22d3ee', description: 'Edit photos with brightness, contrast, saturation & more', status: 'free' as const },
  { id: 'video-editor', name: 'Video Editor', icon: '🎥', category: 'Edit', color: '#06b6d4', description: 'AI-powered video editing and enhancement tools', status: 'beta' as const },
  { id: 'voice-gen', name: 'Voice Generator', icon: '🔊', category: 'Audio', color: '#fb7185', description: 'Convert text to natural-sounding speech instantly', status: 'free' as const },
  { id: 'speech-text', name: 'Speech to Text', icon: '🎤', category: 'Audio', color: '#f43f5e', description: 'Transcribe spoken words to text in real-time', status: 'free' as const },
  { id: 'chatbot', name: 'AI Chatbot', icon: '💬', category: 'Chat', color: '#34d399', description: 'Interactive AI assistant for questions and conversations', status: 'demo' as const },
  { id: 'prompt-improve', name: 'Prompt Improver', icon: '✨', category: 'Text', color: '#fbbf24', description: 'Enhance and optimize your AI prompts for better results', status: 'free' as const },
  { id: 'summarizer', name: 'Text Summarizer', icon: '📝', category: 'Text', color: '#f59e0b', description: 'Condense long text into concise, clear summaries', status: 'demo' as const },
  { id: 'ocr', name: 'OCR / Image to Text', icon: '🔍', category: 'Extract', color: '#a78bfa', description: 'Extract text from images using optical character recognition', status: 'free' as const },
  { id: 'resume', name: 'Resume Analyzer', icon: '📄', category: 'Analysis', color: '#8b5cf6', description: 'Get AI-powered feedback on your resume strengths', status: 'demo' as const },
  { id: 'caption', name: 'Caption Generator', icon: '💡', category: 'Social', color: '#f472b6', description: 'Generate engaging social media captions instantly', status: 'free' as const },
  { id: 'content', name: 'Content Writer', icon: '✍️', category: 'Text', color: '#ec4899', description: 'AI-powered content creation for blogs, emails & more', status: 'demo' as const },
  { id: 'translator', name: 'Translator', icon: '🌐', category: 'Language', color: '#14b8a6', description: 'Translate text between 10+ languages instantly', status: 'free' as const },
  { id: 'bg-remove', name: 'BG Remover', icon: '✂️', category: 'Edit', color: '#6366f1', description: 'Remove image backgrounds automatically with AI', status: 'demo' as const },
  { id: 'enhance', name: 'Image Enhance', icon: '🌟', category: 'Edit', color: '#fbbf24', description: 'Enhance and upscale images with AI super-resolution', status: 'beta' as const },
];

const categories = ['All', ...Array.from(new Set(tools.map(t => t.category)))];

const statusConfig = {
  free: { label: '✓ Free', bg: 'rgba(52,211,153,0.1)', color: '#34d399' },
  demo: { label: '⚡ Demo', bg: 'rgba(99,102,241,0.1)', color: '#818cf8' },
  beta: { label: '🧪 Beta', bg: 'rgba(251,191,36,0.1)', color: '#fbbf24' },
};

/* ═══════════════════════════════════════════════════════
   SHARED UI COMPONENTS
   ═══════════════════════════════════════════════════════ */
function Spinner() {
  return <div className="ai-spinner" />;
}

function LoadingOverlay({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-3">
      <Spinner />
      <p className="text-text-muted text-xs">{message}</p>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="ai-pill text-[10px] flex items-center gap-1">
      {copied ? '✓ Copied!' : '📋 Copy'}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   TOOL PANEL COMPONENTS — Redesigned
   ═══════════════════════════════════════════════════════ */

/* ── Text to Image ── */
function TextToImagePanel() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const generate = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(`demo-${Date.now()}`);
      setLoading(false);
    }, 2500);
  };

  const styles = ['Realistic', 'Anime', '3D Render', 'Painting', 'Pixel Art', 'Abstract'];

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-medium text-text-secondary mb-2.5 block">Describe your image</label>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="A futuristic city at sunset with flying cars and neon lights reflecting on wet streets..."
          className="input-field h-28 resize-none text-sm leading-relaxed"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-text-secondary mb-2.5 block">Style</label>
        <div className="flex flex-wrap gap-2">
          {styles.map(s => (
            <button
              key={s}
              onClick={() => setStyle(s.toLowerCase())}
              className={`ai-pill ${style === s.toLowerCase() ? 'ai-pill-active' : ''}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button onClick={generate} disabled={loading || !prompt.trim()} className="btn-ai">
        {loading ? <><Spinner /> <span className="text-sm">Generating...</span></> : '✨ Generate Image'}
      </button>

      <div className="ai-result min-h-[220px] flex items-center justify-center">
        {loading ? (
          <LoadingOverlay message="Creating your masterpiece..." />
        ) : result ? (
          <div className="w-full flex flex-col items-center gap-4">
            <div className="w-full h-52 rounded-xl bg-gradient-to-br from-indigo-500/10 via-cyan/5 to-rose/5 border border-border flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
              <div className="relative text-center">
                <span className="text-5xl block mb-2">🎨</span>
                <p className="text-text-muted text-[10px]">AI Generated Image Preview</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full">
              <button className="btn-ai flex-1 text-sm">⬇ Download</button>
              <button className="ai-pill text-xs">🔄 Regenerate</button>
            </div>
            <p className="text-text-muted text-[10px] text-center">Demo output — Connect Hugging Face API for real generation</p>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-4xl block mb-3 opacity-30">🖼️</span>
            <p className="text-text-muted text-xs">Your generated image will appear here</p>
            <p className="text-text-muted text-[10px] mt-1 opacity-60">Enter a prompt and click generate</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Photo Editor ── */
function PhotoEditorPanel() {
  const [image, setImage] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const resetFilters = () => { setBrightness(100); setContrast(100); setSaturation(100); setBlur(0); };

  const sliders = [
    { label: 'Brightness', value: brightness, set: setBrightness, min: 0, max: 200, icon: '☀️' },
    { label: 'Contrast', value: contrast, set: setContrast, min: 0, max: 200, icon: '◐' },
    { label: 'Saturation', value: saturation, set: setSaturation, min: 0, max: 200, icon: '🎨' },
    { label: 'Blur', value: blur, set: setBlur, min: 0, max: 10, icon: '💧' },
  ];

  return (
    <div className="space-y-6">
      <div
        className="ai-upload"
        onClick={() => fileRef.current?.click()}
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="max-h-[280px] w-auto object-contain rounded-lg"
            style={{ filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)` }}
          />
        ) : (
          <div className="text-center p-6">
            <span className="text-4xl block mb-3 opacity-40">📤</span>
            <p className="text-text-secondary text-sm font-medium">Click to upload an image</p>
            <p className="text-text-muted text-[10px] mt-1">Supports JPG, PNG, WebP</p>
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </div>

      {image && (
        <div className="space-y-4">
          {sliders.map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-sm w-6 text-center">{s.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-text-secondary font-medium">{s.label}</span>
                  <span className="text-[10px] font-mono text-text-muted bg-surface-2 px-1.5 py-0.5 rounded">{s.value}</span>
                </div>
                <input type="range" min={s.min} max={s.max} value={s.value} onChange={e => s.set(Number(e.target.value))} className="ai-range" />
              </div>
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <button onClick={resetFilters} className="btn-secondary flex-1 justify-center text-sm">↺ Reset</button>
            <button className="btn-ai flex-1 text-sm">⬇ Download</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Voice Generator ── */
function VoiceGeneratorPanel() {
  const [text, setText] = useState('');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if (!text.trim() || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.pitch = pitch;
    utt.rate = rate;
    utt.onstart = () => setSpeaking(true);
    utt.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utt);
  };

  const presets = [
    { label: 'Normal', pitch: 1, rate: 1, icon: '🗣️' },
    { label: 'Deep', pitch: 0.6, rate: 0.8, icon: '🎵' },
    { label: 'Fast', pitch: 1, rate: 1.6, icon: '⚡' },
    { label: 'High', pitch: 1.8, rate: 1, icon: '🎶' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-medium text-text-secondary mb-2.5 block">Enter text to speak</label>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Hello! I am an AI voice assistant. Welcome to the Neural Command Center..." className="input-field h-32 resize-none text-sm leading-relaxed" />
      </div>

      <div>
        <label className="text-xs font-medium text-text-secondary mb-2.5 block">Voice Presets</label>
        <div className="grid grid-cols-4 gap-2">
          {presets.map(p => (
            <button
              key={p.label}
              onClick={() => { setPitch(p.pitch); setRate(p.rate); }}
              className="flex flex-col items-center gap-1 p-3 rounded-xl bg-surface-2 border border-border hover:border-border-hover transition-all hover:bg-surface-3"
            >
              <span className="text-lg">{p.icon}</span>
              <span className="text-[10px] text-text-muted">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-text-secondary font-medium">Pitch</span>
            <span className="text-[10px] font-mono text-text-muted">{pitch.toFixed(1)}</span>
          </div>
          <input type="range" min="0.5" max="2" step="0.1" value={pitch} onChange={e => setPitch(Number(e.target.value))} className="ai-range" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-text-secondary font-medium">Speed</span>
            <span className="text-[10px] font-mono text-text-muted">{rate.toFixed(1)}</span>
          </div>
          <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="ai-range" />
        </div>
      </div>

      <button onClick={speak} disabled={!text.trim()} className="btn-ai">
        {speaking ? '🔊 Speaking...' : '🔊 Generate Voice'}
      </button>

      {speaking && (
        <div className="flex items-center justify-center gap-1 py-3">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 bg-accent rounded-full animate-pulse" style={{ height: `${Math.random() * 24 + 8}px`, animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
      )}

      <p className="text-text-muted text-[10px] text-center">🟢 Uses browser Web Speech API — no API key needed!</p>
    </div>
  );
}

/* ── Speech to Text ── */
function SpeechToTextPanel() {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recogRef = useRef<any>(null);

  const startListening = () => {
    const w = window as unknown as Record<string, unknown>;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) { setTranscript('Speech recognition not supported in this browser.'); return; }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recog = new (SR as any)();
    recog.continuous = true;
    recog.interimResults = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recog.onresult = (e: any) => {
      let t = '';
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
      setTranscript(t);
    };
    recog.onerror = () => setListening(false);
    recog.onend = () => setListening(false);
    recogRef.current = recog;
    recog.start();
    setListening(true);
  };

  const stopListening = () => {
    recogRef.current?.stop();
    setListening(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 py-6">
        <button
          onClick={listening ? stopListening : startListening}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
            listening
              ? 'bg-rose/15 border-2 border-rose/40 shadow-[0_0_30px_rgba(244,63,94,0.2)]'
              : 'bg-surface-2 border border-border hover:border-accent/30 hover:bg-surface-3'
          }`}
        >
          <span className="text-4xl">{listening ? '⏹️' : '🎤'}</span>
        </button>
        <div className="text-center">
          <p className="text-sm font-medium text-text-primary">
            {listening ? 'Listening...' : 'Tap to Record'}
          </p>
          <p className="text-text-muted text-[10px] mt-1">
            {listening ? 'Click stop when done speaking' : 'Speak clearly into your microphone'}
          </p>
        </div>
        {listening && (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 bg-rose/60 rounded-full animate-pulse" style={{ height: `${Math.random() * 16 + 4}px`, animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-medium text-text-secondary">Transcript</label>
          {transcript && <CopyButton text={transcript} />}
        </div>
        <div className="ai-result min-h-[140px] whitespace-pre-wrap text-sm leading-relaxed">
          {transcript || <span className="text-text-muted text-xs">Your speech will be transcribed here in real-time...</span>}
        </div>
      </div>
    </div>
  );
}

/* ── AI Chatbot ── */
function ChatbotPanel() {
  const API = import.meta.env.VITE_API_BASE_URL || 'https://ai-portfolio-website-9z80.onrender.com';
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>(() => {
  const saved = localStorage.getItem('chat_messages');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [{ role: 'ai', text: "Hi! I'm Sahadeb's AI assistant. Ask me anything! 🤖" }];
    }
  }
  return [{ role: 'ai', text: "Hi! I'm Sahadeb's AI assistant. Ask me anything! 🤖" }];
});
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState('');
  useEffect(() => {
  localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]); 

  const send = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setTyping(true);

    try {
      const res = await fetch(`${API}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();

      if (!res.ok) {
        const detail = data?.details || data?.error || `HTTP ${res.status}`;
        setMessages((prev) => [...prev, { role: 'ai', text: `Server Error: ${detail}` }]);
        return;
      }

      setMessages((prev) => [...prev, { role: 'ai', text: data.reply || 'No reply received.' }]);
    } catch {
  setLastFailedMessage(userMsg);
  setMessages((prev) => [
    ...prev,
    {
      role: 'ai',
      text: 'Network/Server issue. Tap Retry to send your last message again.'
    },
  ]);
}

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 text-xs leading-relaxed ${
                msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="chat-bubble-ai px-4 py-2.5 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message..."
          className="input-field flex-1 text-sm"
        />
        <button onClick={send} className="btn-primary px-4">
          ↑
        </button>
      </div>
       <div className="flex gap-2 mt-2">
  {lastFailedMessage && (
    <button
      onClick={() => {
        setInput(lastFailedMessage);
        setLastFailedMessage('');
      }}
      className="btn-ghost text-xs"
    >
      Retry last message
    </button>
  )}

  <button
    onClick={() => {
      const base = [{ role: 'ai', text: "Hi! I'm Sahadeb's AI assistant. Ask me anything! 🤖" }];
      setMessages(base);
      localStorage.setItem('chat_messages', JSON.stringify(base));
    }}
    className="btn-ghost text-xs"
  >
    Clear chat
  </button>
</div>
    </div>
  );
}
 
/* ── Prompt Improver ── */
function PromptImproverPanel() {
  const [raw, setRaw] = useState('');
  const [improved, setImproved] = useState('');
  const [loading, setLoading] = useState(false);

  const improve = () => {
    if (!raw.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setImproved(
        `**Enhanced Prompt:**\n\nYou are an expert AI assistant specializing in ${raw.split(' ')[0] || 'the requested'} domain.\n\nTask: ${raw}\n\nRequirements:\n- Provide detailed, well-structured responses\n- Include examples where appropriate\n- Consider edge cases and limitations\n- Use a professional yet approachable tone\n\nOutput Format:\nPlease structure your response with clear headings, bullet points for key information, and a summary section.\n\nContext: This is for professional use, so accuracy and completeness are essential.`
      );
      setLoading(false);
    }, 1500);
  };

  const tips = ['Be specific about your goal', 'Include context and constraints', 'Specify desired output format', 'Add examples when possible'];

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-medium text-text-secondary mb-2.5 block">Your raw prompt</label>
        <textarea value={raw} onChange={e => setRaw(e.target.value)} placeholder="write a blog post about AI" className="input-field h-24 resize-none text-sm" />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tips.map(t => (
          <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-amber/5 text-amber border border-amber/10">💡 {t}</span>
        ))}
      </div>

      <button onClick={improve} disabled={loading || !raw.trim()} className="btn-ai">
        {loading ? <><Spinner /> <span className="text-sm">Enhancing...</span></> : '✨ Improve Prompt'}
      </button>

      {improved && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-medium text-text-secondary">Enhanced Prompt</label>
            <CopyButton text={improved} />
          </div>
          <div className="ai-result min-h-[180px] whitespace-pre-wrap text-xs leading-relaxed">{improved}</div>
        </div>
      )}
    </div>
  );
}

/* ── Text Summarizer ── */
function SummarizerPanel() {
  const [text, setText] = useState('');
  const [length, setLength] = useState<'short' | 'medium' | 'detailed'>('medium');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const summarize = () => {
    if (!text.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const words = text.split(' ').slice(0, length === 'short' ? 15 : length === 'medium' ? 30 : 60).join(' ');
      setSummary(`Summary (${length}):\n\n${words}...\n\nKey Points:\n• The text discusses important AI-related concepts\n• Several practical applications are highlighted\n• Future implications are considered\n\n[Connect Gemini API for intelligent summarization]`);
      setLoading(false);
    }, 1500);
  };

  const lengthOptions = [
    { key: 'short' as const, label: 'Short', desc: '~50 words', icon: '📝' },
    { key: 'medium' as const, label: 'Medium', desc: '~150 words', icon: '📄' },
    { key: 'detailed' as const, label: 'Detailed', desc: '~300 words', icon: '📋' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-medium text-text-secondary mb-2.5 block">Text to summarize</label>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your long text here..." className="input-field h-32 resize-none text-sm leading-relaxed" />
      </div>

      <div>
        <label className="text-xs font-medium text-text-secondary mb-2.5 block">Summary Length</label>
        <div className="grid grid-cols-3 gap-2">
          {lengthOptions.map(l => (
            <button
              key={l.key}
              onClick={() => setLength(l.key)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                length === l.key
                  ? 'bg-accent/12 border border-accent/25 text-accent-light'
                  : 'bg-surface-2 border border-border hover:border-border-hover text-text-muted'
              }`}
            >
              <span className="text-lg mb-1">{l.icon}</span>
              <span className="text-xs font-medium">{l.label}</span>
              <span className="text-[10px] opacity-60">{l.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={summarize} disabled={loading || !text.trim()} className="btn-ai">
        {loading ? <><Spinner /> <span className="text-sm">Summarizing...</span></> : '📝 Summarize'}
      </button>

      {summary && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-medium text-text-secondary">Result</label>
            <CopyButton text={summary} />
          </div>
          <div className="ai-result min-h-[120px] whitespace-pre-wrap text-xs leading-relaxed">{summary}</div>
        </div>
      )}
    </div>
  );
}

/* ── OCR / Image to Text ── */
function OCRPanel() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);

    setLoading(true);
    setText('');
    try {
      const Tesseract = await import('tesseract.js');
      const { data: { text: extracted } } = await Tesseract.recognize(file, 'eng');
      setText(extracted || 'No text detected in the image.');
    } catch {
      setText('OCR processing failed. Please try another image.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="ai-upload" onClick={() => fileRef.current?.click()}>
        {image ? (
          <img src={image} alt="Uploaded" className="max-h-[140px] object-contain rounded-lg" />
        ) : (
          <div className="text-center p-6">
            <span className="text-4xl block mb-3 opacity-40">📷</span>
            <p className="text-text-secondary text-sm font-medium">Upload image with text</p>
            <p className="text-text-muted text-[10px] mt-1">Powered by Tesseract.js — runs in your browser!</p>
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </div>

      {loading && <LoadingOverlay message="Extracting text with OCR..." />}

      {text && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-medium text-text-secondary">Extracted Text</label>
            <CopyButton text={text} />
          </div>
          <div className="ai-result min-h-[120px] whitespace-pre-wrap text-sm leading-relaxed">{text}</div>
        </div>
      )}
    </div>
  );
}

/* ── Resume Analyzer ── */
function ResumeAnalyzerPanel() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const analyze = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="ai-upload" onClick={() => fileRef.current?.click()}>
        <div className="text-center p-6">
          <span className="text-4xl block mb-3 opacity-40">📄</span>
          <p className="text-text-secondary text-sm font-medium">Upload your resume</p>
          <p className="text-text-muted text-[10px] mt-1">Supports PDF, DOC, DOCX</p>
        </div>
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={analyze} />
      </div>

      <button onClick={analyze} disabled={loading} className="btn-ai">
        {loading ? <><Spinner /> <span className="text-sm">Analyzing...</span></> : '🔍 Analyze Resume'}
      </button>

      {result && (
        <div className="space-y-3">
          {/* Score */}
          <div className="ai-result flex items-center gap-4">
            <div className="text-4xl font-bold font-[Space_Grotesk] text-gradient">78</div>
            <div>
              <div className="text-sm font-semibold">Resume Score</div>
              <div className="text-text-muted text-xs">Good — room for improvement</div>
              <div className="w-32 h-1.5 bg-surface-3 rounded-full mt-2">
                <div className="w-[78%] h-full rounded-full bg-gradient-to-r from-amber to-emerald" />
              </div>
            </div>
          </div>

          {/* Sections */}
          {[
            { title: 'Strengths', items: ['Clear contact information', 'Good use of action verbs', 'Quantified achievements'], color: '#34d399', icon: '💪' },
            { title: 'Improvements', items: ['Add a professional summary', 'Include relevant AI certifications', 'Optimize for ATS keywords'], color: '#fbbf24', icon: '📈' },
            { title: 'Suggestions', items: ['Add links to GitHub/LinkedIn', 'Use a more modern template', 'Include AI project portfolio'], color: '#6366f1', icon: '💡' },
          ].map(section => (
            <div key={section.title} className="ai-result" style={{ borderColor: `${section.color}15` }}>
              <h4 className="text-xs font-semibold mb-2 flex items-center gap-2">
                <span>{section.icon}</span>
                <span style={{ color: section.color }}>{section.title}</span>
              </h4>
              <ul className="space-y-1.5">
                {section.items.map(item => (
                  <li key={item} className="text-xs text-text-muted flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: section.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Caption Generator ── */
function CaptionGeneratorPanel() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    if (!topic.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setCaptions([
        `🚀 ${topic} is changing everything we know about innovation. Here's what I learned... #AIFuture #Innovation`,
        `The future of ${topic} isn't coming — it's already here. Are you ready? 💡✨ #TechTrends #AI`,
        `Just discovered something amazing about ${topic}! Thread 🧵👇 #Knowledge #Growth`,
        `POV: You just unlocked the power of ${topic} for your workflow 🎯 #Productivity #AI`,
      ]);
      setLoading(false);
    }, 1200);
  };

  const platforms = [
    { key: 'instagram', label: 'Instagram', icon: '📸' },
    { key: 'twitter', label: 'Twitter/X', icon: '🐦' },
    { key: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { key: 'tiktok', label: 'TikTok', icon: '🎵' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-medium text-text-secondary mb-2.5 block">Topic or description</label>
        <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="AI automation tools" className="input-field text-sm" />
      </div>

      <div>
        <label className="text-xs font-medium text-text-secondary mb-2.5 block">Platform</label>
        <div className="grid grid-cols-4 gap-2">
          {platforms.map(p => (
            <button
              key={p.key}
              onClick={() => setPlatform(p.key)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                platform === p.key
                  ? 'bg-accent/12 border border-accent/25 text-accent-light'
                  : 'bg-surface-2 border border-border hover:border-border-hover text-text-muted'
              }`}
            >
              <span className="text-lg">{p.icon}</span>
              <span className="text-[10px]">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={generate} disabled={loading || !topic.trim()} className="btn-ai">
        {loading ? <><Spinner /> <span className="text-sm">Creating...</span></> : '💡 Generate Captions'}
      </button>

      {captions.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-text-secondary">Generated Captions</label>
          {captions.map((cap, i) => (
            <div key={i} className="ai-result flex items-start gap-3">
              <span className="text-text-muted text-xs font-mono w-4 shrink-0">{i + 1}.</span>
              <p className="text-xs text-text-secondary flex-1 leading-relaxed">{cap}</p>
              <button onClick={() => navigator.clipboard.writeText(cap)} className="text-text-muted hover:text-accent-light text-xs shrink-0 transition-colors">📋</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Content Writer ── */
function ContentWriterPanel() {
  const [topic, setTopic] = useState('');
  const [type, setType] = useState('blog');
  const [tone, setTone] = useState('professional');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = () => {
    if (!topic.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(`# ${topic}\n\nIn today's rapidly evolving digital landscape, ${topic} has become a cornerstone of innovation and growth. Whether you're a seasoned professional or just getting started, understanding the nuances of ${topic} is essential.\n\n## Why It Matters\n\nThe impact of ${topic} extends far beyond simple convenience. It represents a fundamental shift in how we approach problems, create solutions, and deliver value.\n\n## Key Takeaways\n\n- ${topic} is transforming industries worldwide\n- Early adoption provides competitive advantages\n- The technology continues to evolve rapidly\n\n## Conclusion\n\nAs we look to the future, ${topic} will undoubtedly play an even greater role in shaping our world.\n\n[Connect Gemini API for intelligent content generation]`);
      setLoading(false);
    }, 2000);
  };

  const types = [
    { key: 'blog', label: 'Blog Post', icon: '📝' },
    { key: 'social', label: 'Social Media', icon: '📱' },
    { key: 'email', label: 'Email', icon: '📧' },
    { key: 'story', label: 'Story', icon: '📖' },
  ];

  const tones = ['Professional', 'Casual', 'Funny', 'Formal'];

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-medium text-text-secondary mb-2.5 block">Topic</label>
        <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="The future of AI automation" className="input-field text-sm" />
      </div>

      <div>
        <label className="text-xs font-medium text-text-secondary mb-2.5 block">Content Type</label>
        <div className="grid grid-cols-4 gap-2">
          {types.map(t => (
            <button
              key={t.key}
              onClick={() => setType(t.key)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                type === t.key
                  ? 'bg-accent/12 border border-accent/25 text-accent-light'
                  : 'bg-surface-2 border border-border hover:border-border-hover text-text-muted'
              }`}
            >
              <span className="text-lg">{t.icon}</span>
              <span className="text-[10px]">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-text-secondary mb-2.5 block">Tone</label>
        <div className="flex gap-2">
          {tones.map(t => (
            <button key={t} onClick={() => setTone(t.toLowerCase())} className={`ai-pill ${tone === t.toLowerCase() ? 'ai-pill-active' : ''}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <button onClick={generate} disabled={loading || !topic.trim()} className="btn-ai">
        {loading ? <><Spinner /> <span className="text-sm">Writing...</span></> : '✍️ Generate Content'}
      </button>

      {result && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-medium text-text-secondary">Generated Content</label>
            <CopyButton text={result} />
          </div>
          <div className="ai-result min-h-[220px] whitespace-pre-wrap text-xs leading-relaxed">{result}</div>
        </div>
      )}
    </div>
  );
}

/* ── Translator ── */
function TranslatorPanel() {
  const [text, setText] = useState('');
  const [target, setTarget] = useState('es');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const languages = [
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  ];

  const translate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${target}`);
      const data = await res.json();
      setResult(data.responseData?.translatedText || 'Translation failed.');
    } catch {
      setResult('Translation service unavailable.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-medium text-text-secondary mb-2.5 block">Text to translate</label>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Hello, how are you?" className="input-field h-24 resize-none text-sm" />
      </div>

      <div>
        <label className="text-xs font-medium text-text-secondary mb-2.5 block">Translate to</label>
        <div className="grid grid-cols-5 gap-2">
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => setTarget(l.code)}
              className={`flex flex-col items-center gap-0.5 p-2.5 rounded-xl transition-all ${
                target === l.code
                  ? 'bg-accent/12 border border-accent/25'
                  : 'bg-surface-2 border border-border hover:border-border-hover'
              }`}
            >
              <span className="text-base">{l.flag}</span>
              <span className={`text-[9px] ${target === l.code ? 'text-accent-light' : 'text-text-muted'}`}>{l.name}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={translate} disabled={loading || !text.trim()} className="btn-ai">
        {loading ? <><Spinner /> <span className="text-sm">Translating...</span></> : '🌐 Translate'}
      </button>

      {result && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-medium text-text-secondary">Translation</label>
            <CopyButton text={result} />
          </div>
          <div className="ai-result min-h-[60px] whitespace-pre-wrap text-sm">{result}</div>
        </div>
      )}
    </div>
  );
}

/* ── Generic Tool (for tools without full panels) ── */
function GenericToolPanel({ toolId }: { toolId: string }) {
  const content: Record<string, { icon: string; placeholder: string; demoOutput: string; features: string[] }> = {
    'text-to-video': {
      icon: '🎬',
      placeholder: 'Describe the video you want to create...',
      demoOutput: 'Video generation is a cutting-edge AI feature. Connect Runway ML or Pika API for real video generation.\n\nIn production, this would generate a short video clip based on your text prompt.',
      features: ['Text-to-video generation', 'Multiple style options', 'Duration control', 'HD output'],
    },
    'video-editor': {
      icon: '🎥',
      placeholder: 'Upload a video to edit...',
      demoOutput: 'Video editing tools would include: trim & cut, captions, thumbnail generation, and AI scene detection.\n\nConnect a video processing API for full functionality.',
      features: ['Trim & cut', 'Auto captions', 'Scene detection', 'Thumbnail gen'],
    },
    'bg-remove': {
      icon: '✂️',
      placeholder: 'Upload an image to remove background...',
      demoOutput: 'Background removal powered by AI.\n\nConnect remove.bg API for automatic background removal.\nFree tier: 50 API calls/month.',
      features: ['Auto background removal', 'Transparent PNG', 'Batch processing', 'HD quality'],
    },
    'enhance': {
      icon: '🌟',
      placeholder: 'Upload an image to enhance...',
      demoOutput: 'AI Image Enhancement would include: super resolution upscaling, noise reduction, color correction, and detail enhancement.\n\nConnect an AI upscaling API for real results.',
      features: ['Super resolution', 'Noise reduction', 'Color correction', 'Detail enhance'],
    },
  };

  const tool = content[toolId];
  if (!tool) return <p className="text-text-muted text-xs">Select a tool to get started.</p>;

  return (
    <div className="space-y-6">
      <div className="ai-upload">
        <div className="text-center p-6">
          <span className="text-4xl block mb-3 opacity-40">{tool.icon}</span>
          <p className="text-text-secondary text-sm font-medium">{tool.placeholder}</p>
          <p className="text-text-muted text-[10px] mt-1">Drag & drop or click to upload</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tool.features.map(f => (
          <span key={f} className="text-[10px] px-2.5 py-1 rounded-full bg-accent/5 text-accent-light border border-accent/10">{f}</span>
        ))}
      </div>

      <button className="btn-ai" onClick={() => alert('Connect API for full functionality.')}>
        ⚡ Process
      </button>

      <div className="ai-result min-h-[120px] whitespace-pre-wrap text-xs leading-relaxed text-text-muted">{tool.demoOutput}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TOOL PANEL ROUTER
   ═══════════════════════════════════════════════════════ */
function ToolPanel({ toolId }: { toolId: string }) {
  const panels: Record<string, React.ReactNode> = {
    'text-to-image': <TextToImagePanel />,
    'photo-editor': <PhotoEditorPanel />,
    'voice-gen': <VoiceGeneratorPanel />,
    'speech-text': <SpeechToTextPanel />,
    'chatbot': <ChatbotPanel />,
    'prompt-improve': <PromptImproverPanel />,
    'summarizer': <SummarizerPanel />,
    'ocr': <OCRPanel />,
    'resume': <ResumeAnalyzerPanel />,
    'caption': <CaptionGeneratorPanel />,
    'content': <ContentWriterPanel />,
    'translator': <TranslatorPanel />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={toolId}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25 }}
      >
        {panels[toolId] || <GenericToolPanel toolId={toolId} />}
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN AI LAB COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function AILab() {
  const [viewMode, setViewMode] = useState<'grid' | 'workspace'>('grid');
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const activeToolData = tools.find(t => t.id === activeTool);

  const openTool = (toolId: string) => {
    setActiveTool(toolId);
    setViewMode('workspace');
  };

  const closeTool = () => {
    setActiveTool(null);
    setViewMode('grid');
  };

  return (
    <section id="ai-lab" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 ai-lab-bg opacity-60" />
      <div className="absolute top-0 left-0 right-0 gradient-line" />
      <div className="absolute top-40 -left-20 w-80 h-80 bg-accent/4 rounded-full blur-[150px]" />
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-cyan/4 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose/3 rounded-full blur-[180px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="section-label mb-3 flex items-center gap-2">
            <span className="w-8 h-px bg-accent-light" />
            AI Playground
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl">
                Neural Command
                <br />
                <span className="text-gradient">Center</span>
              </h2>
              <p className="text-text-secondary text-sm mt-4 max-w-md">
                Your personal AI toolkit — 16 powerful tools for generation, editing,
                analysis, and productivity. All running in your browser.
              </p>
            </div>
            {/* Stats */}
            <div className="flex items-center gap-5">
              {[
                { value: '16', label: 'Tools', color: '#34d399' },
                { value: '7', label: 'Categories', color: '#22d3ee' },
                { value: '∞', label: 'Free Usage', color: '#818cf8' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold font-[Space_Grotesk]" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-[10px] text-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Content ── */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            /* ═══ GRID VIEW ═══ */
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Search + Category Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1 max-w-xs">
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search tools..."
                    className="input-field pl-10 text-sm"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">🔍</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                        activeCategory === cat
                          ? 'bg-white/8 text-white border border-white/10'
                          : 'text-text-muted hover:text-text-secondary border border-transparent hover:border-border'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tool Grid */}
              {filteredTools.length === 0 ? (
                <div className="text-center py-16">
                  <span className="text-4xl block mb-4 opacity-30">🔍</span>
                  <p className="text-text-muted text-sm">No tools found matching your search</p>
                  <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="ai-pill mt-3 text-xs">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
                  }}
                >
                  {filteredTools.map(tool => {
                    const status = statusConfig[tool.status];
                    return (
                      <motion.button
                        key={tool.id}
                        variants={{
                          hidden: { opacity: 0, y: 20, scale: 0.95 },
                          visible: { opacity: 1, y: 0, scale: 1 },
                        }}
                        onClick={() => openTool(tool.id)}
                        whileHover={{ y: -6, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="tool-card group relative p-5 sm:p-6 rounded-2xl bg-surface border border-border hover:border-border-hover text-left overflow-hidden"
                        style={{ '--tool-color': tool.color } as React.CSSProperties}
                      >
                        {/* Gradient top accent */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px] opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: `linear-gradient(90deg, ${tool.color}, ${tool.color}00)` }}
                        />

                        {/* Icon */}
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl sm:text-3xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                          style={{ background: `${tool.color}12`, boxShadow: `0 0 0 0 ${tool.color}00` }}
                        >
                          {tool.icon}
                        </div>

                        {/* Name */}
                        <h3 className="font-[Space_Grotesk] font-semibold text-sm sm:text-base mb-1.5 group-hover:text-white transition-colors">
                          {tool.name}
                        </h3>

                        {/* Description (desktop only) */}
                        <p className="hidden sm:block text-text-muted text-[10px] leading-relaxed mb-3 line-clamp-2">
                          {tool.description}
                        </p>

                        {/* Badges */}
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-surface-2 text-text-muted border border-border">
                            {tool.category}
                          </span>
                          <span
                            className="text-[9px] px-2 py-0.5 rounded-full"
                            style={{ background: status.bg, color: status.color }}
                          >
                            {status.label}
                          </span>
                        </div>

                        {/* Hover arrow */}
                        <div className="absolute bottom-4 right-4 text-text-muted opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                          →
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <p className="text-text-muted text-xs mb-4">
                  🟢 Tools marked <span className="text-emerald">Free</span> work directly in your browser — no API key needed
                </p>
              </motion.div>
            </motion.div>
          ) : (
            /* ═══ WORKSPACE VIEW ═══ */
            <motion.div
              key="workspace-view"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back Navigation */}
              <button
                onClick={closeTool}
                className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors group"
              >
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                <span>Back to All Tools</span>
                <span className="text-text-muted/40 mx-2">|</span>
                <span className="text-text-muted text-xs">{activeToolData?.category}</span>
              </button>

              {/* Workspace Panel */}
              <div className="ai-workspace-outer">
                <div className="ai-workspace-inner p-5 sm:p-8">
                  {/* Tool Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 pb-6 border-b border-border">
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shrink-0"
                      style={{ background: `linear-gradient(135deg, ${activeToolData?.color}18, ${activeToolData?.color}05)` }}
                    >
                      {activeToolData?.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-[Space_Grotesk] text-xl sm:text-2xl font-bold">{activeToolData?.name}</h3>
                      <p className="text-text-muted text-xs sm:text-sm mt-1">{activeToolData?.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {activeToolData && (
                        <span
                          className="text-[10px] px-3 py-1.5 rounded-full font-medium"
                          style={{
                            background: statusConfig[activeToolData.status].bg,
                            color: statusConfig[activeToolData.status].color,
                          }}
                        >
                          {statusConfig[activeToolData.status].label}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tool Content */}
                  {activeTool && <ToolPanel toolId={activeTool} />}
                </div>
              </div>

              {/* Workspace Footer */}
              <div className="flex items-center justify-between mt-4 px-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald ai-pulse-dot" />
                  <span className="text-text-muted text-[10px]">
                    {activeToolData?.status === 'free' ? 'Browser-Powered — No API key required' : 'Live API Mode'}
                  </span>
                </div>
                <button onClick={closeTool} className="text-text-muted text-[10px] hover:text-text-secondary transition-colors">
                  ← All Tools
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
