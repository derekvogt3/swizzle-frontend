import React from "react";
import Avatar from "../../common/Avatar";

export default function CurrentInvitation({ attendees, loading, event }) {
  console.log(attendees);

  const max = !loading
    ? attendees.reduce(function (a, b) {
        return a.date_joined > b.date_joined ? a : b;
      })
    : {};

  return (
    <>
      {!loading ? (
        <div className="flex justify-around">
          <div>
            <p>There are X more spots to be filled</p>
            <p className="inline">It's </p>
            <p className="inline text-swizpink">{max.user.first_name}</p>
            <p className="inline">'s turn to send an invitation</p>
          </div>
          <Avatar size={"10"} image={max.user.avatar} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
