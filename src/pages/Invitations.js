import React from "react";
import { useContext } from "react";
import { FireTokenContext } from "../App";
import { useEffect, useState, useRef } from "react";
import Invitation from "../page_components/invitations/Invitation";

export default function Invitations() {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "invitation/", {
      headers: {
        Authorization: fireToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setInvitations(data));
  }, []);

  const fireToken = useContext(FireTokenContext);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 py-2 text-swizblue-dark">
        Your Active Invitations
      </h2>
      <div className="flex flex-col">
        {invitations.map((invitation) => {
          if (invitation.is_active) {
            return <Invitation invitation={invitation} />;
          }
        })}
      </div>
    </div>
  );
}
