import React from "react";
import { useContext } from "react";
import { FireTokenContext } from "../App";
import { useEffect, useState, useRef } from "react";

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
  console.log(invitations);

  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold text-gray-900 py-2 text-swizblue-dark">
        Your Active Invitations
      </h2>
      <div className="flex">
        {invitations.map((invitation) => {
          if (invitation.is_active) {
            return (
              <div className="p-2 overflow-hidden bg-white shadow rounded-md">
                <p>{invitation.event.name}</p>
                <p>{invitation.event.event_datetime}</p>
                <button
                  className="flex w-full justify-center rounded-md border border-transparent bg-swizblue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-swizblue-dark focus:outline-none focus:ring-2 focus:ring-swizblue-light focus:ring-offset-2"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      process.env.REACT_APP_FRONTEND_URL +
                        "publicinvite/" +
                        invitation.id
                    )
                  }
                >
                  Copy invitation link to clipboard
                </button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
