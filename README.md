 # Sahadeb Pratihar — AI Portfolio Website

A modern personal portfolio and AI tools showcase built to represent my journey in Generative AI, Prompt Engineering, and AI Automation.

This project combines:
- personal portfolio
- project presentation
- AI tools laboratory
- live integrations with clear status labels

---

## Live Links

- **Frontend (GitHub Pages):** _Add your final GitHub Pages URL here_
- **Backend API (Render):** https://ai-portfolio-website-9z80.onrender.com

---

## About This Project

I built this website as a practical AI-first portfolio where I can show:
- who I am
- what I am learning
- what I am building

Instead of a static site, I created a portfolio + mini AI workspace experience.  
The AI Lab section includes multiple tools with modular UI panels, and tools are clearly marked by current readiness level.

---

## Core Highlights

- Premium dark-theme responsive UI
- Smooth motion and visual hierarchy
- Hero, About, Skills, Projects, Journey, Contact sections
- AI Lab with multiple mini tool panels
- Live chatbot integration through backend API
- Live contact form integration (Formspree)
- Real social/contact links

---

## Tech Stack

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber

### Backend
- Node.js
- Express
- CORS
- Dotenv

### Integrations
- Formspree (contact form)
- Groq/OpenAI-compatible API flow (chat)
- Public API integrations where applicable
- Browser-powered tools for selected features

### Hosting
- GitHub Pages (frontend)
- Render (backend API)

---

## Project Structure

```bash
src/
  components/
    Navbar.tsx
    Hero.tsx
    About.tsx
    Skills.tsx
    Projects.tsx
    AILab.tsx
    Sections.tsx
    Contact.tsx
    Footer.tsx
  App.tsx
  index.css
  main.tsx
AI Lab Overview
The AI Lab is designed as a modular workspace.
Some tools are fully usable right now, while others are UI-complete and integration-ready for next iterations.

Current Working / Usable
AI Chatbot (backend integrated)
Contact form submission flow
OCR flow (client-side)
Translator flow (public API based)
Browser-powered utility interactions
In Progress / Coming Soon
Text to Image (UI ready, API-ready flow)
Text to Video workflow
Background Removal
Image Enhancement
Advanced content generation utilities
Why This Project Is Important
This project reflects:

practical frontend development
deployment workflow understanding
API integration architecture
product thinking and modular design
transparent implementation (live vs in-progress tools)
It is a continuously improving project, not a one-time static portfolio.

Run Locally
1) Install dependencies
Bash

npm install
2) Start development server
Bash

npm run dev
3) Open local URL
Vite will provide a local URL (typically):
http://localhost:5173

Build for Production
Bash

npm run build
Build output is generated in dist/.

Environment Configuration
Frontend (.env.production)
env

VITE_API_BASE_URL=YOUR_RENDER_BACKEND_URL
VITE_FORMSPREE_ENDPOINT=YOUR_FORMSPREE_FORM_ENDPOINT
Backend (set on Render environment variables)
env

GROQ_API_KEY=YOUR_SECRET_API_KEY
PORT=10000
Do not expose secret API keys in frontend code.

Deployment Notes
Frontend
Deployed using GitHub Pages + GitHub Actions
Backend
Deployed as Render Web Service
Runtime secrets managed via Render environment settings
Current Focus
Turning more AI Lab tools from demo to fully live integrations
Improving reliability and UX consistency
Expanding practical AI workflows for productivity use-cases
Contact
Name: Sahadeb Pratihar
Email: hello.sahadebpfw@gmail.com
GitHub: https://github.com/sahadeb-pfw
WhatsApp: https://wa.me/919933376136
Note
This project is actively evolving.
I keep improving it in small, practical, and production-minded steps.
