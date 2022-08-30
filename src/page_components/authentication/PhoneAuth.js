import React from "react";
import { PhoneIcon } from "@heroicons/react/outline";

export default function PhoneAuth({ setAuthNav }) {
  return (
    <div className="flex flex-col">
      <PhoneIcon className="h-14 self-start" />
      <div className="pb-4 ">
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
          What's your phone number?
        </h2>
      </div>
      <div>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <label htmlFor="country" className="sr-only">
              Country
            </label>
            <select
              id="country"
              name="country"
              autoComplete="country"
              className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option>US</option>
              <option>CA</option>
              <option>EU</option>
            </select>
          </div>
          <input
            type="text"
            name="phone-number"
            id="phone-number"
            className="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="+1 (555) 987-6543"
          />
        </div>
      </div>
      <div className="py-6">
        <button
          type="submit"
          onClick={() => setAuthNav(2)}
          className="flex w-full justify-center rounded-md border border-transparent bg-swizblue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-swizblue-dark focus:outline-none focus:ring-2 focus:ring-swizblue-light focus:ring-offset-2"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
