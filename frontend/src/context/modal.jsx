import "./modal.css";
import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFormSlide, setformSlide } from "../store/ui";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function ServerToolTip({ top, onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className="server-tooltip" onMouseEnter={onClose} style={{ top: top }}>
      {children}
    </div>,
    modalNode
  );
}

export function ActionToolTip({ top, left, onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div
      className="action-tooltip"
      style={{ top: top, left: left }}
      onMouseEnter={onClose}
    >
      {children}
    </div>,
    modalNode
  );
}

export function NavToolTip({ top, left, onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div
      className="nav-tooltip"
      style={{ top: top, left: left }}
      onMouseEnter={onClose}
    >
      {children}
    </div>,
    modalNode
  );
}

export function TimeToolTip({ top, left, pointerOffset, onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;
  const pointerLeft = `calc(-50% + ${pointerOffset || 0}px)`;

  return ReactDOM.createPortal(
    <div
      className="time-tooltip"
      style={{ top: top, left: left }}
      onMouseEnter={onClose}
    >
      {children}
      <div className="time-tooltip-pointer" style={{ left: pointerLeft }} />
    </div>,
    modalNode
  );
}

export function FormModal({ onClose, children }) {
  const slide = useSelector(getFormSlide);
  const dispatch = useDispatch();

  useEffect(() => {
    if (slide === "close") dispatch(setformSlide("expand"));

    const escListener = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", escListener);

    return () => {
      document.removeEventListener("keydown", escListener);
      dispatch(setformSlide("expand"));
    };
  }, []);

  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className="modal-form">
      <div className="modal-form-background" onClick={onClose} />
      <div
        className={`modal-content ${
          slide === "expand" || slide === "close" ? slide : ""
        }`}
      >
        {children}
      </div>
    </div>,
    modalNode
  );
}

export function DropdownModal({ onClose, children }) {
  useEffect(() => {
    const escListener = (e) => {
      if (e.key === "Escape") onClose();
    };

    const clickListener = (e) => {
      if (e.target.closest(".server-settings-dropdown")) return;
      else if (e.target.closest(".server-settings") === null) onClose();
    };

    document.addEventListener("keydown", escListener);
    document.addEventListener("mousedown", clickListener);
    return () => {
      document.removeEventListener("keydown", escListener);
      document.removeEventListener("mousedown", clickListener);
    };
  }, []);

  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className="dropdown-modal">{children}</div>,
    modalNode
  );
}

export function SettingPageModal({ onClose, children }) {
  useEffect(() => {
    const escListener = (e) => {
      const deleteModal = document.querySelector(".delete-form");
      if (e.key === "Escape" && !deleteModal) onClose();
    };

    document.addEventListener("keydown", escListener);
    return () => {
      document.removeEventListener("keydown", escListener);
    };
  }, []);

  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className="setting-page-modal">{children}</div>,
    modalNode
  );
}
