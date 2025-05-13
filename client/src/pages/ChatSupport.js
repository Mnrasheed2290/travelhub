// File: client/src/pages/ChatSupport.js
import React, { useState } from 'react';
import './ChatSupport.css';

function ChatSupport() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'You', text: input }]);
    setInput('');
    // Simulate response
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'Support', text: 'Thanks for reaching out! We’ll be with you shortly.' }]);
    }, 800);
  };

  return (
    <div className="chat-support">
      <h2>Live Chat Support</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender === 'You' ? 'user' : 'support'}`}>
            <span><strong>{msg.sender}:</strong> {msg.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatSupport;
