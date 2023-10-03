import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createEmail, updateEmail } from '../../../store/email';
import "./EmailForm.css";

const EmailForm = ({ emailToUpdate }) => {
  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleExit = (e) => {
    e.preventDefault();
    history.push(`/dashpage`);
  }

  return (
    <div className='new-email-form-page'>
      <div className='exit-page-btn-div'>
        <i className="fa-sharp fa-regular fa-arrow-right-from-bracket fa-rotate-180 fa-xl exit-page-btn" onClick={handleExit}></i>
      </div>
      <div className='new-email-form-container'>
        <form onSubmit={handleSubmit} className='new-email-form'>
          <label>To:</label>
          <div className='new-email-to'>
            <input
              type="text"
              name="to"
              placeholder="To"
            />
          </div>
          <label>Subject:</label>
          <div className='new-email-subject'>
            <input
              type="text"
              name="subject"
              value={email.subject}
              onChange={handleChange}
              placeholder="Subject"
            />
          </div>
          <label>Body:</label>
          <div className='new-email-body' style={{ flexGrow: 1 }}>
            <textarea
              name="message"
              value={email.message}
              onChange={handleChange}
              placeholder="Message"
              style={{ height: '100%' }}
            />
          </div>
          <div className='new-email-form-btn'>
            <button type="submit">{emailToUpdate ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
