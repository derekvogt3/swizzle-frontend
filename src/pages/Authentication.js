import Login from "../page_components/authentication/Login";
import PhoneAuth from "../page_components/authentication/PhoneAuth";
import { useState, useEffect } from "react";

export default function Authentication({ setFireToken }) {
  const [authNav, setAuthNav] = useState(0);

  function currentPage() {
    if (authNav === 0) {
      return <Login setAuthNav={setAuthNav} />;
    } else if (authNav === 1) {
      return <PhoneAuth setAuthNav={setAuthNav} setFireToken={setFireToken} />;
    }
  }
  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">{currentPage()}</div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="drinks.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
