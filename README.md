# Sahadeb Pratihar - AI Portfolio Website

A modern AI-first personal portfolio to showcase my journey in Generative AI, Prompt Engineering, and AI Automation.

This project combines:
- Personal portfolio
- Project presentation
- AI tools laboratory
- Live integrations with transparent status labels

---

## Live Links

- Frontend (GitHub Pages): https://sahadeb-pfw.github.io/ai-portfolio-website/
- Backend API (Render): https://ai-portfolio-website-9z80.onrender.com

---

## About This Project

I built this website as a practical AI-first portfolio where I can show:
- Who I am
- What I am learning
- What I am building

Instead of a static portfolio, this is designed as a portfolio + mini AI workspace experience.

The AI Lab section includes multiple modular tools.  
Each tool is clearly labeled by current readiness level so users can distinguish what is fully live and what is in progress.

---

## Core Highlights

- Premium dark-theme responsive UI
- Smooth motion and visual hierarchy
- Hero, About, Skills, Projects, Journey, Contact sections
- AI Lab with modular mini tools
- Live chatbot integration via backend API
- Live contact form integration via Formspree
- Real social and contact links

---

## AI Lab Status

| Tool / Feature | Current Status | Notes |
|---|---|---|
| AI Chatbot | Live | Backend integrated |
| Contact Form Flow | Live | Formspree integrated |
| OCR Flow | Live | Client-side flow |
| Translator Flow | Live | Public API-based |
| Browser Utilities | Live | Browser-powered features |
| Text to Image | In Progress | UI ready, API-ready flow |
| Text to Video | In Progress | Planned integration |
| Background Removal | In Progress | Planned integration |
| Image Enhancement | In Progress | Planned integration |
| Advanced Content Utilities | In Progress | Planned expansion |

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
- Formspree (Contact form)
- Groq / OpenAI-compatible API flow (Chat)
- Public API integrations where applicable
- Browser-powered tools for selected features

### Hosting
- GitHub Pages (Frontend)
- Render Web Service (Backend)

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
Why This Project Matters
This project reflects:

Practical frontend development
Deployment workflow understanding
API integration architecture
Product thinking and modular design
Transparent implementation (live vs in-progress tools)
It is continuously improving and intentionally built in production-minded iterations.

Run Locally
1. Install dependencies
Bash

npm install
2. Start development server
Bash

npm run dev
3. Open local URL
Vite will provide a local URL, typically:

txt

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
Backend (Render Environment Variables)
env

GROQ_API_KEY=YOUR_SECRET_API_KEY
PORT=10000
Do not expose secret API keys in frontend code.

Deployment Notes
Frontend
Deployed using GitHub Pages + GitHub Actions
Backend
Deployed as a Render Web Service
Runtime secrets managed through Render environment settings
Current Focus
Turning more AI Lab tools from demo state to fully live integrations
Improving reliability and UX consistency
Expanding practical AI workflows for real productivity use cases
Contact
Name: Sahadeb Pratihar
Email: hello.sahadebpfw@gmail.com
GitHub: https://github.com/sahadeb-pfw
WhatsApp: https://wa.me/919933376136
Note
This project is actively evolving.
I keep improving it in small, practical, production-minded steps.
