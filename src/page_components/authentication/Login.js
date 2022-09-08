import React from "react";

export default function Login({ setAuthNav }) {
  return (
    <>
      <div>
        <img className="h-20 w-auto" src="/S_LOGO 2.png" alt="Workflow" />
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
          Swizzle
        </h2>
      </div>

      <div className="mt-8">
        <div>
          <div>
            <p className="text-medium font-medium text-gray-700">
              put a carosel here explaining the product
            </p>
          </div>

          <div className="relative mt-6">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm"></div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-swizpurp py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-swizpurp-dark focus:outline-none focus:ring-2 focus:ring-swizpurp-light focus:ring-offset-2"
            onClick={() => setAuthNav(1)}
          >
            Login
          </button>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            onClick={() => setAuthNav(1)}
            className="flex w-full justify-center rounded-md border border-transparent bg-swizblue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-swizblue-dark focus:outline-none focus:ring-2 focus:ring-swizblue-light focus:ring-offset-2"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}
