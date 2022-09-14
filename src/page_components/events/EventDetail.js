import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { FireTokenContext } from "../../App";
import { useState } from "react";
import SimpleMap from "../../common/SimpleMap";
import { CalendarIcon } from "@heroicons/react/solid";
import CurrentInvitation from "./CurrentInvitation";
import { Link } from "react-router-dom";

import Attendees from "./Attendees";
import { ChevronRightIcon } from "@heroicons/react/outline";

export default function EventDetail() {
  const fireToken = useContext(FireTokenContext);
  const params = useParams();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({});

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
      .then((data) => {
        if (data.length !== 0) {
          setMessage(data[data.length - 1]);
        }
      });

    fetch(
      process.env.REACT_APP_BACKEND_URL + "events/" + params.eventId + "/",
      {
        headers: { Authorization: fireToken },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      });
  }, []);

  function formattedDate() {
    if (JSON.stringify(event) === "{}") {
      return "";
    }
    const obj = new Date(event.event_datetime);
    const today = new Date();

    const date = obj.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const time = obj.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    const diffTime = Math.abs(obj - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return [date, time, diffDays];
  }

  const attendeesToInclude = !loading
    ? event.invitations.filter((invitation) => {
        if (invitation.status === "accepted") {
          return true;
        }
        return false;
      })
    : null;

  function getMostRecentMessageUser() {
    if (attendeesToInclude) {
      const user = attendeesToInclude.find(
        (attendee) => attendee.user.id === message.user
      );
      return user;
    }
    return "";
  }

  return (
    <div className="flex flex-col items-center m-2">
      <div className="flex flex-col gap-2 max-w-5xl w-full">
        <div className="bg-white shadow rounded-lg flex flex-col w-full">
          <SimpleMap
            latLng={{ lat: event.location_lat, lng: event.location_lng }}
            h={"200px"}
            w={"100%"}
          ></SimpleMap>

          <div className="flex justify-between p-4">
            <div className="flex flex-col">
              <p className="text-xl font-bold text-swizblue">{event.name}</p>{" "}
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-gray-600">{event.location_name}</p>
              </div>
            </div>
            <Link
              to={"/messages/" + params.eventId}
              className="relative w-64 h-14 bg-white shadow border rounded-lg flex justify-between items-center hover:bg-gray-200 p-2"
            >
              {message.message_text ? (
                <div>
                  <p className="flex-shrink-0 font-normal text-swizblue-light ">
                    {getMostRecentMessageUser()?.user?.first_name + " says:"}
                  </p>

                  <p className="text-swizblue-light truncate w-40">
                    {'"' + message.message_text + '"'}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="flex-shrink-0 font-normal text-swizblue-light ">
                    no messages yet
                  </p>

                  <p className="flex-shrink-0 font-normal text-swizblue-light truncate">
                    start a chat
                  </p>
                </div>
              )}
              <div className="flex">
                <p className="flex-shrink-0 font-normal text-swizblue-light  ">
                  Chat
                </p>
                <ChevronRightIcon className="h-6 w-6 text-swizblue-light" />
              </div>
              <span className="absolute top-0 right-0 block h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-red-400 ring-2 ring-white" />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 items-start">
          <div className="grow">
            <div className="bg-white shadow rounded-lg flex flex-col p-4">
              <Attendees
                loading={loading}
                attendees={attendeesToInclude}
                event={event}
              />
            </div>
            <div className="bg-white shadow rounded-lg flex flex-col p-4 mt-2 h-24">
              {event.description === "" ? (
                <p className="flex-shrink-0 font-normal text-gray-500">
                  There is no description for this event
                </p>
              ) : (
                <p className="font-normal text-gray-500 whitespace-pre-wrap">
                  {event.description}
                </p>
              )}
            </div>
          </div>
          <div className="grow">
            <div className="bg-white shadow rounded-lg flex justify-between items-center p-2 h-24">
              <div className="flex items-center">
                <CalendarIcon
                  className="mr-1.5 h-14 w-14 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <p className="flex-shrink-0 font-normal text-gray-500">
                    {formattedDate()[0]}
                  </p>
                  <p className="flex-shrink-0 font-normal text-gray-500">
                    {formattedDate()[1]}
                  </p>
                </div>
              </div>
              <div className="flex p-2">
                <p className="flex-shrink-0 text-lg font-bold text-swizpink mr-1">
                  {formattedDate()[2]}
                </p>
                <p className="flex-shrink-0  text-lg font-normal text-gray-500">
                  days until the event
                </p>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg flex flex-col p-4 mt-2 h-24">
              <CurrentInvitation
                loading={loading}
                attendees={attendeesToInclude}
                event={event}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
