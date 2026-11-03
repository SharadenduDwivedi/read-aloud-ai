<div align="center">

# 📖 ReadAloud AI
### Assistive Multilingual Learning Engine for Inclusive Classrooms

[![Prototype Version](https://img.shields.io/badge/Prototype-v0.3-blue.svg?style=flat-square)](.)
[![Domain](https://img.shields.io/badge/Domain-EdTech%20%7C%20Accessibility-purple.svg?style=flat-square)](.)
[![License](https://img.shields.io/badge/Project-I%26E%20Group%204-emerald.svg?style=flat-square)](.)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?style=flat-square&logo=react)](.)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg?style=flat-square&logo=vite)](.)

<p align="center">
  <b>Transforming printed textbook pages into accessible, audio-visual reading journeys that any student can listen to, follow, and comprehend in their regional language.</b>
</p>

</div>

---

## 🌟 Executive Summary

**ReadAloud AI** is an AI-powered assistive reading platform engineered for primary and middle school students who struggle with solo textbook reading—specifically students with **dyslexia**, **low vision**, and **first-generation learners** reading English curriculum.

By combining on-device computer vision, contextual language simplification, and synchronized real-time text-to-speech with visual word tracking, ReadAloud AI empowers students to read textbooks independently on any smartphone or tablet without needing costly one-on-one tuition.

---

## 🔍 The Problem & Opportunity

* **Massive Prevalence**: Indian clinical studies report dyslexia in **2% to 18% of primary schoolchildren**, making up approximately **80% of all identified learning disabilities** (Bandla et al., 2017).
* **Severe Specialist Deficit**: The Supreme Court of India noted that while India has over **22.5 lakh children with special needs (CwSN)**, only **28,535 special educators** are available nationwide—a staggering deficit of 98.7%.
* **The "Invisible" Reading Gap**: Dyslexic students typically comprehend concepts well when explained verbally by a teacher in class. The breakdown occurs when reading textbooks alone at home—letters appear jumbled, lines are skipped, and fatigue sets in. Students are mistakenly labeled "lazy" or "weak" when the real issue is visual decoding, not cognitive ability.
* **Statutory Mandate**: Aligned directly with the **Rights of Persons with Disabilities (RPwD) Act, 2016** and **National Education Policy (NEP) 2020** mandates for inclusive learning technology in Indian schools.

---

## 🎯 Target User Persona

| Attribute | Details |
| :--- | :--- |
| **Name & Age** | **Aman**, 12 years old (Class 7) |
| **Schooling** | Semi-urban school, transitioning from regional language to English science textbooks |
| **Pain Point** | Grasps science concepts quickly during class lectures, but takes over an hour to read a single textbook page at home alone |
| **Family Context** | First-generation learner; parents cannot read English or explain scientific terminology |
| **Support Gap** | No remedial tutor or special educator available in his town |
| **Outcome with ReadAloud AI** | Photographs his textbook page, listens with word-by-word highlighting, taps hard terms for Hindi explanations, and finishes his chapter independently in 15 minutes |

---

## ⚡ Competitive Edge

Existing read-aloud solutions fall short in the context of Indian school education:

| Feature / Capability | Microsoft Immersive Reader | Google Lens Listen | Speechify | **ReadAloud AI** |
| :--- | :---: | :---: | :---: | :---: |
| **Optimized for Photographed Paper Textbooks** | ❌ (Mainly digital/web text) | ⚠️ (Basic OCR) | ❌ (Document/PDF focus) | ✅ **Full Vision Processing** |
| **Contextual Glossary with Indian Examples** | ❌ | ❌ | ❌ | ✅ **Everyday Indian Contexts** |
| **Dyslexia-Adapted "Simpler English" Mode** | ❌ | ❌ | ❌ | ✅ **Short Sentences & Core Facts** |
| **Indian Regional Language Bridge (10+ Languages)**| ⚠️ (English-first) | ⚠️ (Raw translation) | ❌ | ✅ **Pedagogical Translation** |
| **Zero Per-Minute Audio Cloud Streaming Cost** | ❌ (Cloud TTS cost) | ⚠️ | ❌ (Costly subscription) | ✅ **100% On-Device Web Speech** |
| **Low-Bandwidth Mobile Optimized** | ⚠️ (Heavy suite) | ⚠️ | ❌ | ✅ **Ultra-light PWA Architecture** |

---

## 🛠️ The 4-Step Learning Pipeline

```
  ┌──────────────┐     ┌──────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
  │   1. Photo   │ ──> │ 2. Read Text │ ──> │ 3. Simplify/Translate│ ──> │  4. Speak + Highlight│
  │ Phone Camera │     │  Vision OCR  │     │  LLM Comprehension   │     │ On-Device Web Speech │
  └──────────────┘     └──────────────┘     └──────────────────────┘     └──────────────────────┘
```

1. **Step 1: Capture**: The student snaps a photo of any textbook page or selects from built-in standard curriculum modules.
2. **Step 2: Optical Extraction**: Intelligently processes curved, skewed, or shadowed classroom photos to isolate clean body paragraphs.
3. **Step 3: Pedagogical Adaptation**:
   - Identifies candidate vocabulary words that impede fluency.
   - Generates age-appropriate definitions (<15 words) with familiar daily examples.
   - Restructures dense scientific paragraphs into short, decodable clauses.
   - Translates into regional mother tongues while preserving core scientific terminology.
4. **Step 4: Multisensory Playback**: Runs local, zero-latency text-to-speech with real-time visual karaoke highlighting.

---

## ✨ Features & Capabilities

### 📚 Reading & Comprehension Modes
* **Original Mode**: Complete unabridged textbook chapter with subtle dotted underlines highlighting challenging vocabulary.
* **Simpler English Mode**: Restructures multi-clause sentences into single-idea sentences (max 12 words), making syntax accessible for dyslexic processing without omitting scientific facts.
* **Regional Language Mode**: Instant translation into 10 major Indian languages:
  * **Hindi (हिन्दी)**, **Marathi (मराठी)**, **Bengali (বাংলা)**, **Tamil (தமிழ்)**, **Telugu (తెలుగు)**,
  * **Kannada (ಕನ್ನಡ)**, **Gujarati (ગુજરાતી)**, **Odia (ଓଡ଼ିଆ)**, **Malayalam (മലയാളം)**, and **Punjabi (ਪੰਜਾਬੀ)**.

### 💡 Interactive Vocabulary Cards
* **Tap-to-Explain**: Tapping or navigating via keyboard to any underlined word opens a non-intrusive floating dialog.
* **Child-Friendly Meanings**: Direct, concise definitions without recursive complex vocabulary.
* **Indian Daily Life Examples**: Explains abstract concepts with familiar cultural touchstones (e.g., explaining *pigment* via turmeric).
* **Phonic Pronunciation**: Dedicated **"🔊 Hear word"** button speaking the individual word at a deliberate 0.7× speed.

### 🎨 Dyslexia & Ergonomic Comfort Controls
* **Research-Backed Typography**: Built with **Lexend** (specifically engineered by educational researchers to reduce visual stress and expand reading speed) and **Bricolage Grotesque**.
* **Visual Stress Filters**: 4 scientifically selected background tints:
  * ⚪ Clean White
  * 📜 Warm Parchment (`#fbf3df` - minimizes glare and visual distortion)
  * 🌊 Soft Sky Blue (`#e6eefb` - calming contrast for scotopic sensitivity)
  * 🍃 Fresh Mint (`#e4f4ec` - reduces visual fatigue)
* **Wider Spacing Toggle**: One-click expansion of line-height ($2.1\times$), word-spacing ($0.18\text{em}$), and character-spacing ($0.03\text{em}$).
* **Dynamic Font Sizing**: Stepped scaling from 16px to 32px.
* **Paragraph Focus Mask**: Automatically dims inactive paragraphs by 68% during speech playback, preventing visual wandering.

### 🎙️ On-Device Audio Engine
* **Zero Audio Bandwidth**: Utilizes the client device's native `window.speechSynthesis` engine, ensuring fluid offline capability and zero server bandwidth costs.
* **Continuous Karaoke Synchronization**: Sentence-boundary chunking with fallback timing estimation for browsers lacking native word-boundary events.
* **Variable Speed Control**: Fine-grained playback slider ranging from 0.5× to 1.5×.

---

## 💼 Business Model & Feasibility

* **Unit Economics**:
  * On-device speech and client rendering cost **₹0 / page**.
  * Average AI visual extraction and adaptation costs estimated under **₹1.00 / page**.
* **Go-to-Market (B2B / B2G)**:
  * **Free for Individual Students**: Eliminates financial barriers for low-income families.
  * **School Subscriptions (B2B)**: Yearly per-student license fee for private and CBSE schools offering inclusive education infrastructure, teacher oversight portals, and learning analytics.
  * **CSR & NGO Partnerships (B2G)**: Partnering with state education boards and corporate CSR foundations to subsidize deployments in regional government schools.
* **Data Privacy Compliance**: Fully aligned with India's **Digital Personal Data Protection (DPDP) Act, 2023**—user photographs are processed on-demand and not retained.

---

## 💻 Tech Stack

* **Core Framework**: React 18 with React Hooks (`useCallback`, `useMemo`, `useRef`)
* **Build System**: Vite 5
* **Styling**: Pure CSS3 with CSS Custom Properties, semantic HTML5, and full dark-mode media query support
* **Audio Engine**: W3C Web Speech API (`SpeechSynthesisUtterance`)
* **Typography**: `@fontsource` / Google Fonts (`Lexend`, `Bricolage Grotesque`)

---

## 🚀 Quickstart Guide

### 1. Prerequisites
Ensure you have **Node.js** (v18.0.0 or higher) installed on your machine.

### 2. Setup & Installation
```bash
# Clone the repository and enter the directory
cd Prototype

# Install required dependencies
npm install
```

### 3. Development Server
```bash
# Start the local development server
npm run dev
```
Navigate to `http://localhost:3000` in Google Chrome, Microsoft Edge, or any modern mobile browser.

### 4. Production Build
```bash
# Compile and bundle optimized assets
npm run build

# Preview the production build locally
npm run preview
```

---

## 🛣️ Product Roadmap

- [x] **v0.1**: Initial sentence-chunked Text-to-Speech engine with synchronized highlights.
- [x] **v0.2**: Contextual vocabulary glossary and reading comfort controls (Lexend font, contrast tints).
- [x] **v0.3**: Multi-language support (10 Indian languages), camera upload simulation, and dyslexia-adapted English.
- [ ] **v0.4 (Upcoming)**:
  - Guided camera viewfinder with automatic blur and glare detection.
  - Active **"Read-to-Me"** speech-recognition practice mode.
  - Dual-column side-by-side bilingual reading view.
  - Teacher "Stumble Tracker" analytics portal.

---

## 👥 Project Team

**Group 4 · Innovation & Entrepreneurship**  
*Master of Science / MBA (Data Science & AI) Program*  
*Indian Institute of Management (IIM) Sambalpur*
