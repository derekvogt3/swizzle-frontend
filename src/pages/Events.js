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
import SimpleMap from "../common/SimpleMap";
import Calendar from "../page_components/events/Calendar";

const events = [
  {
    id: 1,
    name: "Super Fun Event",
    location: "Spring Lounge",
    location_lat: 1,
    location_lng: 2,
    event_datetime: "2020-01-07",
    applicants: [
      {
        first_name: "Dries Vincent",
        last_name: "dries.vincent@example.com",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
];

export default function Events() {
  useEffect(() => {
    // fetch();
    //create an api
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 py-2 text-swizblue-dark">
        Upcoming Events
      </h2>
      <div className="flex gap-4 flex-wrap justify-center items-start">
        <div className="overflow-hidden grow bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {events.map((event) => (
              <li key={event.id}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="truncate font-medium text-swizblue">
                            {event.name}
                          </p>
                          <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                            at {event.location}
                          </p>
                        </div>
                        <div className="mt-2 flex">
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
                      <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        <div className="flex -space-x-1 overflow-hidden">
                          {event.applicants.map((applicant) => (
                            <img
                              key={applicant.first_name}
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                              src={applicant.imageUrl}
                              alt={applicant.name}
                            />
                          ))}
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
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button
            type="button"
            className="focus:outline-none mb-5 w-full rounded-md border border-transparent bg-swizpurp py-2 px-4 text-sm font-medium text-white shadow hover:bg-swizpurp-dark focus:ring-2 focus:ring-swizpurp-light focus:ring-offset-2"
          >
            Create Event
          </button>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
