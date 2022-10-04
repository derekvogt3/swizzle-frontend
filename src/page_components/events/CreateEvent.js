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
import useScript from "../../hooks/useScript";
import CreateEventValidation from "./CreateEventValidations";

export default function CreateEvent() {
  const params = useParams();
  let navigate = useNavigate();
  const status = useScript(
    "https://maps.googleapis.com/maps/api/js?key=" +
      process.env.REACT_APP_GOOGLE_MAP_API +
      "&libraries=places"
  );

  const userObj = useContext(UserContext);
  const fireToken = useContext(FireTokenContext);
  const [date, setDate] = useState("");

  const [hour, setHour] = useState("7");
  const [minute, setMinute] = useState("30");
  const [ampm, setAmpm] = useState("PM");

  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [latLng, setLatLng] = useState(null);
  const [numberOfAttendees, setNumberOfAttendees] = useState(6);
  const [description, setDescription] = useState("");

  const [openValidation, setOpenValidation] = useState(false);
  const [validationMessage, setValidationMessage] = useState([]);

  function validate() {
    setValidationMessage([]);
    if (!eventName) {
      setValidationMessage((arr) => [...arr, "Event Name must not be blank"]);
    }
    if (!location) {
      setValidationMessage((arr) => [...arr, "A Location must be selected"]);
    }
    if (!date) {
      setValidationMessage((arr) => [...arr, "An Event Date must be selected"]);
    }
    if (!eventName || !location || !date) {
      setOpenValidation(true);
      return false;
    }
    return true;
  }

  function convertTime() {
    let formattedHour = hour;

    if (ampm === "PM") {
      formattedHour = (parseInt(hour) + 12).toString();
    }

    if (formattedHour.length === 1) {
      formattedHour = "0" + formattedHour;
    }

    return formattedHour + ":" + minute;
  }

  function getUTC() {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    const sign = offset >= 0 ? "-" : "+";
    const hours = Math.abs(offset / 60);
    const minutes = Math.abs(offset % 60);
    const hoursStr = `0${hours}`.slice(0, 2);
    const minutesStr = `0${minutes}`.slice(0, 2);
    return `${sign}${hoursStr}:${minutesStr}`;
  }

  function handleCreateEvent() {
    if (validate()) {
      const obj = {
        name: eventName,
        admin_id: userObj.id,
        event_settings: "",
        location_name: location,
        location_lat: latLng.lat,
        location_lng: latLng.lng,
        number_of_attendees: numberOfAttendees,
        description: description,
        event_datetime:
          date.date.toISOString().substring(0, 10) +
          "T" +
          convertTime() +
          ":00.000" +
          getUTC(),
      };

      fetch(process.env.REACT_APP_BACKEND_URL + "events/", {
        method: "POST",
        headers: {
          Authorization: fireToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate("/");
        });
    }
  }

  return (
    <div className="p-2 flex flex-col">
      <div className="flex justify-center p-2">
        <p className="text-xl text-gray-600">Create New Event</p>
      </div>
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
              {status === "ready" ? (
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
                loadingScript={status !== "ready"}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-96 p-2">
            <SelectMenu setNumberOfAttendees={setNumberOfAttendees} />
          </div>
          <div className="flex justify-around">
            <div className="py-4">
              <Calendar setDate={setDate} externalSelectedDate={date} />
              <div>
                <div className="flex justify-center py-4">
                  <div className="mt-2 p-3 bg-white rounded-lg border">
                    <div className="flex">
                      <select
                        name="hours"
                        className="bg-transparent text-l appearance-none outline-none rounded"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">10</option>
                        <option value="12">12</option>
                      </select>
                      <span className="text-xl mr-3">:</span>
                      <select
                        name="minutes"
                        className="bg-transparent text-l appearance-none outline-none mr-4 rounded"
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                      >
                        <option value="00">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                      </select>
                      <select
                        name="ampm"
                        className="bg-transparent text-l appearance-none outline-none rounded"
                        value={ampm}
                        onChange={(e) => setAmpm(e.target.value)}
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Event Description
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <textarea
                id="about"
                name="about"
                rows={3}
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-swizpurp focus:ring-swizpurp sm:text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="mt-2 text-sm text-gray-500">
                Provide any other details you'd like to include.
              </p>
            </div>
          </div>
          <div className="flex justify-center py-4">
            <button
              onClick={() => handleCreateEvent()}
              className=" flex w-full justify-center rounded-md border border-transparent bg-swizpurp py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-swizpurp-dark focus:outline-none focus:ring-2 focus:ring-swizpurp-light focus:ring-offset-2"
            >
              Create Event
            </button>
            <CreateEventValidation
              setOpenValidation={setOpenValidation}
              openValidation={openValidation}
              validationMessage={validationMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
