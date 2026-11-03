import { createWorker } from "tesseract.js";

// Comprehensive verified educational dictionary for school curriculum
export const EXTENDED_GLOSSARY = {
  photosynthesis: { m: "How green plants make food using sunlight, air, and water.", e: "Leaves use photosynthesis during daytime to grow." },
  chlorophyll: { m: "The green colour in leaves that catches sunlight.", e: "Leaves look green because they are full of chlorophyll." },
  chloroplast: { m: "Tiny kitchen-like parts inside leaf cells that hold chlorophyll.", e: "Sunlight is trapped inside the chloroplast." },
  stomata: { m: "Tiny mouth-like pores under leaves for breathing in air.", e: "Stomata open to let carbon dioxide enter the leaf." },
  xylem: { m: "Tiny tubes inside plants that carry water up from roots.", e: "Water travels up tree trunks through xylem tubes." },
  phloem: { m: "Tiny tubes in plants that transport food from leaves to roots.", e: "Phloem distributes glucose to all parts of the plant." },
  respiration: { m: "Taking in oxygen to release energy from food.", e: "All living things need respiration every second to stay alive." },
  transpiration: { m: "When leaves let out extra water vapor into the air to cool down.", e: "Plants cool themselves down on hot afternoons through transpiration." },
  circulation: { m: "The round trip of blood moving through your body.", e: "Your heartbeat pumps blood for circulation." },
  digestion: { m: "Breaking down food into tiny nutrients your body can absorb.", e: "Chewing your food properly makes digestion easy." },
  germination: { m: "When a seed sprouts and starts growing into a baby plant.", e: "Moist black soil helps seed germination." },
  pollination: { m: "Pollen moving from flower to flower so plants make seeds.", e: "Honeybees and butterflies help in pollination." },
  fertilization: { m: "When male and female cells join to make a seed or baby.", e: "After fertilization, a flower turns into a fruit." },
  reproduction: { m: "How living organisms produce young ones of their kind.", e: "Birds laying eggs is an example of reproduction." },
  adaptation: { m: "Special body features that help an animal live in its environment.", e: "A camel's hump is an adaptation for living in the dry desert." },
  ecosystem: { m: "All plants, animals, and surroundings living and helping each other.", e: "A village pond is an ecosystem with fish, frogs, and lilies." },
  habitat: { m: "The natural home or area where an animal or plant lives.", e: "The forest is the natural habitat of wild elephants." },
  herbivore: { m: "An animal that eats only grass, leaves, and plants.", e: "Cows, deer, and goats are herbivores." },
  carnivore: { m: "An animal that hunts and eats meat.", e: "Tigers, lions, and eagles are carnivores." },
  omnivore: { m: "A creature that eats both plants and meat.", e: "Crows, bears, and humans are omnivores." },
  predator: { m: "An animal that hunts other animals for food.", e: "The leopard is a stealthy predator." },
  prey: { m: "An animal that is hunted and eaten by a predator.", e: "Rabbits and deer are prey for wild cats." },
  microorganism: { m: "A tiny living thing you can only see through a microscope.", e: "Curd is formed by friendly microorganisms called lactobacillus." },
  bacteria: { m: "Tiny single-celled organisms found everywhere in nature.", e: "Good bacteria in our stomach help us digest food." },
  nutrients: { m: "Nourishing parts of food needed for strength, growth, and health.", e: "Dal, milk, and vegetables are full of healthy nutrients." },
  carbohydrates: { m: "Energy-giving food substances found in rice, wheat, and potatoes.", e: "Eating rotis gives us carbohydrates to run and study." },
  proteins: { m: "Body-building nutrients that help repair cuts and build muscles.", e: "Eggs, paneer, and lentils are rich in proteins." },
  vitamins: { m: "Protective substances in fruits and vegetables that stop illness.", e: "Oranges give us Vitamin C to fight colds." },
  minerals: { m: "Natural inorganic substances like iron and calcium needed by the body.", e: "Spinach has iron, a mineral that makes healthy red blood." },
  glucose: { m: "A simple type of sugar that gives our cells fast energy.", e: "Drinking glucose water helps tired runners recover quickly." },
  starch: { m: "Stored plant food found in potatoes, rice, and bread.", e: "Boiled rice is full of starch." },
  deficiency: { m: "A shortage or lack of an important food nutrient.", e: "Not eating enough vitamins causes a nutrient deficiency." },
  excretion: { m: "Throwing out toxic waste products from the body.", e: "Sweating and urination are natural forms of excretion." },
  skeleton: { m: "The framework of bones supporting your whole body.", e: "Your skull is part of your skeleton that shields your brain." },
  locomotion: { m: "The ability of an animal to move itself from place to place.", e: "Birds use wings for locomotion." },
  hemoglobin: { m: "The red substance inside blood that carries oxygen.", e: "Eating green leafy vegetables raises your hemoglobin levels." },
  organisms: { m: "Any living thing—plants, trees, insects, animals, or people.", e: "Fish, neem trees, and dogs are all living organisms." },
  organism: { m: "Any individual living thing, such as an animal, plant, or bacterium.", e: "An amoeba is a single-celled organism." },
  survive: { m: "To stay alive through difficulties or harsh conditions.", e: "Cactus plants survive in the desert with very little water." },
  atmosphere: { m: "The ocean of gases and air surrounding planet Earth.", e: "Clouds and birds fly in the lower atmosphere." },
  dioxide: { m: "Short for carbon dioxide, the gas plants breathe in from the air.", e: "We breathe out carbon dioxide, and green trees take it in." },
  absorb: { m: "To soak up or take inside, like a sponge takes in water.", e: "Water from the soil is absorbed by plant roots." },
  absorbed: { m: "Soaked up or taken inside, like water in a sponge.", e: "Water from the soil is absorbed by plant roots." },
  absorbs: { m: "Soaks up or takes inside, like water in a sponge.", e: "The leaf absorbs sunlight to make food." },
  transported: { m: "Carried or moved from one place to another.", e: "Sap is transported from the leaves to the rest of the plant." },
  essential: { m: "Extremely important and necessary; cannot do without.", e: "Clean drinking water is essential for good health." },
  unique: { m: "Very special; unlike anything else.", e: "Every zebra has a unique pattern of stripes." },
  friction: { m: "The rubbing force between two surfaces that slows down motion.", e: "Bicycle brakes use friction to stop the wheels safely." },
  gravity: { m: "The invisible pulling force of the Earth that keeps us grounded.", e: "An apple falls down to the ground because of gravity." },
  velocity: { m: "The speed of something moving in a specific direction.", e: "The train's velocity increased as it left the station." },
  acceleration: { m: "How quickly something speeds up.", e: "Pressing the accelerator pedal causes rapid acceleration." },
  energy: { m: "The power or capacity to do work and produce change.", e: "Solar panels turn sunlight into electrical energy." },
  conductor: { m: "A material that lets electricity or heat pass through easily.", e: "Copper wire is a great conductor of electric current." },
  insulator: { m: "A material that blocks heat or electricity from flowing.", e: "Rubber slippers act as an electrical insulator." },
  evaporation: { m: "When liquid water heats up and turns into steam or vapor.", e: "Clothes dry on the terrace due to evaporation." },
  condensation: { m: "When warm steam touches a cool surface and turns into water droplets.", e: "Cold stainless steel glasses show water drops from condensation." },
  precipitation: { m: "Water falling down from the sky as raindrops, snow, or hail.", e: "Monsoons bring joyful precipitation across India." },
  temperature: { m: "How hot or cold something is, measured in degrees Celsius.", e: "A thermometer checks your body temperature when you have fever." },
  pressure: { m: "The pushing force applied over a specific surface area.", e: "Air pressure keeps bicycle tires firm and inflated." },
  reflection: { m: "When light rays bounce off a shiny surface like a mirror.", e: "You see your face in still water because of reflection." },
  refraction: { m: "The bending of light as it moves between air and water or glass.", e: "A pencil in a glass of water looks bent due to refraction." },
  transparent: { m: "Clear material that lets light pass through so you see clearly.", e: "Clean window glass is transparent." },
  translucent: { m: "Allows some light through, but you cannot see clearly through it.", e: "Butter paper is translucent." },
  opaque: { m: "Solid material that blocks all light and creates a dark shadow.", e: "A thick wooden door is completely opaque." },
  magnet: { m: "An object that produces a magnetic field and pulls iron towards it.", e: "Fridge stickers use a small magnet to stick to the door." },
  increasingly: { m: "More and more over time; in an increasing manner.", e: "People are becoming increasingly aware of environmental protection." }
};

