import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  clearMessageErrors,
  fetchMessages,
  fetchEmails,
  fetchChatGptModels,
  getMessages,
} from "../../store/chatgpt";

import { sendGmail } from "../../store/email";
function ChatGPTComponent() {
  const [userMessage, setUserMessage] = useState("");
  const messages = useSelector(getMessages);
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
        {Object.values(messages).map((message, idx) => (
          <div key={idx} className="message">
            <div className="message-prompt">{message.prompt}</div>
            <div className="message-text">{message.response}</div>
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
      <button onClick={() => dispatch(sendGmail({ email: "email" }))}>
        {" "}
        Send Email
      </button>
      {renderErrors()}
    </div>
  );
}

export default ChatGPTComponent;
