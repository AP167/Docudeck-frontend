import React, { useState } from 'react';
import { FaComments, FaPaperPlane } from 'react-icons/fa'; // Import the chat and send icons from react-icons
import './styles/Chatbot.css'; // Make sure to import the CSS file

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { text: inputValue, from: 'user' }];
      setMessages(newMessages);
      setInputValue('');
      // Simulate fetching AI-generated reply
      setTimeout(() => {
        setMessages([...newMessages, { text: 'AI reply', from: 'ai' }]);
      }, 1000);
      // Show loading dots for AI reply
      setMessages([...newMessages, { text: '', from: 'ai', loading: true }]);
    }
  };

  return (
    <div className="chatbot-container">
      {isChatOpen && (
        <div className="chat-interface">
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.from}`}>
                {msg.loading ? <div className="loading-dots">...</div> : <span className="message-text">{msg.text}</span>}
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
      <button className="chat-button" onClick={toggleChat}>
        <FaComments className="icon" />
        <span className="button-text">Ask any questions</span>
      </button>
    </div>
  );
};

export default Chatbot;