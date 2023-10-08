import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactSlider from "react-slider";
import "./UserPreferModal.css";
import { FormModal } from "../../context/modal";
import { setFormPage, setformSlide } from "../../store/ui";

const UserPreferModal = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [temperature, setTemperature] = useState(1);
    const [presencePenalty, setPresencePenalty] = useState(0);
    const [frequencyPenalty, setFrequencyPenalty] = useState(0);
    const [maxTokens, setMaxTokens] = useState(255);
    const [userMessage, setUserMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            max_tokens: maxTokens,
            presence_penalty: presencePenalty,
            frequency_penalty: frequencyPenalty,
            temperature: temperature,
            messages: userMessage,
        };
        //dispatch create new user perference
    };

    const closeUserPreferModal = () => {
        setShowModal(false);
        dispatch(setformSlide("expand"));
    };

    return (
        <form className="user-modal-content" onSubmit={handleSubmit}>
            <div className="user-modal-header">
                <div>
                    <h1 style={{ fontSize: "20px" }}>Preference Selection</h1>
                </div>
            </div>
            <div className="user-modal-body">
                <div className="user-modal-body-row">
                    <div className="tooltip">
                        Output Randomness
                        <span className="tooltiptext">
                            Between 0 and 2, higher values will make the output
                            more random
                        </span>
                    </div>
                    <div>
                        <ReactSlider
                            value={temperature}
                            onAfterChange={(val) => {
                                setTemperature(val);
                            }}
                            orientation="horizontal"
                            min={0}
                            max={2}
                            className="horizontal-slider"
                            thumbClassName="temperature-thumb"
                            trackClassName="temperature-track"
                            renderThumb={(props, state) => (
                                <div {...props}>{state.valueNow}</div>
                            )}
                            step={0.1}
                        />
                    </div>
                </div>

                <div className="user-modal-body-row">
                    <div className="presencePenalty-label tooltip">
                        Content Repeatability
                        <span className="tooltiptext">
                            Number between -2.0 and 2.0, positive values
                            increasing the model's likelihood to talk about new
                            topics.
                        </span>
                    </div>
                    <div>
                        <ReactSlider
                            value={presencePenalty}
                            onAfterChange={(val) => {
                                setPresencePenalty(val);
                            }}
                            orientation="horizontal"
                            min={-2.0}
                            max={2.0}
                            className="horizontal-slider"
                            thumbClassName="presencePenalty-thumb"
                            trackClassName="presencePenalty-track"
                            renderThumb={(props, state) => (
                                <div {...props}>{state.valueNow}</div>
                            )}
                            step={0.1}
                        />
                    </div>
                </div>

                <div className="user-modal-body-row">
                    <div className="tooltip">
                        Word Repeatability
                        <span className="tooltiptext">
                            Number between -2.0 and 2.0, positive values
                            decreasing the model's likelihood to repeat the same
                            line verbatim
                        </span>
                    </div>
                    <div>
                        <ReactSlider
                            value={frequencyPenalty}
                            onAfterChange={(val) => {
                                setFrequencyPenalty(val);
                            }}
                            orientation="horizontal"
                            min={-2.0}
                            max={2.0}
                            className="horizontal-slider"
                            thumbClassName="frequencyPenalty-thumb"
                            trackClassName="frequencyPenalty-track"
                            renderThumb={(props, state) => (
                                <div {...props}>{state.valueNow}</div>
                            )}
                            step={0.1}
                        />
                    </div>
                </div>

                <div className="user-modal-body-row">
                    <div className="user-token-label tooltip">
                        Words Length Limit
                        <span className="tooltiptext">
                            The maximum number of words to generate in the AI
                            response
                        </span>
                    </div>
                    <div>
                        <input
                            type="number"
                            className="max-tokens-input"
                            onChange={(e) =>
                                setMaxTokens(Number(e.target.value))
                            }
                            value={maxTokens}
                            min={0}
                        />
                    </div>
                </div>

                <div className="user-modal-body-row">
                    <div className="user-message-label">
                        <h3>User Message</h3>
                    </div>
                    <div className="user-message-input">
                        <input
                            type="text"
                            onChange={(e) => setUserMessage(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="user-modal-submit-btn-container">
                <button className="user-modal-submit-btn">Submit</button>
            </div>
        </form>
    );
};

export default UserPreferModal;
