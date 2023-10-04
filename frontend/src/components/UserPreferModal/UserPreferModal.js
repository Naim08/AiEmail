import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactSlider from "react-slider";
import "./UserPreferModal.css"
import { FormModal } from "../../context/modal";
import { setFormPage, setformSlide } from "../../store/ui";

const UserPreferModal = () =>{
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [functionCall, setFunctionCall] = useState("none");
    const [temperature, setTemperature] = useState(1);
    const [presencePenalty, setPresencePenalty] = useState(0);
    const [frequencyPenalty, setFrequencyPenalty] = useState(0);
    const [maxTokens, setMaxTokens] = useState(0);

    const handleSubmit = (e)=>{
        e.preventDefault();
        //dispatch create new user perference
    }

    const closeUserPreferModal = ()=>{
        dispatch(setShowModal(false));
        dispatch(setFormPage("start"));
        dispatch(setformSlide("expand"));
    }

    return (
        <FormModal onClose={closeUserPreferModal}>
            <form className="user-modal-content" onSubmit={handleSubmit}>
                <div className="user-modal-header">
                    <div className="user-modal-header-img">
                        <i className="fa-solid fa-bullseye fa-2xl"></i>
                    </div>
                    <div>
                        <h1>Set Your preference</h1>
                    </div>
                </div>
                <div className="user-modal-body">

                    <div className="user-modal-body-row">
                        <div>
                            <h3>functionCall</h3>
                        </div>
                        <div>
                            <button  className="functionCall-btn" onClick={()=> setFunctionCall("none") }>none</button>
                            <button className="functionCall-btn" onClick={()=> setFunctionCall("auto")}>auto</button>
                        </div>
                    </div>

                    <div className="user-modal-body-row">
                        <div>
                            <h3>temperature</h3>
                        </div>
                        <div >
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
                                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                step={0.1}
                            />
                        </div>
                    </div>

                    <div className="user-modal-body-row">
                        <div>
                            <h3>Presence Penalty</h3>
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
                                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                    step={0.1}
                                />
                        </div>
                    </div>

                    <div className="user-modal-body-row">
                        <div>
                            <h3>Frequency Penalty</h3>
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
                                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                    step={0.1}
                                />
                        </div>
                    </div>

                    <div className="user-modal-body-row">
                        <div>
                            <h3>Max Tokens</h3>
                        </div>
                        <div>
                            <input
                                type="number"
                                className="max-Tokens-input"
                                onChange={(e)=>setMaxTokens(Number(e.target.value))}
                                // value={maxTokens}
                                min={0}
                            />
                        </div>
                    </div>

                </div>
                <div className="user-modal-submit-btn">
                    <button>Done</button>
                </div>
            </form>
        </FormModal>
    )


}

export default UserPreferModal;
