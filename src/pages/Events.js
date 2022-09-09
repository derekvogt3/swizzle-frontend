import { Fragment } from "react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { useEffect } from "react";
import Calendar from "../page_components/events/Calendar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FireTokenContext, UserContext } from "../App";
import { useContext } from "react";

export default function Events() {
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);
  const fireToken = useContext(FireTokenContext);
  const [loading, setLoading] = useState(true);
  console.log(fireToken);

  useEffect(() => {
    if (fireToken) {
      fetch("http://localhost:8000/events/", {
        headers: { Authorization: fireToken },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setEvents(data);
          setLoading(false);
        });
    }
  }, [fireToken]);

  return (
    <div className="p-4">
      <div className="flex flex-col w-48">
        <Link
          to="create"
          as="button"
          className="text-center focus:outline-none mb-5 w-full rounded-md border border-transparent bg-swizpurp py-2 px-4 text-sm font-medium text-white shadow hover:bg-swizpurp-dark focus:ring-2 focus:ring-swizpurp-light focus:ring-offset-2"
        >
          Create New Event
        </Link>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 py-2 text-swizblue-dark">
        Upcoming Events
      </h2>
      <div className="flex gap-4 flex-wrap justify-center items-start">
        <div className="overflow-hidden grow bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {!loading ? (
              events.map((event) => (
                <li key={event.id}>
                  <Link to={event.id} className="block hover:bg-gray-50">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex text-sm">
                            <p className="truncate font-medium text-swizblue">
                              {event.name}
                            </p>
                            <div className="pl-2 flex">
                              <div className="flex items-center text-sm text-gray-500">
                                <CalendarIcon
                                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                  aria-hidden="true"
                                />
                                <p>
                                  <time>{event.event_datetime}</time>
                                </p>
                              </div>
                            </div>
                          </div>
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
                        <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                          <div className="flex -space-x-1 overflow-hidden">
                            {event.invitations.map((invitation) =>
                              invitation.user.avatar ? (
                                <img
                                  key={invitation.id}
                                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                  src={invitation.user.avatar}
                                  alt={invitation.user.name}
                                />
                              ) : (
                                <span
                                  key={invitation.id}
                                  className="inline-block h-6 w-6 overflow-hidden rounded-full bg-gray-100 ring-2 ring-white"
                                >
                                  <svg
                                    className="h-full w-full text-gray-300"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                  </svg>
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="ml-5 flex-shrink-0">
                        <ChevronRightIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <div>loading</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
