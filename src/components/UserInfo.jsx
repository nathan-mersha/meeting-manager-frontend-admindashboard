import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { changeUserStatus, deleteUser } from "../hooks/useUserData";

function UserInfo({ userId, handleClose }) {
  const [userInfo, setUserInfo] = useState(userId);

  const updaterData = async () => {
    var data = {
      id: userId.id,
      isAccountDeactivated: !userId.isAccountDeactivated,
    };
    console.log(data);
    const res = await changeUserStatus(data);

    if (res === "done") {
      alert("User status changed successfully");
      setUserInfo({ ...data });
      handleClose();
    } else {
      alert("Something went wrong");
    }
  };

  const deleteUserHandle = async () => {
    var data = { email: userId.email };
    const res = await deleteUser(data);

    if (res === "done") {
      alert("User deleted successfully");
      setUserInfo({ ...data });
      handleClose();
    } else {
      alert("Something went wrong");
    }
  };

  // useEffect(
  //   () =>
  //     onSnapshot(query(doc(db, "Users", userId)), (snapshot) => {
  //       // const userData = snapshot.docs.map((data) => {
  //       //   return {...data.data(), _id: data.id };
  //       // });
  //       // console.debug(userData);

  //       setUserInfo({...snapshot.data(),_id:snapshot.id});

  //       //   setLoading(false);
  //     }),
  //   [userId]
  // );
  return (
    <div className="w-full flex justify-center items-center  fixed  outline-none focus:outline-none shadow-md rounded-md">
      <div className=" w-auto my-6 mx-auto">
        <div className="w-[500px] border-0 rounded-lg shadow-lg  flex flex-col justify-between bg-white outline-none focus:outline-none">
          <div>
            <div className="p-4 space-y-1 ">
              <div className="flex  justify-end pb-6">
                <button
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <AiOutlineCloseCircle className="h-6 w-6 text-blue-500" />
                </button>
              </div>

              {userInfo && (
                <div className=" flex flex-col items-center gap-x-4 ">
                  {userInfo.profilePicture ? (
                    <img
                      src={userInfo.profilePicture}
                      alt="image"
                      className="h-20 w-20 rounded-full"
                    />
                  ) : (
                    <img
                      src="https://cdn.vectorstock.com/i/1000x1000/85/94/person-gray-photo-placeholder-man-silhouette-sign-vector-23838594.webp"
                      alt="image"
                      className="h-20 w-20 rounded-full"
                    />
                  )}

                  <div className="border-2 py-2 mt-4 rounded-tr-lg rounded-bl-lg w-full">
                    <div className=" flex-col items-center justify-center">
                      <div className="flex items-center p-2 justify-center  border-b-2 border-gray-200">
                        <h4 className="w-1/2">Name</h4>
                        <h4 className="text-blue-500 ml-10 mr-10 font-normal text-xl">
                          .
                        </h4>
                        <h4 className="w-1/2 font-normal text-black">
                          {userInfo.firstName} {userInfo.lastName}
                        </h4>
                      </div>
                      <div className="flex items-center p-2 justify-center border-b-2 border-gray-200">
                        <h4 className="w-1/2 ">Email</h4>
                        <h4 className=" text-blue-500 ml-10 mr-10 font-normal text-xl">
                          .
                        </h4>
                        <h4 className="w-1/2 font-normal text-black">
                          {userInfo.email}
                        </h4>
                      </div>
                      <div className="flex items-center p-2 justify-between gap-x-2 border-b-2 border-gray-200">
                        <h4 className="w-1/2">Phone Number</h4>
                        <h4 className="text-blue-500 ml-10 mr-10 font-normal text-xl">.</h4>
                        <h4 className="w-1/2 font-normal text-black">
                          {userInfo.phoneNumber}
                        </h4>
                      </div>
                      <div className="flex items-center p-2 justify-between gap-x-2 border-b-2 border-gray-200">
                        <h4 className="w-1/2">DoB</h4>
                        <h4 className="text-blue-500 ml-10 mr-10 font-normal text-xl">.</h4>
                        <h4 className="w-1/2 font-normal text-black">
                          {userInfo.dob}
                        </h4>
                      </div>
                      <div className="flex items-center p-2 justify-between gap-x-2 border-b-2 border-gray-200">
                        <h4 className="w-1/2">Gender</h4>
                        <h4 className="text-blue-500 ml-10 mr-10 font-normal text-xl">.</h4>
                        <h4 className="w-1/2 font-normal text-black">
                          {userInfo.gender}
                        </h4>
                      </div>

                      <div className="flex items-center p-2 justify-between gap-x-2 border-b-2 border-gray-200">
                        <h4 className="w-1/2">Country</h4>
                        <h4 className="text-blue-500 ml-10 mr-10 font-normal text-xl">.</h4>
                        <h4 className="w-1/2 font-normal text-black">
                          {userInfo.country}
                        </h4>
                      </div>

                      <div className="flex items-center p-2 justify-between gap-x-2 border-b-2 border-gray-200">
                        <h4 className="w-1/2">city</h4>
                        <h4 className="text-blue-500 ml-10 mr-10 font-normal text-xl">.</h4>
                        <h4 className="w-1/2 font-normal text-black">
                          {userInfo.city}
                        </h4>
                      </div>

                      <div className="flex items-center p-2 justify-between gap-x-2 border-b-2 border-gray-200">
                        <h4 className="w-1/2">Membership</h4>
                        <h4 className="text-blue-500 ml-10 mr-10 font-normal text-xl">.</h4>
                        <h4 className="w-1/2 font-normal text-black">
                          {userInfo.planType}
                        </h4>
                      </div>

                      <div className="flex items-center p-2 justify-between gap-x-2 border-b-2 border-gray-200">
                        <h4 className="w-1/2">Company</h4>
                        <h4 className="text-blue-500 ml-10 mr-10 font-normal text-xl">.</h4>
                        <h4 className="w-1/2 font-normal text-black">
                          {userInfo.companyName}
                        </h4>
                      </div>
                      <div className="flex items-center p-2 justify-between gap-x-2 ">
                        <h4 className="w-1/2">Position</h4>
                        <h4 className="text-blue-500 ml-10 mr-10 font-normal text-xl">.</h4>
                        <h4 className="w-1/2 font-normal text-black">
                          {userInfo.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full  ">
              <div className="w-full flex items-center  justify-between space-x-3 p-5">
                {!userInfo.isAccountDeactivated ? (
                  <button
                    className=" flex items-center justify-center gap-x-2 py-2 rounded-xl text-sm px-8 bg-red-500 text-white"
                    onClick={() => {
                      updaterData();
                    }}
                  >
                    <FaUserEdit className="h-6 w-6 text-white" />
                    Deactivate
                  </button>
                ) : (
                  <button
                    className=" flex items-center justify-center gap-x-2 py-2 rounded-xl text-sm px-8 bg-blue-500 text-white"
                    onClick={() => {
                      updaterData();
                    }}
                  >
                    <FaUserEdit className="h-6 w-6 text-white" />
                    Activate
                  </button>
                )}

                <button
                  className=" flex items-center justify-center gap-x-2 py-2 rounded-xl text-sm px-8 bg-gray-500 text-white"
                  onClick={() => {
                    deleteUserHandle();
                  }}
                >
                  <MdDeleteSweep className="h-6 w-6 text-white" />
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
