import React from 'react';
import Image from 'next/image';
import "./Popup.sass";
import avatar from "../Header/img/avatar.jpg";

const SettingsPopup = ({isOpen, onClose,}) => {
    const content = {
        title: 'Account',
        username: 'Pedro',
        email: 'snake@game.com',
        newPassword: 'New pass',
        repeatPassword: 'Repeat Password',
        updateBtn: 'UPDATE',
        uploadBtn: 'UPLOAD',
        changeBtn: 'CHANGE',
    }

    if (!isOpen) return null;

    return (
        <div className="frame-popup">
            <div className="frame-popup__content spacing">
                <button className="frame-popup__btn-close" onClick={onClose}></button>
                <h4 className="frame-popup__title">{content.title}</h4>
                <div className="frame-popup__profile">
                    <div className="frame-popup__profile-box">
                        <div className="frame-popup__input-wrapp full">
                            <div className="frame-popup__input-box">
                                <input className="frame-popup__input" type="text" placeholder={content.username} value={content.username}/>
                            </div>
                            <div className="frame-popup__input-box">
                                <input className="frame-popup__input" type="email" placeholder={content.email} value={content.email}/>
                            </div>
                        </div>
                        <button className="frame-popup__profile-btn">
                            <span className="frame-popup__profile-btn-text">{content.updateBtn}</span>
                        </button>
                    </div>
                    <div className="frame-popup__profile-box">
                        <div className="frame-popup__profile-img">
                            <Image src={avatar} width={145} height={145} alt=""/>
                        </div>
                        <button className="frame-popup__profile-btn">
                            <span className="frame-popup__profile-btn-text">{content.uploadBtn}</span>
                        </button>
                    </div>
                </div>
                <div className="frame-popup__profile column">
                    <h5 className="frame-popup__profile-title">
                        Change Password
                    </h5>
                    <div className="frame-popup__input-wrapp inline">
                        <div className="frame-popup__input-box">
                            <input className="frame-popup__input" type="text" placeholder={content.newPassword} value={content.newPassword}/>
                        </div>
                        <div className="frame-popup__input-box">
                            <input className="frame-popup__input" type="email" placeholder={content.repeatPassword} value={content.repeatPassword}/>
                        </div>
                    </div>
                    <button className="frame-popup__profile-btn center">
                        <span className="frame-popup__profile-btn-text">{content.changeBtn}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPopup;






