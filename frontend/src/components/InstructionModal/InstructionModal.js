import "./InstructionModal.css";


const InstructionModal = ({isActive, onClose, header}) =>{
    const style = {
        color: "black",
      };


    return (
        <dialog className={`instr-modal modal-overlay ${isActive ? 'active' : ''}` }>
            <div className="instr-modal-content modal-content" onClick={(e) => e.stopPropagation()}>
               {header &&  <div style={style} className="modal-header">{header}</div>}
                <div className="instr-modal-body" style={style}>
                    <div>Streamline your email communication with AI-powered responses. To get started, follow the features below:</div>
                    <br />
                    <div>
                        <div>Feature 1: Connect Your Gmail Account
                            <li>In the Navigation Bar, you can find the 'Link Gmsaail' section. </li>
                            <li>Click on it, you'll be prompted to log in to your Gmail account and authorize MailTo to manage your emails.</li>
                        </div>
                        <br />

                        <div>Feature 2: Create Email Responses
                            <li>Click on the "+" button on the dash page, you can create a new email input page. </li>
                            <li>Edit the corresponding position, and click the right bottom button {">"}, and you will send your content to AI API.</li>
                            <li>Wait for a while, you will receive the response from AI API. You can copy the response by clicking the copy button at the right bottom of the response.</li>
                            <li>You can open up a user preference modal by clicking the adjust button at the right-top of the message field.</li>
                            <li>Through the user preference modal, you can adjust the content of the AI responses.</li>
                        </div>
                        <br />

                        <div>Feature 3: Edit and Delete Previous Email Responses
                            <li>In the dash page, you can find your previous emails.</li>
                            <li>You can edit your previous emails to get the new AI responses by click into th email body, and edit the content, then click the update button.</li>
                            <li>You can delete them by click on th trash button on each email's right bottom.</li>
                        </div>
                        <br />

                        <div>Feature 4: Find your Delete Emails
                            <li>You can find all the emails deleted when you click the trash button in the Navigation Bar.</li>
                            <li>You can delete all the emails in the trash or restore them one by one.</li>
                        </div>
                        <br />

                        <div>Feature 5: Send your email
                            <li>Once you get the response from the AI, you will have two options: update your message to get a new response or copy the current response and send it to someone</li>
                            <li>You can use the "update" button at the right bottom of the message body to get a new response.</li>
                            <li>Or you can use the "send" button at the right bottom of the message body to send out your email.</li>
                        </div>
                        <br />
                    </div>
                </div>
                <div modal-footer>
                    <button onClick={onClose}>Ok</button>
                </div>
            </div>
        </dialog>
    )

}

export default InstructionModal;
