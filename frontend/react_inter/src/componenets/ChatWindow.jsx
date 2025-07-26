import React from 'react';
import MessageList from './Messagelist';
import UserInput from './UserInput';
import { useChat } from '../context/ChatContext';

const ChatWindow = () => {
  const {
    messages,
    setMessages,
    conversationId,
    setConversationId,
    setLoading,
  } = useChat();

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const res = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, conversationId }),
    });

    const data = await res.json();
    setConversationId(data.conversationId);

    const botMsg = { sender: 'ai', text: data.reply };
    setMessages((prev) => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="chat-window">
      <h2>🛍️ AI Chat Assistant</h2>
      <MessageList messages={messages} />
      <UserInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
