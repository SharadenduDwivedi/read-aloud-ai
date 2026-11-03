# ReadAloud AI (React Replica)

An exact, high-fidelity React replica of the **ReadAloud AI** prototype (Prototype v0.3 · Group 4) originally designed for the I&E (Innovation & Entrepreneurship) concept note.

## Features

- **Textbook Page Sources**:
  - **Take or Upload a Photo**: With live camera capture / file upload and image thumbnail preview.
  - **Load Sample Page**: Class 7 Science page *"How Plants Make Their Food"*.
  - **Paste Text**: Expandable input to read and analyze any custom textbook excerpt.
- **Reading Modes**:
  - **Original**: Full textbook chapter with highlighted difficult vocabulary words.
  - **Simpler English**: Dyslexia-friendly sentence structuring (short sentences, simple vocabulary).
  - **My Language**: Native translations in 10 Indian languages:
    - हिन्दी · Hindi
    - मराठी · Marathi
    - বাংলা · Bengali
    - தமிழ் · Tamil
    - తెలుగు · Telugu
    - ಕನ್ನಡ · Kannada
    - ગુજરાતી · Gujarati
    - ଓଡ଼ିଆ · Odia
    - മലയാളം · Malayalam
    - ਪੰਜਾਬੀ · Punjabi
- **Interactive Vocabulary Glossaries**:
  - Tapping or pressing Enter/Space on any dotted word opens a smart popup card.
  - Shows clear explanation (max 15 words) tailored for ages 10–14.
  - Everyday example sentence from Indian daily life.
  - **🔊 Hear word**: Pronounces the selected word individually at 0.7× speed.
- **On-Device Text-to-Speech & Sync Highlight**:
  - Powered by Web Speech API (`SpeechSynthesis`).
  - Real-time sentence chunking and word-level karaoke-style highlight tracking.
  - Speed adjustment from 0.5× to 1.5×.
  - Automatic fallback timing estimation for browser voices without word boundary events.
  - Auto-scrolling reading view keeping the active word in the viewport.
- **Dyslexia & Accessibility Comfort Tools**:
  - Text sizing (`A−` down to 16px, `A+` up to 32px).
  - Wider lines toggle (increased line height, letter spacing, and word spacing).
  - Four contrast tinted backgrounds: White, Warm, Soft Blue, and Mint.
  - Focus reading mode: Fades out inactive paragraphs during speech.
  - Full system Dark Mode support.

## Running the Application

To start the local development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