let tesseractWorker = null;

export async function getTesseractWorker() {
  if (!tesseractWorker) {
    tesseractWorker = await createWorker("eng");
  }
  return tesseractWorker;
}

/**
 * Clean text from HTML tags, Wiki markup, brackets, and extra whitespace.
 */
function sanitizeDefinition(text) {
  if (!text) return "";
  let clean = text
    .replace(/<[^>]+>/g, " ")
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, "$1")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  
  clean = clean
    .replace(/^(plural of|alternative form of|comparative form of|superlative form of|past of|third-person singular of)\s+[a-z]+[.,;]?\s*/gi, "")
    .trim();

  const words = clean.split(/\s+/).slice(0, 20);
  let res = words.join(" ");
  if (res && !/[.!?]$/.test(res)) res += ".";
  return res.charAt(0).toUpperCase() + res.slice(1);
}

/**
 * Cleans up and standardizes usage example strings for display under the "Usage" section.
 * Strips out any "Example:", "Usage:", "In this text:", or surrounding quotes.
 */
export function cleanExample(ex) {
  if (!ex) return "";
  let clean = ex
    .replace(/^example:\s*/i, "")
    .replace(/^usage:\s*/i, "")
    .replace(/^in this text:\s*/i, "")
    .replace(/^["“”']+|["“”']+$/g, "")
    .trim();
  if (clean && !/[.!?]$/.test(clean)) clean += ".";
  return clean ? `"${clean}"` : "";
}

/**
 * Fetch a genuine, contextual dictionary definition and real-life usage example:
 * 1. Checks verified curriculum glossary first.
 * 2. Queries Groq AI via serverless /api/task (task: "meaning") or client Groq API key.
 * 3. Falls back to Wiktionary REST API and Free Dictionary API.
 */
export async function fetchLiveWordDefinition(word, contextSentence = "", targetLang = "simple English", clientApiKey = "", provider = "groq") {
  const cleanWord = (word || "").toLowerCase().replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "");
  if (!cleanWord || cleanWord.length < 2) return null;

  // 1. Check verified curriculum glossary first if querying English
  if ((!targetLang || targetLang === "simple English" || targetLang === "English") && EXTENDED_GLOSSARY[cleanWord]) {
    const item = EXTENDED_GLOSSARY[cleanWord];
    return {
      m: item.m,
      e: cleanExample(item.e)
    };
  }

  // 2. Query Vercel Serverless /api/task (runs Groq Llama 3.3 on server)
  try {
    const taskRes = await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "meaning",
        args: { word: cleanWord, sentence: contextSentence, lang: targetLang }
      })
    });
    if (taskRes.ok) {
      const data = await taskRes.json();
      if (data && data.result && data.result.meaning) {
        return {
          m: data.result.meaning,
          e: cleanExample(data.result.example)
        };
      }
    }
  } catch {
    // Continue
  }

  // 3. Client-side Groq lookup fallback if user entered API key
  const apiKey = clientApiKey || (typeof window !== "undefined" ? localStorage.getItem("readaloud_ai_key") || "" : "");
  if (apiKey && (provider === "groq" || !provider)) {
    try {
      const prompt = `A school student (age 10-14) tapped the word "${cleanWord}" in this sentence:\n"${contextSentence}"\n\nReply with JSON only: {"meaning": "...", "example": "..."}. The meaning must fit this sentence, use very simple words (max 15 words), and be written in ${targetLang}. The example is one short everyday sentence from Indian daily life in ${targetLang}.`;
      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "You help a school reading app for Indian students. Always reply with one JSON object and nothing else." },
            { role: "user", content: prompt }
          ],
          response_format: { type: "json_object" },
          temperature: 0.2
        })
      });
      if (groqRes.ok) {
        const data = await groqRes.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        if (parsed.meaning) {
          return {
            m: parsed.meaning,
            e: cleanExample(parsed.example)
          };
        }
      }
    } catch {
      // Continue to public dictionary APIs
    }
  }

  // 4. Query Wiktionary REST API for definition + authentic dictionary example
  const candidates = [cleanWord];
  if (cleanWord.endsWith("ies")) candidates.push(cleanWord.slice(0, -3) + "y");
  if (cleanWord.endsWith("es")) candidates.push(cleanWord.slice(0, -2));
  if (cleanWord.endsWith("s") && !cleanWord.endsWith("ss")) candidates.push(cleanWord.slice(0, -1));
  if (cleanWord.endsWith("ing")) {
    candidates.push(cleanWord.slice(0, -3));
    candidates.push(cleanWord.slice(0, -3) + "e");
  }
  if (cleanWord.endsWith("ed")) {
    candidates.push(cleanWord.slice(0, -2));
    candidates.push(cleanWord.slice(0, -1));
  }

  for (const c of candidates) {
    try {
      const res = await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(c)}`);
      if (res.ok) {
        const data = await res.json();
        let bestDef = "";
        let bestEx = "";
        for (const langItem of data.en || []) {
          for (const d of langItem.definitions || []) {
            const rawDef = sanitizeDefinition(d.definition || "");
            if (rawDef && rawDef.length > 5 && !rawDef.toLowerCase().includes("surname")) {
              if (!bestDef) bestDef = rawDef;
              if (d.examples && d.examples.length > 0 && !bestEx) {
                bestEx = sanitizeDefinition(d.examples[0]);
              }
            }
          }
        }
        if (bestDef) {
          return {
            m: bestDef,
            e: cleanExample(bestEx || `The word "${cleanWord}" is used in English when discussing this concept.`)
          };
        }
      }
    } catch {
      // Continue
    }
  }

  // 5. Query Free Dictionary API (dictionaryapi.dev)
  for (const c of candidates) {
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(c)}`);
      if (res.ok) {
        const data = await res.json();
        let bestDef = "";
        let bestEx = "";
        for (const entry of data) {
          for (const m of entry.meanings || []) {
            for (const d of m.definitions || []) {
              if (d.definition && !d.definition.startsWith("Alternative") && !d.definition.startsWith("Plural")) {
                const defText = sanitizeDefinition(d.definition);
                if (defText && defText.length > 5) {
                  if (!bestDef) bestDef = defText;
                  if (d.example && !bestEx) {
                    bestEx = sanitizeDefinition(d.example);
                  }
                }
              }
            }
          }
        }
        if (bestDef) {
          return {
            m: bestDef,
            e: cleanExample(bestEx || `Students often see the term "${cleanWord}" used in lessons.`)
          };
        }
      }
    } catch {
      // Continue
    }
  }

  // Fallback
  return {
    m: `An important vocabulary word used in this topic.`,
    e: cleanExample(`The word "${cleanWord}" is commonly used in English.`)
  };
}

