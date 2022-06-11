import React, { useState } from "react";
import { changeUserType } from "../hooks/useUserData";

function UserAssign({ handleClose, post }) {
  const [userType, setUserType] = useState(post.userType);
  const changeUserTypeHandler = async (newUserType) => {
    const res = await changeUserType({ "id": post.id, "userType": newUserType });

    if (res === "done") {
      alert("User status changed successfully");
      handleClose();
    } else {
      alert("Something went wrong");
      handleClose();
    }
  };

  return (
    <div className="w-[300px] p-2 flex flex-col gap-y-2">
      <h4 className=" font-medium text-lg w-full">
        change user account type :
      </h4>
      <h4 className="text-md w-full">
        {post.email}
      </h4>
      
      <label className="inline-block w-full">
        <select
          value={userType}
          onChange={(e) => {
            setUserType(e.target.value);
            changeUserTypeHandler(e.target.value);
          }}
          className="border flex justify-center items-center w-full px-3 rounded-xl h-10 bg-gray-200"
        >
          <option value="user">user</option>
          <option value="operator">operator</option>
          <option value="administrator">administrator</option>
        </select>
      </label>
    </div>
  );
}

export default UserAssign;
