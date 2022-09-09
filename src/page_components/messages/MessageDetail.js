import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { FireTokenContext } from "../../App";
import { useContext } from "react";

export default function MessageDetail() {
  const fireToken = useContext(FireTokenContext);
  const params = useParams();

  //   async function initiateChat() {
  //     const res = await fetch(
  //       process.env.REACT_APP_BACKEND_URL +
  //         "chat/messages/" +
  //         params.eventId +
  //         "/"
  //     );
  //   }

  useEffect(() => {
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
      .then((data) => console.log(data));

    const chatSocket = new WebSocket(
      "ws://localhost:8000/ws/chat/" + params.eventId + "/?token=" + fireToken
    );

    chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      document.querySelector("#chat-log").value += data.message + "\n";
    };

    chatSocket.onclose = function (e) {
      console.error("Chat socket closed unexpectedly");
    };

    document.querySelector("#chat-message-input").focus();
    document.querySelector("#chat-message-input").onkeyup = function (e) {
      if (e.keyCode === 13) {
        // enter, return
        document.querySelector("#chat-message-submit").click();
      }
    };

    document.querySelector("#chat-message-submit").onclick = function (e) {
      const messageInputDom = document.querySelector("#chat-message-input");
      const message = messageInputDom.value;
      chatSocket.send(
        JSON.stringify({
          message: message,
        })
      );
      messageInputDom.value = "";
    };
  }, []);
  return (
    <div>
      <textarea id="chat-log" cols="100" rows="20"></textarea>
      <input id="chat-message-input" type="text" size="100" />
      <input id="chat-message-submit" type="button" value="Send" />
    </div>
  );
}
