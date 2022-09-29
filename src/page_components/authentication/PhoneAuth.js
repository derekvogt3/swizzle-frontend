import React from "react";
import { PhoneIcon } from "@heroicons/react/outline";
import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { XCircleIcon } from "@heroicons/react/solid";

function PhoneErrorMessage({ showError }) {
  return (
    <div
      className={`absolute mt-2 rounded-md bg-red-50 p-4 ${
        showError ? "" : "hidden"
      }`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            There were errors with your submission
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc space-y-1 pl-5">
              <li>
                Input a 10 digit XXX-XXX-XXXX phone number. We are currently
                only available in the US (+1)
              </li>
              <li>Do not include any hyphens</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
function phoneNumberCheck(inputtxt) {
  var phoneno = /^\d{10}$/;
  if (inputtxt.match(phoneno)) {
    return true;
  } else {
    return false;
  }
}

export default function PhoneAuth({ setAuthNav, setFireToken }) {
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [showCaptia, setShowCaptia] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");

  const signIn = () => {
    const auth = firebase.auth();
    firebase.auth().useDeviceLanguage();

    if (number === "" || number.length < 10 || number.length > 10) return;

    const formattedNumber = countryCode + number;

    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(formattedNumber, verify)
      .then((result) => {
        setfinal(result);
        setshow(true);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        return user;
      })
      .catch((error) => alert("error getting user"));
  };

  function handleButtonClick() {
    if (phoneNumberCheck(number)) {
      setShowCaptia(true);
      signIn();
    } else {
      console.log("Test");
      setPhoneNumberError(true);
    }
  }

  return (
    <>
      {!show ? (
        <div className="flex flex-col">
          <PhoneIcon className="h-14 self-start" />
          <div className="pb-4 ">
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
              What's your phone number?
            </h2>
          </div>
          <div>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country"
                  className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option>US</option>
                  <option>CA</option>
                </select>
              </div>
              <input
                type="text"
                name="phone-number"
                id="phone-number"
                className="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="(555) 987-6543"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="py-6">
            {showCaptia ? (
              <div className="h-10"></div>
            ) : (
              <div className="relative">
                <button
                  id="sign-in-button"
                  type="submit"
                  onClick={() => {
                    handleButtonClick();
                  }}
                  className="flex w-full h-10 justify-center rounded-md border border-transparent bg-swizblue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-swizblue-dark focus:outline-none focus:ring-2 focus:ring-swizblue-light focus:ring-offset-2"
                >
                  Confirm
                </button>
                <PhoneErrorMessage showError={phoneNumberError} />
              </div>
            )}
          </div>
          <div
            id="recaptcha-container"
            className="flex justify-center h-24"
          ></div>
        </div>
      ) : (
        <div>
          <label
            htmlFor="account-number"
            className="block text-sm font-medium text-gray-700"
          >
            Verification Number
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="account-number"
              id="account-number"
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="000000"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <QuestionMarkCircleIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="py-6">
            <button
              id="sign-in-button"
              type="submit"
              onClick={ValidateOtp}
              className="flex w-full justify-center rounded-md border border-transparent bg-swizpurp py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-swizpurp-dark focus:outline-none focus:ring-2 focus:ring-swizpurp-light focus:ring-offset-2"
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </>
  );
}
