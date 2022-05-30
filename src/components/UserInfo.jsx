import React, { useEffect, useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";

import { AiOutlineCloseCircle } from "react-icons/ai";

function UserInfo({ driverId, handleClose }) {
  const [driverInfo, setDriverInfo] = useState(driverId);

  // useEffect(
  //   () =>
  //     onSnapshot(query(doc(db, "Users", driverId)), (snapshot) => {
  //       // const driverData = snapshot.docs.map((data) => {
  //       //   return {...data.data(), _id: data.id };
  //       // });
  //       // console.debug(driverData);

  //       setDriverInfo({...snapshot.data(),_id:snapshot.id});

  //       //   setLoading(false);
  //     }),
  //   [driverId]
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

              {driverInfo && (
                <div className=" flex flex-col items-center gap-x-4 ">
                  {driverInfo.profilePicture ? (
                    <img
                      src={driverInfo.profilePicture}
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

                  <div className="border-2 py-2 mt-4 rounded-tr-lg rounded-bl-lg ">
                    <div className="fle flex-col items-center justify-center">
                      <div className="flex items-center p-2 justify-center gap-x-2 border-b-2 border-gray-200">
                        <h4 className="">Name</h4>
                        <h4 className="text-blue-500 font-normal text-xl">.</h4>
                        <h4 className="font-normal text-black">
                          {driverInfo.firstName} {driverInfo.lastName}
                        </h4>
                      </div>
                      <div className="flex items-center p-2 justify-center gap-x-2 border-b-2 border-gray-200">
                        <h4 className="">Email</h4>
                        <h4 className="text-blue-500 font-normal text-xl">.</h4>
                        <h4 className="font-normal text-black">
                          {driverInfo.email}
                        </h4>
                      </div>
                      <div className="flex items-center p-2 justify-center gap-x-2 border-b-2 border-gray-200">
                        <h4 className="">Phone Number</h4>
                        <h4 className="text-blue-500 font-normal text-xl">.</h4>
                        <h4 className="font-normal text-black">
                          {driverInfo.phoneNumber}
                        </h4>
                      </div>
                      <div className="flex items-center p-2 justify-center gap-x-2 border-b-2 border-gray-200">
                        <h4 className="">DoB</h4>
                        <h4 className="text-blue-500 font-normal text-xl">.</h4>
                        <h4 className="font-normal text-black">
                          {driverInfo.dob} 
                        </h4>
                      </div>
                      <div className="flex items-center p-2 justify-center gap-x-2 border-b-2 border-gray-200">
                        <h4 className="">Gender</h4>
                        <h4 className="text-blue-500 font-normal text-xl">.</h4>
                        <h4 className="font-normal text-black">
                          {driverInfo.gender} 
                        </h4>
                      </div>

                      <div className="flex items-center p-2 justify-center gap-x-2 border-b-2 border-gray-200">
                        <h4 className="">Country</h4>
                        <h4 className="text-blue-500 font-normal text-xl">.</h4>
                        <h4 className="font-normal text-black">
                          {driverInfo.country} 
                        </h4>
                      </div>


                      <div className="flex items-center p-2 justify-center gap-x-2 border-b-2 border-gray-200">
                        <h4 className="">city</h4>
                        <h4 className="text-blue-500 font-normal text-xl">.</h4>
                        <h4 className="font-normal text-black">
                          {driverInfo.city} 
                        </h4>
                      </div>

                      <div className="flex items-center p-2 justify-center gap-x-2 border-b-2 border-gray-200">
                        <h4 className="">Membership</h4>
                        <h4 className="text-blue-500 font-normal text-xl">.</h4>
                        <h4 className="font-normal text-black">
                          {driverInfo.planType} 
                        </h4>
                      </div>

                      <div className="flex items-center p-2 justify-center gap-x-2 border-b-2 border-gray-200">
                        <h4 className="">Company</h4>
                        <h4 className="text-blue-500 font-normal text-xl">.</h4>
                        <h4 className="font-normal text-black">
                          {driverInfo.companyName} 
                        </h4>
                      </div>
                      <div className="flex items-center p-2 justify-center gap-x-2 ">
                        <h4 className="">Position</h4>
                        <h4 className="text-blue-500 font-normal text-xl">.</h4>
                        <h4 className="font-normal text-black">
                          {driverInfo.title} 
                        </h4>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full  ">
              <div className="flex items-center justify-center p-5">
              { !driverInfo.isAccountDeactivated?
              <button
                  className=" flex items-center justify-center gap-x-2 py-2 rounded-xl text-sm px-8 bg-red-500 text-white"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <MdDeleteSweep className="h-6 w-6 text-white" />
                  Deactivate
                </button>
                :<button
                className=" flex items-center justify-center gap-x-2 py-2 rounded-xl text-sm px-8 bg-blue-500 text-white"
                onClick={() => {
                  handleClose();
                }}
              >
                <MdDeleteSweep className="h-6 w-6 text-white" />
                Activate
              </button>
              
              }

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
