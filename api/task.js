// Universal Serverless Groq AI Task Gateway for Vercel
// Executes named tasks (translate, simplify, meaning, hard, translit) securely using server GROQ_API_KEY.

const PROMPTS = {
  translate: ({ paras, lang }) =>
    `Translate each paragraph of this school textbook page into ${lang} for a student aged 10-14. Use everyday spoken ${lang}, short sentences, keep every fact, and keep scientific terms in the form students hear in class (transliterate if that is common). Write only in ${lang} script.\n\nReply with JSON only: {"paras": ["...", "..."]} with exactly ${paras.length} items in the same order.\n\nParagraphs:\n${JSON.stringify(paras)}`,

  simplify: ({ paras }) =>
    `You are simplifying a school textbook page for a student aged 10-14 who has dyslexia. Make it genuinely simpler AND shorter, not just a few words swapped:
- Keep every key fact, number, definition and important term. Explain a hard term in a few plain words the first time it appears.
- Cut repetition, side remarks, long examples, rhetorical questions and filler.
- Use short sentences (12 words or fewer), everyday words and active voice.
- Aim for about half the original length.
- Keep the same number of paragraphs in the same order; a paragraph may become 1 to 3 sentences.
- Write in the same language as the page.

Reply with JSON only: {"paras": ["...", "..."]} with exactly ${paras.length} items.

Page:
${JSON.stringify(paras)}`,

  meaning: ({ word, sentence, lang }) =>
    `A school student (age 10-14) tapped the word "${word}" in this sentence:
"${sentence || ""}"

Reply with JSON only: {"meaning": "...", "example": "..."}. The meaning must fit this sentence, use very simple words (max 15 words), and be written in ${lang || "simple English"}. The example is one short everyday sentence from Indian daily life in ${lang || "simple English"}.`,

  hard: ({ text }) =>
    `From this school text, pick up to 12 words a student aged 10-14 with reading difficulty may find hard. Give each a very simple meaning (max 12 words) and one short example from Indian daily life.
Reply with JSON only: {"hard":[{"word":"...","meaning":"...","example":"..."}]}

Text:
${text}`,

  translit: ({ paras, lang, target }) => {
    const t = target === "Devanagari"
      ? "Devanagari (Hindi letters), spelled so a Hindi voice pronounces it like a native speaker would"
      : "simple Roman letters, the way Indians type this language in English letters on WhatsApp";
    return `Transliterate each ${lang} paragraph into ${t}. Do NOT translate; keep the ${lang} words. Keep exactly the same words in the same order, one output word for each input word, and keep the punctuation.\n\nReply with JSON only: {"paras": ["..."]} with exactly ${paras.length} items.\n\nParagraphs:\n${JSON.stringify(paras)}`;
  }
};

const LANGS = ["Hindi", "Marathi", "Bengali", "Tamil", "Telugu", "Kannada", "Gujarati", "Odia", "Malayalam", "Punjabi", "English", "simple English"];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY || "";
  if (!apiKey) {
    return res.status(503).json({ code: "no_key", message: "Add GROQ_API_KEY in Vercel Environment Variables." });
  }

  try {
    const { task, args } = req.body || {};
    if (!task || !PROMPTS[task]) {
      return res.status(400).json({ code: "bad_request", message: "Unknown task: " + task });
    }
    if (!args || typeof args !== "object") {
      return res.status(400).json({ code: "bad_request", message: "Missing args input" });
    }
    if (args.lang && !LANGS.includes(args.lang)) {
      return res.status(400).json({ code: "bad_request", message: "Unsupported language: " + args.lang });
    }

    const promptText = PROMPTS[task](args);
    const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    const body = {
      model,
      temperature: 0.3,
      messages: [
        { role: "system", content: "You help a school reading app for Indian students. Always reply with one JSON object and nothing else." },
        { role: "user", content: promptText }
      ],
      response_format: { type: "json_object" }
    };

    const groqUrl = process.env.GROQ_URL || "https://api.groq.com/openai/v1/chat/completions";
    let groqRes = await fetch(groqUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey.trim()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (groqRes.status === 400) {
      delete body.response_format;
      groqRes = await fetch(groqUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey.trim()}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
    }

    if (groqRes.status === 429) {
      return res.status(429).json({ code: "rate_limited", message: "The free AI quota is busy. Wait a minute and try again." });
    }
    if (!groqRes.ok) {
      const errText = await groqRes.text();
      return res.status(502).json({ code: "failed", message: `Groq returned ${groqRes.status}: ${errText}` });
    }

    const data = await groqRes.json();
    const content = data.choices?.[0]?.message?.content || "";
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      const m = content.match(/\{[\s\S]*\}/);
      if (m) parsed = JSON.parse(m[0]);
      else throw new Error("Could not parse JSON response from AI");
    }

    return res.status(200).json({ result: parsed });
  } catch (err) {
    return res.status(500).json({ code: "failed", message: err.message || "Internal server error" });
  }
}
