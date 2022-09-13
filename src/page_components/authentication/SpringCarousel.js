import { useSpringCarousel } from "react-spring-carousel";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const items = [
  {
    id: 1,
    text: "Meet your friends of friends! How does it work?",
    image: "/undraw_social_friends_re_7uaa.svg",
  },
  {
    id: 2,
    text: "The host picks the date, location and number of attendees and sends out a single invitation",
    image: "/undraw_online_calendar_re_wk3t.svg",
  },
  {
    id: 3,
    text: "Every other attendee is responsible for sending out another invitation, to keep the chain going",
    image: "/undraw_social_interaction_re_dyjh.svg",
  },
  {
    id: 4,
    text: "Host an event or accept an invitation to get started!",
    image: "/undraw_having_fun_re_vj4h.svg",
  },
];

export function SpringCarousel() {
  const [itemsIdx, setItemsIdx] = useState(0);
  const { carouselFragment, slideToPrevItem, slideToNextItem } =
    useSpringCarousel({
      items: items.map((i) => ({
        id: i,
        renderItem: (
          <div
            key={i.id}
            className="bg-white shadow rounded-lg flex flex-col items-center w-full m-2"
          >
            <img src={i.image} className="h-32 w-32"></img>
            <p className="p-2 text-center text-gray-600">{i.text}</p>
          </div>
        ),
      })),
    });

  return (
    <div>
      <div className="overflow-hidden">{carouselFragment}</div>

      <div className="flex justify-between p-2">
        {itemsIdx === 0 ? (
          <div className="w-8 h-8"></div>
        ) : (
          <ChevronLeftIcon
            className="w-8 h-8 text-gray-700"
            onClick={() => {
              setItemsIdx((index) => index - 1);
              slideToPrevItem();
            }}
          />
        )}
        <ol role="list" className="flex items-center space-x-5">
          {items.map((item, idx) => (
            <li key={item.id}>
              {idx < itemsIdx ? (
                <div className="block h-2.5 w-2.5 rounded-full bg-swizpurp"></div>
              ) : idx === itemsIdx ? (
                <div
                  className="relative flex items-center justify-center"
                  aria-current="step"
                >
                  <span
                    className="absolute flex h-5 w-5 p-px"
                    aria-hidden="true"
                  >
                    <span className="h-full w-full rounded-full bg-swizpurp-light" />
                  </span>
                  <span
                    className="relative block h-2.5 w-2.5 rounded-full bg-swizpurp"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <div className="block h-2.5 w-2.5 rounded-full bg-gray-200"></div>
              )}
            </li>
          ))}
        </ol>
        {itemsIdx === items.length - 1 ? (
          <div className="w-8 h-8 "></div>
        ) : (
          <ChevronRightIcon
            className="w-8 h-8 text-gray-700"
            onClick={() => {
              setItemsIdx((index) => index + 1);
              slideToNextItem();
            }}
          />
        )}
      </div>
    </div>
  );
}