/**
 * Perform Client-Side Optical Character Recognition (OCR) on an image file.
 */
export async function performClientOCR(imageFile) {
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
 * and mark key terms for real definition lookup.
 */
export function parseTextIntoStructuredDoc(rawText) {
  if (!rawText || !rawText.trim()) {
    throw new Error("No readable text found in the image. Please retake the photo with better lighting.");
  }

  const rawLines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !/^[\d\W]+$/.test(l));

  if (rawLines.length === 0) {
    throw new Error("Could not detect clear text. Please hold the phone flat and avoid shadows.");
  }

  let title = "Textbook Chapter Content";
  let startIndex = 0;
  if (rawLines[0].length <= 50 && !/[.!?]$/.test(rawLines[0])) {
    title = rawLines[0].replace(/^[#\s*]+/, "");
    startIndex = 1;
  }

  const paras = [];
  let currentParaWords = [];

  for (let i = startIndex; i < rawLines.length; i++) {
    const line = rawLines[i];
    currentParaWords.push(line);

    const accumulated = currentParaWords.join(" ");
    if (/[.!?]["'”’)]*$/.test(line) && (accumulated.length > 180 || i === rawLines.length - 1)) {
      paras.push(accumulated);
      currentParaWords = [];
    }
  }

  if (currentParaWords.length > 0) {
    paras.push(currentParaWords.join(" "));
  }

  const cleanParas = paras.length > 0 ? paras : [rawLines.slice(startIndex).join(" ")];
  const simpleParas = simplifyTextLocally(cleanParas);
  const glossary = extractVocabulary([...cleanParas, ...simpleParas]);

  return {
    title,
    paras: cleanParas,
    simple: simpleParas,
    glossary
  };
}

/* ---------- Proven On-Device Rule Engine (from ReadAloud_AI source SIMP) ---------- */
const SIMP_PHRASES = [
  [/\bit is (important|worth|interesting) to (note|remember|know) that\s*/gi, ""],
  [/\bit should be noted that\s*/gi, ""],
  [/\bliving organisms\b/gi, "living things"],
  [/\bliving organism\b/gi, "living thing"],
  [/\bone of the most (\p{L}+)((?:\s+\p{L}+)?)\s+(\p{L}+?)s\b/giu, (m, a, b, n) => (/^[aeiou]/i.test(a) ? "an " : "a ") + a + b + " " + n],
  [/\bthe breaking down of\b/gi, "breaking"],
  [/\bby the action of\b/gi, "by"],
  [/\bthe action of\b/gi, ""],
  [/\bdepends? upon\b/gi, m => m.replace(/upon/i, "on")],
  [/,?\s*in turn,?/gi, ""],
  [/\b(play|plays|played) (an? )?(important|key|major|vital) role in\b/gi, (m, v) => ({play:"help", plays:"helps", played:"helped"})[v.toLowerCase()] + " in"],
  [/\b(contribute|contributes) to\b/gi, (m, v) => v.toLowerCase() === "contribute" ? "help in" : "helps in"],
  [/\beven\s+/gi, ""],
  [/\bin other words,?\s*/gi, ""],
  [/\bas a matter of fact,?\s*/gi, ""],
  [/\bin order to\b/gi, "to"],
  [/\bso as to\b/gi, "to"],
  [/\bdue to the fact that\b/gi, "because"],
  [/\bowing to\b/gi, "because of"],
  [/\bon account of\b/gi, "because of"],
  [/\bin spite of\b/gi, "despite"],
  [/\ba (large|great) number of\b/gi, "many"],
  [/\ba (small|few) number of\b/gi, "a few"],
  [/\bthe majority of\b/gi, "most"],
  [/\b(is|are) able to\b/gi, "can"],
  [/\b(was|were) able to\b/gi, "could"],
  [/\bat the present time\b/gi, "now"],
  [/\bat this point in time\b/gi, "now"],
  [/\bwith the help of\b/gi, "using"],
  [/\bby means of\b/gi, "using"],
  [/\bas well as\b/gi, "and"],
  [/\bin addition to\b/gi, "besides"],
  [/\bin addition,?\s*/gi, "Also, "],
  [/\bprior to\b/gi, "before"],
  [/\bsubsequent to\b/gi, "after"],
  [/\bsuch as\b/gi, "like"],
  [/\bin the event that\b/gi, "if"],
  [/\bwith regard to\b/gi, "about"],
  [/\bwith respect to\b/gi, "about"],
  [/\bin terms of\b/gi, "in"],
  [/\bnot only ([^,.;]+?) but also\b/gi, "$1 and"],
  [/\bthe process of\b/gi, ""],
  [/\bis responsible for\b/gi, "does"],
  [/\bare responsible for\b/gi, "do"],
  [/\bthat is to say,?\s*/gi, ""],
  [/\bmainly\b|\bprimarily\b|\bchiefly\b/gi, "mostly"],
  [/\bvery\s+/gi, ""],
  [/\bactually\s+|\bbasically\s+|\bgenerally\s+|\busually\s+/gi, ""]
];

const SIMP_WORDS = {
  approximately:"about", numerous:"many", obtain:"get", obtains:"gets", obtained:"got", sufficient:"enough", insufficient:"not enough",
  commence:"start", commences:"starts", commenced:"started", initiate:"start", terminate:"end", however:"but", therefore:"so", thus:"so",
  hence:"so", consequently:"so", additionally:"also", furthermore:"also", moreover:"also", assist:"help", assists:"helps", assistance:"help",
  require:"need", requires:"needs", required:"needed", purchase:"buy", demonstrate:"show", demonstrates:"shows", indicate:"show",
  indicates:"shows", construct:"build", constructed:"built", transported:"carried", transport:"carry", transports:"carries",
  immediately:"right away", essential:"very important", crucial:"very important", vital:"very important", significant:"important",
  unique:"special", prepare:"make", prepares:"makes", prepared:"made", produce:"make", produces:"makes", produced:"made",
  manufacture:"make", absorb:"take in", absorbs:"takes in", absorbed:"taken in", combine:"mix", combines:"mixes", combined:"mixed",
  release:"give out", releases:"gives out", released:"given out", atmosphere:"air", organisms:"living things", organism:"living thing",
  survive:"stay alive", contain:"have", contains:"has", consist:"are made", consists:"is made", comprise:"include", comprises:"includes",
  utilise:"use", utilize:"use", utilised:"used", utilized:"used", individuals:"people", individual:"person", reside:"live", resides:"lives",
  inhabit:"live in", inhabitants:"people living there", adequate:"enough", acquire:"get", acquired:"got", attempt:"try", attempts:"tries",
  attempted:"tried", modify:"change", modified:"changed", alter:"change", altered:"changed", transform:"change", transformed:"changed",
  eliminate:"remove", eliminated:"removed", decrease:"fall", decreases:"falls", increase:"rise", increases:"rises", reduce:"cut",
  reduces:"cuts", enormous:"huge", minute:"tiny", minuscule:"tiny", rapid:"fast", rapidly:"quickly", gradually:"slowly",
  frequently:"often", occasionally:"sometimes", previously:"before", currently:"now", subsequently:"later", eventually:"in the end",
  nevertheless:"still", nonetheless:"still", whereas:"while", regarding:"about", concerning:"about", throughout:"across",
  beneficial:"helpful", detrimental:"harmful", hazardous:"dangerous", primary:"main", principal:"main", fundamental:"basic",
  accomplish:"do", achieve:"reach", achieved:"reached", examine:"check", examined:"checked", observe:"see", observed:"seen",
  determine:"find", determined:"found", identify:"find", identified:"found", locate:"find", located:"found", situated:"found",
  commonly:"often", typically:"often", various:"different", diverse:"different", abundant:"plenty of",
  occur:"happen", occurs:"happens", occurred:"happened", occurring:"happening", perceive:"see", converted:"changed", convert:"change",
  converts:"changes", emit:"give out", emits:"gives out", originate:"come", originates:"comes", sustain:"keep up", maintain:"keep",
  maintains:"keeps", provide:"give", provides:"gives", provided:"gave", ensure:"make sure", ensures:"makes sure", facilitate:"help",
  facilitates:"helps", enable:"let", enables:"lets", permit:"let", permits:"lets", conclude:"end", concluded:"ended", inform:"tell",
  informed:"told", respond:"answer", responded:"answered", sufficiently:"enough", entirely:"fully", principally:"mostly"
};

const STOP = new Set("a an the and or but if of to in on at by for with from as is are was were be been being it its this that these those they them their there here which who whom whose what when where why how all any each few more most other some such no not only own same so than too can will just do does did has have had into over under again further then once also very about up down out off".split(" "));

const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const words = s => (s.toLowerCase().match(/\p{L}+/gu) || []);
const splitSents = p => (p.match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) || []).map(x => x.trim()).filter(Boolean);

function swapWords(s) {
  return s.replace(/\p{L}+/gu, w => {
    const r = SIMP_WORDS[w.toLowerCase()];
    if (!r) return w;
    return w[0] === w[0].toUpperCase() ? cap(r) : r;
  });
}

function cleanPhrases(s) {
  s = s.replace(/\s*\([^)]{0,80}\)/g, "").replace(/\s*\[[^\]]{0,80}\]/g, "");
  s = s.replace(/,\s*(for example|for instance|e\.g\.)[^,.;]*[,]?/gi, "");
  for (const [re, to] of SIMP_PHRASES) s = s.replace(re, to);
  return s.replace(/\s{2,}/g, " ").replace(/\s+([,.;!?])/g, "$1").replace(/,\s*,/g, ",").trim();
}

