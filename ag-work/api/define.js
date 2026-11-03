export default async function handler(req, res) {
  const { word } = req.query || {};
  const cleanWord = (word || "").toLowerCase().replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "");

  if (!cleanWord || cleanWord.length < 2) {
    return res.status(400).json({ error: "Missing or invalid word parameter." });
  }

  const groqKey = process.env.GROQ_API_KEY;

  // 1. If Groq API key is configured on Vercel server, generate exact student definition & natural usage
  if (groqKey) {
    try {
      const prompt = `You are an educational dictionary editor for middle school students.
Provide a clear definition and an authentic real-world usage example sentence for the word: "${cleanWord}".
Rules:
1. "meaning": Concise, simple wording definition (max 15 words).
2. "usage": One clear, natural everyday usage sentence (max 15 words) showing authentic usage of "${cleanWord}". Do NOT quote textbook text; give a real-world dictionary example.
Return ONLY valid JSON matching this schema:
{"meaning": "definition text", "usage": "example sentence"}`;

      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqKey.trim()}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
          temperature: 0.2
        })
      });

      if (groqRes.ok) {
        const data = await groqRes.json();
        const content = data.choices?.[0]?.message?.content;
        const parsed = JSON.parse(content);
        if (parsed.meaning && parsed.usage) {
          return res.status(200).json({
            m: parsed.meaning,
            e: parsed.usage
          });
        }
      }
    } catch (e) {
      console.warn("Groq dictionary lookup error:", e);
    }
  }

  // 2. Query Wiktionary REST API as fallback
  try {
    const wikiRes = await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(cleanWord)}`);
    if (wikiRes.ok) {
      const data = await wikiRes.json();
      let bestDef = "";
      let bestEx = "";
      for (const langItem of data.en || []) {
        for (const d of langItem.definitions || []) {
          const rawDef = (d.definition || "").replace(/<[^>]+>/g, " ").replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, "$1").replace(/\s+/g, " ").trim();
          if (rawDef && rawDef.length > 5 && !rawDef.startsWith("plural of") && !rawDef.startsWith("Alternative") && !rawDef.toLowerCase().includes("surname")) {
            if (!bestDef) bestDef = rawDef.split(/\s+/).slice(0, 18).join(" ");
            if (d.examples && d.examples.length > 0 && !bestEx) {
              bestEx = d.examples[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
            }
          }
        }
      }
      if (bestDef) {
        return res.status(200).json({
          m: bestDef,
          e: bestEx || `The word "${cleanWord}" is used in English when discussing this concept.`
        });
      }
    }
  } catch (e) {
    console.warn("Wiktionary fallback error:", e);
  }

  // 3. Fallback to Free Dictionary API
  try {
    const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`);
    if (dictRes.ok) {
      const data = await dictRes.json();
      let bestDef = "";
      let bestEx = "";
      for (const entry of data) {
        for (const m of entry.meanings || []) {
          for (const d of m.definitions || []) {
            if (d.definition && !d.definition.startsWith("Alternative") && !d.definition.startsWith("Plural")) {
              if (!bestDef) bestDef = d.definition.split(/\s+/).slice(0, 18).join(" ");
              if (d.example && !bestEx) bestEx = d.example;
            }
          }
        }
      }
      if (bestDef) {
        return res.status(200).json({
          m: bestDef,
          e: bestEx || `The word "${cleanWord}" is used to express this idea.`
        });
      }
    }
  } catch (e) {
    console.warn("Dictionary API fallback error:", e);
  }

  return res.status(200).json({
    m: `The meaning of "${cleanWord}".`,
    e: `The word "${cleanWord}" is commonly used in English.`
  });
}
