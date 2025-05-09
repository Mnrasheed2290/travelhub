// File: client/src/pages/ChatSupport.js
import React, { useState, useEffect } from "react";
import { Client as TwilioChat } from "twilio-chat";
import "./ChatSupport.css";

function ChatSupport() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function initializeChat() {
      try {
        const client = await TwilioChat.create(process.env.REACT_APP_TWILIO_TOKEN);
        setChatClient(client);

        let chatChannel;
        try {
          chatChannel = await client.getChannelByUniqueName("support");
        } catch (e) {
          chatChannel = await client.createChannel({
            uniqueName: "support",
            friendlyName: "Customer Support Chat",
          });
        }

        await chatChannel.join();
        setChannel(chatChannel);

        chatChannel.on("messageAdded", (message) => {
          setMessages((prevMessages) => [
            ...prevMessages,
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