function breakLong(s) {
  const n = s.split(/\s+/).length;
  if (n <= 14) return [s];
  const joints = [/;\s+/, /,\s+(?:which|who)\s+/i, /,\s+(?:but|yet)\s+/i, /,\s+(?:while|whereas)\s+/i, /,\s+and\s+/i, /\s+because\s+/i, /,\s+so\s+/i];
  for (const j of joints) {
    const m = s.match(j);
    if (!m) continue;
    const a = s.slice(0, m.index).trim();
    const b = s.slice(m.index + m[0].length).trim();
    if (a.split(/\s+/).length < 5 || b.split(/\s+/).length < 4) continue;
    if (/and/i.test(m[0]) && (a.includes(",") || b.split(/\s+/).length < 6)) continue;
    const lastWord = (a.match(/\p{L}+$/u) || [""])[0].toLowerCase();
    const plural = /[^s]s$|ren$|ves$/.test(lastWord);
    const lead = /which|who/i.test(m[0]) ? (plural ? "They " : "It ") : /but|yet|while|whereas/i.test(m[0]) ? "But " : /because/i.test(m[0]) ? "This is because " : /so/i.test(m[0]) ? "So " : "";
    const first = a.replace(/[,;:]$/, "") + ".";
    let second = lead ? lead + b : cap(b);
    if (!/[.!?]["')\]]*$/.test(second)) second += ".";
    return [...breakLong(first), ...breakLong(second)];
  }
  return [s];
}

const DROP_START = /^(for example|for instance|in other words|as we (have )?(seen|learnt|learned|discussed)|let us|we will|you (may|might) (have )?(noticed|seen|wondered)|think about|have you ever|do you know|activity|note:)/i;
const KEEP_HINT = /\b(called|are called|is known as|are known as|means|is defined|refers to|is the|are the|because|so that|therefore|in total|percent|%|\d)/i;

/**
 * Intelligent Dyslexia-Friendly Simplification (Rule-based Offline Engine):
 */
export function simplifyTextLocally(paras, ratio = 0.6) {
  const freq = {};
  paras.forEach(p => words(p).forEach(w => {
    if (!STOP.has(w) && w.length > 2) freq[w] = (freq[w] || 0) + 1;
  }));
  return paras.map(p => {
    let sents = splitSents(p).filter(s => !DROP_START.test(s));
    if (!sents.length) return "";
    if (sents.length >= 4) {
      const scored = sents.map((s, i) => {
        const ws = words(s).filter(w => !STOP.has(w));
        let sc = ws.reduce((a, w) => a + (freq[w] || 0), 0) / Math.max(4, ws.length);
        if (i === 0) sc *= 1.6;
        if (KEEP_HINT.test(s)) sc *= 1.4;
        return { s, i, sc };
      });
      const keep = Math.max(2, Math.ceil(sents.length * ratio));
      const chosen = new Set(scored.slice().sort((a, b) => b.sc - a.sc).slice(0, keep).map(x => x.i));
      sents = scored.filter(x => chosen.has(x.i)).map(x => x.s);
    }
    return sents.map(s => swapWords(cleanPhrases(s))).flatMap(breakLong)
      .map(s => cap(s.replace(/^[,;:\s]+/, ""))).filter(s => s.split(/\s+/).length >= 3).join(" ");
  }).filter(Boolean);
}

/**
 * Universal AI Simplification Engine:
 * 1. Checks Groq serverless /api/task (task: "simplify").
 * 2. Checks client Groq API key with official prompt.
 * 3. Falls back to on-device rule engine.
 */
export async function simplifyTextWithAI(paras, { provider = "groq", apiKey = "" } = {}) {
  // 0. Try /api/task first (uses Vercel server-side GROQ_API_KEY)
  try {
    const taskRes = await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: "simplify", args: { paras } })
    });
    if (taskRes.ok) {
      const data = await taskRes.json();
      if (data && data.result && Array.isArray(data.result.paras) && data.result.paras.length > 0) {
        return data.result.paras;
      }
    }
  } catch {
    // Continue
  }

  // 1. Try /api/simplify
  try {
    const serverRes = await fetch("/api/simplify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paras })
    });
    if (serverRes.ok) {
      const data = await serverRes.json();
      if (data && data.paras && Array.isArray(data.paras) && data.paras.length > 0) {
        return data.paras;
      }
    }
  } catch {
    // Continue
  }

  const prompt = `You are simplifying a school textbook page for a student aged 10-14 who has dyslexia. Make it genuinely simpler AND shorter, not just a few words swapped:
- Keep every key fact, number, definition and important term. Explain a hard term in a few plain words the first time it appears.
- Cut repetition, side remarks, long examples, rhetorical questions and filler.
- Use short sentences (12 words or fewer), everyday words and active voice.
- Aim for about half the original length.
- Keep the same number of paragraphs in the same order; a paragraph may become 1 to 3 sentences.
- Write in the same language as the page.

Reply with JSON only: {"paras": ["...", "..."]} with exactly ${paras.length} items.

Page:
${JSON.stringify(paras)}`;

  const effectiveKey = apiKey || (typeof window !== "undefined" ? localStorage.getItem("readaloud_ai_key") || "" : "");

  // 2. Groq (Llama 3.3 70B)
  if (provider === "groq" && effectiveKey) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${effectiveKey.trim()}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "You help a school reading app for Indian students. Always reply with one JSON object and nothing else." },
            { role: "user", content: prompt }
          ],
          response_format: { type: "json_object" },
          temperature: 0.3
        })
      });
      if (res.ok) {
        const data = await res.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        if (parsed.paras && Array.isArray(parsed.paras)) return parsed.paras;
      }
    } catch (err) {
      console.warn("Client Groq simplification error:", err);
    }
  }

  // 3. Fallback to on-device rule engine
  return simplifyTextLocally(paras);
}

