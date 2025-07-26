const Message = require('../model/Message');
const Conversation = require('../model/Conversation');

// Dummy AI response function (we'll replace with LLM later)
function getBotReply(userMessage) {
  return `You said: ${userMessage}`;
}

exports.chatHandler = async (req, res) => {
  const { message, conversationId } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    let convoId = conversationId;

    // Create new conversation if none provided
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

    // Generate AI response
    const botReply = getBotReply(message);

    // Save AI message
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
    console.error("Chat API Error:", err);
    res.status(500).json({ error: "Chat failed" });
  }
};
