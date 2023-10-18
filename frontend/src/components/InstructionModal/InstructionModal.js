import "./InstructionModal.css";

const InstructionModal = ({ isActive, onClose, header }) => {
  const style = {
    color: "white",
  };

  return (
    <dialog className={`instr-modal modal-overlay ${isActive ? "active" : ""}`}>
      <div
        className="instr-modal-content modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {header && (
          <div style={style} className="modal-header">
            {header}
          </div>
        )}
        <div className="instr-modal-body" style={style}>
          <br />
          <div>
            Streamline your email communication with AI-powered responses.
            Here're the features:
          </div>
          <br />
          <div>
            <div>
              Feature 1: Connect Your Gmail Account
              <li>
                Select the 'Link Gmail' in the Navigation Bar to can login with
                your Gmail.
              </li>
            </div>
            <br />

            <div>
              Feature 2: Create new Email Responses
              <li>
                Clicking the <i className="fa-sharp fa-light fa-plus"></i> icon
                can start crafting a new email.
              </li>
              <li>
                Clicking the > button at the bottom right to submit your message
                to the AI API.
              </li>
              <li>
                Clicking the <i class="fa-sharp fa-light fa-sliders"></i> will
                pop up an user preference modal for personalizing AI responses.
              </li>
              <li>
                Clicking the <i className="fa-solid fa-copy"></i>can copy the AI
                responses.
              </li>
            </div>
            <br />

            <div>
              Feature 3: Edit and Delete Previous Email Responses
              <li>
                Clicking the <i className="fa-light fa-trash icon-light"></i>{" "}
                can delete the email to trash.
              </li>
              <li>
                Clicking the "update" button can get the new AI responses.
              </li>
            </div>
            <br />

            <div>
              Feature 4: Find your Delete Emails
              <li>
                Select the <i className="fa-light fa-trash icon-light"></i> icon
                in the Navigation Bar can access all your deleted emails.
              </li>
            </div>
            <br />

            <div>
              Feature 5: Send your email
              <li>Clicking the "send" button can send out email.</li>
            </div>
            <br />
          </div>
        </div>
        <div modal-footer>
          <button onClick={onClose}>Ok</button>
        </div>
      </div>
    </dialog>
  );
};

export default InstructionModal;
