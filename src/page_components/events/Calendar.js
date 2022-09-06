import React from "react";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar({ setDate }) {
  const [dateObjectArray, setDateObjectArray] = useState(
    getMonthCalanderData(new Date())
  );

  const [currentMonth, setCurrentMonth] = useState(new Date());

  //used for the selection of dates, as an index, for the dateobject array

  const [currentlySelectedIdx, setCurrentlySelectedIdx] = useState(null);

  function changeMonth(int) {
    //either 2 or 0, 1 if you want to increase month, 0 if you want to decrease month
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + int,
      0
    );
    setDateObjectArray(getMonthCalanderData(newMonth));
    setCurrentMonth(newMonth);
  }

  //defaults to current day

  function getMonthCalanderData(date) {
    let today = new Date();
    let firstDayofMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDayofMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let firstDayNameIndex = firstDayofMonth.getDay();
    let lastDayNameIndex = lastDayofMonth.getDay();

    let startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      0 - firstDayNameIndex
    );

    let endDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      6 - lastDayNameIndex
    );

    let tempDate = startDate;
    let dateArray = [];

    while (tempDate < endDate) {
      dateArray.push(tempDate);

      //this is finiky, in order to increase temp date by +1, you need to create a new object using the setdate function, however,
      //this means the tempdate in memory(already in the array) will be changed, this is why "start date" is one less day than the true start date
      tempDate = new Date(tempDate.setDate(tempDate.getDate() + 1));
    }

    let dateObjectArray = [];
    let dateObject = {};

    //set the month array as an array of object that are either "current month" or "current day" to impact styling

    for (let day in dateArray) {
      if (date.getMonth() !== dateArray[day].getMonth()) {
        dateObject = {
          date: dateArray[day],
          isCurrentMonth: false,
          isSelected: false,
        };
      } else if (
        today.getDate() + "" + today.getMonth() + "" + today.getFullYear() ===
        dateArray[day].getDate() +
          "" +
          dateArray[day].getMonth() +
          "" +
          dateArray[day].getFullYear()
      ) {
        dateObject = {
          date: dateArray[day],
          isCurrentMonth: true,
          isToday: true,
          isSelected: false,
        };
      } else {
        dateObject = {
          date: dateArray[day],
          isCurrentMonth: true,
          isSelected: false,
        };
      }
      dateObjectArray.push(dateObject);
    }

    return dateObjectArray;
  }

  return (
    <>
      <div className="w-96 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 xl:col-start-9">
        <div className="flex items-center text-gray-900">
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon
              className="h-5 w-5"
              aria-hidden="true"
              onClick={() => {
                changeMonth(0);
              }}
            />
          </button>
          <div className="flex-auto font-semibold">
            {monthNames[currentMonth.getMonth()]}
          </div>
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon
              className="h-5 w-5"
              aria-hidden="true"
              onClick={() => {
                changeMonth(2);
              }}
            />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
          {dateObjectArray.map((day, dayIdx) => (
            <button
              key={day.date}
              type="button"
              className={classNames(
                "py-1.5 hover:bg-gray-100 focus:z-10",
                day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                (day.isSelected || day.isToday) && "font-semibold",
                day.isSelected && "text-white",
                !day.isSelected &&
                  day.isCurrentMonth &&
                  !day.isToday &&
                  "text-gray-900",
                !day.isSelected &&
                  !day.isCurrentMonth &&
                  !day.isToday &&
                  "text-gray-400",
                day.isToday && !day.isSelected && "text-swizpink",
                dayIdx === 0 && "rounded-tl-lg",
                dayIdx === 6 && "rounded-tr-lg",
                dayIdx === dateObjectArray.length - 7 && "rounded-bl-lg",
                dayIdx === dateObjectArray.length - 1 && "rounded-br-lg"
              )}
              onClick={() => {
                const newDateobj = [...dateObjectArray];
                if (currentlySelectedIdx) {
                  newDateobj[currentlySelectedIdx].isSelected = false;
                }
                newDateobj[dayIdx].isSelected = true;
                setDate(newDateobj[dayIdx]);
                setCurrentlySelectedIdx(dayIdx);
                setDateObjectArray(newDateobj);
              }}
            >
              <p
                dateTime={day.date}
                className={classNames(
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                  day.isSelected && day.isToday && "bg-indigo-600",
                  day.isSelected && !day.isToday && "bg-gray-900"
                )}
              >
                {day.date.getDate()}
              </p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
