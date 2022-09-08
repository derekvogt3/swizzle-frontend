import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import Avatar from "../../common/Avatar";

export default function Attendees({ loading, attendees, event }) {
  return (
    <div>
      <div className="flex flex-col">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button>
                <div className="flex justify-around">
                  <div className="flex -space-x-4 overflow-hidden items-center">
                    {!loading ? (
                      attendees.map((attentee, index) => {
                        if (index < 3) {
                          return (
                            <Avatar
                              key={attentee.id}
                              image={attentee.user.avatar}
                              size={"8"}
                              className="ring-2 ring-black"
                            />
                          );
                        }
                        return <></>;
                      })
                    ) : (
                      <div>loading</div>
                    )}
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-start">
                      <p className="font-bold text-gray-500">
                        {!loading ? attendees.length + " People" : ""}
                      </p>
                      <div className="flex">
                        {!loading ? (
                          attendees.map((attendee, index) => {
                            if (index < 2) {
                              return (
                                <p
                                  key={attendee.id}
                                  className="font-normal text-gray-500"
                                >
                                  {attendee.user.first_name + ", "}
                                </p>
                              );
                            }

                            if (index === 2) {
                              return (
                                <p
                                  key={attendee.id}
                                  className="font-normal text-gray-500"
                                >
                                  {attendee.user.first_name + "..."}
                                </p>
                              );
                            }
                            return <></>;
                          })
                        ) : (
                          <div>loading</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <ChevronRightIcon
                    className={
                      open
                        ? "rotate-90 transform w-8 h-8 text-swizblue-light"
                        : "w-8 h-8 text-swizblue-light"
                    }
                  />
                </div>
              </Disclosure.Button>

              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel>
                  <div className="pt-2">
                    {!loading ? (
                      attendees.map((attendee) => {
                        return (
                          <div
                            key={attendee.id}
                            className="py-2 flex border-t items-center"
                          >
                            <Avatar
                              key={attendee.id}
                              image={attendee.user.avatar}
                              size={"12"}
                            />
                            <p className="pl-4 font-normal text-swizblue">
                              {attendee.user.first_name +
                                " " +
                                attendee.user.last_name}{" "}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div>loading</div>
                    )}
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
