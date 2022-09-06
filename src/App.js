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
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import CreateEvent from "./page_components/events/CreateEvent";

export const UserContext = React.createContext();
export const FireTokenContext = React.createContext();

function App({}) {
  const auth = firebase.auth();

  const [loaded, setLoaded] = useState(false);
  const [fireToken, setFireToken] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [userObj, setUserObj] = useState({});

  if (loading) {
    console.log(loading);
  }

  if (error) {
    console.log(error);
  }
  console.log(userObj);

  useEffect(() => {
    if (user) {
      user.getIdToken(true).then((idToken) => {
        setFireToken(idToken);
      });
    }
  }, [user]);

  useEffect(() => {
    if (fireToken) {
      //check with django
      fetch("http://localhost:8000/user/current/", {
        headers: { Authorization: fireToken },
      })
        .then((res) => res.json())
        .then((data) => setUserObj(data));
    }
  }, [fireToken]);

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
