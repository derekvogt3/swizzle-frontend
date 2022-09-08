import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { FireTokenContext } from "../../App";
import { useState } from "react";
import SimpleMap from "../../common/SimpleMap";

export default function EventDetail() {
  const fireToken = useContext(FireTokenContext);
  const params = useParams();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      process.env.REACT_APP_BACKEND_URL + "events/" + params.eventId + "/",
      {
        headers: { Authorization: fireToken },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(event);
        setEvent(data);
        setLoading(false);
      });
  }, []);

  function formattedDate() {
    if (JSON.stringify(event) === "{}") {
      return "";
    }
    const date = new Date(event.event_datetime).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return date;
  }

  return (
    <div className="flex justify-center">
      <div className="grow bg-white shadow rounded-lg m-2 flex flex-col max-w-5xl">
        <SimpleMap
          latLng={{ lat: event.location_lat, lng: event.location_lng }}
          h={"200px"}
          w={"100%"}
        ></SimpleMap>
        <div className="flex flex-col p-2">
          <div className="flex">
            <p className="text-xl font-bold text-swizpurp">{event.name}</p>
            <p>{formattedDate()}</p>
          </div>
        </div>
        Attendees
        {!loading ? (
          event.invitations.map((invitation) => {
            if (invitation.status === "accepted") {
              return <p>{invitation.user.first_name}</p>;
            }
          })
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  );
}
