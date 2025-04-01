import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [about, setAbout] = useState(user.about || "");
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();

  const handleProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, gender, age, skills, about },
        { withCredentials: true }
      );
      console.log(res?.data?.data);
      dispatch(addUser(res?.data?.data));

      setToast(true);

      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      if (err.response) {
        setError(err?.response?.data);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                  Edit Profile
                </h2>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                      placeholder=" "
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-4 -top-3 text-sm bg-white dark:bg-gray-800 px-1 text-gray-600 dark:text-gray-300"
                    >
                      First Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                      placeholder=" "
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute left-4 -top-3 text-sm bg-white dark:bg-gray-800 px-1 text-gray-600 dark:text-gray-300"
                    >
                      Last Name
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative w-1/2">
                      <input
                        type="text"
                        id="age"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                        placeholder=" "
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                      <label
                        htmlFor="age"
                        className="absolute left-4 -top-3 text-sm bg-white dark:bg-gray-800 px-1 text-gray-600 dark:text-gray-300"
                      >
                        Age
                      </label>
                    </div>

                    <div className="relative w-1/2">
                      <input
                        type="text"
                        id="gender"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                        placeholder=" "
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label
                        htmlFor="gender"
                        className="absolute left-4 -top-3 text-sm bg-white dark:bg-gray-800 px-1 text-gray-600 dark:text-gray-300"
                      >
                        Gender
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="skills"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                      placeholder=" "
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                    <label
                      htmlFor="skills"
                      className="absolute left-4 -top-3 text-sm bg-white dark:bg-gray-800 px-1 text-gray-600 dark:text-gray-300"
                    >
                      Skills
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      id="about"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none h-24 bg-gray-50 dark:bg-gray-700 dark:text-white"
                      placeholder=" "
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                    <label
                      htmlFor="about"
                      className="absolute left-4 -top-3 text-sm bg-white dark:bg-gray-800 px-1 text-gray-600 dark:text-gray-300"
                    >
                      About
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="photoUrl"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                      placeholder=" "
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                    <label
                      htmlFor="photoUrl"
                      className="absolute left-4 -top-3 text-sm bg-white dark:bg-gray-800 px-1 text-gray-600 dark:text-gray-300"
                    >
                      Photo URL
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="mt-6">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={handleProfile}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="sticky top-24">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                  Preview
                </h2>
              <UserCard
                data={{ firstName, lastName, photoUrl, gender, age, skills, about }}
                btnshow={false}
              />
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed top-5 right-5 z-50 transition-all duration-300 transform translate-y-0 opacity-100">
          <div className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;