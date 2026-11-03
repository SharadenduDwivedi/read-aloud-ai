import { createWorker } from "tesseract.js";

// Educational dictionary for offline school vocabulary fallback
export const EXTENDED_GLOSSARY = {
  photosynthesis: { m: "How green plants make food using sunlight, water, and air.", e: "Leaves use photosynthesis during daytime." },
  chlorophyll: { m: "The green pigment in leaves that absorbs sunlight.", e: "Chlorophyll makes trees and grass look green." },
  respiration: { m: "The process of taking in oxygen and releasing energy from food.", e: "All humans and animals need respiration to stay alive." },
  transpiration: { m: "Loss of water vapor from plant leaves.", e: "Plants lose extra water on hot afternoons through transpiration." },
  circulation: { m: "The movement of blood through the body.", e: "The heart pumps blood for circulation." },
  digestion: { m: "Breaking down food into simple substances the body can use.", e: "Chewing well helps in proper digestion." },
  germination: { m: "When a seed starts to sprout and grow into a new plant.", e: "Moist soil is needed for seed germination." },
  pollination: { m: "Transfer of pollen from one flower to another to produce seeds.", e: "Honeybees help in pollination while gathering nectar." },
  evaporation: { m: "When heat turns a liquid like water into vapor or gas.", e: "Puddles dry up in summer because of evaporation." },
  condensation: { m: "When warm vapor cools down and turns back into liquid droplets.", e: "Water droplets on a cold glass of lassi are caused by condensation." },
  precipitation: { m: "Water falling from clouds as rain, snow, or hail.", e: "Monsoon brings heavy precipitation to Indian farms." },
  reproduction: { m: "The process by which living organisms produce young ones.", e: "Birds lay eggs for reproduction." },
  fertilization: { m: "Joining of male and female cells to form a new seed or baby.", e: "Flowers need fertilization to grow fruits." },
  adaptation: { m: "Special features that help an organism live in its surroundings.", e: "The camel's hump is an adaptation for surviving in the desert." },
  ecosystem: { m: "A community of living organisms interacting with their environment.", e: "A village pond is a mini ecosystem with fish, frogs, and plants." },
  herbivore: { m: "An animal that eats only plants.", e: "Cows and deer are herbivores." },
  carnivore: { m: "An animal that eats other animals.", e: "Tigers and leopards are carnivores." },
  omnivore: { m: "An animal that eats both plants and meat.", e: "Bears, crows, and humans are omnivores." },
  microorganism: { m: "A tiny living thing you can only see under a microscope.", e: "Curd contains healthy microorganisms called lactobacillus." },
  nutrients: { m: "Substances in food that give energy, growth, and repair to the body.", e: "Dal and milk are rich in essential nutrients." },
  carbohydrates: { m: "Food components like rice and wheat that supply quick daily energy.", e: "Roti and rice provide carbohydrates for our body." },
  proteins: { m: "Body-building nutrients needed for growth and muscle strength.", e: "Eggs, paneer, and lentils are loaded with proteins." },
  vitamins: { m: "Protective nutrients that keep our eyes, skin, and bones healthy.", e: "Citrus fruits like lemons contain Vitamin C." },
  minerals: { m: "Natural inorganic substances like iron and calcium needed by the body.", e: "Spinach has iron, a mineral that helps form blood." },
  deficiency: { m: "A lack or shortage of an essential nutrient in the diet.", e: "Lack of iron causes a deficiency called anemia." },
  excretion: { m: "The removal of waste substances produced inside the body.", e: "Kidneys help in the excretion of liquid waste." },
  locomotion: { m: "Moving from one place to another.", e: "Birds use wings for flight and locomotion." },
  skeleton: { m: "The internal bony framework that supports and protects our body.", e: "Our ribcage is part of the skeleton that protects the lungs." },
  atmosphere: { m: "The layer of air surrounding the Earth.", e: "Kites fly in the lower atmosphere." },
  hemoglobin: { m: "The red substance in blood that carries oxygen.", e: "Eating green leafy vegetables boosts hemoglobin." }
};

let tesseractWorker = null;

export async function getTesseractWorker(onProgress) {
  if (!tesseractWorker) {
    tesseractWorker = await createWorker("eng");
  }
  return tesseractWorker;
}

/**
 * Perform Client-Side Optical Character Recognition (OCR) on an image file.
 */
export async function performClientOCR(imageFile, onProgress = () => {}) {
  try {
    const worker = await getTesseractWorker();
    
    // Process image
    const ret = await worker.recognize(imageFile);
    const rawText = ret.data.text || "";
    
    return parseTextIntoStructuredDoc(rawText);
  } catch (err) {
    console.error("Tesseract OCR Error:", err);
    throw err;
  }
}

/**
 * Clean up raw OCR lines into coherent paragraphs and auto-detect difficult words.
 */
