import React from "react";

import { useParams } from "react-router-dom";
import SelectMenu from "../../common/SelectMenu";
import SimpleMap from "../../common/SimpleMap";
import Calendar from "./Calendar";
import LocationSearchInput from "../../common/LocationSearchInput";
import { useState } from "react";
import TimePicker from "react-time-picker";
import { FireTokenContext, UserContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useScript from "react-script-hook/lib/use-script";
import { useEffect } from "react";

export default function CreateEvent() {
  const params = useParams();
  let navigate = useNavigate();
  const [loadingScript, scriptError] = useScript({
    src:
      "https://maps.googleapis.com/maps/api/js?key=" +
      process.env.REACT_APP_GOOGLE_MAP_API +
      "&libraries=places",
  });

  const userObj = useContext(UserContext);
  const fireToken = useContext(FireTokenContext);
  const [date, setDate] = useState(setDateFromParams());

  const [time, setTime] = useState("10:00");

  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [latLng, setLatLng] = useState(null);
  const [numberOfAttendees, setNumberOfAttendees] = useState(6);

  function setDateFromParams() {
    if (params.year && params.month && params.day) {
      return new Date(params.year + "-" + params.month + "-" + params.day);
    }
    return "";
  }

  console.log(date);

  function handleCreateEvent() {
    const obj = {
      name: eventName,
      admin_id: userObj.id,
      event_settings: "",
      location_name: location,
      location_lat: latLng.lat,
      location_lng: latLng.lng,
      number_of_attendees: numberOfAttendees,
      event_datetime:
        date.date.toISOString().substring(0, 10) + "T" + time + ":00.000Z",
    };

    fetch("http://localhost:8000/events/", {
      method: "POST",
      headers: {
        Authorization: fireToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      });
  }

  return (
    <div className="p-2 flex flex-col">
      <div className="flex flex-wrap justify-around">
        <div className="flex">
          <div className="w-96 p-2">
            <label
              htmlFor="account-number"
              className="py-2 block text-sm font-medium text-gray-700"
            >
              Event Name
            </label>

            <input
              type="text"
              name="account-number"
              id="account-number"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <div>
              <div className="flex items-end my-2">
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
                <p className="ml-2 block text-sm font-small text-gray-700 truncate">
                  {location ? location : "Select Location..."}
                </p>
              </div>
              {!loadingScript ? (
                <div className="pb-4">
                  <LocationSearchInput
                    setLocation={setLocation}
                    setLatLng={setLatLng}
                  />
                </div>
              ) : (
                <></>
              )}
              <SimpleMap
                h={"375px"}
                w={"375px"}
                latLng={latLng}
                loadingScript={loadingScript}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-96 p-2">
            <SelectMenu setNumberOfAttendees={setNumberOfAttendees} />
          </div>
          <div className="flex justify-around">
            <div>
              <Calendar setDate={setDate} externalSelectedDate={date} />
              <div>
                <TimePicker onChange={setTime} value={time} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => handleCreateEvent()}
        className="flex w-full justify-center rounded-md border border-transparent bg-swizpurp py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-swizpurp-dark focus:outline-none focus:ring-2 focus:ring-swizpurp-light focus:ring-offset-2"
      >
        Create Event
      </button>
    </div>
  );
}
