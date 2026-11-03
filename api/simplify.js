export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Secret Server-Side Environment Variable (NEVER exposed to browser bundle)
  const apiKey = process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "No GROQ_API_KEY configured in Vercel Environment Variables."
    });
  }

  try {
    const { paras } = req.body || {};
    if (!paras || !Array.isArray(paras) || paras.length === 0) {
      return res.status(400).json({ error: "Invalid or empty paragraphs array." });
    }

    const prompt = `You are an expert inclusive educator rewriting textbook paragraphs for a 12-year-old student with dyslexia.
Rules:
1. Make sentences short (max 10-12 words).
2. Use active, clear, decodable words.
3. Keep ALL subject keywords, scientific terms, and factual details completely intact.
4. Return ONLY a valid JSON object matching this schema:
{"paras": ["simplified paragraph 1", "simplified paragraph 2"]}

Paragraphs to rewrite:
${JSON.stringify(paras)}`;

    // Call Groq Llama 3.3 from server
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.3
      })
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      return res.status(groqRes.status).json({ error: "Groq API error", details: errText });
    }

    const data = await groqRes.json();
    const content = data.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);

    return res.status(200).json({ paras: parsed.paras });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error during simplification",
      message: error.message
    });
  }
}

