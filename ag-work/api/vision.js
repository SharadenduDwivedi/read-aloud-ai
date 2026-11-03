export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!groqKey && !geminiKey) {
    return res.status(500).json({
      error: "No server-side AI Vision key (GROQ_API_KEY or GEMINI_API_KEY) found in Vercel environment variables."
    });
  }

  try {
    const { imageBase64, mimeType = "image/jpeg", langName = "Hindi" } = req.body || {};
    if (!imageBase64) {
      return res.status(400).json({ error: "Missing imageBase64 data." });
    }

    const prompt = `This is a photo of a school textbook page. 
You are an expert inclusive educator creating accessible textbook material for a 12-year-old student with dyslexia.

Instructions:
1. "title": Extract the main heading, chapter, or section title (3-6 words).
2. "paras": Extract the exact original body text from the photo, paragraph by paragraph. Skip stray page numbers and footnotes.
3. "simple": Provide a high-quality "Simpler English" rewrite of each paragraph:
   - Make sentences short (max 10-12 words).
   - Use active, clear, decodable phrasing.
   - Strictly KEEP all subject keywords, scientific terms, and factual details.
4. "trans": Translate each paragraph into ${langName} in everyday spoken regional words.
5. "hard": Extract 8 to 15 key subject keywords. For each keyword provide:
   - "word": exact keyword.
   - "meaning": very easy meaning (max 15 simple words).
   - "example": a short, natural everyday example sentence.

Return ONLY a valid JSON object matching this exact schema:
{
  "title": "Chapter Heading Title",
  "paras": ["paragraph 1", "paragraph 2"],
  "simple": ["simple paragraph 1", "simple paragraph 2"],
  "trans": ["${langName} paragraph 1", "${langName} paragraph 2"],
  "hard": [
    { "word": "keyword", "meaning": "easy meaning", "example": "relatable example sentence" }
  ]
}`;

    // 1. Try Groq Multimodal Vision (Llama 3.2 Vision)
    if (groqKey) {
      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqKey.trim()}`
        },
        body: JSON.stringify({
          model: "llama-3.2-11b-vision-preview",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: prompt + "\nRespond with JSON only." },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${mimeType};base64,${imageBase64}`
                  }
                }
              ]
            }
          ],
          response_format: { type: "json_object" },
          temperature: 0.2
        })
      });

      if (groqRes.ok) {
        const data = await groqRes.json();
        const content = data.choices?.[0]?.message?.content;
        const parsed = JSON.parse(content);

        const glossary = {};
        (parsed.hard || []).forEach((h) => {
          if (h.word) glossary[h.word.toLowerCase()] = { m: h.meaning, e: h.example };
        });

        return res.status(200).json({
          title: parsed.title || "Textbook Page",
          paras: parsed.paras || [],
          simple: parsed.simple || [],
          trans: { [langName]: parsed.trans || [] },
          glossary
        });
      }
    }

    // 2. Fallback to Gemini 1.5 Flash Vision if configured
    if (geminiKey) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey.trim()}`;
      const geminiRes = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                { inline_data: { mime_type: mimeType, data: imageBase64 } }
              ]
            }
          ],
          generationConfig: { response_mime_type: "application/json" }
        })
      });

      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsed = JSON.parse(content);

        const glossary = {};
        (parsed.hard || []).forEach((h) => {
          if (h.word) glossary[h.word.toLowerCase()] = { m: h.meaning, e: h.example };
        });

        return res.status(200).json({
          title: parsed.title || "Textbook Page",
          paras: parsed.paras || [],
          simple: parsed.simple || [],
          trans: { [langName]: parsed.trans || [] },
          glossary
        });
      }
    }

    return res.status(500).json({ error: "Failed to process image with AI Vision." });
  } catch (err) {
    return res.status(500).json({ error: "Server vision processing error", message: err.message });
  }
}

