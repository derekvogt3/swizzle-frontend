import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

export default function ConfirmPhone() {
  return (
    <div>
      <label
        htmlFor="account-number"
        className="block text-sm font-medium text-gray-700"
      >
        Verification Number
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          name="account-number"
          id="account-number"
          className="block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="000-00-0000"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <QuestionMarkCircleIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
