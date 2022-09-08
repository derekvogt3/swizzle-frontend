import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { FireTokenContext } from "../../App";
import { useState } from "react";
import SimpleMap from "../../common/SimpleMap";
import { CalendarIcon } from "@heroicons/react/solid";

import Attendees from "./Attendees";

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
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return date;
  }
  console.log(event);

  const attendeesToInclude = !loading
    ? event.invitations.filter((invitation) => {
        if (invitation.status === "accepted") {
          return true;
        }
        return false;
      })
    : null;

  return (
    <div className="flex flex-col items-center m-2">
      <div className="flex flex-col gap-2 max-w-5xl w-full">
        <div className="bg-white shadow rounded-lg flex flex-col w-full">
          <SimpleMap
            latLng={{ lat: event.location_lat, lng: event.location_lng }}
            h={"200px"}
            w={"100%"}
          ></SimpleMap>
          <div className="flex flex-col p-4">
            <div className="flex">
              <p className="text-xl font-bold text-swizblue">{event.name}</p>
            </div>
            <div className="flex items-center mt-4">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <p className="flex-shrink-0 font-normal text-gray-500">
                {formattedDate()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <div className="grow bg-white shadow rounded-lg flex flex-col p-4">
            <Attendees
              loading={loading}
              attendees={attendeesToInclude}
              event={event}
            />
          </div>
          <div className="grow bg-white shadow rounded-lg flex flex-col p-4">
            <div>
              <h1>Invitationsadkfjaskldjfas ldfasdfdf</h1>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
