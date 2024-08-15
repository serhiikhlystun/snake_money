import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "./Popup.sass";
import formatDate from "@/helpers/formatDate";
import { sortArrayByDate, sortArrayByDateUpdate, sortArrayByLastAccess } from "@/helpers/sortArrays";
import {
  createMessage,
  getUserChat,
  getGroupChats,
  getUsers,
  getChatUsersMessages,
  createChatParticipants,
  createChat,
  getSearchedUsers,
  updateLastMessage,
  getOneToOneChat,
} from "@/app/queries/chatQueries";
import { useMutation, useQuery } from "react-query";
import setData from "@/helpers/setData";
import fetchData from "@/helpers/fetchData";
import getData from "@/app/queries/getData";

import cash from "/public/img/cash.svg";
import cam from "/public/img/cam.svg";
import emoji from "/public/img/emoji.svg";
import att from "/public/img/att.svg";
import playIcon from "/public/img/playIcon.png";
import favicon from "./../../../public/img/favicon.png";

const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;

async function handleUsersFiltering({ queryKey }) {

  let variables = {};
  if (queryKey[1]) {
    variables = {
      value: queryKey[1],
    };
    const data = await fetchData(getSearchedUsers, { variables }, "/system", queryKey[2]);
    return data.data.users
  }
  if (queryKey[3]) {
    variables = { userId: queryKey[3] };
    const data = await fetchData(getUsers, { variables }, "/system", queryKey[2]);
    return data.data.users
  }
}

