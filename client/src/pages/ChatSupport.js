// File: client/src/pages/ChatSupport.js
import React, { useState } from "react";
import { TwilioChat } from "twilio-chat";
import "./ChatSupport.css";

function ChatSupport() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message) return;
    const newMessage = { text: message, sender: "You" };
    setMessages([...messages, newMessage]);
    setMessage("");

    try {
      const client = await TwilioChat.create("YOUR_TWILIO_TOKEN");
      const channel = await client.getChannelByUniqueName("support");
      await channel.sendMessage(message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Customer Support Chat</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatSupport;
