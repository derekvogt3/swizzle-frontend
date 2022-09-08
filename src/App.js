import React, { useState } from "react";
import Navbar from "./common/Navbar";
import Events from "./pages/Events";
import { Routes, Route } from "react-router-dom";
import Invitations from "./pages/Invitations";
import Messages from "./pages/Messages";
import Profile from "./page_components/profile/Profile";
import Authentication from "./pages/Authentication";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import CreateEvent from "./page_components/events/CreateEvent";
import EventDetail from "./page_components/events/EventDetail";
import { useLocation } from "react-router-dom";
import PublicInvite from "./pages/PublicInvite";

export const UserContext = React.createContext();
export const FireTokenContext = React.createContext();

function App() {
  const auth = firebase.auth();
  const location = useLocation();

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingUser, setloadingUser] = useState(true);

  const [fireToken, setFireToken] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [userObj, setUserObj] = useState({});

  const publicInvite = location.pathname.includes("/publicinvite/");

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://maps.googleapis.com/maps/api/js?key=" +
      process.env.REACT_APP_GOOGLE_MAP_API +
      "&libraries=places";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setLoadingProfile(true);
      user.getIdToken(true).then((idToken) => {
        setFireToken(idToken);
      });
    }
  }, [user]);

  //use effect for loading screen
  useEffect(() => {
    if (!loading) {
      setloadingUser(false);
      if (user) setLoadingProfile(true);
    }
  }, [loading]);

  useEffect(() => {
    if (fireToken) {
      //check with django

      fetch(process.env.REACT_APP_BACKEND_URL + "user/current/", {
        headers: { Authorization: fireToken },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserObj(data);

          setLoadingProfile(false);
        });
    }
  }, [fireToken]);

  if (publicInvite) {
    return (
      <PublicInvite
        user={user}
        setUserObj={setUserObj}
        userObj={userObj}
        fireToken={fireToken}
      />
    );
  }

  if (loadingUser || loadingProfile) {
    return <div>Loading</div>;
  }

  if (!user || !userObj.first_name)
    return (
      <Authentication
        setUserObj={setUserObj}
        userObj={userObj}
        user={user}
        fireToken={fireToken}
      />
    );

  return (
    <UserContext.Provider value={userObj}>
      <FireTokenContext.Provider value={fireToken}>
        <Navbar setFireToken={setFireToken} auth={auth} />
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path=":eventId" element={<EventDetail />} />

          <Route path="invitations" element={<Invitations />}></Route>

          <Route path="messages" element={<Messages />} />
          {/* right now profile doesnt change the selected items up top */}
          <Route path="profile" element={<Profile />} />
          <Route path="create">
            <Route path="" element={<CreateEvent />} />
            <Route path=":year/:month/:day" element={<CreateEvent />} />
          </Route>
        </Routes>
      </FireTokenContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
