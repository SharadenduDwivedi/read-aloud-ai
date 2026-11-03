import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { SAMPLE, LANGUAGES } from "./sampleData";
import {
  performClientOCR,
  simplifyTextLocally,
  translateTextFree,
  processWithGemini,
  extractVocabulary,
  EXTENDED_GLOSSARY
} from "./aiService";

const DEVANAGARI = ["hi", "mr", "ne", "sa", "kok"];

const clean = (w) => (w || "").toLowerCase().replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "");
const splitWords = (t) => (t || "").split(/\s+/).filter(Boolean);

export default function App() {
  // Document state
  const [doc, setDoc] = useState(() => JSON.parse(JSON.stringify(SAMPLE)));
  const [mode, setMode] = useState("orig"); // "orig" | "simple" | "trans"
  const [langVal, setLangVal] = useState("hi-IN|Hindi");
  const [statusText, setStatusText] = useState("Ready. Tap any word to see its meaning.");
  const [isBusy, setIsBusy] = useState(false);
  const [srcNote, setSrcNote] = useState("Sample page loaded: Class 7 Science.");
  const [thumbUrl, setThumbUrl] = useState(null);

  // Settings & API Configuration
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("readaloud_gemini_key") || "");
  const [tempApiKey, setTempApiKey] = useState(apiKey);

  // Pipeline steps
  const [steps, setSteps] = useState({ s1: null, s2: null, s3: null, s4: null });

  // Paste text toggle & state
  const [showPaste, setShowPaste] = useState(false);
  const [pasteText, setPasteText] = useState("");

  // Comfort settings
  const [fontSize, setFontSize] = useState(21);
  const [isWide, setIsWide] = useState(false);
  const [tint, setTint] = useState("var(--tint-warm)");
  const [focusMode, setFocusMode] = useState(true);

  // Audio / Speech state
  const [rate, setRate] = useState(0.9);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);
  const [activeWordLoc, setActiveWordLoc] = useState({ p: null, wi: null });

  // Word card dialog state
  const [card, setCard] = useState({
    visible: false,
    word: "",
    meaning: "",
    example: "",
    x: 0,
    y: 0,
    pi: null,
    wi: null
  });

  const [langCode, langName] = useMemo(() => langVal.split("|"), [langVal]);

  const pageRef = useRef(null);
  const cardRef = useRef(null);
  const chunkIdxRef = useRef(0);
  const chunksRef = useRef([]);
  const fallbackTimerRef = useRef(null);
  const gotBoundaryRef = useRef(false);
  const isPlayingRef = useRef(false);

  // Keep ref synchronized with state
  isPlayingRef.current = isPlaying;

  // Initialize Speech Synthesis Voices
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;
    const updateVoices = () => {
      setVoices(synth.getVoices() || []);
    };

    updateVoices();
    synth.onvoiceschanged = updateVoices;

    return () => {
      synth.cancel();
      clearTimeout(fallbackTimerRef.current);
    };
  }, []);

  // Pick voice function
  const pickVoice = useCallback((lang) => {
    if (!voices.length) return null;
    const base = lang.split("-")[0].toLowerCase();
    const same = (v) => v.lang.replace("_", "-").toLowerCase().split("-")[0] === base;
    const list = voices.filter(same);
    const best = list.find((v) => /natural|online|google/i.test(v.name)) || list[0];
    return best || null;
  }, [voices]);

  // Voice plan
  const voicePlan = useCallback(() => {
    const sLang = mode === "trans" ? langCode : "en-IN";
    const base = sLang.split("-")[0];
    const own = pickVoice(sLang);
    if (own) return { voice: own, lang: sLang, script: null, kind: "own" };

    if (mode !== "trans") {
      const anyEn = voices.find((v) => v.lang.startsWith("en"));
      return anyEn ? { voice: anyEn, lang: anyEn.lang, script: null, kind: "own" } : null;
    }

    const hi = pickVoice("hi-IN");
    if (hi) {
      return {
        voice: hi,
        lang: "hi-IN",
        script: DEVANAGARI.includes(base) ? null : "Devanagari",
        kind: DEVANAGARI.includes(base) ? "sameScript" : "translit"
      };
    }

    const en = pickVoice("en-IN") || voices.find((v) => v.lang.startsWith("en"));
    if (en) {
      return { voice: en, lang: en.lang, script: "Latin", kind: "translit" };
    }

    return null;
  }, [mode, langCode, pickVoice, voices]);

  // Voice note message
  const voiceNote = useMemo(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return { text: "This browser can't speak text. Open it in Chrome or Edge.", warn: true };
    }
    if (mode !== "trans") {
      return { text: "", warn: false };
    }
    const v = voicePlan();
    const tip = ` For a native ${langName} voice, open the app in Microsoft Edge, or Chrome on an Android phone.`;
    if (!v) {
      return { text: "This device has no voices installed, so the text can be read but not heard.", warn: true };
    }
    if (v.kind === "own") {
      return { text: `Voice: ${v.voice.name}`, warn: false };
    } else if (v.kind === "sameScript") {
      return { text: `No ${langName} voice on this device, so a Hindi voice reads it (same script).` + tip, warn: false };
    } else {
      return {
        text: `No ${langName} voice on this device, so a ${
          v.script === "Devanagari" ? "Hindi" : "English"
        } voice reads it after spelling it in ${
          v.script === "Devanagari" ? "Hindi" : "English"
        } letters. The page still shows ${langName}.` + tip,
        warn: false
      };
    }
  }, [mode, voicePlan, langName]);

  // Current paragraphs
  const currentParas = useMemo(() => {
    if (mode === "simple") return doc.simple || doc.paras;
    if (mode === "trans") return (doc.trans && doc.trans[langName]) || doc.paras;
    return doc.paras;
  }, [doc, mode, langName]);

  // Build sentence chunks
  const buildChunks = useCallback(() => {
    const chunks = [];
    currentParas.forEach((text, pi) => {
      const ws = splitWords(text);
      let w0 = 0;
      ws.forEach((w, i) => {
        if (/[.!?।|]["'”’)]*$/.test(w) || i === ws.length - 1) {
          chunks.push({ p: pi, w0, n: i - w0 + 1 });
          w0 = i + 1;
        }
      });
    });
    chunksRef.current = chunks;
    chunkIdxRef.current = 0;
  }, [currentParas]);

  useEffect(() => {
    buildChunks();
    stopAudio(true);
  }, [currentParas, buildChunks]);

  // Stop audio helper
  const stopAudio = useCallback((silent = false) => {
    setIsPlaying(false);
    clearTimeout(fallbackTimerRef.current);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    chunkIdxRef.current = 0;
    setActiveWordLoc({ p: null, wi: null });
    if (!silent) {
      setStatusText("Ready. Tap any word to see its meaning.");
      setIsBusy(false);
    }
  }, []);

  // Pause audio
  const pauseAudio = useCallback(() => {
    setIsPlaying(false);
    clearTimeout(fallbackTimerRef.current);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setStatusText("Paused. Press play to continue from this sentence.");
  }, []);

  // Mark active word and auto-scroll
  const markWord = useCallback((pi, wi) => {
    setActiveWordLoc({ p: pi, wi });
    if (pageRef.current) {
      const target = pageRef.current.querySelector(`.w[data-p="${pi}"][data-wi="${wi}"]`);
      if (target) {
        const r = target.getBoundingClientRect();
        if (r.top < 80 || r.bottom > window.innerHeight - 110) {
          target.scrollIntoView({
            block: "center",
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
          });
        }
      }
    }
  }, []);

  // Speech helper: chunk speech
  const chunkSpeech = useCallback((c) => {
    const shown = splitWords(currentParas[c.p] || "");
    const words = shown.slice(c.w0, c.w0 + c.n);
    const starts = [];
    let pos = 0;
    words.forEach((w) => {
      starts.push(pos);
      pos += w.length + 1;
    });
    return { text: words.join(" "), starts };
  }, [currentParas]);

  // Fallback timer estimation
  const estimateTiming = useCallback((sp, toShown, pi, playRate) => {
    const ws = splitWords(sp.text);
    let i = 0;
    const tick = () => {
      if (!isPlayingRef.current || gotBoundaryRef.current || i >= ws.length) return;
      markWord(pi, toShown(i));
      const ms = (170 + ws[i].length * 42) / playRate;
      i++;
      fallbackTimerRef.current = setTimeout(tick, ms);
    };
    tick();
  }, [markWord]);

  // Speak chunk
  const speakChunk = useCallback(() => {
    if (!isPlayingRef.current) return;
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (chunkIdxRef.current >= chunksRef.current.length) {
      stopAudio(true);
      setSteps((s) => ({ ...s, s4: "done" }));
      setStatusText("Finished the page. Tap any word to revise it.");
      return;
    }

    const c = chunksRef.current[chunkIdxRef.current];
    const plan = voicePlan();
    if (!plan) return;

    const sp = chunkSpeech(c);
    const toShown = (k) => c.w0 + Math.min(c.n - 1, Math.floor((k * c.n) / Math.max(1, sp.starts.length)));

    const u = new SpeechSynthesisUtterance(sp.text);
    u.lang = plan.lang;
    if (plan.voice) u.voice = plan.voice;
    u.rate = rate;

    gotBoundaryRef.current = false;
    clearTimeout(fallbackTimerRef.current);
    markWord(c.p, c.w0);

    u.onboundary = (e) => {
      if (e.name && e.name !== "word") return;
      gotBoundaryRef.current = true;
      clearTimeout(fallbackTimerRef.current);
      let k = 0;
      while (k + 1 < sp.starts.length && sp.starts[k + 1] <= e.charIndex) k++;
      markWord(c.p, toShown(k));
    };

    u.onstart = () => {
      fallbackTimerRef.current = setTimeout(() => {
        if (!gotBoundaryRef.current) {
          estimateTiming(sp, toShown, c.p, u.rate);
        }
      }, 450);
    };

    u.onend = () => {
      clearTimeout(fallbackTimerRef.current);
      if (!isPlayingRef.current) return;
      chunkIdxRef.current++;
      speakChunk();
    };

    u.onerror = (e) => {
      clearTimeout(fallbackTimerRef.current);
      if (e.error === "interrupted" || e.error === "canceled") return;
      setStatusText("Couldn't play audio on this device.");
      stopAudio();
    };

    synth.speak(u);
  }, [voicePlan, chunkSpeech, rate, markWord, estimateTiming, stopAudio]);

  // Play audio
  const playAudio = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setStatusText("This browser can't speak text.");
      return;
    }
    if (!chunksRef.current.length) return;

    const plan = voicePlan();
    if (!plan) {
      setStatusText("This device has no voices installed, so the page can't be read aloud here.");
      return;
    }

    setIsPlaying(true);
    isPlayingRef.current = true;
    setSteps((s) => ({ ...s, s4: "on" }));
    setStatusText(
      plan.kind === "own"
        ? "Reading aloud…"
        : `Reading aloud with a ${plan.lang.startsWith("hi") ? "Hindi" : "English"} voice…`
    );

    window.speechSynthesis.cancel();
    speakChunk();
  }, [voicePlan, speakChunk]);

  // Mode switching
  const handleSetMode = async (newMode) => {
    if (newMode === mode) return;

    stopAudio(true);

    const need =
      (newMode === "simple" && !doc.simple) ||
      (newMode === "trans" && !(doc.trans && doc.trans[langName]));

    if (need) {
      setSteps((s) => ({ ...s, s3: "on" }));
      setIsBusy(true);
      setStatusText(newMode === "simple" ? "Rewriting in simpler English…" : `Translating into ${langName}…`);

      try {
        if (newMode === "simple") {
          const simplified = simplifyTextLocally(doc.paras);
          setDoc((prev) => ({ ...prev, simple: simplified }));
        } else {
          // If translation already cached in sample
          if (SAMPLE.trans && SAMPLE.trans[langName] && doc.title === SAMPLE.title) {
            const translation = SAMPLE.trans[langName];
            setDoc((prev) => ({
              ...prev,
              trans: { ...(prev.trans || {}), [langName]: translation }
            }));
          } else {
            // Translate custom extracted text
            const translatedParas = [];
            for (const p of doc.paras) {
              const tr = await translateTextFree(p, langCode);
              translatedParas.push(tr);
            }
            setDoc((prev) => ({
              ...prev,
              trans: { ...(prev.trans || {}), [langName]: translatedParas }
            }));
          }
        }
        setSteps((s) => ({ ...s, s3: "done" }));
      } catch (err) {
        console.error("Simplification / Translation error:", err);
      } finally {
        setIsBusy(false);
      }
    }

    setMode(newMode);
    setStatusText(
      newMode === "orig"
        ? "Showing the original page."
        : newMode === "simple"
        ? "Showing simpler English. Same facts, easier words."
        : `Showing ${langName}.`
    );
  };

  // Language selection change
  const handleLangChange = async (e) => {
    const val = e.target.value;
    setLangVal(val);
    const [newCode, newName] = val.split("|");

    if (mode === "trans") {
      stopAudio(true);
      if (!doc.trans || !doc.trans[newName]) {
        setSteps((s) => ({ ...s, s3: "on" }));
        setIsBusy(true);
        setStatusText(`Translating into ${newName}…`);
        try {
          if (SAMPLE.trans && SAMPLE.trans[newName] && doc.title === SAMPLE.title) {
            const translation = SAMPLE.trans[newName];
            setDoc((prev) => ({
              ...prev,
              trans: { ...(prev.trans || {}), [newName]: translation }
            }));
          } else {
            const translatedParas = [];
            for (const p of doc.paras) {
              const tr = await translateTextFree(p, newCode);
              translatedParas.push(tr);
            }
            setDoc((prev) => ({
              ...prev,
              trans: { ...(prev.trans || {}), [newName]: translatedParas }
            }));
          }
          setSteps((s) => ({ ...s, s3: "done" }));
        } catch (err) {
          console.error("Translation change error:", err);
        } finally {
          setIsBusy(false);
          setStatusText(`Showing ${newName}.`);
        }
      } else {
        setStatusText(`Showing ${newName}.`);
      }
    }
  };

  // Load sample page
  const handleLoadSample = () => {
    stopAudio(true);
    setDoc(JSON.parse(JSON.stringify(SAMPLE)));
    setMode("orig");
    setThumbUrl(null);
    setSteps({ s1: null, s2: null, s3: null, s4: null });
    setSrcNote("Sample page loaded: Class 7 Science.");
    setStatusText("Ready. Tap any word to see its meaning.");
    setIsBusy(false);
  };

  // Paste text action
  const handlePasteGo = () => {
    const t = pasteText.trim();
    if (!t) return;
    stopAudio(true);
    const paras = t
      .split(/\n\s*\n|\n/)
      .map((s) => s.trim())
      .filter(Boolean);

    const glossary = extractVocabulary(paras);

    setDoc({
      title: "Pasted Text Excerpt",
      paras,
      glossary
    });
    setMode("orig");
    setSteps({ s1: null, s2: null, s3: null, s4: null });
    setSrcNote(`Loaded ${paras.length} paragraph${paras.length > 1 ? "s" : ""} of pasted text.`);
    setStatusText("Ready. Tap any word to see its meaning.");
    setShowPaste(false);
  };

  // Photo upload with Real Client-Side OCR & optional Gemini AI Vision
  const handlePhotoUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setThumbUrl(url);
    stopAudio(true);

    setSteps({ s1: "done", s2: "on", s3: null, s4: null });
    setIsBusy(true);
    setStatusText("Reading the text on your photo (running OCR)...");

    try {
      let parsedDoc;

      // If user supplied a Gemini API key, use multimodal vision
      if (apiKey.trim()) {
        setStatusText("Analyzing image with Gemini Vision AI…");
        parsedDoc = await processWithGemini(apiKey.trim(), file, langName);
      } else {
        // Zero-setup: Client-side In-Browser Tesseract.js OCR
        setStatusText("Extracting textbook text directly in your browser…");
        parsedDoc = await performClientOCR(file);
      }

      setDoc(parsedDoc);
      setMode("orig");
      setSteps({ s1: "done", s2: "done", s3: null, s4: null });
      setSrcNote(`Read ${parsedDoc.paras.length} paragraph${parsedDoc.paras.length > 1 ? "s" : ""} from your uploaded photo.`);
      setStatusText("Page ready! Press play to listen, or tap any dotted word.");
    } catch (err) {
      console.error("Photo OCR processing error:", err);
      setSteps({ s1: "done", s2: null, s3: null, s4: null });
      setStatusText(`Could not read photo: ${err.message || "Please try a clearer image with good lighting."}`);
    } finally {
      setIsBusy(false);
      e.target.value = "";
    }
  };

  // Open word card
  const handleWordClick = (pi, wi, wordText, e) => {
    const raw = wordText.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "");
    if (!raw) return;

    const key = clean(raw);
    const gl = doc.glossary || {};
    const item = gl[key] || EXTENDED_GLOSSARY[key];

    const rect = e.currentTarget.getBoundingClientRect();
    const cardWidth = 320;
    const cardHeight = 160;

    const left = Math.min(Math.max(16, rect.left), window.innerWidth - cardWidth - 16);
    const below = rect.bottom + cardHeight + 12 < window.innerHeight;
    const top = below ? rect.bottom + 8 : Math.max(16, rect.top - cardHeight - 8);

    if (item && mode !== "trans") {
      setCard({
        visible: true,
        word: raw,
        meaning: item.m,
        example: "Example: " + item.e,
        x: left,
        y: top,
        pi,
        wi
      });
    } else {
      // Dynamic vocabulary lookup
      const generatedMeaning = `A key term used in this lesson. Tap 'Hear word' for clear pronunciation.`;
      const generatedExample = `Example: Students learn about "${raw}" in this section.`;

      // Cache it so it shows with dotted underline
      setDoc((prev) => ({
        ...prev,
        glossary: {
          ...(prev.glossary || {}),
          [key]: { m: generatedMeaning, e: generatedExample }
        }
      }));

      setCard({
        visible: true,
        word: raw,
        meaning: generatedMeaning,
        example: generatedExample,
        x: left,
        y: top,
        pi,
        wi
      });
    }
  };

  // Hear single word
  const handleHearWord = () => {
    if (typeof window === "undefined" || !window.speechSynthesis || !card.word) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPlaying(false);

    const plan = voicePlan();
    const u = new SpeechSynthesisUtterance(card.word.replace(/[^\p{L}\p{M}]+/gu, " "));
    if (plan) {
      u.lang = plan.lang;
      if (plan.voice) u.voice = plan.voice;
    }
    u.rate = 0.7;
    synth.speak(u);
  };

  // Save Settings Modal
  const handleSaveSettings = () => {
    const trimmed = tempApiKey.trim();
    setApiKey(trimmed);
    localStorage.setItem("readaloud_gemini_key", trimmed);
    setShowSettings(false);
    setStatusText(trimmed ? "Gemini AI Vision key saved!" : "Using default local OCR engine.");
  };

  // Close card when pressing Escape or clicking outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setCard((prev) => ({ ...prev, visible: false }));
        setShowSettings(false);
      }
    };
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target) && !e.target.closest(".w")) {
        setCard((prev) => ({ ...prev, visible: false }));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="wrap">
      {/* Header */}
      <header className="bar">
        <div className="brand">
          <div className="logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-ink)" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h9M4 10h7M4 14h9M4 18h5" />
              <path d="M17 9c1.5 1 1.5 5 0 6M20 7c2.7 2.3 2.7 7.7 0 10" />
            </svg>
          </div>
          <div>
            <h1>ReadAloud AI</h1>
            <small>Turns any textbook page into something a student can listen to and understand</small>
          </div>
        </div>

        <div className="row" style={{ gap: "10px" }}>
          <button
            className="btn"
            style={{ padding: "5px 12px", fontSize: "12px", borderRadius: "999px" }}
            onClick={() => setShowSettings(true)}
            type="button"
            title="Configure OCR & Vision Engine"
          >
            ⚙️ AI Settings {apiKey.trim() ? "• Cloud" : "• Local OCR"}
          </button>
          <span className="tag">Prototype v0.3 · Group 4</span>
        </div>
      </header>

      {/* Processing Pipeline Strip */}
      <div className="pipe" aria-label="How a page is processed">
        <span className={`step ${steps.s1 === "on" ? "on" : ""} ${steps.s1 === "done" ? "done" : ""}`}>
          <b>1 Photo</b>
          <i>camera</i>
        </span>
        <span className="arrow">→</span>
        <span className={`step ${steps.s2 === "on" ? "on" : ""} ${steps.s2 === "done" ? "done" : ""}`}>
          <b>2 Read text</b>
          <i>AI vision / OCR</i>
        </span>
        <span className="arrow">→</span>
        <span className={`step ${steps.s3 === "on" ? "on" : ""} ${steps.s3 === "done" ? "done" : ""}`}>
          <b>3 Simplify / translate</b>
          <i>LLM</i>
        </span>
        <span className="arrow">→</span>
        <span className={`step ${steps.s4 === "on" ? "on" : ""} ${steps.s4 === "done" ? "done" : ""}`}>
          <b>4 Speak + highlight</b>
          <i>on device</i>
        </span>
      </div>

      {/* Two-column layout */}
      <div className="grid">
        {/* Controls Sidebar */}
        <aside className="panel">
          {/* Group 1: Textbook page */}
          <div className="group">
            <span className="label">Textbook page</span>
            <label className="btn primary photo" id="photoBtn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              Take or upload a photo
              <input
                type="file"
                id="photo"
                accept="image/*"
                capture="environment"
                aria-label="Take or upload a photo of a textbook page"
                onChange={handlePhotoUpload}
              />
            </label>

            {thumbUrl && <img id="thumb" className="thumb" src={thumbUrl} alt="Photo of the page" />}

            <div className="row">
              <button className="btn" id="sampleBtn" type="button" onClick={handleLoadSample}>
                Load sample page
              </button>
              <button
                className="btn"
                id="pasteToggle"
                type="button"
                onClick={() => setShowPaste((p) => !p)}
              >
                Paste text
              </button>
            </div>

            {showPaste && (
              <div id="pasteBox" className="group">
                <textarea
                  id="pasteText"
                  placeholder="Paste a paragraph from any chapter…"
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                />
                <button className="btn" id="pasteGo" type="button" onClick={handlePasteGo}>
                  Read this text
                </button>
              </div>
            )}

            <span className="note" id="srcNote">
              {srcNote}
            </span>
          </div>

          {/* Group 2: Show the page as */}
          <div className="group">
            <span className="label">Show the page as</span>
            <div className="chips" role="group" aria-label="Version of the text">
              <button
                className="chip"
                data-mode="orig"
                aria-pressed={mode === "orig"}
                type="button"
                onClick={() => handleSetMode("orig")}
              >
                Original
              </button>
              <button
                className="chip"
                data-mode="simple"
                aria-pressed={mode === "simple"}
                type="button"
                onClick={() => handleSetMode("simple")}
              >
                Simpler English
              </button>
              <button
                className="chip"
                data-mode="trans"
                aria-pressed={mode === "trans"}
                type="button"
                onClick={() => handleSetMode("trans")}
              >
                My language
              </button>
            </div>

            <label className="sr" htmlFor="lang">
              My language
            </label>
            <select id="lang" value={langVal} onChange={handleLangChange}>
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>

            {voiceNote.text && (
              <span className={`note ${voiceNote.warn ? "warn" : ""}`} id="voiceNote">
                {voiceNote.text}
              </span>
            )}
          </div>

          {/* Group 3: Reading comfort */}
          <div className="group">
            <span className="label">Reading comfort</span>
            <div className="row">
              <button
                className="btn"
                id="smaller"
                type="button"
                aria-label="Smaller text"
                onClick={() => setFontSize((s) => Math.max(16, s - 2))}
              >
                A−
              </button>
              <button
                className="btn"
                id="bigger"
                type="button"
                aria-label="Bigger text"
                onClick={() => setFontSize((s) => Math.min(32, s + 2))}
              >
                A+
              </button>
              <button
                className="btn"
                id="spacing"
                type="button"
                aria-pressed={isWide}
                onClick={() => setIsWide((w) => !w)}
              >
                Wider lines
              </button>
            </div>

            <div className="row" role="group" aria-label="Page colour">
              <button
                className="sw"
                data-tint="--tint-white"
                style={{ background: "var(--tint-white)" }}
                aria-label="White page"
                aria-pressed={tint === "var(--tint-white)"}
                type="button"
                onClick={() => setTint("var(--tint-white)")}
              />
              <button
                className="sw"
                data-tint="--tint-warm"
                style={{ background: "var(--tint-warm)" }}
                aria-label="Warm page"
                aria-pressed={tint === "var(--tint-warm)"}
                type="button"
                onClick={() => setTint("var(--tint-warm)")}
              />
              <button
                className="sw"
                data-tint="--tint-blue"
                style={{ background: "var(--tint-blue)" }}
                aria-label="Blue page"
                aria-pressed={tint === "var(--tint-blue)"}
                type="button"
                onClick={() => setTint("var(--tint-blue)")}
              />
              <button
                className="sw"
                data-tint="--tint-mint"
                style={{ background: "var(--tint-mint)" }}
                aria-label="Mint page"
                aria-pressed={tint === "var(--tint-mint)"}
                type="button"
                onClick={() => setTint("var(--tint-mint)")}
              />
            </div>

            <label className="row note">
              <input
                type="checkbox"
                id="focusMode"
                checked={focusMode}
                onChange={(e) => setFocusMode(e.target.checked)}
              />
              Fade paragraphs not being read
            </label>
          </div>
        </aside>

        {/* Reading Sheet */}
        <section className="sheet" aria-label="Reading page">
          {/* Sheet Header */}
          <div className="sheet-head">
            <h2 id="docTitle">{doc.title}</h2>
            <span className="status">
              <span className={`dot ${isBusy ? "busy" : ""}`} id="dot" />
              <span id="statusText">{statusText}</span>
            </span>
          </div>

          {/* Reading Page */}
          <div
            ref={pageRef}
            className={`page ${focusMode ? "focus" : ""}`}
            id="page"
            style={{
              "--tint": tint,
              fontSize: `${fontSize}px`,
              lineHeight: isWide ? "2.1" : "1.75",
              letterSpacing: isWide ? ".03em" : "0",
              wordSpacing: isWide ? ".18em" : "0"
            }}
          >
            {currentParas.map((pText, pi) => {
              const isCurrentParagraph = activeWordLoc.p === pi;
              const isDim = isPlaying && activeWordLoc.p !== null && !isCurrentParagraph;

              // Split words and whitespace
              const regex = /\S+/g;
              const elements = [];
              let m;
              let last = 0;
              let wi = 0;

              while ((m = regex.exec(pText)) !== null) {
                if (m.index > last) {
                  elements.push(pText.slice(last, m.index));
                }
                const wordStr = m[0];
                const key = clean(wordStr);
                const isHard =
                  mode !== "trans" &&
                  Boolean((doc.glossary && doc.glossary[key]) || EXTENDED_GLOSSARY[key]);
                const isNow = activeWordLoc.p === pi && activeWordLoc.wi === wi;
                const currentWi = wi;

                elements.push(
                  <span
                    key={`${pi}-${currentWi}`}
                    className={`w ${isHard ? "hard" : ""} ${isNow ? "now" : ""}`}
                    data-p={pi}
                    data-wi={currentWi}
                    tabIndex={0}
                    onClick={(e) => handleWordClick(pi, currentWi, wordStr, e)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleWordClick(pi, currentWi, wordStr, e);
                      }
                    }}
                  >
                    {wordStr}
                  </span>
                );

                wi++;
                last = m.index + wordStr.length;
              }
              if (last < pText.length) {
                elements.push(pText.slice(last));
              }

              return (
                <p key={pi} data-p={pi} className={isDim ? "dim" : ""}>
                  {elements}
                </p>
              );
            })}
          </div>

          {/* Audio Player Toolbar */}
          <div className="player">
            <button
              className="btn primary play"
              id="playBtn"
              type="button"
              aria-label={isPlaying ? "Pause" : "Read aloud"}
              onClick={isPlaying ? pauseAudio : playAudio}
            >
              <svg id="playIcon" viewBox="0 0 24 24" fill="currentColor">
                {isPlaying ? (
                  <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                ) : (
                  <path d="M7 4.5v15l13-7.5z" />
                )}
              </svg>
            </button>

            <button className="btn" id="stopBtn" type="button" onClick={() => stopAudio(false)}>
              Start over
            </button>

            <div className="speed">
              <label htmlFor="rate">Speed</label>
              <input
                type="range"
                id="rate"
                min="0.5"
                max="1.5"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
              />
              <output id="rateOut">{rate.toFixed(1)}×</output>
            </div>

            <span className="spacer" />
            <span className="note">Dotted words are hard words · tap to explain</span>
          </div>
        </section>
      </div>

      {/* Floating Word Card Dialog */}
      {card.visible && (
        <div
          ref={cardRef}
          className="card"
          id="card"
          role="dialog"
          aria-label="Word meaning"
          style={{ left: `${card.x}px`, top: `${card.y}px` }}
        >
          <h3 id="cWord">{card.word}</h3>
          <p id="cMeaning">{card.meaning}</p>
          {card.example && (
            <p className="ex" id="cEx">
              {card.example}
            </p>
          )}
          <div className="row">
            <button className="btn" id="cHear" type="button" onClick={handleHearWord}>
              🔊 Hear word
            </button>
            <button
              className="btn"
              id="cClose"
              type="button"
              onClick={() => setCard((prev) => ({ ...prev, visible: false }))}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* AI Engine & Settings Modal */}
      {showSettings && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "grid",
            placeItems: "center",
            zIndex: 1000,
            padding: "16px"
          }}
        >
          <div
            className="card"
            style={{
              position: "static",
              maxWidth: "460px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)"
            }}
          >
            <h3>⚙️ AI &amp; Vision Engine Settings</h3>
            <p style={{ color: "var(--muted)", fontSize: "13px" }}>
              By default, ReadAloud AI uses <b>client-side Tesseract.js OCR</b> to read photos directly in your browser with <b>zero setup required</b>.
            </p>
            <div className="group" style={{ margin: "8px 0" }}>
              <label className="label" htmlFor="geminiKey">
                Optional: Google Gemini API Key (Multimodal Vision)
              </label>
              <input
                id="geminiKey"
                type="password"
                placeholder="AIzaSy..."
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                  color: "var(--ink)",
                  fontSize: "14px"
                }}
              />
              <span className="note" style={{ fontSize: "12px" }}>
                Entering a free Gemini 1.5 Flash key enables cloud vision enhancement and instant 10-language translations for custom textbook pages. Leave blank to use local in-browser OCR.
              </span>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              <button className="btn primary" type="button" onClick={handleSaveSettings}>
                Save Settings
              </button>
              <button className="btn" type="button" onClick={() => setShowSettings(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <span>Built for the I&amp;E concept note · Innovation &amp; Entrepreneurship, Group 4</span>
        <span>Audio runs on the device; text reading and simplifying use an AI vision model.</span>
      </footer>
    </div>
  );
}
