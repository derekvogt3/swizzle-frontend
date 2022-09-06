import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { FireTokenContext } from "../../App";
import { useState } from "react";

export default function EventDetail() {
  const fireToken = useContext(FireTokenContext);
  const params = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/events/" + params.eventId + "/", {
      headers: { Authorization: fireToken },
    })
      .then((res) => res.json())
      .then((data) => setEvent(data));
  }, []);

  return (
    <div>
      <div>{event.name}</div>
      <div>{event.name}</div>
    </div>
  );
}