/**
 * Universal AI Translation Engine:
 * 1. Calls Groq via /api/task (task: "translate").
 * 2. Or calls Groq directly from browser with official prompt.
 * 3. Fallback to regional translation proxy.
 */
export async function translateTextWithAI(paras, targetLangName = "Hindi", targetLangCode = "hi-IN", { provider = "groq", apiKey = "" } = {}) {
  if (!paras || paras.length === 0) return [];

  // 0. Try /api/task first (uses Vercel server-side GROQ_API_KEY)
  try {
    const taskRes = await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "translate",
        args: { paras, lang: targetLangName }
      })
    });
    if (taskRes.ok) {
      const data = await taskRes.json();
      if (data && data.result && Array.isArray(data.result.paras) && data.result.paras.length > 0) {
        return data.result.paras;
      }
    }
  } catch {
    // Continue
  }

  // 1. Try /api/translate
  try {
    const serverRes = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paras, targetLangName, targetLangCode })
    });
    if (serverRes.ok) {
      const data = await serverRes.json();
      if (data && data.paras && Array.isArray(data.paras) && data.paras.length > 0) {
        return data.paras;
      }
    }
  } catch {
    // Continue
  }

  const prompt = `Translate each paragraph of this school textbook page into ${targetLangName} for a student aged 10-14. Use everyday spoken ${targetLangName}, short sentences, keep every fact, and keep scientific terms in the form students hear in class (transliterate if that is common). Write only in ${targetLangName} script.\n\nReply with JSON only: {"paras": ["...", "..."]} with exactly ${paras.length} items in the same order.\n\nParagraphs:\n${JSON.stringify(paras)}`;

  const effectiveKey = apiKey || (typeof window !== "undefined" ? localStorage.getItem("readaloud_ai_key") || "" : "");

  // 2. Client Groq API
  if (provider === "groq" && effectiveKey) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${effectiveKey.trim()}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "You help a school reading app for Indian students. Always reply with one JSON object and nothing else." },
            { role: "user", content: prompt }
          ],
          response_format: { type: "json_object" },
          temperature: 0.3
        })
      });
      if (res.ok) {
        const data = await res.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        if (parsed.paras && Array.isArray(parsed.paras)) return parsed.paras;
      }
    } catch (e) {
      console.warn("Client Groq translation failed:", e);
    }
  }

  // 3. Fallback: Free translation proxy
  const translated = [];
  for (const p of paras) {
    const tr = await translateTextFree(p, targetLangCode);
    translated.push(tr);
  }
  return translated;
}

