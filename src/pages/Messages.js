import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FireTokenContext } from "../App";
import { useContext } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const fireToken = useContext(FireTokenContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fireToken) {
      fetch(process.env.REACT_APP_BACKEND_URL + "events/messages", {
        headers: { Authorization: fireToken },
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              setEvents(data);
              setLoading(false);
            });
          } else {
            res.json().then((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    }
  }, [fireToken]);

  return (
    <div className="p-4">
      <div className="flex flex-col w-48"></div>
      <h2 className="text-lg font-semibold text-gray-900 py-2 text-swizblue-dark">
        Event Chats
      </h2>
      <div className="flex gap-4 flex-wrap justify-center items-start">
        <div className="overflow-hidden grow bg-white shadow sm:rounded-md">
          <ul className="divide-y divide-gray-200">
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
                                  <time>
                                    {new Date(
                                      event.event_datetime
                                    ).toLocaleDateString("en-us", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                    })}
                                  </time>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            <p className="flex-shrink-0 font-normal text-gray-500 whitespace-pre">
                              {event.chat_messages.length > 0 ? (
                                event.invitations.find(
                                  (invite) =>
                                    invite.user.id ===
                                    event.chat_messages[
                                      event.chat_messages.length - 1
                                    ].user
                                ).user.first_name + " said "
                              ) : (
                                <></>
                              )}
                            </p>
                            <p className="flex-shrink-0 font-normal text-gray-500">
                              {event.chat_messages.length > 0
                                ? '"' +
                                  event.chat_messages[
                                    event.chat_messages.length - 1
                                  ].message_text +
                                  '"'
                                : "No messages yet in chat"}
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
