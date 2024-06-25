import React from "react";

import Header from '../components/Header/Header';
import ProfilePopup from "../components/Popups/ProfilePopup";
import chatLogo from "./img/logo.svg"

import './ChatPage.sass';
import ChatWindow from "../components/ChatWindow/ChatWindow";

const ChatPage = () => {
    const navContent = [
        ProfilePopup,
    ];

    return (
        <div className="chat">
            <div className="container">
                <div className="chat__inner">
                    <div>
                        <Header/>
                        <h2 className="chat-title mob">Chat</h2>
                    </div>
                    <div className="chat__wrapp">
                        <ChatWindow/>
                    </div>
                </div>
                <div className="chat__logo-wrapp">
                    <img src={chatLogo} alt="" className="chat__logo"/>
                </div>
            </div>
        </div>);
}

export default ChatPage;
