/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../App";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Events", href: "/", pathTest: "/" },
  { name: "Invitations", href: "invitations", pathTest: "/invitations" },
  { name: "Messages", href: "messages", pathTest: "/messages" },
];

export default function Navbar({ setFireToken, auth }) {
  const userObj = useContext(UserContext);

  const [currentNav, setCurrentNav] = useState(0);
  const location = useLocation();

  useEffect(() => {
    navigation.forEach((nav, idx) => {
      if (location.pathname === nav.pathTest) {
        setCurrentNav(idx);
      }
    });
  }, []);

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-12 w-auto"
                    src="/S_LOGO 2.png"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-12 w-auto"
                    src="/S_LOGO 2.png"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((nav, idx) => {
                    return (
                      <Link
                        key={nav.name}
                        to={nav.href}
                        className={
                          idx === currentNav
                            ? "border-swizblue text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        }
                        onClick={() => setCurrentNav(idx)}
                      >
                        {nav.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swizblue"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swizblue">
                      <span className="sr-only">Open user menu</span>
                      {userObj.avatar ? (
                        <img
                          src={userObj.avatar}
                          className="object-cover h-8 w-8 rounded-full"
                        />
                      ) : (
                        <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Messages
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block  cursor-pointer px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={() => {
                              localStorage.removeItem("fireToken");
                              setFireToken("");
                              signOut(auth);
                            }}
                          >
                            Sign out
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-swizblue">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            {({ close }) => (
              <>
                <div className="pt-2 pb-3 space-y-1 flex flex-col">
                  {navigation.map((nav, idx) => {
                    return (
                      <Link
                        key={nav.name}
                        to={nav.href}
                        className={
                          idx === currentNav
                            ? "text-left bg-purple-50 border-swizpurp text-swizpurp-dark block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            : "text-left border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                        }
                        onClick={() => {
                          setCurrentNav(idx);
                          close();
                        }}
                      >
                        {nav.name}{" "}
                      </Link>
                    );
                  })}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      {userObj.avatar ? (
                        <img
                          src={userObj.avatar}
                          className="object-cover h-10 w-10 rounded-full"
                        />
                      ) : (
                        <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {userObj.first_name + " " + userObj.last_name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {userObj.username}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      onClick={() => {
                        close();
                      }}
                    >
                      Your Profile
                    </Link>

                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      Settings
                    </Disclosure.Button>
                    <div
                      className="cursor-pointer block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      onClick={() => {
                        localStorage.removeItem("fireToken");
                        setFireToken("");
                        close();
                        signOut(auth);
                      }}
                    >
                      Sign Out
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
