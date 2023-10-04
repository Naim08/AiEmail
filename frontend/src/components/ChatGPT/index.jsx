import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  clearMessageErrors,
  fetchMessages,
  fetchEmails,
  fetchChatGptModels,
} from "../../store/chatgpt";

function ChatGPTComponent() {
  const [userMessage, setUserMessage] = useState("");
  const messages = useSelector((state) => state.chatgpt.messages);
  const errors = useSelector((state) => state.chatgpt.errors);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(fetchMessages());
  //   }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userMessage.trim()) {
      dispatch(sendMessage({ prompt: userMessage }));
      setUserMessage("");
    }
  };

  const renderErrors = () => {
    if (errors.length > 0) {
      return (
        <div className="error-messages">
          {errors.map((error, idx) => (
            <div key={idx} className="error">
              {error}
            </div>
          ))}
          <button onClick={() => dispatch(clearMessageErrors())}>
            Clear Errors
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chat-gpt-container">
      <div className="chat-messages">
        {messages.map((message, idx) => (
          <div key={idx} className="message">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={() => dispatch(fetchChatGptModels())}>
        {" "}
        Fetch Models{" "}
      </button>
      <button onClick={() => dispatch(fetchEmails())}> Fetch Emails </button>
      {renderErrors()}
    </div>
  );
}

export default ChatGPTComponent;
