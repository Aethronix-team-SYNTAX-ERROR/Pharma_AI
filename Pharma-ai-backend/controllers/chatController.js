const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.chat = async (req, res) => {
  try {
    const { message, drug } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a pharmaceutical AI assistant. Explain drug effects, side effects, and mechanism clearly.`
        },
        {
          role: "user",
          content: `Drug: ${drug}\nQuestion: ${message}`
        }
      ]
    });

    res.json({ reply: response.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
