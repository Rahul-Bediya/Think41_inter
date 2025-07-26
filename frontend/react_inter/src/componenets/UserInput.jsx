import React, { useState } from 'react';

const UserInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="user-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default UserInput;
