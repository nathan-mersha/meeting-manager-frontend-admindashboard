import React, { useState } from "react";
import ArrangeMeeting from "./ArrangeMeeting";
import Membership from "./Membership";
import RegisterUser from "./RegisterUser";
function Dashboard() {
  const isActive =
    "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500";
  const inActive =
    "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";
  const [nav, setNav] = useState("Arrange Meeting");
  return (
    <div className="ml-8 mt-8 bg-white ">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="mr-2">
          <button
            className={nav === "Arrange Meeting" ? isActive : inActive}
            onClick={() => setNav("Arrange Meeting")}
          >
            Arrange Meeting
          </button>
        </li>
        <li class="mr-2">
          <button
            className={nav === "Register User" ? isActive : inActive}
            onClick={() => setNav("Register User")}
          >
            Register User
          </button>
        </li>
        <li class="mr-2">
          <button
            className={nav === "Membership" ? isActive : inActive}
            onClick={() => setNav("Membership")}
          >
            Membership
          </button>
        </li>
      </ul>
    
        {nav === "Arrange Meeting" && <ArrangeMeeting />}
        {nav === "Register User" && <RegisterUser />}
        {nav === "Membership" && <Membership />}


    </div>
  );
}

export default Dashboard;
