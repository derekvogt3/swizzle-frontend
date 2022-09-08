import Login from "../page_components/authentication/Login";
import PhoneAuth from "../page_components/authentication/PhoneAuth";
import { useState, useEffect } from "react";
import CreateUserProfile from "../page_components/profile/CreateUserProfile";

export default function Authentication({
  userObj,
  setUserObj,
  user,
  fireToken,
  inviteAuthentication,
  setInviteAuthentication,
}) {
  const [authNav, setAuthNav] = useState(0);

  function currentPage() {
    if (!user) {
      if (authNav === 0) {
        return <Login setAuthNav={setAuthNav} />;
      }

      if (authNav === 1) {
        return <PhoneAuth setAuthNav={setAuthNav} />;
      }
    }
    if (!userObj.first_name) {
      return (
        <CreateUserProfile setUserObj={setUserObj} fireToken={fireToken} />
      );
    }

    //this is to allow the user to log in to accept an invitation

    if (inviteAuthentication) {
      setInviteAuthentication(false);
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
            src="/drinks.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
