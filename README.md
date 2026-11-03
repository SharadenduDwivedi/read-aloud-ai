# ReadAloud AI

> **Assistive Reading & Learning Technology for Inclusive Education**  
> *Innovation & Entrepreneurship · Group 4*

ReadAloud AI is an assistive web application designed to help school students with dyslexia, reading difficulties, low vision, and first-generation learners understand textbook content independently. Using computer vision, language simplification, and on-device text-to-speech with synchronized visual tracking, ReadAloud AI bridges the gap between classroom understanding and solitary textbook reading.

---

## 📌 Problem & Motivation

* **Prevalence**: Indian studies indicate dyslexia affects 2–18% of primary school children, accounting for ~80% of all diagnosed learning disabilities.
* **Support Shortage**: India has an estimated 22.5 lakh children with special needs, but fewer than 29,000 special educators across the country.
* **The Invisible Gap**: Students with dyslexia often understand concepts well when explained verbally, but struggle with decoding printed text alone at home—frequently leading to unfair labeling of students as "slow" or "careless."
* **Policy Alignment**: Aligns with the **Rights of Persons with Disabilities (RPwD) Act, 2016** and **NEP 2020** mandates for inclusive classroom technology.

---

## 🚀 Core Features

### 1. Multi-Source Input
* **Camera / Photo Capture**: Take or upload a picture of any printed textbook page with instant preview.
* **Preloaded Sample Curriculum**: Built-in Class 7 Science page (*"How Plants Make Their Food"*) for instant demonstration without hardware prerequisites.
* **Custom Text Reader**: Expandable text input field to analyze any custom excerpt or homework assignment.

### 2. Multi-Tiered Comprehension Modes
* **Original**: Preserves the complete textbook text, automatically marking difficult scientific and vocabulary words.
* **Simpler English**: Dyslexia-adapted sentence structure (short clauses, clear vocabulary) retaining all scientific facts.
* **Regional Language Mode**: Context-aware translations into 10 Indian languages:
  * हिन्दी (Hindi)
  * मराठी (Marathi)
  * বাংলা (Bengali)
  * தமிழ் (Tamil)
  * తెలుగు (Telugu)
  * ಕನ್ನಡ (Kannada)
  * ગુજરાતી (Gujarati)
  * ଓଡ଼ିଆ (Odia)
  * മലയാളം (Malayalam)
  * ਪੰਜਾਬੀ (Punjabi)

### 3. Contextual Vocabulary Glossaries
* **Interactive Tappable Words**: Tap or select any word to inspect its meaning immediately.
* **Age-Tailored Definitions**: Explanations under 15 words framed for middle-school learners (ages 10–14).
* **Familiar Everyday Examples**: Real-world contextual sentences drawn from Indian daily life.
* **Dedicated Pronunciation Audio**: Independent 0.7× speed audio playback for individual words.

### 4. Dyslexia-Friendly Ergonomics & Accessibility
* **Lexend & Bricolage Grotesque Fonts**: Designed specifically to reduce visual crowding and increase character recognition.
* **Dynamic Sizing & Spacing**: Rapid font scaling (`A−` / `A+`) and wide line/word spacing toggles.
* **Contrast Tints**: High-contrast, glare-reducing reading tints (White, Warm Parchment, Soft Blue, Soft Mint).
* **Paragraph Focus Mode**: Fades inactive paragraphs during playback to prevent line-skipping and visual disorientation.
* **Dark Mode**: System-aware theme switching.

### 5. Synchronized On-Device Speech Engine
* **Low-Latency Synthesis**: Leverages the browser's Web Speech API directly on the client—no costly external audio streaming required.
* **Karaoke-Style Tracking**: Real-time sentence chunking and word-level highlighting with automated viewport scrolling.
* **Speed Regulation**: Granular reading speed adjustment from 0.5× to 1.5×.

---

## 🛠️ Tech Stack & Architecture

* **Frontend**: React 18, Vite
* **Styling**: Modern CSS3 (Custom Properties, Flexbox/Grid, Responsive Mobile Breakpoints)
* **Fonts**: Google Fonts (`Lexend`, `Bricolage Grotesque`)
* **Audio**: Web Speech Synthesis API (`SpeechSynthesisUtterance`)
* **Processing Pipeline**:
  $$\text{1. Photo Capture} \longrightarrow \text{2. Vision OCR} \longrightarrow \text{3. Simplification / Translation} \longrightarrow \text{4. On-Device Speech + Sync}$$

---

## 📦 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm (bundled with Node)

### Installation & Run

1. Clone or navigate into the project directory:
   ```bash
   cd Prototype
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` (or the port indicated in your terminal).

4. Build for production deployment:
   ```bash
   npm run build
   ```

---

## 📄 License & Credits
Developed as part of the **Innovation & Entrepreneurship** project curriculum (Group 4). Dedicated to building accessible, inclusive educational tools for every learner.
