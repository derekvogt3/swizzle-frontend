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

export default function CreateEvent() {
  let navigate = useNavigate();
  const userObj = useContext(UserContext);
  const fireToken = useContext(FireTokenContext);
  const [date, setDate] = useState("");

  const [time, setTime] = useState("10:00");
  const params = useParams();
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [latLng, setLatLng] = useState({
    lat: 40.7128,
    lng: -74.006,
  });
  const [numberOfAttendees, setNumberOfAttendees] = useState(6);

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
        <div className="w-96 p-2">
          <label
            htmlFor="account-number"
            className="block text-sm font-medium text-gray-700"
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
        </div>
        <div className="w-96 p-2">
          <SelectMenu setNumberOfAttendees={setNumberOfAttendees} />
        </div>
      </div>
      <div className="flex justify-around">
        <div>
          <p className="block text-sm font-medium text-gray-700">
            Set Location
          </p>
          <p className="block text-sm font-medium text-gray-700">{location}</p>
          <SimpleMap h={"300px"} w={"300px"} latLng={latLng} />
          <LocationSearchInput
            setLocation={setLocation}
            setLatLng={setLatLng}
          />
        </div>
        <div>
          <Calendar setDate={setDate} />
          <div>
            <TimePicker onChange={setTime} value={time} />
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
