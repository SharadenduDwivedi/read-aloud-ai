import { createWorker } from "tesseract.js";

// Comprehensive educational dictionary for school curriculum (Classes 4-10)
export const EXTENDED_GLOSSARY = {
  // Plant & Animal Biology
  photosynthesis: { m: "How green plants make food using sunlight, air, and water.", e: "Leaves use photosynthesis during daytime to grow." },
  chlorophyll: { m: "The green colour in leaves that catches sunlight.", e: "Leaves look green because they are full of chlorophyll." },
  chloroplast: { m: "Tiny kitchen-like parts inside leaf cells that hold chlorophyll.", e: "Sunlight is trapped inside the chloroplast." },
  stomata: { m: "Tiny mouth-like pores under leaves for breathing in air.", e: "Stomata open to let carbon dioxide enter the leaf." },
  xylem: { m: "Tiny tubes inside plants that carry water up from roots.", e: "Water travels up tree trunks through xylem tubes." },
  phloem: { m: "Tiny tubes in plants that transport food from leaves to roots.", e: "Phloem distributes glucose to all parts of the plant." },
  respiration: { m: "Taking in oxygen to release energy from food.", e: "We and all living things need respiration every second to stay alive." },
  transpiration: { m: "When leaves let out extra water vapor into the air.", e: "Plants cool themselves down on hot afternoons through transpiration." },
  circulation: { m: "The round trip of blood moving through your body.", e: "Your heartbeat pumps blood for circulation." },
  digestion: { m: "Breaking down food into tiny pieces your body can absorb.", e: "Chewing your food properly makes digestion easy." },
  germination: { m: "When a seed wakes up, sprouts, and grows into a baby plant.", e: "Moist black soil helps gram seed germination." },
  pollination: { m: "Pollen moving from flower to flower so plants can produce seeds.", e: "Honeybees and butterflies help in pollination." },
  fertilization: { m: "When male and female parts join to make a seed or baby.", e: "After fertilization, a mango flower turns into a fruit." },
  reproduction: { m: "How living organisms produce babies or new plants of their kind.", e: "Birds laying eggs is an example of reproduction." },
  adaptation: { m: "Special body features that help an animal survive in its home.", e: "A camel's hump is an adaptation for living in the dry desert." },
  ecosystem: { m: "All plants, animals, and surroundings living and helping each other.", e: "A village pond is a mini ecosystem with fish, frogs, and lilies." },
  habitat: { m: "The natural home or environment where an animal or plant lives.", e: "The forest is the natural habitat of wild elephants." },
  herbivore: { m: "An animal that eats only grass, leaves, and plants.", e: "Cows, deer, and goats are herbivores." },
  carnivore: { m: "An animal that eats meat and hunts other animals.", e: "Tigers, lions, and eagles are carnivores." },
  omnivore: { m: "A creature that eats both plants and meat.", e: "Crows, bears, and human beings are omnivores." },
  predator: { m: "An animal that hunts and eats other animals for food.", e: "The leopard is a stealthy predator." },
  prey: { m: "An animal that is hunted and caught by a predator.", e: "Rabbits and deer are prey for wild cats." },
  microorganism: { m: "A creature so tiny you can only see it through a microscope.", e: "Curd is formed by friendly microorganisms called lactobacillus." },
  bacteria: { m: "Tiny single-celled living organisms found everywhere around us.", e: "Good bacteria in our stomach help us digest milk." },
  nutrients: { m: "Nourishing parts of food needed for strength, growth, and health.", e: "Dal, rice, and fresh vegetables are full of healthy nutrients." },
  carbohydrates: { m: "Energy-giving food substances found in rice, wheat, and potatoes.", e: "Eating rotis gives us carbohydrates to run and play." },
  proteins: { m: "Body-building nutrients that help repair cuts and build muscles.", e: "Eggs, paneer, and lentils are rich in proteins." },
  vitamins: { m: "Protective substances in fruits and veggies that stop illness.", e: "Oranges give us Vitamin C to fight colds." },
  minerals: { m: "Natural body-building minerals like iron and calcium.", e: "Spinach has iron, a mineral that makes healthy red blood." },
  glucose: { m: "A simple type of sugar that gives our cells fast energy.", e: "Drinking glucose water helps tired runners recover quickly." },
  starch: { m: "Stored plant food found in potatoes, rice, and bread.", e: "Rice is rich in starch." },
  deficiency: { m: "A sickness caused by a shortage of an important food nutrient.", e: "Not eating enough vitamins causes a deficiency." },
  excretion: { m: "Throwing out toxic waste products from the body.", e: "Sweating and using the restroom are forms of excretion." },
  skeleton: { m: "The hard frame of bones supporting your whole body.", e: "Your skull is part of your skeleton that shields your brain." },
  locomotion: { m: "The ability of an animal to move itself from place to place.", e: "Birds use wings for locomotion." },
  hemoglobin: { m: "The red substance inside blood that carries oxygen.", e: "Eating green leafy vegetables raises your hemoglobin levels." },
  organisms: { m: "Any living thing—plants, trees, insects, animals, or people.", e: "Fish, neem trees, and dogs are all living organisms." },
  survive: { m: "To stay alive through difficulties.", e: "Cactus plants survive in the desert with very little water." },
  atmosphere: { m: "The ocean of air that wraps all around planet Earth.", e: "Clouds and birds fly in the lower atmosphere." },
  dioxide: { m: "Short for carbon dioxide, the gas plants breathe in from air.", e: "We breathe out carbon dioxide, and green trees take it in." },
  absorbed: { m: "Soaked up or taken inside, like water in a sponge.", e: "Water from the soil is absorbed by plant roots." },
  transported: { m: "Moved or carried from one spot to another.", e: "Sap is transported from the leaves to the stem." },
  essential: { m: "Extremely important and necessary; cannot do without.", e: "Clean drinking water is essential for good health." },
  unique: { m: "Very special; unlike anything else.", e: "Every zebra has a unique pattern of stripes." },

  // Physics, Energy & Matter
  friction: { m: "The rubbing force that slows down moving objects.", e: "Bicycle brakes use friction to stop the wheels safely." },
  gravity: { m: "The invisible pulling force of the Earth that keeps us on the ground.", e: "An apple falls down because of gravity." },
  velocity: { m: "The speed of something moving in a particular direction.", e: "The train's velocity increased as it left the station." },
  acceleration: { m: "How quickly something speeds up.", e: "Pressing the car pedal causes rapid acceleration." },
  energy: { m: "The power or ability to do work and make things happen.", e: "Solar panels turn sunlight into electrical energy." },
  conductor: { m: "A material that lets electricity or heat pass through easily.", e: "Copper wire is a great conductor of electric current." },
  insulator: { m: "A material that blocks heat or electricity from flowing.", e: "Rubber slippers act as an electrical insulator." },
  evaporation: { m: "When liquid water heats up and turns into steam or vapor.", e: "Clothes dry on the terrace due to evaporation." },
  condensation: { m: "When warm steam touches a cold surface and turns to water drops.", e: "Cold stainless steel glasses show water drops from condensation." },
  precipitation: { m: "Water falling down from the sky as raindrops or hail.", e: "Monsoons bring joyful precipitation across India." },
  temperature: { m: "How hot or cold something is, measured in degrees.", e: "A thermometer checks your body temperature when you have fever." },
  pressure: { m: "The pushing force spread over a surface.", e: "Air pressure keeps bicycle tires firm and inflated." },
  reflection: { m: "When light rays bounce off a shiny surface like a mirror.", e: "You see your face in still water because of reflection." },
  refraction: { m: "The bending of light as it moves from air into water or glass.", e: "A pencil placed in a glass of water looks bent due to refraction." },
  transparent: { m: "Clear material that lets light pass through so you see clearly.", e: "Clean window glass is transparent." },
  translucent: { m: "Allows some light through, but you cannot see clearly through it.", e: "Butter paper is translucent." },
  opaque: { m: "Solid material that blocks all light and creates a dark shadow.", e: "A thick wooden door is completely opaque." },
  magnet: { m: "A metal piece that pulls iron and steel objects towards itself.", e: "Fridge stickers use a small magnet to stick to the door." },

  // Chemistry & Everyday Science
  solution: { m: "A smooth liquid mixture where one substance dissolves completely.", e: "Nimbu pani (lemonade) is a sweet and sour solution." },
  solute: { m: "The solid powder or sugar that gets dissolved into a liquid.", e: "In sugar water, sugar is the solute." },
  solvent: { m: "The liquid that dissolves other things into itself.", e: "Water is called the universal solvent." },
  filtration: { m: "Passing liquid through a filter to separate out dirt or leaves.", e: "Straining tea leaves with a chai chhalni is filtration." },
  mixture: { m: "Two or more things combined together without joining chemically.", e: "Bhelpuri is a delicious dry mixture of puffed rice and sev." },
  combustion: { m: "The chemical process of burning something in air with heat and flame.", e: "Lighting a gas stove causes the combustion of LPG." },
  oxidation: { m: "When a substance combines with oxygen, like iron turning rusty.", e: "An iron nail left outside in the rain gets rusty through oxidation." },

  // Geography & Environment
  monsoon: { m: "Seasonal rain-bearing winds that bring India its rainy season.", e: "Farmers welcome the monsoon to plant paddy crops." },
  erosion: { m: "Soil and rocks being washed or blown away by rain and strong wind.", e: "Tree roots prevent soil erosion on riverbanks." },
  pollution: { m: "Harmful dirty substances spoiling our air, water, or ground.", e: "Smoke from traffic creates air pollution in cities." },
  conservation: { m: "Carefully protecting and saving our natural resources.", e: "Rainwater harvesting is a smart method of water conservation." },
  renewable: { m: "Energy sources that never run out, like sunlight and wind.", e: "Solar cookers use clean, renewable energy." }
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
    const ret = await worker.recognize(imageFile);
    const rawText = ret.data.text || "";
    return parseTextIntoStructuredDoc(rawText);
  } catch (err) {
    console.error("Tesseract OCR Error:", err);
    throw err;
  }
}

