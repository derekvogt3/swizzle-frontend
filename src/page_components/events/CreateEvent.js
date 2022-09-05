import React from "react";

import { useParams } from "react-router-dom";
import SelectMenu from "../../common/SelectMenu";
import SimpleMap from "../../common/SimpleMap";
import Calendar from "./Calendar";
import LocationSearchInput from "../../common/LocationSearchInput";

export default function CreateEvent() {
  const params = useParams();
  console.log(params);

  return (
    <div className="p-2 flex flex-col">
      <div className="flex flex-wrap ">
        <div className="grow">
          <label
            htmlFor="account-number"
            className="block text-sm font-medium text-gray-700"
          >
            Event Name
          </label>

          <input
            type="text"
            name="account-number"
            id="account-number"
            className="block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="grow">
          <SelectMenu />
        </div>
      </div>
      <div className="flex justify-around">
        <SimpleMap h={"300px"} w={"300px"} />
        <Calendar />
      </div>
      <div>
        <LocationSearchInput />
      </div>
    </div>
  );
}