const ChatPopup = ({
  isOpen,
  onClose,
  token,
  user,
  messagesSubscriptionData,
  usersSubscriptionData,
  chatsSubscriptionData,
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [groups, setGroups] = useState([]);
  const [people, setPeople] = useState([]);
  const messagesEndRef = useRef(null);
  const [selectedChat, setSelectedChat] = useState();
  const [newChatId, setNewChatId] = useState("");
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [receivedMessage, setReceivedMessage] = useState();
  const [lastMessage, setLastMessage] = useState({});
  const [changedUserStatus, setChangedUserStatus] = useState();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Queries
  const { data: users, isSuccess: isUsersSuccess } = useQuery(
    ["users", inputSearchValue, token, user?.id],
    handleUsersFiltering,
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  const { data: groupChats, isSuccess: isGroupChatsSuccess } = useQuery(
    "chats",
    async () => await getData(getGroupChats, "chats", {}, token),
    {
      refetchOnWindowFocus: false,
    }
  );

  // Mutations
  const createMessageMutation = useMutation((chat_id) => {
    setData(createMessage, { content: input, chatId: chat_id }, "", token);
    setData(updateLastMessage, { message: input, chatId: chat_id }, "", token);
  });

  const createGroupChatParticipantsMutation = useMutation((chat_id) => {
    setData(createChatParticipants, { chatId: chat_id, userId: user.id }, "", token);
  });

  const createOneToOneChatMutation = useMutation((variables) => {
    setData(createChat, variables, "", token),
      {
        onSuccess: (response) => {
          setNewChatId(response.data.create_chats_item.id);
        },
      };
  });

  const createOneToOneChatParticipantsMutation = useMutation((user_id) => {
    setData(createChatParticipants, { chatId: newChatId, userId: user_id }, "", token);
    setData(createChatParticipants, { chatId: newChatId, userId: user.id }, "", token);
  });  

  // UseEffect calls
  useEffect(() => {
    if (isUsersSuccess && users) {
      setPeople(sortArrayByLastAccess(users));
    }
    if (isGroupChatsSuccess) {
      setGroups(sortArrayByDateUpdate(groupChats));
    }
  }, [users, isUsersSuccess, groupChats, isGroupChatsSuccess]);

  useEffect(() => {
    if (newChatId) {
      createOneToOneChatParticipantsMutation.mutate();
      newChatId;
    }
  }, [newChatId]);

  useEffect(() => {
    if (messagesSubscriptionData) {
      const receivedData = messagesSubscriptionData.messages_mutated.data;
      if (receivedData.user_created.id !== user.id) {
        const newMessage = {
          id: receivedData.id,
          content: receivedData.content,
          user_created: {
            first_name: receivedData.user_created.first_name,
            id: receivedData.user_created.id,
          },
          date_created: receivedData.date_created,
          chat_id: receivedData.chat_id.id,
        };
        setReceivedMessage(newMessage);
      }
    }
  }, [messagesSubscriptionData]);

  useEffect(() => {
    if (chatsSubscriptionData) {
      const receivedData = chatsSubscriptionData.chats_mutated.data;
      if (chatsSubscriptionData.chats_mutated.event === "create") {
        setNewChatId(receivedData.id);
      }
      if (chatsSubscriptionData.chats_mutated.event === "update") {
        setLastMessage({
          chat_id: receivedData.id,
          chat_last_message: receivedData.last_message,
        });
      }
    }
  }, [chatsSubscriptionData]);

  useEffect(() => {
    if (usersSubscriptionData) {
      if (usersSubscriptionData.directus_users_mutated.event === "update") {
        setChangedUserStatus({
          user_id: usersSubscriptionData.directus_users_mutated.data.id,
          is_online: usersSubscriptionData.directus_users_mutated.data.is_online,
        });
      }
    }
  }, [usersSubscriptionData]);

  useEffect(() => {
    if (messages.length) {
      if (selectedChat.id === receivedMessage.chat_id) {
        const isMessage = messages.filter((item) => item.id === receivedMessage.id);
        isMessage.length ? null : setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    }
  }, [receivedMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const helpedArr = groups;
    helpedArr.map((item) => {
      item.id === lastMessage.chat_id ? (item.last_message = lastMessage.chat_last_message) : null;
    });
    setGroups(helpedArr);
  }, [lastMessage]);

  useEffect(() => {
    const helpedArr = people;
    if (changedUserStatus !== undefined) {
      helpedArr.map((person) => {
        person.id === changedUserStatus.user_id
          ? (person.is_online = changedUserStatus.is_online)
          : null;
      });
      setPeople(helpedArr);

      if (selectedChat && changedUserStatus.user_id === selectedChat.user2_id) {
        setSelectedChat((prevState) => ({
          ...prevState,
          isUserOnline: changedUserStatus.is_online,
        }));
      }
    }
  }, [changedUserStatus]);

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (!selectedChat) {
      alert("Please, choose the chat first!");
      return;
    }
    if (input.trim()) {
      const userMessage = {
        content: input,
        user_created: {
          id: user.id,
        },
        date_created: new Date(),
      };
      setMessages([...messages, userMessage]);

      createMessageMutation.mutate(selectedChat.id);
      setInput("");
    }
  };

  const handleBotResponse = (userMessage) => {
    setTimeout(() => {
      const botMessage = {
        content: `You said: ${userMessage}`,
        user_created: {
          first_name: "bot",
        },
        date_created: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  // Select chat and get all messages from this chat or create new chat if it does not exist
  const handleSelectChat = async (chat) => {
    const isUserInChat = await getData(
      getUserChat,
      "chat_participants",
      { chatId: chat.id, userId: user.id },
      token
    );
    const isPersonalChat = await getData(
      getOneToOneChat,
      "chats",
      { users: [user.id, chat.id] },
      token
    );

    if (chat.type === "group") {
      if (!isUserInChat.length) {
        createGroupChatParticipantsMutation.mutate(chat.id);
      }
      setSelectedChat({
        id: chat.id,
        chat_name: chat.chat_name,
        chat_icon: chat.chat_icon ? chat.chat_icon.id : null,
      });

      const chatMessages = await getData(getChatUsersMessages, "messages", { chatId: chat.id }, token);
      chatMessages.length ? setMessages(sortArrayByDate(chatMessages)) : setMessages([]);
    } else {
      if (!isPersonalChat.length) {
        createOneToOneChatMutation.mutate({
          username: chat.first_name,
          user1: user.id,
          user2: chat.id,
        });
      } else {
        const personalChatMessages = await getData(
          getChatUsersMessages,
          "messages",
          { chatId: isPersonalChat[0].id },
          token
        );
        personalChatMessages.length
          ? setMessages(sortArrayByDate(personalChatMessages))
          : setMessages([]);
      }
      setSelectedChat({
        id: isPersonalChat.length ? isPersonalChat[0].id : newChatId,
        chat_name: chat.first_name,
        chat_icon: chat.avatar ? chat.avatar.id : null,
        type: "one_to_one",
        isUserOnline: chat.is_online,
        user2_id: chat.id,
      });
    }
  };

  return (
    <div className="chat-popup">
      <div className="chat-popup__content">
        <div className="chat-popup__btn-close-box">
          <button className="chat-popup__btn-close" onClick={onClose}></button>
        </div>
        <div className="chat-popup__chats">
          <div className="chat-popup__search-container">
            <svg
              className="chat-popup__search-icon"
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 28.5C18.6437 28.4994 21.3731 27.5586 23.5869 25.8274L30.5472 32.7877L32.786 30.5489L25.8257 23.5885C27.5579 21.3745 28.4993 18.6445 28.5 15.8334C28.5 8.84927 22.8174 3.16669 15.8333 3.16669C8.84921 3.16669 3.16663 8.84927 3.16663 15.8334C3.16663 22.8174 8.84921 28.5 15.8333 28.5ZM15.8333 6.33335C21.0725 6.33335 25.3333 10.5941 25.3333 15.8334C25.3333 21.0726 21.0725 25.3334 15.8333 25.3334C10.594 25.3334 6.33329 21.0726 6.33329 15.8334C6.33329 10.5941 10.594 6.33335 15.8333 6.33335Z"
                fill="#7C7C7C"
              />
            </svg>
            <input
              onChange={(e) => setInputSearchValue(e.target.value)}
              value={inputSearchValue}
              type="text"
              className="chat-popup__search"
              placeholder="Search"
            />
          </div>
          <div className="chat-popup__users groups">
            <h4 className="chat-popup__users-title">Groups</h4>
            <ul className="chat-popup__users-list">
              {groups.map((group, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectChat(group)}
                  className={`chat-popup__users-item ${
                    selectedChat?.id === group.id ? "selected" : ""
                  }`}
                >
                  <Image
                    className="chat-popup__users-item-img"
                    width={40}
                    height={40}
                    src={
                      group.chat_icon
                        ? `${assetsUrl}/${group.chat_icon.id}?width=40&height=40`
                        : favicon
                    }
                    alt={group.chat_name}
                  />
                  <div className="chat-popup__users-item-wrapp">
                    <div className="chat-popup__users-item-box">
                      <h5 className="chat-popup__users-item-username">{group.chat_name}</h5>
                      <p className="chat-popup__users-item-text">{group.last_message}</p>
                    </div>
                    <div className="chat-popup__users-item-box rightAlign">
                      <p className="chat-popup__users-item-time">
                        {formatDate(
                          new Date(group.date_updated ? group.date_updated : group.date_created)
                        )}
                      </p>
                      <p
                        className={`chat-popup__users-item-time-checked ${
                          group.messageCount !== 0 ? "unread" : ""
                        }`}
                      >
                        {group.messageCount > 0 ? group.messageCount : "✔"}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="chat-popup__users people">
            <h4 className="chat-popup__users-title">People</h4>
            <ul className="chat-popup__users-list">
              {people
                ? people.map((person, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectChat(person)}
                      className={`chat-popup__users-item ${
                        selectedChat?.user2_id === person.id ? "selected" : ""
                      }`}
                    >
                      <Image
                        className="chat-popup__users-item-img"
                        width={40}
                        height={40}
                        src={
                          person.avatar
                            ? `${assetsUrl}/${person.avatar.id}?width=40&height=40`
                            : favicon
                        }
                        alt={person.first_name}
                      />
                      <div className="chat-popup__users-item-wrapp">
                        <div className="chat-popup__users-item-box">
                          <h5 className="chat-popup__users-item-username">{person.first_name}</h5>
                          <p className="chat-popup__users-item-text">{}</p>
                        </div>
                        <div className="chat-popup__users-item-box rightAlign">
                          <p className="chat-popup__users-item-time">
                            {person.last_access && formatDate(person.last_access)}
                          </p>
                          <p
                            className={`chat-popup__users-item-time-checked ${
                              person.messageCount !== 0 ? "unread" : ""
                            }`}
                          >
                            {person.messageCount > 0 ? person.messageCount : "✔"}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="chat-popup__chat">
          <div className="chat-popup__chat-header">
            <div className="chat-popup__chat-header-box">
              <h5 className="chat-popup__chat-header-title">
                {selectedChat ? selectedChat.first_name || selectedChat.chat_name : null}
              </h5>
              {selectedChat?.type === "one_to_one" ? (
                <p className="chat-popup__chat-header-subtitle">
                  {selectedChat.isUserOnline ? "Online" : "Offline"}
                </p>
              ) : null}
            </div>
            {selectedChat ? (
              <Image
                className="chat-popup__chat-header-avatar"
                width={64}
                height={64}
                src={
                  selectedChat.chat_icon
                    ? `${assetsUrl}/${selectedChat.chat_icon}?width=64&height=64`
                    : favicon
                }
                alt="chat_icon"
              />
            ) : null}
          </div>
          <div className="chat-popup__chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-popup__chat-message ${
                  message?.user_created.id === user.id ? "user" : "bot"
                }`}
              >
                {message?.user_created.id !== user.id ? (
                  <Image
                    className="chat-popup__users-item-img"
                    width={40}
                    height={40}
                    src={
                      message.user_created.avatar
                        ? `${assetsUrl}/${message.user_created.avatar.id}?width=40&height=40`
                        : favicon
                    }
                    alt={message.user_created.first_name}
                  />
                ) : null}
                <div className="chat-popup__chat-message-box">
                  <div className="chat-popup__chat-message-text">
                    <p className="chat-popup__chat-message-username">
                      {message.user_created.first_name}
                    </p>
                    {message?.content}
                  </div>
                  <div className="chat-popup__chat-message-time">
                    {message?.date_created && formatDate(message.date_created)}
                  </div>
                </div>
                {message?.user_created.id === user.id ? (
                  <Image
                    className="chat-popup__users-item-img"
                    width={40}
                    height={40}
                    src={user.avatar ? `${assetsUrl}/${user.avatar.id}?width=40&height=40` : favicon}
                    alt={user.first_name}
                  />
                ) : null}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-popup__chat-input-inner">
            <div className="chat-popup__chat-input-container">
              <input
                type="text"
                className="chat-popup__chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message here..."
              />
              <div className="chat-popup__chat-input-icons">
                <div className="chat-popup__chat-input-icons-box">
                  <Image src={att} alt="att" />
                  <Image src={cash} alt="cash" />
                </div>
                <div className="chat-popup__chat-input-icons-box">
                  <Image src={emoji} alt="emoji" />
                  <Image src={cam} alt="cam" />
                </div>
              </div>
            </div>
            <button type="button" onClick={handleSendMessage} className="chat-popup__chat-send-button">
              <Image src={playIcon} width={32} height={40} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
