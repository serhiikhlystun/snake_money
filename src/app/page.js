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

import { useSession } from "next-auth/react";
import { useQuery, useMutation } from "react-query";
import { getCurrentUser, getUserData, createUserData, updateCurrentUser } from "./queries/users";
import fetchData from "@/helpers/fetchData";
import getData from "./queries/getData";
import setData from "@/helpers/setData";
import {
  messagesSubscription,
  chatsSubscription,
  usersSubscription,
  userOnlineMutated,
} from "./queries/chatQueries";
import { getWebSocketClient } from "@/helpers/getWebSocketClient";

function App() {
  const [client, setClient] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isPortrait, setIsPortrait] = useState(false);
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
  const [usersSubscriptionData, setUsersSubscriptionData] = useState();
  const [messagesSubscriptionData, setMessagesSubscriptionData] = useState();
  const [chatsSubscriptionData, setChatsSubscriptionData] = useState();
  const [isUserOnline, setIsUserOnline] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if(session){
      const wsClient = getWebSocketClient(session.user.accessToken);
      setClient(wsClient);
    }
  }, [session]);

  useEffect(() => {
    if (client) {
      setIsUserOnline(true);
      // Subscribe to the client
      const unsubscribeMessages = client.subscribe(
        {
          query: messagesSubscription,
        },
        {
          next: ({ data }) => {
            console.log(data);
            setMessagesSubscriptionData(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {},
        }
      );

      const unsubscribeChats = client.subscribe(
        {
          query: chatsSubscription,
        },
        {
          next: ({ data }) => {
            setChatsSubscriptionData(data);
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {},
        }
      );

      const unsubscribeUsers = client.subscribe(
        {
          query: usersSubscription,
        },
        {
          next: ({ data }) => {
            console.log(data);
            setUsersSubscriptionData(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {},
        }
      );

      return () => {
        unsubscribeMessages(); // Clean up the subscription when the component unmounts
        unsubscribeChats();
        unsubscribeUsers();
      };
    }
  }, [client]);

  // Query for getting current user's system info
  const { data: user, isSuccess: isUserSuccess } = useQuery(
    ["currentUser"],
    async () => await fetchData(getCurrentUser, {}, "/system", session?.user.accessToken),
    {
      enabled: status === "authenticated",
      refetchOnWindowFocus: false,
      onSuccess: (user)=>setCurrentUser(user),
    }
  );

  // Query for getting current user's game account data
  const { data: userData, isSuccess: isUserDataSucces } = useQuery(
    "userData",
    async () =>
      await getData(getUserData, "user_data", { user_id: user.id }, session?.user.accessToken),
    {
      enabled: isUserSuccess,
      refetchOnWindowFocus: false,
    }
  );

  // Create current user's game account data
  const createUserDataMutation = useMutation(
    "createUserData",
    async () => await setData(createUserData, { user_id: user.id })
  );

  // Update user's system info
  const updateUserMutation = useMutation(async (updatedUser) => {
    status === "authenticated" &&
      (await setData(updateCurrentUser, { data: updatedUser }, "/system", session.user.accessToken));
  });

  // Change users status
  const isOnlineMutation = useMutation(async (isOnline) => {
    status === "authenticated" &&
      (await setData(
        userOnlineMutated,
        { userId: user.id, isOnline: isOnline },
        "/system",
        session.user.accessToken
      )),
      {
        enabled: isUserSuccess,
      };
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserMutation.mutate({
      email: e.target.email.value ? e.target.email.value : user.email,
      first_name: e.target.username.value ? e.target.username.value : user.first_name,
    });
    setUpdatedUserInfo({
      email: e.target.email.value ? e.target.email.value : user.email,
      username: e.target.username.value ? e.target.username.value : user.first_name,
    });
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsUserOnline(false);
      isOnlineMutation.mutate(false);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (user) {
      isOnlineMutation.mutate(isUserOnline);
    }
  }, [isUserOnline, user]);

  useEffect(() => {
    if (userData && !userData.length) {
      createUserDataMutation.mutate(user.id);
    }
    if (user) {
      setUpdatedUserInfo({ email: user.email, username: user.first_name });
    }
  }, [userData, user]);

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

  // Update user's avatar in the Header
  const handleUpdateUserAvatar = (id) => {
    setCurrentUser((prevState)=>({
      ...prevState,
      avatar: {id: id}
    }))
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
      onClick: session ? openChatPopup : openAuthPopup,
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
            user={currentUser}
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
      {session ? (
        <ChatPopup
          isOpen={chatPopupOpen}
          onClose={closePopups}
          token={session.user.accessToken}
          user={currentUser}
          usersSubscriptionData={usersSubscriptionData}
          messagesSubscriptionData={messagesSubscriptionData}
          chatsSubscriptionData={chatsSubscriptionData}
        />
      ) : null}
    </>
  );
}

export default App;
