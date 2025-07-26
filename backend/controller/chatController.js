const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.chatHandler = async (req, res) => {
  const { message, conversationId } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    let convoId = conversationId;

    // Create a new conversation if not provided
    if (!convoId) {
      const newConvo = new Conversation({});
      await newConvo.save();
      convoId = newConvo._id;
    }

    // Save user message
    const userMsg = new Message({
      conversationId: convoId,
      sender: 'user',
      text: message
    });
    await userMsg.save();

    // Send user input to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4"
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant for a t-shirt e-commerce website. Answer user queries about products, returns, sizes, delivery, etc."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const botReply = response.choices[0].message.content;

    // Save bot response
    const aiMsg = new Message({
      conversationId: convoId,
      sender: 'ai',
      text: botReply
    });
    await aiMsg.save();

    res.status(200).json({
      conversationId: convoId,
      reply: botReply
    });

  } catch (err) {
    console.error("❌ Chat error:", err.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
};
