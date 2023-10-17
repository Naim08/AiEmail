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
                            <li>Initiate a new email response by clicking the "+" icon on the dashboard, ushering you into a blank slate for your message composition.</li>
                            <li>Craft your message in the appropriate fields, then use the '>' button at the bottom right to submit your content to the AI API.</li>
                            <li>After a brief processing pause, the AI API delivers a response, with an option to effortlessly copy the text via a button at the response's lower right.</li>
                            <li>Enhance your control over response content by selecting the adjustment feature in the message field's upper right, opening a dedicated user preference modal.</li>
                            <li>This modal window serves as a command center for personalizing AI responses, enabling users to fine-tune content parameters to their liking.</li>
                        </div>
                        <br />

                        <div>Feature 3: Edit and Delete Previous Email Responses
                            <li>On the dash page, you can find all your previous emails.</li>
                            <li>You can edit your previous emails to get the new AI responses by clicking into the email body, editing the content, and then clicking the update button.</li>
                            <li>You can delete them by clicking on the trash button on each email's right bottom.</li>
                        </div>
                        <br />

                        <div>Feature 4: Find your Delete Emails
                            <li>Click the trash icon in the Navigation Bar to access all your deleted emails, offering a comprehensive view of your discarded items.</li>
                            <li>Within this trash section, you have the flexibility to either permanently clear all emails or selectively restore them individually.</li>
                        </div>
                        <br />

                        <div>Feature 5: Send your email
                            <li>After receiving the AI's drafted message, you can either refine it or immediately dispatch it.</li>
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
