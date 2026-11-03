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

    const prompt = `You are an expert inclusive educator rewriting textbook paragraphs into very easy, simple English for a middle school student with dyslexia or learning differences.
Rules:
1. Simplify every sentence using very easy, everyday words that any 10-12 year old child can easily understand and read.
2. Make sentences short and punchy (max 10 to 12 words per sentence).
3. If there are difficult ideas, explain them simply and clearly in gentle, plain English.
4. Keep all essential subject keywords, scientific terms, and core facts intact, but make all the surrounding explanation simple and easy to understand.
5. Return ONLY a valid JSON object matching this schema:
{"paras": ["simplified paragraph 1", "simplified paragraph 2"]}

Paragraphs to rewrite in easy words:
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
