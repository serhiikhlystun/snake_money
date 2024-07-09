import React, { useState } from "react";
import "./Popup.sass";
import Image from "next/image";
import { signIn } from "next-auth/react";

import ShowPasswordIcon from "./img/show-password.svg";
import HidePassword from "./img/hide-password.svg";

const content = {
  title: "Login",
  email: "Email",
  password: "Password",
  btnText: "Go",
};

const LoginPopup = ({ isOpen, onClose }) => {
  const [error, setError] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const showPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
      callbackUrl: `${window.location.origin}`,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="frame-popup">
      <div className="frame-popup__content">
        <button
          className="frame-popup__btn-close"
          onClick={handleClose}
        ></button>
        <h4 className="frame-popup__title">{content.title}</h4>
        <form
          onSubmit={handleSubmit}
          className="frame-popup__input-wrapp"
        >
          <div className="frame-popup__input-box">
            <input
              name="email"
              className="frame-popup__input"
              type="email"
              placeholder={content.email}
              required
              autoComplete="email"
            />
          </div>
          <div className="frame-popup__input-box">
            {isShowPassword ? (
              <Image
                onClick={showPassword}
                className="frame-popup__input-box-icon"
                src={ShowPasswordIcon.src}
                alt="showPass"
                width={25}
                height={25}
              />
            ) : (
              <Image
                onClick={showPassword}
                className="frame-popup__input-box-icon"
                src={HidePassword.src}
                alt="hidePass"
                width={25}
                height={25}
              />
            )}
            <input
              name="password"
              className="frame-popup__input"
              type={isShowPassword ? "text" : "password"}
              placeholder={content.password}
              required
            />
          </div>
          <button className="frame-popup__btn">
            <span className="frame-popup__btn-text">
              {content.btnText}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
