export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Secret Server-Side Environment Variable
  const apiKey = process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "No GROQ_API_KEY configured in Vercel Environment Variables."
    });
  }

  try {
    const { paras, targetLangName, targetLangCode } = req.body || {};
    if (!paras || !Array.isArray(paras) || paras.length === 0) {
      return res.status(400).json({ error: "Invalid or empty paragraphs array." });
    }

    const lang = targetLangName || "Hindi";

    const prompt = `You are an expert bilingual educator and translator for school students.
Translate the following educational paragraphs into clear, natural, everyday ${lang} (Indian regional language) that a middle-school student can easily read and understand.
Rules:
1. Translate every paragraph faithfully using clear, natural everyday phrasing.
2. Use words that Indian school students speak and understand easily.
3. Keep the paragraph order and count identical.
4. Return ONLY a valid JSON object matching this schema:
{"paras": ["translated paragraph 1 in ${lang}", "translated paragraph 2 in ${lang}"]}

Paragraphs to translate:
${JSON.stringify(paras)}`;

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
      return res.status(groqRes.status).json({ error: "Groq translation error", details: errText });
    }

    const data = await groqRes.json();
    const content = data.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);

    return res.status(200).json({ paras: parsed.paras });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error during translation",
      message: error.message
    });
  }
}
