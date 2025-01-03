import React, { useState } from "react"; 
import "./ChatBox.css";
const ChatBox = ({ messages, username }) => {
    const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
  };
  return (
    <div className="chat-box">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`message ${msg.sender === username ? "user" : "assistant"}`}
        >
          <strong>{msg.sender}:</strong>{" "}
          {msg.message.startsWith("http") ? (
            <a href={msg.message} target="_blank" rel="noopener noreferrer">
              {msg.message}
            </a>
          ) : (
            <div>
            <span>
              {msg.message.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
              </span>
              <div className="code-footer">
                <span className="code-language">
                </span>
                <button
  className="copy-button"
  onClick={() => copyToClipboard(msg.message, idx)}
>
  {copiedIndex === idx ? "✔ Copied!" : "Copy"}
</button>

              </div>
           </div>)
            
          }
          <span className="time">{msg.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
