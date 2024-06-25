import React from 'react';
import "./Popup.sass";

const WhitepaperPopup = ({isOpen, onClose}) => {
    const content = {
        title: 'Referrals',

    }

    if (!isOpen) return null;

    return (
        <div className="cloud-popup">
            <div className="cloud-popup__content">
                <button className="cloud-popup__btn-close" onClick={onClose}></button>
                <h4 className="cloud-popup__title">{content.title}</h4>

                <div className="cloud-popup__table">
                    <div className="cloud-popup__table">
                        <div className="cloud-popup__table-title-wrapp cloud-popup__table-row">
                            <div className="cloud-popup__table-title">username</div>
                            <div className="cloud-popup__table-title">bonus</div>
                            <div className="cloud-popup__table-title">date</div>
                        </div>
                        <div className="cloud-popup__table-row">
                            <div className="cloud-popup__table-cell">john_doe</div>
                            <div className="cloud-popup__table-cell">$50</div>
                            <div className="cloud-popup__table-cell">2024-05-01</div>
                        </div>
                        <div className="cloud-popup__table-row">
                            <div className="cloud-popup__table-cell">jane_smith</div>
                            <div className="cloud-popup__table-cell">$30</div>
                            <div className="cloud-popup__table-cell">2024-05-02</div>
                        </div>
                        <div className="cloud-popup__table-row">
                            <div className="cloud-popup__table-cell">alex_jones</div>
                            <div className="cloud-popup__table-cell">$75</div>
                            <div className="cloud-popup__table-cell">2024-05-03</div>
                        </div>
                        <div className="cloud-popup__table-row">
                            <div className="cloud-popup__table-cell">maria_garcia</div>
                            <div className="cloud-popup__table-cell">$20</div>
                            <div className="cloud-popup__table-cell">2024-05-04</div>
                        </div>
                        <div className="cloud-popup__table-row">
                            <div className="cloud-popup__table-cell">li_wang</div>
                            <div className="cloud-popup__table-cell">$100</div>
                            <div className="cloud-popup__table-cell">2024-05-05</div>
                        </div>
                        <div className="cloud-popup__table-row">
                            <div className="cloud-popup__table-cell">sara_kim</div>
                            <div className="cloud-popup__table-cell">$45</div>
                            <div className="cloud-popup__table-cell">2024-05-06</div>
                        </div>
                        <div className="cloud-popup__table-row">
                            <div className="cloud-popup__table-cell">mike_brown</div>
                            <div className="cloud-popup__table-cell">$60</div>
                            <div className="cloud-popup__table-cell">2024-05-07</div>
                        </div>
                        <div className="cloud-popup__table-row">
                            <div className="cloud-popup__table-cell">nina_lee</div>
                            <div className="cloud-popup__table-cell">$35</div>
                            <div className="cloud-popup__table-cell">2024-05-08</div>
                        </div>
                        <div className="cloud-popup__table-row">
                            <div className="cloud-popup__table-cell">tom_wilson</div>
                            <div className="cloud-popup__table-cell">$80</div>
                            <div className="cloud-popup__table-cell">2024-05-09</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default WhitepaperPopup;
