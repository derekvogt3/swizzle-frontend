import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FireTokenContext, UserContext } from "../../App";
import { useContext } from "react";
import { useState } from "react";
import Avatar from "../../common/Avatar";

export default function MessageDetail() {
  const [loading, setLoading] = useState(true);
  const fireToken = useContext(FireTokenContext);
  const currentUser = useContext(UserContext);
  const params = useParams();
  const [eventUsers, setEventUsers] = useState([]);
  const [event, setEvent] = useState({});
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const webSocket = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    webSocket.current = new WebSocket(
      process.env.REACT_APP_BACKEND_WS + "ws/chat/" + params.eventId + "/"

      // removing for now to deploy to production sooner than later
      // +
      // "/?token=" +
      // fireToken
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
        setLoading(false);
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

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSumbit() {
    webSocket.current.send(
      JSON.stringify({
        user: currentUser.id,
        message: currentMessage,
      })
    );
    setCurrentMessage("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSumbit();
    }
  }

  return (
    <>
      <div className="flex-none flex justify-center mt-2">
        <div className="grow rounded shadow rounded-lg max-w-5xl">
          <div className="relative flex items-center p-3 border-b border-gray-300">
            <span className="block ml-2 font-bold text-gray-600">
              {event.name}
            </span>
          </div>
        </div>
      </div>
      <div
        className="relative left-1/2 flex-auto flex flex-col items-center overflow-auto max-w-5xl border"
        style={{ transform: "translateX(-50%)" }}
      >
        <div className="max-w-5xl w-screen min-h-full h-auto">
          <div>
            {messages.map((message) => {
              if (message.user !== currentUser.id) {
                return (
                  <>
                    {!loading ? (
                      <div key={message.id}>
                        <div className="flex justify-start items-end">
                          <div className="px-2">
                            <Avatar image={message.user.avatar} size={"6"} />
                          </div>
                          <div>
                            <p className="text-sm  mt-1 text-gray-500">
                              {eventUsers.find(
                                (user) => message.user === user.id
                              ).first_name +
                                " " +
                                eventUsers.find(
                                  (user) => message.user === user.id
                                ).last_name}
                            </p>

                            <div className="max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                              <span className="block">
                                {message.message_text}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                );
              }
              return (
                <div>
                  <div key={message.id} className="flex justify-end">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow mx-4 my-2">
                      <span className="block">{message.message_text}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={divRef} className="adsfasdfa"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-none justify-center">
        <div className="grow flex items-center justify-between p-3 shadow border-t border-gray-300 mb-2 max-w-5xl">
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
            onKeyDown={handleKeyDown}
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
    </>
  );
}
