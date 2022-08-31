import React, { useState } from "react";
import Navbar from "./common/Navbar";
import Events from "./pages/Events";
import { Routes, Route } from "react-router-dom";
import Invitations from "./pages/Invitations";
import Messages from "./pages/Messages";
import Profile from "./page_components/profile/Profile";
import Authentication from "./pages/Authentication";
import { createContext } from "react";
import { useEffect } from "react";
import CreateUserProfile from "./page_components/profile/CreateUserProfile";

const UserContext = createContext();

function App({}) {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(false);
  const [fireToken, setFireToken] = useState(getFireToken());
  // if (!loaded) return <></>;

  function getFireToken() {
    if (localStorage.hasOwnProperty("fireToken")) {
      return localStorage.getItem("fireToken");
    }
    return "";
  }

  useEffect(() => {
    if (fireToken) {
      //check with django
      fetch("http://localhost:8000/events/", {
        headers: { Authorization: fireToken },
      })
        .then((res) => {
          if (!res.ok) {
            setFireToken("");
            localStorage.removeItem("fireToken");
            setUser(true);
          }
          return res.json();
        })
        .then((data) => console.log(data));

      //check with django to authenticate,

      //if not authenticated, remove firetoken from local storage

      //else get the user profile
      // if user profile isnt there, navigate to create profile section
      //if user profile is there, navigate to the home page
    }
  }, [fireToken]);

  if (!fireToken) return <Authentication setFireToken={setFireToken} />;

  // if (!user) return <CreateUserProfile />;

  return (
    <UserContext.Provider value={user}>
      <Navbar setFireToken={setFireToken} />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="invitations" element={<Invitations />}></Route>
        <Route path="/messages" element={<Messages />} />
        {/* right now profile doesnt change the selected items up top */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
