"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./../sass/main.sass";
import "./../sass/HomePage.sass";
import RotateMessage from "./../components/RotateMessage/RotateMessage";
import Header from "./../components/Header/Header";
import SideBar from "./../components/SideBar/SideBar";
import Slider from "./../components/Slider/Slider";
import LoginPopup from "./../components/Popups/LoginPopup";

import StartPopup from "./../components/Popups/StartPopup";
import RegPopup from "./../components/Popups/RegPopup";
import SettingsPopup from "./../components/Popups/SettingsPopup";
import AboutPopup from "./../components/Popups/AboutPopup";
import WhitepaperPopup from "./../components/Popups/WhitepaperPopup";
import ReferralsPopup from "./../components/Popups/ReferralsPopup";
import ChatPopup from "./../components/Popups/ChatPopup";
import AuthPopup from "@/components/Popups/AuthPopup";

import fixIcon from "/public/img/fix.svg";
import chatIcon from "/public/img/chat.svg";
import icon01 from "/public/img/icon01.jpg";
import icon02 from "/public/img/icon02.jpg";
import icon03 from "/public/img/icon03.jpg";
import icon04 from "/public/img/icon04.jpg";
import icon05 from "/public/img/icon05.jpg";
import icon06 from "/public/img/icon06.jpg";

import { useSession } from "next-auth/react";
import { useQuery, useMutation } from "react-query";
import { getCurrentUser, getUserData, createUserData, updateCurrentUser } from "./queries/users";
import fetchData from "@/helpers/fetchData";
import getData from "./queries/getData";
import setData from "@/helpers/setData";

