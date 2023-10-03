// src/components/CreateEmail.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmail } from '../../store/email'; // Adjust the path to your emailDuck.js file

function CreateEmail() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { isSending, email, error } = useSelector(state => state.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendEmail(subject, message));
  };

  return (
    <div className="create-email">
      <h2>Create Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </form>
      {email && <div className="success-message">Email sent successfully!</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default CreateEmail;
