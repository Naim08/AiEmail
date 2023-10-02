import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const EmailForm = ()=>{
    const [senderEmail, setSenderEmail] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    return (
        <form>
            <input
            type="text"
            value={senderEmail}
            onChange={e => setSenderEmail(e.target.value)}
            placeholder="From:"
            />

            <input
            type="text"
            value={receiverEmail}
            onChange={e => setReceiverEmail(e.target.value)}
            placeholder="To:"
            />

            <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Subject:"
            />

            <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Message:"
            />

        </form>
    )
}
