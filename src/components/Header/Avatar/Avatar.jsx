import React from "react";
import "./Avatar.sass";
import avatarDefault from "./img/avatar-default.jpg";

const Avatar = () => {
    const userName = "Username"
    const handleClick = () => {
        const profileOverlay = document.getElementById('profile-overlay');
        const avatarUsername = document.getElementById('avatar-username');

        profileOverlay.classList.toggle('open');
        avatarUsername.classList.toggle('active')
    };

    return (
        <div className="avatar">
            <h4 className="avatar__username" id="avatar-username">
                {userName}
            </h4>
            <img
                className="avatar__img"
                src={avatarDefault}
                alt="avatar"
                onClick={handleClick} // Додати обробник кліку
            />
        </div>
    );
}

export default Avatar;
