import React from 'react';

const HeaderNav = () => {
    return (
        <div className="header__nav">
            <a href="#" className="header__nav-item active">
                <span>HOME</span>
            </a>
            <a href="#" className="header__nav-item active">
                <span>BUY TOKEN</span>
            </a>
            <a href="#" className="header__nav-item active">
                <span>WHITEPAPER</span>
            </a>
            <a href="#" className="header__nav-item active">
                <span>TOKENOMICS</span>
            </a>
        </div>
    );
}

export default HeaderNav;
