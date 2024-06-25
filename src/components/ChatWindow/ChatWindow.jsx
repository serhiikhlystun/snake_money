import React, {useState} from 'react';
import Image from 'next/image';

import "./ChatWindow.sass"

import sendBtn from "./img/send-btn.svg"

const ChatWindow = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted value:', inputValue);
    };

    return (
        <div className="chat-window" onSubmit={handleSubmit}>
            <div className="chat-window__inn">
                <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter something..."
                    className="chat-window__textarea"
                />
                <div className="chat-window__btn">
                    <Image src={sendBtn} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
