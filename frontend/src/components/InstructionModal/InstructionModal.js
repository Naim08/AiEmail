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
                        <div>Feature 2: Create new Email Responses
                            <li>Click on the "+" button in the dash page, you can create a new email input page. </li>
                            <li>Edit the corresponding position, and </li>
                        </div>
                        <br />
                        <div>ins1</div>
                        <div>ins1</div>
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
