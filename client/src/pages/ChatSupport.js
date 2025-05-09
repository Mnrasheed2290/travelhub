import React, { useState, useEffect } from "react";
import { Client as TwilioChat } from "twilio-chat";
import "./ChatSupport.css";

function ChatSupport() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function initializeChat() {
      try {
        const response = await fetch("/api/twilio-token");
        const data = await response.json();
        const client = await TwilioChat.create(data.token);

        client.on("tokenAboutToExpire", async () => {
          const refreshResponse = await fetch("/api/twilio-token");
          const refreshData = await refreshResponse.json();
          client.updateToken(refreshData.token);
        });

        const chatChannel = await client.getChannelByUniqueName("support");
        await chatChannel.join();
        setChannel(chatChannel);

        chatChannel.on("messageAdded", (message) => {
          setMessages((prev) => [
            ...prev,
            { text: message.body, sender: message.author },
          ]);
        });
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    }

    initializeChat();
  }, []);

  const sendMessage = async () => {
    if (!message || !channel) return;

    try {
      await channel.sendMessage(message);
      setMessages([...messages, { text: message, sender: "You" }]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Customer Support Chat</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
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