/**
 * Transliteration for Speech Synthesis when device lacks a native regional voice.
 */
export async function transliterateTextWithAI(paras, langName, targetScript = "Devanagari", { provider = "groq", apiKey = "" } = {}) {
  try {
    const taskRes = await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "translit",
        args: { paras, lang: langName, target: targetScript }
      })
    });
    if (taskRes.ok) {
      const data = await taskRes.json();
      if (data && data.result && Array.isArray(data.result.paras)) {
        return data.result.paras;
      }
    }
  } catch {
    // Continue
  }

  const effectiveKey = apiKey || (typeof window !== "undefined" ? localStorage.getItem("readaloud_ai_key") || "" : "");
  if (provider === "groq" && effectiveKey) {
    try {
      const t = targetScript === "Devanagari"
        ? "Devanagari (Hindi letters), spelled so a Hindi voice pronounces it like a native speaker would"
        : "simple Roman letters, the way Indians type this language in English letters on WhatsApp";
      const prompt = `Transliterate each ${langName} paragraph into ${t}. Do NOT translate; keep the ${langName} words. Keep exactly the same words in the same order, one output word for each input word, and keep the punctuation.\n\nReply with JSON only: {"paras": ["..."]} with exactly ${paras.length} items.\n\nParagraphs:\n${JSON.stringify(paras)}`;

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${effectiveKey.trim()}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "You help a school reading app for Indian students. Always reply with one JSON object and nothing else." },
            { role: "user", content: prompt }
          ],
          response_format: { type: "json_object" },
          temperature: 0.2
        })
      });
      if (res.ok) {
        const data = await res.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        if (parsed.paras && Array.isArray(parsed.paras)) return parsed.paras;
      }
    } catch (e) {
      console.warn("Client Groq transliteration error:", e);
    }
  }

  return paras;
}

