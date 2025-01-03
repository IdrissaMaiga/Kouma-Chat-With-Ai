import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./App.css";
import ChatBox from "./ChatBox";
const SERVER_URL = "https://server.filmutunnel.site";
const socket = io(SERVER_URL);

function App() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [globalUsers, setGlobalUsers] = useState(0);
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const currentYear = new Date().getFullYear();
  const toggleAI = () => {
    setIsActive((prevState) => !prevState);
  };



  useEffect(() => {
    return () => {
      socket.off(); // Clean up all listeners
    };
  }, []);
  
  // Join room
  const joinRoom = () => {
    if (username && roomId) {
      socket.emit("join-room", { roomId, username });
      setJoinedRoom(true)
    }
  };
  const getOpenAIResponse = async (userMessage) => {
    return new Promise((resolve, reject) => {
      const eventSource = new EventSource(`${SERVER_URL}/get-openai-response?message=${encodeURIComponent(userMessage)}`);
  
      let aiResponse = '';
  
      
      eventSource.onmessage = (event) => {
        const newContent = event.data; // Get new content chunk
        aiResponse += event.data;
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage?.sender === 'AI Assistant') {
            // Update the last message if it's from AI Assistant
            const updatedMessage = { ...lastMessage, message: lastMessage.message + newContent };
            return [...prev.slice(0, -1), updatedMessage];
          } else {
            // Add a new message if no AI Assistant message exists
            return [...prev, { sender: 'AI Assistant', message: newContent, timestamp: new Date().toLocaleTimeString() }];
          }
        });
      };
      
  
      eventSource.onerror = (error) => {
        console.log('Stream error:', error);
        
        eventSource.close();
          // Remove the last AI message 
        resolve(aiResponse); // Resolve with the full response
        reject(new Error('Failed to fetch AI response.'));
      };
  
      eventSource.onopen = () => console.log('Connection to stream established.');
  
      eventSource.onclose = () => {
        console.log('Stream closed.');
        // Remove the last AI message
        
        resolve(aiResponse); // Resolve with the full response
      };
      
    });
  };
  
  
  

 

  const sendMessage = async () => {
    if (message) {
      setIsLoading(true); // Set loading to true before API call
      try {
        const timestamp = new Date().toLocaleTimeString();
        socket.emit('send-message', {
          roomId,
          message:message,
          sender: username,
          timestamp,
        });
        if (isActive) {
          const userMessage = message
         
          if (!userMessage) return;
          const aiResponse = await getOpenAIResponse(userMessage);
          
          
          socket.emit('send-message', {
            roomId,
            message: aiResponse,
            sender: 'AI Assistant',
            timestamp,
          });

          if (username && roomId) {
            socket.emit("join-room", { roomId, username });
          }
          

        }
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setIsLoading(false); // Reset loading state
      }
      setMessage(''); // Clear the message input field
    }
  };
  
  // File upload
  const uploadFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("roomId", roomId);
  
      try {
        // Upload the file and get the file URL
        const response = await axios.post(`${SERVER_URL}/upload`, formData);
        const fileUrl = response.data.filePath; // Assuming the server responds with { filePath: "url" }
  
        // Automatically send the file link as a message
        const timestamp = new Date().toLocaleTimeString();
        socket.emit("send-message", {
          roomId,
          message: fileUrl, // The file link is sent directly as a message
          sender: username,
          timestamp,
        });
  
        setFile(null); // Clear the selected file
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    }
  };

  // Listen for messages and user updates
  useEffect(() => {
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("update-global-users", (count) => {
      console.log("Global Users:", count);
      setGlobalUsers(count); // Function to update UI
    });
    
    
    socket.on("previous-messages", (msgs) => {
      setMessages(msgs);
    });

    socket.on("update-users", (roomUsers) => {
      setUsers(roomUsers);
    });

    return () => {
      socket.off("receive-message");
      socket.off("previous-messages");
      socket.off("update-users");
    };
  }, []);

  return (
    <div className="container">
  <h1>Kouma AI and ChatRoom</h1>
  {username && joinedRoom && <button
      className={`activate-ai-button ${isActive ? 'active' : 'inactive'}`}
      onClick={toggleAI}
    >
      {isActive ? 'Deactivate AI' : 'Activate AI'}
    </button>}
  <div className="form">
    <input
      type="text"
      placeholder="Enter your name"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="input"
    />
    <input
      type="text"
      placeholder="Enter room ID"
      value={roomId}
      onChange={(e) => setRoomId(e.target.value)}
      className="input"
    />
    <button onClick={joinRoom} className="button">
      Join Room
    </button>
  </div>

  <div className="users-box">
    <h3>Global Users Online: {globalUsers}</h3>
    <h3>Connected Users in Room:</h3>
    <ul>
      {users.map((user, idx) => (
        <li key={idx}>{user}</li>
      ))}
    </ul>
  </div>



  <ChatBox messages={messages} username={username}></ChatBox>

  {username && joinedRoom && (
    <div>
      <div className="form-stacked">
        <textarea
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          className="textarea"
        />
        <button onClick={sendMessage} className="button">
          Send
        </button>
      </div>

      <div className="form-stacked">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadFile} className="button">
          Upload File
        </button>
      </div>
    </div>

  )}
        {/* Footer with "All rights reserved Idrissa Maiga @ current year" */}
        <div >
        <p>All rights reserved Idrissa Maiga &copy; {currentYear}</p>
      </div>
</div>

  );
  
}





export default App;
