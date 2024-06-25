import React, { useState } from 'react';
import './Slider.sass';
import SliderComponent from "./SliderComponent";
import { Navigation } from "swiper/modules";
import AuthPopup from "../Popups/AuthPopup";

const Slider = ({ openLoginPopup, openRegPopup }) => {
    const [popupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    return (
        <div className="slider">
            <SliderComponent modules={[Navigation]} />
            <button className="slider__btn" onClick={openPopup}>
                <span className="slider__btn-text">Play</span>
            </button>

            <AuthPopup isOpen={popupOpen} onClose={closePopup} onLoginClick={openLoginPopup} onRegClick={openRegPopup} />
        </div>
    );
};

export default Slider;
