import React from "react";
import SimpleMap from "../../common/SimpleMap";
import { useState } from "react";
import CurrentInvitation from "../events/CurrentInvitation";
import Attendees from "../events/Attendees";

export default function Invitation({ invitation }) {
  const [loading, setLoading] = useState(true);
  function formattedDate() {
    if (JSON.stringify(invitation.event) === "{}") {
      return "";
    }
    const obj = new Date(invitation.event.event_datetime);
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

  const attendeesToInclude = invitation.event;
  return (
    <div className="flex justify-center items-grow ">
      <div
        className="grow bg-white shadow-lg rounded-lg m-4
   max-w-5xl"
      >
        <div className="px-4 py-5 flex flex-col items-stretch ">
          <div className="bg-white shadow rounded-lg m-1 flex flex-col">
            <SimpleMap
              latLng={{
                lat: invitation.event.location_lat,
                lng: invitation.event.location_lng,
              }}
              h={"200px"}
              w={"100%"}
            ></SimpleMap>
            <div className="flex flex-col p-2">
              <p className="text-xl font-bold text-swizpurp">
                {invitation.event.name}
              </p>
            </div>
            <div className="flex flex-col p-2">
              <p className="flex-shrink-0 font-normal text-gray-500">
                {formattedDate()[0]}
              </p>
              <p className="flex-shrink-0 font-normal text-gray-500">
                {formattedDate()[1]}
              </p>
            </div>
            <div className="flex p-2">
              <p className="flex-shrink-0 text-lg font-bold text-swizpink mr-1">
                {formattedDate()[2]}
              </p>
              <p className="text-lg font-normal text-gray-500 ">
                days until the event. Make sure you send your invitation soon to
                ensure the event fills!
              </p>
            </div>
          </div>

          <button
            className="flex w-full justify-center rounded-md border border-transparent bg-swizblue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-swizblue-dark focus:outline-none focus:ring-2 focus:ring-swizblue-light focus:ring-offset-2"
            onClick={() =>
              navigator.clipboard.writeText(
                process.env.REACT_APP_FRONTEND_URL +
                  "publicinvite/" +
                  invitation.id
              )
            }
          >
            Copy invitation link to clipboard
          </button>
        </div>
      </div>
    </div>
  );
}
