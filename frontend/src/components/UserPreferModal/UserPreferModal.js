import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactSlider from "react-slider";
import "./UserPreferModal.css";
import { FormModal } from "../../context/modal";
import { setFormPage, setformSlide } from "../../store/ui";
import { updateUserPreferences } from "../../store/userPreference";


const UserPreferModal = () => {
    const dispatch = useDispatch();
    const temperatureFromRedux = useSelector(
        (state) => state.userPreferenceReducer.temperature
    );
    const presencePenaltyFromRedux = useSelector(
        (state) => state.userPreferenceReducer.presence_penalty
    );
    const frequencyPenaltyFromRedux = useSelector(
        (state) => state.userPreferenceReducer.frequency_penalty
    );
    const maxTokensFromRedux = useSelector(
        (state) => state.userPreferenceReducer.max_tokens
    );
    const [showModal, setShowModal] = useState(false);

    const [temperature, setTemperature] = useState(temperatureFromRedux);
    const [presencePenalty, setPresencePenalty] = useState(
        presencePenaltyFromRedux
    );
    const [frequencyPenalty, setFrequencyPenalty] = useState(
        frequencyPenaltyFromRedux
    );
    const [maxTokens, setMaxTokens] = useState(maxTokensFromRedux);
    const [userMessage, setUserMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            max_tokens: maxTokens,
            presence_penalty: presencePenalty,
            frequency_penalty: frequencyPenalty,
            temperature: temperature,
            userMessage: userMessage,
        };
        //dispatch create new user perference

        dispatch(updateUserPreferences(formData));
    }

    return (
        <form className="user-modal-content" onSubmit={handleSubmit}>
            <div className="user-modal-header">
                <div className="user-modal-header-img">
                    {/* <i className="fa-solid fa-bullseye fa-2xl"></i> */}
                </div>
                <div>
                    <h1 style={{ fontSize: "2em" }}>Response Preferences</h1>
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
                            value={maxTokens}
                            onChange={(e) =>
                                setMaxTokens(Number(e.target.value))
                            }
                            // value={maxTokens}
                            min={1}
                        />
                    </div>
                </div>

                <div className="user-modal-body-row">
                    <div className="user-messgae-label">
                        <h3>User Message</h3>
                    </div>
                    <div className="user-messgae-input">
                        <input
                            type="text"
                            onChange={(e) => setUserMessage(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="user-modal-submit-btn-container">
                <button className="user-modal-submit-btn">Done</button>
            </div>
        </form>
    );
};

export default UserPreferModal;
