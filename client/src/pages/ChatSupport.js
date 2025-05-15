// File: client/src/pages/ChatSupport.js

import React, { useEffect, useState, useRef } from "react";
import { Client as TwilioChatClient } from "@twilio/conversations";
import "./ChatSupport.css";

function ChatSupport() {
  const [chatClient, setChatClient] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const response = await fetch("https://travelhub-1.onrender.com/api/twilio-token");
        const { token, identity, serviceSid } = await response.json();

        const client = await TwilioChatClient.create(token);
        setChatClient(client);

        client.on("tokenAboutToExpire", async () => {
          const refresh = await fetch("https://travelhub-1.onrender.com/api/twilio-token");
          const { token: newToken } = await refresh.json();
          client.updateToken(newToken);
        });

        const conversation = await client.getConversationBySid(serviceSid);
        setConversation(conversation);

        conversation.on("messageAdded", (message) => {
          setMessages((prev) => [...prev, { author: message.author, body: message.body }]);
        });

        const history = await conversation.getMessages();
        const loadedMessages = history.items.map(msg => ({ author: msg.author, body: msg.body }));
        setMessages(loadedMessages);
      } catch (err) {
        console.error("Chat init error:", err);
        alert("Failed to load chat. Please try again later.");
      }
    };

    initializeChat();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !conversation) return;
    await conversation.sendMessage(input);
    setInput("");
  };

  return (
    <div className="chat-support">
      <h2>Live Chat Support</h2>
      <div className="chat-box" ref={chatRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.author === chatClient?.user.identity ? "user" : "support"}`}
          >
            <span><strong>{msg.author === chatClient?.user.identity ? "You" : "Support"}:</strong> {msg.body}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatSupport;
