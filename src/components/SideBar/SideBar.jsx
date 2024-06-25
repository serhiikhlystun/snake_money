import React from 'react';
import './SideBar.sass';

const SideBar = ({ content, sideClass, onClick }) => {
    return (
        <div className={`sidebar ${sideClass}`}>
            {content.map((item, index) => (
                <button key={index} onClick={item.onClick || onClick} className={`sidebar__btn ${item.className || ''}`}>
                    <span>{item.content}</span>
                </button>
            ))}
        </div>
    );
}

export default SideBar;
