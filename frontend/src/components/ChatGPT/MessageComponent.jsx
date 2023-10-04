function MessageComponent({ message }) {
  return (
    <div className="message">
      <div className="message-text">{message.response}</div>
    </div>
  );
}

export default MessageComponent;
