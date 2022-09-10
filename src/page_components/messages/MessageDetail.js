import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FireTokenContext, UserContext } from "../../App";
import { useContext } from "react";
import { useState } from "react";
import Avatar from "../../common/Avatar";

export default function MessageDetail() {
  const fireToken = useContext(FireTokenContext);
  const currentUser = useContext(UserContext);
  const params = useParams();
  const [eventUsers, setEventUsers] = useState([]);
  const [event, setEvent] = useState({});
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const webSocket = useRef(null);

  //   async function initiateChat() {
  //     const res = await fetch(
  //       process.env.REACT_APP_BACKEND_URL +
  //         "chat/messages/" +
  //         params.eventId +
  //         "/"
  //     );
  //   }

  useEffect(() => {
    webSocket.current = new WebSocket(
      "ws://localhost:8000/ws/chat/" + params.eventId + "/?token=" + fireToken
    );

    webSocket.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const newMessage = JSON.parse(data.message);
      setMessages((messages) => [...messages, newMessage]);
    };

    fetch(
      process.env.REACT_APP_BACKEND_URL + "events/" + params.eventId + "/",
      { headers: { Authorization: fireToken } }
    )
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        const users = data.invitations.map((invitation) => invitation.user);
        setEventUsers(users);
      });

    fetch(
      process.env.REACT_APP_BACKEND_URL +
        "chat/messages/" +
        params.eventId +
        "/",
      {
        headers: { Authorization: fireToken },
      }
    )
      .then((res) => res.json())
      .then(setMessages);

    webSocket.current.onclose = function (e) {
      console.error("Chat socket closed unexpectedly");
    };

    return () => webSocket.current.close();
  }, []);

  function handleSumbit() {
    webSocket.current.send(
      JSON.stringify({
        message: currentMessage,
      })
    );
    setCurrentMessage("");
  }

  return (
    <div className="h-full flex-auto">
      <div className="h-full min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="col-span-2 block">
          <div className="w-full">
            <div className="relative flex items-center p-3 border-b border-gray-300">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                alt="username"
              />
              <span className="block ml-2 font-bold text-gray-600">Emma</span>
              <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            </div>
            <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
              <ul className="space-y-2">
                {messages.map((message) => {
                  if (message.user !== currentUser.id) {
                    return (
                      <li key={message.id} className="flex justify-start">
                        <Avatar image={null} size={"6"} />
                        <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                          <span className="block">{message.message_text}</span>
                        </div>
                      </li>
                    );
                  }
                  return (
                    <li key={message.id} className="flex justify-end">
                      <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                        <span className="block">{message.message_text}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              <input
                type="text"
                placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                required
                onChange={(e) => setCurrentMessage(e.target.value)}
                value={currentMessage}
              />
              <button type="submit">
                <svg
                  className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onClick={() => handleSumbit()}
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
