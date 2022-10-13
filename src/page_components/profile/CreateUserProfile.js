import { useState } from "react";
import { useEffect } from "react";

export default function CreateUserProfile({ fireToken, setUserObj }) {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState("");

  async function handleSubmit() {
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("avatar", avatar);

    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "user/current/",
        {
          headers: { Authorization: fireToken },
          method: "PATCH",
          body: formData,
        }
      );
      const data = await res.json();
      setUserObj(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // create the preview
    let objectUrl = "";

    if (avatar) {
      objectUrl = URL.createObjectURL(avatar);
      setPreview(objectUrl);
    }

    // free memory when ever this component is unmounted
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [avatar]);

  return (
    <div className="space-y-2" action="#" method="POST">
      <div>
        <img className="h-20 w-auto" src="/S_LOGO 2.png" alt="Workflow" />
        <h2 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-gray-900">
          Swizzle
        </h2>
      </div>
      <div className="col-span-1">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Create Profile
        </h3>
      </div>
      <div className="mt-5 space-y-2 col-span-2 mt-0">
        <div className="">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Username
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="first-name"
              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
        <div className="">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            First Name
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="first-name"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            />
          </div>
        </div>
        <div className="">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Last Name
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="first-name"
              id="first-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <div className="mt-1 flex items-center space-x-5">
            {preview ? (
              <img
                src={preview}
                className="object-cover h-12 w-12 rounded-full"
              />
            ) : (
              <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            )}

            <div className="mt-1">
              <input
                id="avatar"
                name="avatar"
                type="file"
                autoComplete="avatar"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="pt-4">
          <button
            type="button"
            className="mr-8 inline-flex items-center rounded-md border border-transparent bg-swizblue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-swizblue-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-swizblue-vlight text-swizblue-dark px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-swizblue-light focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
