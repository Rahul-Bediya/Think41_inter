import React from 'react';
import ChatWindow from './componenets/ChatWindow';
import { ChatProvider } from './context/ChatContext';

const App = () => (
  <ChatProvider>
    <ChatWindow />
  </ChatProvider>
);

export default App;
