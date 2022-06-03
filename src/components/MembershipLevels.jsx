import React, { useEffect } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdVisibility } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { MdDeleteSweep } from "react-icons/md";

import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { getListUser } from "../hooks/useUserData";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import { getDataState } from "../atoms/postAtom";
import AddUser from "./AddUser";
import useAuth from "../hooks/useAuth";
import AddMembership from "./AddMembership";

let userData = [];
function MembershipLevels() {
  const [addNewUser, setAddNewUser] = useState(false);
  const { config } = useAuth();

  const [userList, setUserList] = useState(Object.keys(config.pricingPlan));
  const [user, setUser] = useState(null);

  const searchUser = (search) => {
    const searchResult = Object.keys(config.pricingPlan).filter(
      (membership) =>
        membership &&
        membership.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    );
    setUserList(searchResult);
  };
  const membershipSetter = (planType) => {
    if (planType === null) {
      setUserList(userData);
    } else {
      const filterResult = userData.filter(
        (user) =>
          user.planType &&
          user.planType
            .toLocaleLowerCase()
            .startsWith(planType.toLocaleLowerCase())
      );

      setUserList(filterResult);
    }
  };

  if (addNewUser && user) {
    return (
      <AddMembership
        user={user}
        handleClose={() => {
          setAddNewUser(false);
        }}
      />
    );
  } else if (addNewUser) {
    return (
      <AddMembership
        handleClose={() => {
          setAddNewUser(false);
        }}
      />
    );
  }

  return (
    <div className="ml-8 mt-8 bg-white ">
      <div className="flex items-center justify-between">
        <div className="flex p-3 space-x-5">
          <div className="flex flex-col space-y-1">
            <h1 className=" text-2xl  font-bold">MEMBERSHIP LEVELS</h1>
            <div className="bg-blue-500 w-20 h-1 rounded-xl"></div>
          </div>
          <button
            className=" flex items-center justify-between gap-x-2 bg-blue-600  text-white px-6 rounded-lg"
            onClick={() => {
              setUser(null);
              setAddNewUser(true);
            }}
          >
            <IoAddCircleOutline className="w-5 h-5 text-white" />
            add Membership levels
          </button>
        </div>

        <div className="border flex justify-center items-center px-2 rounded-xl h-10 bg-gray-200">
          <BiSearchAlt2 className="text-blue-500 h-5 w-5" />
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-1 focus:outline-none bg-gray-200"
            onChange={(e) => {
              setUserList(userData);
              searchUser(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Membership Title
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Price per month
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Price per year
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((membership, index) => {
                    return (
                      <tr className="border-b " key={index}>
                        <td className="font-medium text-gray-700  px-6 py-4 whitespace-nowrap ">
                          {config.pricingPlan[membership].name}
                        </td>
                        <td className="font-medium text-gray-700  px-6 py-4 whitespace-nowrap">
                          {config.pricingPlan[membership].monthlyPrice}
                        </td>

                        <td className="font-medium  text-gray-900  px-6 py-4 whitespace-nowrap">
                          {config.pricingPlan[membership].yearlyPrice}
                        </td>

                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-between">
                            {/* <MdVisibility
                              className="h-5 w-5 text-blue-500"
                              onClick={() => {
                                setPostState(config.pricingPlan[membership]);
                                setModalType("userInfo");
                                setModalOpen(true);

                              }}
                            /> */}
                            <FiEdit
                              className="h-5 w-5 text-green-500"
                              onClick={() => {
                                setUser(config.pricingPlan[membership]);
                                setAddNewUser(true);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembershipLevels;
