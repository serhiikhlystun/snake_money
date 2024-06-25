import React, {useState} from 'react';
import "./Popup.sass";

const LoginPopup = ({isOpen, onClose,}) => {
    const content = {
        title: 'Login',
        email: 'Email',
        password: 'Password',
        btnText: 'Go',
    }

    if (!isOpen) return null;

    return (
        <div className="frame-popup">
            <div className="frame-popup__content">
                <button className="frame-popup__btn-close" onClick={onClose}></button>
                <h4 className="frame-popup__title">{content.title}</h4>
                <div className="frame-popup__input-wrapp">
                    <div className="frame-popup__input-box">
                        <input className="frame-popup__input" type="text" placeholder={content.email}/>
                    </div>
                    <div className="frame-popup__input-box">
                        <input className="frame-popup__input" type="password" placeholder={content.password}/>
                    </div>
                </div>
                <button className="frame-popup__btn">
                    <span className="frame-popup__btn-text">{content.btnText}</span>
                </button>
            </div>
        </div>
    );
};

export default LoginPopup;






