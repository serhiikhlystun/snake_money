import React, { useEffect } from "react";
import Image from "next/image";
import "./Header.sass";

import logo from "/public/img/logo.svg";
import coin from "/public/img/coin.png";
import cup from "/public/img/cup.png";
import avatar from "./img/avatar.jpg";

import { signOut } from "next-auth/react";

const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;

const Header = ({ user, userData, updatedUserInfo, updatedUserAvatar }) => {
  const userAvatar = user && user.avatar ? user.avatar.id : null;
  
  return (
    <header className="header">
      <div className={`header__wrapper ${!user ? "no_user" : ""}`}>
        {user ? (
          <div className="header__avatar-inn">
            <div className="header__avatar-wrapp">
              {updatedUserAvatar ? 
              <Image
                className="header__avatar"
                width={120}
                height={120}
                src={updatedUserAvatar}
                alt=""
              /> :
              <Image
                className="header__avatar"
                width={120}
                height={120}
                src={userAvatar ? `${assetsUrl}/${userAvatar}?width=120&height=120` : avatar}
                alt=""
              />
            }
            </div>
            <div className="header__username-wrapp">
              <p className="header__username">
                {updatedUserInfo && updatedUserInfo.username
                  ? updatedUserInfo.username
                  : user.first_name}
              </p>
            </div>
          </div>
        ) : null}
        <Image
          className={`header__logo ${!user ? "no_user" : ""}`}
          width={399}
          height={71}
          src={logo}
          alt=""
        />
        {user ? (
          <div className="header__summary">
            <div className="header__summary-rate-wrapp">
              <div className="header__summary-box">
                <p className="header__summary-title">BEST ONE</p>
                <p className="header__summary-rate">
                  {userData ? userData.best_score.toFixed(2) : "0.00"}
                </p>
              </div>
              <Image className="header__summary-img" width={48} height={40} src={cup} alt="coin" />
            </div>
            <div className="header__coins-wrapp">
              <p className="header__coins-value">{userData ? userData.balance.toFixed(2) : "0.00"}</p>
              <Image className="header__coins-img" width={80} height={86} src={coin} alt="coin" />
            </div>
          </div>
        ) : null}
      </div>
      {user ? (
        <button className="frame-popup__btn smller" onClick={signOut}>
          <span className="frame-popup__btn-text">Logout</span>
        </button>
      ) : null}
    </header>
  );
};

export default Header;
