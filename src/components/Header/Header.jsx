import React from 'react';
import Image from 'next/image';
import './Header.sass';

import logo from '/public/img/logo.svg';
import coin from '/public/img/coin.png';
import cup from '/public/img/cup.png';
import avatar from './img/avatar.jpg';

const Header = () => {
    const usename = 'Pedro Del Martinez';

    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__avatar-inn">
                    <div className="header__avatar-wrapp">
                        <Image className="header__avatar" width={120} height={120} src={avatar} alt=""/>
                    </div>
                    <div className="header__username-wrapp">
                        <p className="header__username">{usename}</p>
                    </div>
                </div>
                <Image className="header__logo" width={399} height={71} src={logo} alt=""/>
                <div className="header__summary">
                    <div className="header__summary-rate-wrapp">
                        <div className="header__summary-box">
                            <p className="header__summary-title">BEST ONE</p>
                            <p className="header__summary-rate">5.00</p>
                        </div>
                        <Image className="header__summary-img" width={48} height={40} src={cup} alt="coin"/>
                    </div>
                    <div className="header__coins-wrapp">
                        <p className="header__coins-value">
                            13.00
                        </p>
                        <Image className="header__coins-img" width={80} height={86} src={coin} alt="coin"/>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
