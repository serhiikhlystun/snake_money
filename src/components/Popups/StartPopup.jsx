import React from "react";
import "./Popup.sass";
import Link from "next/link";

const StartPopup = ({ isOpen, onClose }) => {
  const content = {
    title: "Get Started",
    text0: "Game/2$",
    text1: "Tournaments",
    text2: "Create room",
  };

  if (!isOpen) return null;

  return (
    <div className="frame-popup">
      <div className="frame-popup__content">
        <button className="frame-popup__btn-close" onClick={onClose}></button>
        <h4 className="frame-popup__title">{content.title}</h4>
        <div className="frame-popup__btn-wrapper">
          <Link href={"https://demo.snakemoneygame.com/?color=21"} className="frame-popup__btn">
            <button className="frame-popup__btn">
              <span className="frame-popup__btn-text">{content.text0}</span>
            </button>
          </Link>
        </div>
        <div className="frame-popup__btn-wrapper">
          <button className="frame-popup__btn" disabled>
            <span className="frame-popup__btn-text">{content.text1}</span>
          </button>
          <button className="frame-popup__btn" disabled>
            <span className="frame-popup__btn-text">{content.text2}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPopup;