/**
 * Extracts key hard words from custom text with plain meanings and examples.
 */
export async function findHardWordsWithAI(text, { provider = "groq", apiKey = "" } = {}) {
  try {
    const taskRes = await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: "hard", args: { text } })
    });
    if (taskRes.ok) {
      const data = await taskRes.json();
      if (data && data.result && Array.isArray(data.result.hard)) {
        const glossary = {};
        data.result.hard.forEach((h) => {
          if (h.word) {
            glossary[h.word.toLowerCase()] = { m: h.meaning, e: h.example };
          }
        });
        return glossary;
      }
    }
  } catch {
    // Continue
  }
  return null;
}

/**
 * Extract vocabulary keywords to mark with dotted underline.
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

    if (EXTENDED_GLOSSARY[w]) {
      glossary[w] = EXTENDED_GLOSSARY[w];
    } else if (isSubjectKeyword(w) && Object.keys(glossary).length < 24) {
      glossary[w] = { needLookup: true };
    }
  });

  return glossary;
}

function isSubjectKeyword(word) {
  const w = word.toLowerCase();
  const common = new Set([
    "this", "that", "these", "those", "there", "their", "where", "which",
    "about", "after", "other", "every", "first", "great", "small", "large",
    "little", "right", "state", "place", "thing", "water", "plant", "house",
    "school", "people", "around", "always", "during", "called", "because"
  ]);
  if (common.has(w)) return false;
  const patterns = /(tion|sion|ment|ence|ance|ology|plast|phyll|synthesis|trophic|scope|meter|sphere|ation|ic|ous|ive|ism|ist)$/i;
  return w.length >= 7 || patterns.test(w);
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
 * Gemini AI Direct Vision & NLP Integration.
 */