/**
 * Clean up raw OCR lines into coherent paragraphs,
 * generate a simpler decodable version preserving all keywords,
 * and build the contextual glossary.
 */
export function parseTextIntoStructuredDoc(rawText) {
  if (!rawText || !rawText.trim()) {
    throw new Error("No readable text found in the image. Please retake the photo with better lighting.");
  }

  // Split lines and join broken/hyphenated lines
  const rawLines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !/^[\d\W]+$/.test(l));

  if (rawLines.length === 0) {
    throw new Error("Could not detect clear text. Please hold the phone flat and avoid shadows.");
  }

  // Detect title: first short line without trailing period
  let title = "Your Textbook Page";
  let startIndex = 0;
  if (rawLines[0].length <= 55 && !/[.!?]$/.test(rawLines[0])) {
    title = rawLines[0].replace(/^[#\s*]+/, "");
    startIndex = 1;
  }

  // Group lines into coherent paragraphs
  const paras = [];
  let currentPara = [];

  for (let i = startIndex; i < rawLines.length; i++) {
    const line = rawLines[i];
    currentPara.push(line);

    // End paragraph at period/question/exclamation
    if (/[.!?]$/.test(line) && (currentPara.join(" ").length > 130 || i === rawLines.length - 1)) {
      paras.push(currentPara.join(" "));
      currentPara = [];
    }
  }

  if (currentPara.length > 0) {
    paras.push(currentPara.join(" "));
  }

  const cleanParas = paras.length > 0 ? paras : [rawLines.slice(startIndex).join(" ")];

  // Generate Simpler English version: shorter sentences, preserves all keywords & facts
  const simpleParas = simplifyTextLocally(cleanParas);

  // Auto-detect keywords and generate student-friendly glossary
  const glossary = extractVocabulary([...cleanParas, ...simpleParas]);

  return {
    title,
    paras: cleanParas,
    simple: simpleParas,
    glossary
  };
}

/**
 * Client-Side Dyslexia-Friendly Simplification.
 * Makes text shorter, active, and easier to decode while rigorously
 * preserving subject keywords, scientific terms, and factual essence.
 */
export function simplifyTextLocally(paras) {
  return paras.map((p) => {
    let text = p
      // Clear convoluted transitions
      .replace(/it can be observed that\s+/gi, "")
      .replace(/it is known that\s+/gi, "")
      .replace(/in the process of\s+/gi, "during ")
      .replace(/with the help of\s+/gi, "using ")
      .replace(/in order to\s+/gi, "to ")
      .replace(/due to the fact that\s+/gi, "because ")
      .replace(/a large amount of\s+/gi, "a lot of ")
      .replace(/a large number of\s+/gi, "many ")
      .replace(/is considered to be\s+/gi, "is ")
      .replace(/plays a vital role in\s+/gi, "is very important for ")
      .replace(/is capable of\s+([a-z]+)ing/gi, "can $1")
      .replace(/subsequently\s+/gi, "then ")
      .replace(/consequently\s+/gi, "so ")
      .replace(/furthermore\s*,?\s*/gi, "also, ")
      .replace(/nevertheless\s*,?\s*/gi, "still, ")
      .replace(/utilize[sd]?\s+/gi, "use ")
      .replace(/commence[sd]?\s+/gi, "start ")
      .replace(/is responsible for\s+/gi, "causes ")
      .replace(/takes place mainly in\s+/gi, "happens mostly in ")
      .replace(/takes place in\s+/gi, "happens in ");

    // Break complex relative clauses at commas
    text = text
      .replace(/,\s*which\s+contains?\s+/gi, ". It has ")
      .replace(/,\s*which\s+absorbs?\s+/gi, ". It absorbs ")
      .replace(/,\s*which\s+produces?\s+/gi, ". It produces ")
      .replace(/,\s*which\s+releases?\s+/gi, ". It gives out ")
      .replace(/,\s*which\s+is\s+/gi, ". This is ")
      .replace(/,\s*which\s+are\s+/gi, ". These are ")
      .replace(/,\s*which\s+/gi, ". It ");

    // Split at coordinating conjunctions if the sentence is long
    const sentences = text.split(/(?<=[.!?])\s+/);
    const shortList = [];

    sentences.forEach((s) => {
      const cleanS = s.trim();
      if (!cleanS) return;

      const words = cleanS.split(/\s+/);
      if (words.length > 16) {
        // Try breaking at and / while / but / because
        const broken = cleanS.replace(/,\s*(and|while|whereas|but)\s+/i, ". ");
        if (broken !== cleanS) {
          broken.split(/(?<=[.!?])\s+/).forEach((part) => {
            if (part.trim()) shortList.push(capitalizeFirst(part.trim()));
          });
          return;
        }

        // Break roughly in half near middle punctuation or conjunction
        const mid = Math.floor(words.length / 2);
        const p1 = words.slice(0, mid).join(" ").replace(/[,;]$/, "");
        const p2 = words.slice(mid).join(" ");
        shortList.push(capitalizeFirst(p1) + ".");
        shortList.push(capitalizeFirst(p2));
      } else {
        shortList.push(capitalizeFirst(cleanS));
      }
    });

    return shortList.join(" ");
  });
}

function capitalizeFirst(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Extract keywords and build child-friendly meanings with daily life examples.
 */
export function extractVocabulary(paras) {
  const text = paras.join(" ");
  const cleanWord = (w) => w.toLowerCase().replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "");
  const tokens = text.match(/\b\p{L}+\b/gu) || [];
  const glossary = {};
  const seen = new Set();

  tokens.forEach((t) => {
    const w = cleanWord(t);
    if (!w || w.length < 4 || seen.has(w)) return;
    seen.add(w);

    // 1. Check verified school glossary
    if (EXTENDED_GLOSSARY[w]) {
      glossary[w] = EXTENDED_GLOSSARY[w];
    } else if (isSubjectKeyword(w) && Object.keys(glossary).length < 24) {
      // 2. Generate student-friendly meaning & example based on root/context
      glossary[w] = generateDynamicMeaning(w, text);
    }
  });

  return glossary;
}

/**
 * Identifies whether a word is likely a key scientific or domain term.
 */
function isSubjectKeyword(word) {
  const w = word.toLowerCase();
  // Filter common stop words
  const common = new Set([
    "this", "that", "these", "those", "there", "their", "where", "which",
    "about", "after", "other", "every", "first", "great", "small", "large",
    "little", "right", "state", "place", "thing", "water", "plant", "house",
    "school", "people", "around", "always", "during", "called", "because"
  ]);
  if (common.has(w)) return false;

  // Scientific suffixes and prefixes
  const patterns = /(tion|sion|ment|ence|ance|ology|plast|phyll|synthesis|trophic|scope|meter|sphere|ation|ic|ous|ive|ism|ist)$/i;
  return w.length >= 7 || patterns.test(w);
}

/**
 * Dynamically constructs simple, easy meanings with real Indian everyday examples.
 */
export function generateDynamicMeaning(word, context) {
  const w = word.toLowerCase();

  // Morphological hints
  if (w.endsWith("tion") || w.endsWith("sion")) {
    return {
      m: `The action or process of doing something in science.`,
      e: `Students observe this ${w} step-by-step during classroom experiments.`
    };
  }
  if (w.endsWith("ment")) {
    return {
      m: `A condition, material, or result in nature.`,
      e: `Proper ${w} helps living things stay healthy and grow.`
    };
  }
  if (w.endsWith("ology")) {
    return {
      m: `The study or science of a subject.`,
      e: `Teachers teach ${w} so we understand how the world works.`
    };
  }
  if (w.endsWith("ic") || w.endsWith("ous") || w.endsWith("ive")) {
    return {
      m: `Having the quality or power of something special.`,
      e: `This is an important ${w} property in nature.`
    };
  }

  return {
    m: `An important lesson keyword explaining how something works.`,
    e: `Students should remember "${word}" when revising this topic.`
  };
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
 * Generates an easy-to-read version preserving essence and subject keywords,
 * plus keyword meanings with everyday examples.
 */
export async function processWithGemini(apiKey, file, langName = "Hindi") {
  const base64Data = await fileToBase64(file);
  const mimeType = file.type || "image/jpeg";

  const prompt = `This is a photo of a school textbook page for students (ages 10-14).
1. Extract the title and main paragraphs.
2. Create a "Simpler English" version:
   - Make sentences short (max 10-14 words) and easy to read.
   - Strictly KEEP all subject keywords, scientific terms, and factual essence.
   - Do not drop important facts.
3. Translate into ${langName} in simple, everyday conversational language.
4. Extract 8 to 15 key subject keywords. For EVERY keyword, provide:
   - "meaning": very easy explanation (max 15 simple words).
   - "example": one short, relatable sentence from everyday Indian daily life.

Return ONLY a valid JSON object matching this schema:
{
  "title": "Chapter Heading Title",
  "paras": ["original paragraph 1", "original paragraph 2"],
  "simple": ["simple paragraph 1", "simple paragraph 2"],
  "trans": ["${langName} paragraph 1", "${langName} paragraph 2"],
  "hard": [
    { "word": "keyword", "meaning": "simple meaning", "example": "relatable Indian daily life example" }
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
