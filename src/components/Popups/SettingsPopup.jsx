import React, { useState } from "react";
import Image from "next/image";
import "./Popup.sass";
import avatar from "../Header/img/avatar.jpg";
import { useMutation, useQueryClient } from "react-query";
import { updateCurrentUser } from "@/app/queries/users";
import setData from "@/helpers/setData";

const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;
const apiUrl = process.env.NEXT_PUBLIC_REST_API;

const SettingsPopup = ({
  isOpen,
  onClose,
  user,
  handleUpdate,
  updatedUserInfo,
  handleUpdateUserAvatar,
  token
}) => {
  const [imageSrc, setImageSrc] = useState("");
  const queryClient = useQueryClient();

  const userAvatar = user && user.avatar ? user.avatar.id : null;

  // Upload file from the input field and update an avatar
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        handleUpdateUserAvatar(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
      handleUpload(selectedFile)
    }
  };

  const content = {
    title: "Account",
    username: updatedUserInfo.username,
    email: updatedUserInfo.email,
    newPassword: "New pass",
    repeatPassword: "Repeat Password",
    updateBtn: "UPDATE",
    uploadBtn: "UPLOAD",
    changeBtn: "CHANGE",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(e);
  };

  // Request for upload image to the server
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${apiUrl}/files`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error uploading file');
    }

    const data = await response.json();
    return data.data.id;
  };

  // Request for update user avatar from uploaded image
  const updateUserAvatar = async (fileId) => {
    const response = await fetch(`${apiUrl}/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ avatar: fileId })
    });

    if (!response.ok) {
      throw new Error('Error updating user avatar');
    }
  };

  // Mutation for upload and update user's avatar
  const updateAvatarMutation = useMutation(uploadImage, {
    onSuccess: async (fileId) => {
      await updateUserAvatar(fileId);
      queryClient.invalidateQueries('user');
      alert('Avatar updated successfully!');
    },
    onError: (error) => {
      console.error('Error:', error);
      alert('Error uploading file or updating avatar');
    }
  });

  // Call the mutation for update user's avatar
  const handleUpload = (file) => {
    if (file) {
      updateAvatarMutation.mutate(file);
    }
  };

  // Mutation for change user's password
  const updatePasswordMutation = useMutation(updatedUser => {
      setData(updateCurrentUser, { data: updatedUser }, '/system', token);
    },{
      onSuccess: ()=>{alert("Password changed successfully")}
    }
  )

  // Call mutation for change user's password
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if(e.target.password.value === e.target.repeat_password.value){
      updatePasswordMutation.mutate({
        password: e.target.password.value
      })
    } else {
      alert('Passwords does not match')
    };
  }

  if (!isOpen) return null;

  return (
    <div className="frame-popup">
      <div className="frame-popup__content spacing">
        <button className="frame-popup__btn-close" onClick={onClose}></button>
        <h4 className="frame-popup__title">{content.title}</h4>
        <div className="frame-popup__profile">
          <div className="frame-popup__profile-box">
            <form className="frame-popup__input-wrapp full" onSubmit={handleSubmit}>
              <div className="frame-popup__input-box">
                <input
                  className="frame-popup__input"
                  type="text"
                  name="username"
                  placeholder={content.username}
                  defaultValue={content.username}
                />
              </div>
              <div className="frame-popup__input-box">
                <input
                  className="frame-popup__input"
                  type="email"
                  name="email"
                  placeholder={content.email}
                  defaultValue={content.email}
                />
              </div>
              <button type="submit" className="frame-popup__profile-btn">
                <span className="frame-popup__profile-btn-text">{content.updateBtn}</span>
              </button>
            </form>
          </div>
          <div className="frame-popup__profile-box">
            <div className="frame-popup__profile-img">
              {imageSrc ? (
                <Image src={imageSrc} width={145} height={145} alt="" />
              ) : (
                <Image
                  src={userAvatar ? `${assetsUrl}/${userAvatar}?width=145&height=145` : avatar}
                  width={145}
                  height={145}
                  alt=""
                />
              )}
            </div>
            <label htmlFor="input-file" className="frame-popup__profile-btn">
              <input
                id="input-file"
                type="file"
                className="frame-popup__input-file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <span className="frame-popup__profile-btn-text">{content.uploadBtn}</span>
            </label>
          </div>
          <form className="frame-popup__profile column" onSubmit={handleUpdatePassword}>
            <h5 className="frame-popup__profile-title">Change Password</h5>
            <div className="frame-popup__input-wrapp inline">
              <div className="frame-popup__input-box">
                <input
                  name="password"
                  className="frame-popup__input"
                  type="password"
                  placeholder={content.newPassword}
                />
              </div>
              <div className="frame-popup__input-box">
                <input
                  name="repeat_password"
                  className="frame-popup__input"
                  type="password"
                  placeholder={content.repeatPassword}
                />
              </div>
            </div>
            <button type="submit" className="frame-popup__profile-btn center">
              <span className="frame-popup__profile-btn-text">{content.changeBtn}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
