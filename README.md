# AI Chat and File Sharing App

Welcome to the AI Chat and File Sharing App! This application allows users to interact with an AI chatbot, share files, and collaborate in a seamless and secure environment.

---

## Features

- **AI Chat:**
  - Real-time conversation with an AI chatbot.
  - AI responses based on user inputs for queries, tasks, or casual conversation.

- **File Sharing:**
  - Securely upload and share files within the app.
  - Support for multiple file types, including text, images, PDFs, and more.

- **User Management:**
  - User authentication for secure access.
  - Options to create individual or group chat sessions.

- **Search and History:**
  - View past conversations and shared files.
  - Search functionality for quick access.

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or later) and **npm**
- **MongoDB** or another database for storing user data and chat history

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-chat-file-sharing.git
   cd ai-chat-file-sharing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   GROOK_LAMA_API_KEY=your_grook_lama_api_key
   ```

4. Start the server:
   ```bash
   npm start![Screenshot 2024-12-07 235645](https://github.com/user-attachments/assets/fc9873e6-670e-417e-85da-c18168ae6b9a)
![Screenshot 2024-12-07 235542](https://github.com/user-attachments/assets/db36ec0a-3f1d-4cf5-b99d-43df47e8e7d5)
![Screenshot 2024-12-07 224137](https://github.com/user-attachments/assets/7c2485ec-ab79-45ca-b9e5-a9aace2601b9)
![Screenshot 2024-12-08 001107](https://github.com/user-attachments/assets/2b3882b5-981e-44d2-b32b-ae9d10c2c717)

   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## Usage

1. **Sign Up/Login:**
   Create an account or log in using existing credentials.

2. **Chat with AI:**
   Type your queries or messages in the chat interface and get AI-powered responses.

3. **Share Files:**
   Use the "Upload File" option to share files with the AI or other users in the chat.

4. **Search and Retrieve:**
   Access previous conversations and shared files using the search functionality.

---

## File Structure

```plaintext
ai-chat-file-sharing/
├── backend/         # Backend logic and API routes
├── frontend/        # Frontend React/Angular/Vue code
├── models/          # AI model configurations
├── public/          # Static files
├── routes/          # API route definitions
├── utils/           # Utility functions
└── README.md        # Project documentation
```

---

## Technologies Used

- **Frontend:** React.js/Angular/Vue.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Integration:** Grook Lama 3 API
- **Full Stack:** MERN (MongoDB, Express.js, React.js, Node.js)

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For questions or support, please email [your-email@example.com].
