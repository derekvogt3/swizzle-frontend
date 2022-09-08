import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import Avatar from "../../common/Avatar";

export default function Attendees({ loading, attendees, event }) {
  return (
    <div>
      <h1 className="font-normal text-gray-500">Attendees</h1>
      <div className="flex flex-col">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button>
                <div className="flex">
                  <div className="flex -space-x-4 overflow-hidden items-center">
                    {!loading ? (
                      attendees.map((attentee, index) => {
                        if (index < 3) {
                          return (
                            <Avatar
                              key={attentee.id}
                              image={attentee.user.avatar}
                              size={"12"}
                            />
                          );
                        }
                      })
                    ) : (
                      <div>loading</div>
                    )}
                  </div>
                  <p className="font-normal text-gray-500">
                    {!loading
                      ? attendees.length +
                        " People out of " +
                        event.number_of_attendees
                      : ""}
                  </p>
                  <ChevronRightIcon
                    className={open ? "rotate-90 transform w-4 h-4" : "w-4 h-4"}
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
                  Yes! You can purchase a license that you can share with your
                  entire team.
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
