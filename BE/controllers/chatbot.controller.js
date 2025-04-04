require('dotenv').config();

// controllers/chatController.js
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const chat = async (req, res) => {
  const { message } = req.body;
    try {
      const completion = await openai.chat.completions.create({
        model: "deepseek-ai/deepseek-r1",
        messages: [{ role: "user", content: message }],
      temperature: 0.6,
      top_p: 0.7,
      max_tokens: 4096,
      stream: false,
    });

    // Kiểm tra phản hồi API
    if (!completion || !completion.choices || completion.choices.length === 0) {
      return res.status(500).json({ error: "API không trả về phản hồi hợp lệ" });
    }

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Lỗi khi gọi API OpenAI:", error);
    res.status(500).json({ error: "Có lỗi xảy ra khi xử lý yêu cầu" });
  }
};

module.exports = { chat };
