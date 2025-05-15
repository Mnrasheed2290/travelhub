// File: client/src/pages/ChatSupport.js

import React, { useEffect, useState } from "react";
import { Client as TwilioChat } from "twilio-chat";
import "./ChatSupport.css";

function ChatSupport() {
  const [channel, setChannel] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const initTwilioChat = async () => {
      try {
        const res = await fetch("https://travelhub-1.onrender.com/api/twilio-token");
        const { token } = await res.json();
        const client = await TwilioChat.create(token);

        client.on("tokenAboutToExpire", async () => {
          const refreshed = await fetch("https://travelhub-1.onrender.com/api/twilio-token");
          const { token: newToken } = await refreshed.json();
          client.updateToken(newToken);
        });

        client.on("channelJoined", (joinedChannel) => {
          setChannel(joinedChannel);
          joinedChannel.getMessages().then((msgs) => {
            const parsed = msgs.items.map((msg) => ({
              sender: msg.author,
              text: msg.body
            }));
            setMessages(parsed);
          });

          joinedChannel.on("messageAdded", (msg) => {
            setMessages((prev) => [...prev, { sender: msg.author, text: msg.body }]);
          });
        });

        let supportChannel;
        try {
          supportChannel = await client.getChannelByUniqueName("support");
        } catch {
          supportChannel = await client.createChannel({ uniqueName: "support", friendlyName: "Customer Support" });
        }

        await supportChannel.join().catch(() => {});
        setChannel(supportChannel);
      } catch (err) {
        console.error("Twilio Chat error:", err);
      }
    };

    initTwilioChat();
  }, []);

  const handleSend = async () => {
    if (!message.trim() || !channel) return;
    await channel.sendMessage(message);
    setMessages((prev) => [...prev, { sender: "You", text: message }]);
    setMessage("");
  };

  return (
    <div className="chat-support">
      <h2>Live Support</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender === "You" ? "user" : "support"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatSupport;