function App() {
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < 900);
  const [regPopupOpen, setRegPopupOpen] = useState(false);
  const [aboutPopupOpen, setAboutPopupOpen] = useState(false);
  const [whitepaperPopupOpen, setWhitepaperPopupOpen] = useState(false);
  const [startPopupOpen, setStartPopupOpen] = useState(false);
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);
  const [settingsPopupOpen, setSettingsPopupOpen] = useState(false);
  const [referralsPopupOpen, setReferralsPopupOpen] = useState(false);
  const [chatPopupOpen, setChatPopupOpen] = useState(false);
  const [authPopupOpen, setAuthPopupOpen] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({});
  const [userAvatar, setUserAvatar] = useState("");

  const { data: session, status } = useSession();

  const { data: user, isSuccess: isUserSuccess } = useQuery(
    ["currentUser"],
    async () => await fetchData(getCurrentUser, {}, "/system", session.user.accessToken),
    {
      enabled: status === "authenticated",
      refetchOnWindowFocus: false,
    }
  );

  const { data: userData, isSuccess: isUserDataSucces } = useQuery(
    "userData",
    async () => await getData(getUserData, "user_data", { user_id: user.id }, session.user.accessToken),
    {
      enabled: isUserSuccess,
      refetchOnWindowFocus: false,
    }
  );

  const createUserDataMutation = useMutation(
    "createUserData",
    async () => await setData(createUserData, { user_id: user.id })
  );

  const updateUserMutation = useMutation((updatedUser) => {
    status === "authenticated" &&
      setData(updateCurrentUser, { data: updatedUser }, "/system", session.user.accessToken);
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserMutation.mutate({
      email: e.target.email.value ? e.target.email.value : user.email,
      first_name: e.target.username.value ? e.target.username.value : user.first_name,
    });
  };

  useEffect(() => {
    if (userData && !userData.length) {
      createUserDataMutation.mutate(user.id);
    }
  }, [userData]);

  const openStartPopup = () => {
    setStartPopupOpen(true);
  };
  const openLoginPopup = () => {
    setLoginPopupOpen(true);
  };
  const openRegPopup = () => {
    setRegPopupOpen(true);
  };
  const openAboutPopup = () => {
    setAboutPopupOpen(true);
  };
  const openWhitepaperPopup = () => {
    setWhitepaperPopupOpen(true);
  };
  const openSettingsPopup = () => {
    setSettingsPopupOpen(true);
  };
  const openReferralsPopup = () => {
    setReferralsPopupOpen(true);
  };
  const openChatPopup = () => {
    setChatPopupOpen(true);
  };
  const openAuthPopup = () => {
    setAuthPopupOpen(true);
  };

  const closePopups = () => {
    setStartPopupOpen(false);
    setLoginPopupOpen(false);
    setRegPopupOpen(false);
    setSettingsPopupOpen(false);
    setAboutPopupOpen(false);
    setWhitepaperPopupOpen(false);
    setReferralsPopupOpen(false);
    setChatPopupOpen(false);
    setAuthPopupOpen(false);
  };

  const handleUpdateUserInfo = (email, username) => {
    setUpdatedUserInfo({
      email: email,
      username: username,
    });
  };

  const handleUpdateUserAvatar = (img) => {
    setUserAvatar(img);
  };

  const sidebarContentLeft = [
    { content: "DEPOSIT" },
    { content: "WITHDRAW", onClick: openReferralsPopup },
    {
      content: <Image src={fixIcon} alt="fix icon" />,
      className: "square",
      onClick: session ? openSettingsPopup : openAuthPopup,
    },
  ];

  const sidebarContentRight = [
    { content: "WHITEPAPER", onClick: openWhitepaperPopup },
    { content: "ABOUT", onClick: openAboutPopup },
    {
      content: <Image src={chatIcon} alt="chat icon" />,
      className: "square",
      onClick: openChatPopup,
    },
  ];

  const groups = [
    {
      img: icon01,
      name: "Friends Forever",
      text: "Message from Group 1",
      time: "Today, 10:00 AM",
      messageCount: 2,
    },
    {
      img: icon02,
      name: "Mera Gang",
      text: "Message from Group 2",
      time: "Yesterday, 11:00 AM",
      messageCount: 0,
    },
    {
      img: icon03,
      name: "Hiking",
      text: "Message from Group 3",
      time: "May 15, 12:00 PM",
      messageCount: 1,
    },
    {
      img: icon02,
      name: "Car fest",
      text: "Message from Group 3",
      time: "May 15, 12:00 PM",
      messageCount: 1,
    },
    {
      img: icon01,
      name: "Drunking",
      text: "Message from Group 3",
      time: "May 15, 12:00 PM",
      messageCount: 1,
    },
  ];

  const people = [
    {
      img: icon01,
      name: "Jonny",
      text: "Message from Person 1",
      time: "Today, 1:00 PM",
      messageCount: 0,
    },
    {
      img: icon02,
      name: "Pedro",
      text: "Message from Person 2",
      time: "Yesterday, 2:00 PM",
      messageCount: 3,
    },
    {
      img: icon03,
      name: "Martin",
      text: "Message from Person 3",
      time: "May 10, 3:00 PM",
      messageCount: 0,
    },
    {
      img: icon04,
      name: "Fernando",
      text: "Message from Person 4",
      time: "May 9, 4:00 PM",
      messageCount: 0,
    },
    {
      img: icon05,
      name: "Arni",
      text: "Message from Person 5",
      time: "May 8, 5:00 PM",
      messageCount: 5,
    },
    {
      img: icon06,
      name: "Person 6",
      text: "Message from Person 6",
      time: "May 7, 6:00 PM",
      messageCount: 0,
    },
    {
      img: icon01,
      name: "Person 7",
      text: "Message from Person 7",
      time: "May 6, 7:00 PM",
      messageCount: 0,
    },
    {
      img: icon02,
      name: "Person 8",
      text: "Message from Person 8",
      time: "May 5, 8:00 PM",
      messageCount: 1,
    },
    {
      img: icon03,
      name: "Person 9",
      text: "Message from Person 9",
      time: "May 4, 9:00 PM",
      messageCount: 0,
    },
    {
      img: icon04,
      name: "Person 10",
      text: "Message from Person 10",
      time: "May 3, 10:00 PM",
      messageCount: 2,
    },
    {
      img: icon05,
      name: "Person 11",
      text: "Message from Person 11",
      time: "May 2, 11:00 PM",
      messageCount: 0,
    },
    {
      img: icon06,
      name: "Person 12",
      text: "Message from Person 12",
      time: "May 1, 12:00 AM",
      messageCount: 0,
    },
    {
      img: icon01,
      name: "Person 13",
      text: "Message from Person 13",
      time: "April 30, 1:00 AM",
      messageCount: 0,
    },
    {
      img: icon02,
      name: "Person 14",
      text: "Message from Person 14",
      time: "April 29, 2:00 AM",
      messageCount: 0,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isPortrait && <RotateMessage />}
      <div className="homepage">
        <div className="container">
          <Header
            user={user}
            updatedUserAvatar={userAvatar}
            updatedUserInfo={updatedUserInfo}
            userData={isUserDataSucces ? userData[0] : null}
          />
          <SideBar content={sidebarContentLeft} sideClass="left" />
          <Slider
            openStartPopup={openStartPopup}
            closePopups={closePopups}
            openLoginPopup={openLoginPopup}
            openRegPopup={openRegPopup}
            session={session}
          />
          <SideBar content={sidebarContentRight} sideClass="right" />
        </div>
      </div>
      <LoginPopup isOpen={loginPopupOpen} onClose={closePopups} />
      <RegPopup isOpen={regPopupOpen} onClose={closePopups} />
      <StartPopup isOpen={startPopupOpen} onClose={closePopups} />
      <SettingsPopup
        isOpen={settingsPopupOpen}
        onClose={closePopups}
        user={user}
        handleUpdate={handleUpdate}
        handleUpdateUserInfo={handleUpdateUserInfo}
        updatedUserInfo={updatedUserInfo}
        handleUpdateUserAvatar={handleUpdateUserAvatar}
        token={session?.user.accessToken}
      />
      <AuthPopup
        isOpen={authPopupOpen}
        onClose={() => {
          setAuthPopupOpen(false);
        }}
        onLoginClick={openLoginPopup}
        onRegClick={openRegPopup}
      />
      <AboutPopup isOpen={aboutPopupOpen} onClose={closePopups} />
      <WhitepaperPopup isOpen={whitepaperPopupOpen} onClose={closePopups} />
      <ReferralsPopup isOpen={referralsPopupOpen} onClose={closePopups} />
      <ChatPopup isOpen={chatPopupOpen} onClose={closePopups} groups={groups} people={people} />
    </>
  );
}

export default App;
