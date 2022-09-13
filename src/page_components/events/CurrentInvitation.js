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
            <p className="flex-shrink-0 font-normal text-gray-700">
              {"There are " +
                (event.number_of_attendees - attendees.length) +
                " more spots to be filled"}
            </p>
            <p className="inline flex-shrink-0 font-normal text-gray-700">
              It's{" "}
            </p>
            <p className="inline text-swizpink flex-shrink-0 font-normal">
              {max.user.first_name}
            </p>
            <p className="inline flex-shrink-0 font-normal text-gray-700">
              's turn to send an invitation
            </p>
          </div>
          <Avatar size={"10"} image={max.user.avatar} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
