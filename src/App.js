import React, { useState } from "react";
import Navbar from "./common/Navbar";
import Events from "./pages/Events";
import { Routes, Route } from "react-router-dom";
import Invitations from "./pages/Invitations";
import Messages from "./pages/Messages";
import Authentication from "./pages/Authentication";
import { createContext } from "react";

const UserContext = createContext();

function App() {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(true);

  // if (!loaded) return <></>;

  if (!user) return <Authentication />;

  return (
    <UserContext.Provider value={user}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="invitations" element={<Invitations />}></Route>
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
