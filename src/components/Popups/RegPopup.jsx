import React, { useState } from "react";
import Image from "next/image";
import "./Popup.sass";
import { useMutation } from "react-query";
import setData from "@/helpers/setData";
import { createNewUser } from "@/app/queries/users";
import ShowPasswordIcon from "./img/show-password.svg";
import HidePassword from "./img/hide-password.svg";

const content = {
  title: "Registration",
  username: "Username",
  email: "Email",
  password: "Password",
  btnText: "Go",
};

const RegPopup = ({ isOpen, onClose }) => {
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const showPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  // Request for creation new user
  const signUpMutation = useMutation((newUser) => {
    setData(createNewUser, { data: newUser }, "/system").then(
      (response) => {
        if (response.data.create_users_item) {
          onClose();
        } else {
          setError("This email has already used");
        }
      }
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpMutation.mutate({
      first_name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: "fb9d7c40-ab48-442e-a51b-b5ce9a490e56",
      status: "active",
    });
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
        <h4 className="frame-popup__title top">{content.title}</h4>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="frame-popup__input-wrapp"
        >
          <div className="frame-popup__input-box">
            <input
              className="frame-popup__input"
              type="text"
              placeholder={content.username}
              name="username"
              autoComplete="username"
              required
            />
          </div>
          <div className="frame-popup__input-box">
            <input
              className="frame-popup__input"
              type="email"
              placeholder={content.email}
              name="email"
              autoComplete="email"
              required
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
              className="frame-popup__input"
              type={isShowPassword ? "text" : "password"}
              placeholder={content.password}
              name="password"
              required
            />
          </div>
          {error ? <div>{error}</div> : null}
          <button type="submit" className="frame-popup__btn smller">
            <span className="frame-popup__btn-text">
              {content.btnText}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegPopup;