export async function processWithGemini(apiKey, file, langName = "Hindi") {
  const base64Data = await fileToBase64(file);
  const mimeType = file.type || "image/jpeg";

  const prompt = `You are an expert inclusive educator creating accessible textbook material for a 12-year-old student with dyslexia.
Analyze this photo of a textbook page thoroughly:

1. "title": Provide a clear, natural chapter or section heading title.
2. "paras": Extract the exact original text printed on the page, preserving all paragraphs accurately.
3. "simple": Provide a comprehensive, high-quality "Simpler English" rewrite of each paragraph:
   - Must be fully comprehensive: DO NOT lose facts, details, or scientific essence from the image.
   - Use shorter, decodable sentences (max 12-14 words).
   - Keep all subject keywords, scientific terms, and core facts.
4. "trans": Translate each paragraph into ${langName} using everyday conversational vocabulary that an Indian school student speaks.
5. "hard": Identify 8-15 key scientific or vocabulary words found on this page. For EACH keyword, provide:
   - "word": the exact keyword.
   - "meaning": a clear, simple meaning in plain English (max 15 simple words).
   - "example": a real-world, natural example sentence showing how the word is used in context.

Return ONLY a valid JSON object matching this schema:
{
  "title": "Heading Title",
  "paras": ["original para 1", "original para 2"],
  "simple": ["comprehensive simple para 1", "comprehensive simple para 2"],
  "trans": ["${langName} para 1", "${langName} para 2"],
  "hard": [
    { "word": "keyword", "meaning": "plain meaning", "example": "real-world example sentence" }
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

/**
 * Universal Image-to-Text Vision Processing:
 * 1. Checks Vercel Serverless /api/vision (secure, uses server-side GROQ_API_KEY / GEMINI_API_KEY).
 * 2. If client-side Gemini key exists, runs processWithGemini.
 * 3. Fallback: runs client-side Tesseract.js OCR.
 */
export async function processImageWithAI(file, langName = "Hindi", clientApiKey = "", onStatus = () => {}) {
  const base64 = await fileToBase64(file);
  const mimeType = file.type || "image/jpeg";

  // 1. Try Vercel Serverless Vision endpoint (secure, server-side Groq/Gemini key)
  try {
    onStatus("Reading page with AI Vision…");
    const serverRes = await fetch("/api/vision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64: base64,
        mimeType,
        langName
      })
    });

    if (serverRes.ok) {
      const data = await serverRes.json();
      if (data && data.paras && data.paras.length > 0) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Serverless vision not available or failed:", e);
  }

  // 2. Try Client-side Gemini if user supplied key in UI
  if (clientApiKey && clientApiKey.trim()) {
    try {
      onStatus("Analyzing image with Gemini Vision AI…");
      return await processWithGemini(clientApiKey.trim(), file, langName);
    } catch (e) {
      console.warn("Client Gemini Vision failed, falling back to Tesseract OCR:", e);
    }
  }

  // 3. Client-side local Tesseract.js OCR fallback
  onStatus("Extracting textbook text directly in your browser with OCR…");
  const parsedDoc = await performClientOCR(file);
  return parsedDoc;
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
