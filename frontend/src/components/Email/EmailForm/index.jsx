// EmailForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEmail, updateEmail } from '../../../store/email';

const EmailForm = ({ emailToUpdate }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState({
    subject: emailToUpdate ? emailToUpdate.subject : '',
    message: emailToUpdate ? emailToUpdate.message : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailToUpdate) {
      dispatch(updateEmail({ ...email, id: emailToUpdate.id }));
    } else {
      dispatch(createEmail(email));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="subject"
        value={email.subject}
        onChange={handleChange}
        placeholder="Subject"
      />
      <textarea
        name="message"
        value={email.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">{emailToUpdate ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default EmailForm;
