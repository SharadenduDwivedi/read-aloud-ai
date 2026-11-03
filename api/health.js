export default async function handler(req, res) {
  const apiKey = process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY || "";
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
  return res.status(200).json({
    ok: !!apiKey,
    model: apiKey ? model : null
  });
}
