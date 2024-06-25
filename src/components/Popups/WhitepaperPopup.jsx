import React from 'react';
import "./Popup.sass";

const WhitepaperPopup = ({isOpen, onClose}) => {
    const content = {
        title: 'Whitepaper',
        text: 'Snake is a classic arcade game where the player maneuvers a growing line that resembles a snake. The objective is to eat the apples that randomly appear on the playing field, which makes the snake grow longer. The player must avoid running the snake into the walls or its own body. The game continues until the snake collides with an obstacle or the boundaries of the screen. With each apple eaten, the snake\'s length increases, making the game increasingly challenging to control. Snake tests the player\'s skills in planning, quick reflexes, and spatial awareness. Snake is a classic arcade game where the player maneuvers a growing line that resembles a snake. The objective is to eat the apples that randomly appear on the playing field, which makes the snake grow longer. The player must avoid running the snake into the walls or its own body. The game continues until the snake collides with an obstacle or the boundaries of the screen. With each apple eaten, the snake\'s length increases, making the game increasingly challenging to control. Snake tests the player\'s skills in planning, quick reflexes, and spatial awareness.',
    }

    if (!isOpen) return null;

    return (
        <div className="cloud-popup">
            <div className="cloud-popup__content">
                <button className="cloud-popup__btn-close" onClick={onClose}></button>
                <h4 className="cloud-popup__title">{content.title}</h4>
                <div className="cloud-popup__text-box">
                    <p className="cloud-popup__text">
                        {content.text}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhitepaperPopup;
