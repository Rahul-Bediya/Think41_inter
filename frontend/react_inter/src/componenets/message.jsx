import React from 'react';

const Message = ({ sender, text }) => {
  const isUser = sender === 'user';
  return (
    <div
      className={`message ${isUser ? 'user' : 'ai'}`}
      style={{
        textAlign: isUser ? 'right' : 'left',
        background: isUser ? '#d1f5d3' : '#f0f0f0',
        margin: '8px',
        padding: '10px',
        borderRadius: '10px',
        maxWidth: '70%',
        alignSelf: isUser ? 'flex-end' : 'flex-start'
      }}
    >
      <strong>{isUser ? 'You' : 'AI'}:</strong> {text}
    </div>
  );
};

export default Message;
