import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SimpleMap from "../common/SimpleMap";
import Authentication from "./Authentication";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";
import { useParams } from "react-router-dom";
import Attendees from "../page_components/events/Attendees";
import { CalendarIcon } from "@heroicons/react/solid";

export default function PublicInvite({ userObj, setUserObj, user, fireToken }) {
  const [authenticate, setAuthenticate] = useState(false);
  const [inviteActive, setInviteActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();

  const [event, setEvent] = useState({});
  const location = useLocation();
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

  function handleAcceptLoggedInUser() {
    const obj = {
      user: userObj.id,
      event: event.id,
      status: "accepted",
      is_active: true,
    };

    fetch(process.env.REACT_APP_BACKEND_URL + "invitation/", {
      method: "POST",
      headers: {
        Authorization: fireToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        setOpen(true);
        console.log(data);
      });
  }
  function handleDeclineLoggedInUser() {}

  function handleAcceptNotLoggedInUser() {
    setAuthenticate(true);
  }
  function handleDeclineNotLoggedInUser() {}

  useEffect(() => {
    fetch(
      process.env.REACT_APP_BACKEND_URL +
        "events/public/" +
        location.pathname.split("/")[2] +
        "/"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (
          data.invitations.find(
            (invitation) => invitation.id === location.pathname.split("/")[2]
          ).is_active
        ) {
          setInviteActive(true);
        }
        setEvent(data);
        setLoading(false);
      });
  }, [location]);

  const attendeesToInclude = !loading
    ? event.invitations.filter((invitation) => {
        if (invitation.status === "accepted") {
          return true;
        }
        return false;
      })
    : null;

  if (authenticate) {
    return (
      <Authentication
        setUserObj={setUserObj}
        userObj={userObj}
        user={user}
        fireToken={fireToken}
        inviteAuthentication={authenticate}
        setInviteAuthentication={setAuthenticate}
      />
    );
  }
  if (!inviteActive) {
    return <div>Invite no Longer Active</div>;
  }
  return (
    <>
      <div className="flex bg-gray-100 justify-center items-grow h-screen">
        <div className="flex flex-col items-center m-2">
          <div className="flex flex-col gap-2 max-w-5xl w-screen">
            <div className="bg-white shadow rounded-lg flex flex-col w-full">
              <SimpleMap
                latLng={{ lat: event.location_lat, lng: event.location_lng }}
                h={"200px"}
                w={"100%"}
              ></SimpleMap>

              <div className="flex justify-between p-4">
                <div className="flex flex-col">
                  <p className="text-xl font-bold text-swizblue">
                    {event.name}
                  </p>{" "}
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
                    <p className="flex-shrink-0 font-normal text-gray-500">
                      {event.location_name}
                    </p>
                  </div>
                </div>
                <h1></h1>
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
                    <p className="flex-shrink-0 font-normal text-gray-500">
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
                  <div className="flex flex-col p-2">
                    {user ? (
                      <button
                        className="flex w-full justify-center rounded-md border border-transparent bg-swizblue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-swizblue-dark focus:outline-none focus:ring-2 focus:ring-swizblue-light focus:ring-offset-2"
                        onClick={() => handleAcceptLoggedInUser()}
                      >
                        Accept Invitation
                      </button>
                    ) : (
                      <button
                        className="flex w-full justify-center rounded-md border border-transparent bg-swizblue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-swizblue-dark focus:outline-none focus:ring-2 focus:ring-swizblue-light focus:ring-offset-2"
                        onClick={() => handleAcceptNotLoggedInUser()}
                      >
                        Login to Accept Invitation
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal that pops out once the invitation is accepted */}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Invitation Accepted
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Now it's your turn to invite someone to the event!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <a
                      href="/invitations"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    >
                      Go to my Invitations
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
