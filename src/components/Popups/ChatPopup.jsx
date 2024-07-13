import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "./Popup.sass";
import { format } from "date-fns";
import { createDirectus, realtime, staticToken } from "@directus/sdk";
import { useSession } from "next-auth/react";

import icon05 from "/public/img/icon05.jpg";
import cash from "/public/img/cash.svg";
import cam from "/public/img/cam.svg";
import emoji from "/public/img/emoji.svg";
import att from "/public/img/att.svg";
import playIcon from "/public/img/playIcon.png";

const apiUrl = process.env.NEXT_PUBLIC_REST_API;

const ChatPopup = ({ isOpen, onClose, groups, people, token }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const client = createDirectus(apiUrl).with(staticToken(token)).with(realtime());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const cleanup = client.onWebSocket("message", function (data) {
      if (data.type == "auth" && data.status == "ok") {
        subscribe("create");
      }
    });

    client.connect();

    return cleanup;
  }, []);

  async function subscribe(event) {
    const { subscription } = await client.subscribe("chat", {
      event,
      query: {
        fields: ["*", "user_created.first_name"],
      },
    });

    for await (const message of subscription) {
      receiveMessage(message);
    }
  }

  function receiveMessage(data) {
    if (data.type == "subscription" && data.event == "init") {
      console.log("subscription started");
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = {
        text: input,
        sender: "user",
        time: format(new Date(), "eeee, h:mmaaa"),
      };
      setMessages([...messages, userMessage]);
      setInput("");
      handleBotResponse(userMessage.text);
    }
  };

  const handleBotResponse = (userMessage) => {
    setTimeout(() => {
      const botMessage = {
        text: `You said: ${userMessage}`,
        sender: "bot",
        time: format(new Date(), "eeee, h:mmaaa"),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
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
            <input type="text" className="chat-popup__search" placeholder="Search" />
          </div>
          <div className="chat-popup__users groups">
            <h4 className="chat-popup__users-title">Groups</h4>
            <ul className="chat-popup__users-list">
              {groups.map((group, index) => (
                <li key={index} className="chat-popup__users-item">
                  <Image
                    className="chat-popup__users-item-img"
                    width={40}
                    height={40}
                    src={group.img}
                    alt={group.name}
                  />
                  <div className="chat-popup__users-item-wrapp">
                    <div className="chat-popup__users-item-box">
                      <h5 className="chat-popup__users-item-username">{group.name}</h5>
                      <p className="chat-popup__users-item-text">{group.text}</p>
                    </div>
                    <div className="chat-popup__users-item-box rightAlign">
                      <p className="chat-popup__users-item-time">{group.time}</p>
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
              {people.map((person, index) => (
                <li key={index} className="chat-popup__users-item">
                  <Image
                    className="chat-popup__users-item-img"
                    width={40}
                    height={40}
                    src={person.img}
                    alt={person.name}
                  />
                  <div className="chat-popup__users-item-wrapp">
                    <div className="chat-popup__users-item-box">
                      <h5 className="chat-popup__users-item-username">{person.name}</h5>
                      <p className="chat-popup__users-item-text">{person.text}</p>
                    </div>
                    <div className="chat-popup__users-item-box rightAlign">
                      <p className="chat-popup__users-item-time">{person.time}</p>
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
              ))}
            </ul>
          </div>
        </div>
        <div className="chat-popup__chat">
          <div className="chat-popup__chat-header">
            <div className="chat-popup__chat-header-box">
              <h5 className="chat-popup__chat-header-title">Martin</h5>
              <p className="chat-popup__chat-header-subtitle">Online</p>
            </div>
            <Image
              className="chat-popup__chat-header-avatar"
              width={64}
              height={64}
              src={icon05}
              alt=""
            />
          </div>
          <div className="chat-popup__chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chat-popup__chat-message ${message.sender}`}>
                <div className="chat-popup__chat-message-text">{message.text}</div>
                <div className="chat-popup__chat-message-time">{message.time}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="chat-popup__chat-input-inner">
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
                  <Image src={att} alt="" />
                  <Image src={cash} alt="" />
                </div>
                <div className="chat-popup__chat-input-icons-box">
                  <Image src={emoji} alt="" />
                  <Image src={cam} alt="" />
                </div>
              </div>
            </div>
            <button type="submit" className="chat-popup__chat-send-button">
              <Image src={playIcon} width={32} height={40} alt="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
