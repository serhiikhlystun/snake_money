import React from 'react';
import "./Popup.sass";

const AuthPopup = ({ isOpen, onLoginClick, onRegClick, onClose }) => {
    const content = {
        title: 'You are not Authorized',
        login: 'Login',
        registration: 'Registration',
        demo: 'Demo',
    }

    const handleLoginClick = () => {
        onLoginClick();
    };
    const handleRegClick = () => {
        onRegClick();
    };

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="frame-popup">
            <div className="frame-popup__content">
                <button className="frame-popup__btn-close" onClick={handleClose}></button>
                <h4 className="frame-popup__title">{content.title}</h4>
                <div className="frame-popup__btn-wrapper">
                    <button className="frame-popup__btn" onClick={handleLoginClick}>
                        <span className="frame-popup__btn-text">{content.login}</span>
                    </button>
                    <button className="frame-popup__btn" onClick={handleRegClick}>
                        <span className="frame-popup__btn-text">{content.registration}</span>
                    </button>
                </div>
                <div className="frame-popup__btn-wrapper">
                    <button className="frame-popup__btn smller">
                        <span className="frame-popup__btn-text">{content.demo}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPopup;