export function parseTextIntoStructuredDoc(rawText) {
  if (!rawText || !rawText.trim()) {
    throw new Error("No readable text found in the image. Please retake the photo with better lighting.");
  }

  // Split lines and join hyphenated/broken lines
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !/^[\d\W]+$/.test(l)); // filter out isolated page numbers/noise

  if (lines.length === 0) {
    throw new Error("Could not detect clear text. Please hold the phone flat and avoid shadows.");
  }

  // Detect title: usually first line if <= 60 characters
  let title = "Your Textbook Page";
  let startIndex = 0;
  if (lines[0].length <= 60 && !/[.!?]$/.test(lines[0])) {
    title = lines[0].replace(/^[#\s*]+/, "");
    startIndex = 1;
  }

  // Group lines into paragraphs (paragraphs separated by empty space or natural sentence breaks)
  const paras = [];
  let currentPara = [];

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    currentPara.push(line);

    // End paragraph if line ends with a period/question/exclamation and is at least somewhat long
    if (/[.!?]$/.test(line) && (currentPara.join(" ").length > 140 || i === lines.length - 1)) {
      paras.push(currentPara.join(" "));
      currentPara = [];
    }
  }

  if (currentPara.length > 0) {
    paras.push(currentPara.join(" "));
  }

  // Fallback if no paragraph breaks triggered
  const cleanParas = paras.length > 0 ? paras : [lines.slice(startIndex).join(" ")];

  // Auto-detect hard words from text
  const glossary = extractVocabulary(cleanParas);

  return {
    title,
    paras: cleanParas,
    glossary
  };
}

/**
 * Extract complex and multi-syllabic vocabulary words from extracted paragraphs.
 */
export function extractVocabulary(paras) {
  const wordsSet = new Set();
  const text = paras.join(" ");
  const cleanWord = (w) => w.toLowerCase().replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "");
  
  const tokens = text.match(/\b\p{L}+\b/gu) || [];
  const glossary = {};

  tokens.forEach((t) => {
    const w = cleanWord(t);
    if (!w || w.length < 5) return;

    // Check pre-configured educational dictionary
    if (EXTENDED_GLOSSARY[w]) {
      glossary[w] = EXTENDED_GLOSSARY[w];
    } else if (w.length >= 8 && !wordsSet.has(w)) {
      // Automatic educational heuristic for unfamiliar long words
      wordsSet.add(w);
      if (Object.keys(glossary).length < 14) {
        glossary[w] = {
          m: `A key vocabulary word. Refers to a specific concept or action in this lesson.`,
          e: `Students should remember "${w}" when revising this topic.`
        };
      }
    }
  });

  return glossary;
}

/**
 * Client-Side Dyslexia-Friendly Simplification (Rule-based clause shortening).
 */
export function simplifyTextLocally(paras) {
  return paras.map((p) => {
    // Break long compound sentences at coordinating conjunctions
    let simplified = p
      .replace(/,\s*(which|that|who|whom|whose)\s+/gi, ". It ")
      .replace(/,\s*(and|but|while|whereas)\s+/gi, ". ")
      .replace(/\s+in order to\s+/gi, " to ")
      .replace(/\s+due to the fact that\s+/gi, " because ")
      .replace(/\s+a large number of\s+/gi, " many ")
      .replace(/\s+utilize\s+/gi, " use ")
      .replace(/\s+commence\s+/gi, " start ")
      .replace(/\s+is essential for\s+/gi, " is needed for ")
      .replace(/\s+takes place\s+/gi, " happens ");

    // Split sentences longer than 15 words
    const sentences = simplified.split(/(?<=[.!?])\s+/);
    const shortSentences = sentences.map((s) => {
      const words = s.split(/\s+/);
      if (words.length > 18) {
        const mid = Math.floor(words.length / 2);
        return words.slice(0, mid).join(" ") + ". " + words.slice(mid).join(" ");
      }
      return s;
    });

    return shortSentences.join(" ");
  });
}

/**
 * Free open-source translation proxy fallback for regional Indian languages.
 */
export async function translateTextFree(text, targetLangCode) {
  try {
    const langPair = `en|${targetLangCode.split("-")[0]}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 480))}&langpair=${langPair}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Translation network error");
    const data = await res.json();
    return data.responseData?.translatedText || text;
  } catch (e) {
    console.warn("Free translation fallback error:", e);
    return text;
  }
}

/**
 * Optional Gemini AI Direct Vision & NLP Integration.
 * Allows instant, flawless multimodal OCR, simplification, and 10-language translation if the user supplies a key.
 */
export async function processWithGemini(apiKey, file, langName = "Hindi") {
  const base64Data = await fileToBase64(file);
  const mimeType = file.type || "image/jpeg";

  const prompt = `This is a photo of an Indian school textbook page. 
1. Extract the main title and all paragraphs accurately in English (or original language).
2. Rewrite each paragraph into "Simpler English" for a dyslexic student aged 10-14 (short sentences, max 12 words, keeping all facts).
3. Translate each paragraph into ${langName} in everyday spoken regional language.
4. Extract up to 10 difficult vocabulary words, each with a simple meaning (<15 words) and an everyday example from Indian daily life.

Return ONLY a valid JSON object matching this schema:
{
  "title": "Chapter or Heading Title",
  "paras": ["paragraph 1", "paragraph 2"],
  "simple": ["simple paragraph 1", "simple paragraph 2"],
  "trans": ["${langName} paragraph 1", "${langName} paragraph 2"],
  "hard": [
    { "word": "example_word", "meaning": "short definition", "example": "Indian daily life sentence" }
  ]
}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            { inline_data: { mime_type: mimeType, data: base64Data } }
          ]
        }
      ],
      generationConfig: {
        response_mime_type: "application/json"
      }
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Gemini API error: ${response.status}`);
  }

  const result = await response.json();
  const textOutput = result.candidates?.[0]?.content?.parts?.[0]?.text;
  const parsed = JSON.parse(textOutput);

  const glossary = {};
  (parsed.hard || []).forEach((h) => {
    if (h.word) {
      glossary[h.word.toLowerCase()] = { m: h.meaning, e: h.example };
    }
  });

  return {
    title: parsed.title || "Uploaded Textbook Page",
    paras: parsed.paras || [],
    simple: parsed.simple || [],
    trans: { [langName]: parsed.trans || [] },
    glossary
  };
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
