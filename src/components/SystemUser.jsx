import React, { useEffect } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdVisibility,MdManageAccounts } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { getListUser } from "../hooks/useUserData";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import { getDataState } from "../atoms/postAtom";
import AddUser from "./AddUser";
import useAuth from "../hooks/useAuth";

let userData = [];
function SystemUser() {
  const [addNewUser, setAddNewUser] = useState(false);
  const { config } = useAuth();

  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getDataState);
  const [userList, setUserList] = useState(userData);
  const [user, setUser] = useState(null);

  const searchUser = (search) => {
    const searchResult = userData.filter(
      (user) =>
        (user.email &&
          user.email
            .toLocaleLowerCase()
            .startsWith(search.toLocaleLowerCase())) ||
        (user.firstName &&
          user.firstName
            .toLocaleLowerCase()
            .startsWith(search.toLocaleLowerCase())) ||
        (user.phoneNumber &&
          user.phoneNumber
            .toLocaleLowerCase()
            .startsWith(search.toLocaleLowerCase())) ||
        (user.lastName &&
          user.lastName
            .toLocaleLowerCase()
            .startsWith(search.toLocaleLowerCase())) ||
        (user.userType &&
          user.userType
            .toLocaleLowerCase()
            .startsWith(search.toLocaleLowerCase()))
    );
    setUserList(searchResult);
  };
  useEffect(() => {
    const fetchData = async () => {
    const newUserData = await getListUser();
      userData=newUserData.filter(user=>user.userType!=='user');
      setUserList(userData);
    };
    fetchData().catch(console.error);
  }, [modalOpen]);

  if (addNewUser && user) {
    return (
      <AddUser
        user={user}
        handleClose={() => {
          setAddNewUser(false);
        }}
      />
    );
  } else if (addNewUser) {
    return (
      <AddUser
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
            <h1 className=" text-2xl  font-bold">ARRANGE ADMIN USERS</h1>
            <div className="bg-blue-500 w-20 h-1 rounded-xl"></div>
          </div>
          
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Phone
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      User Type
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Country
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
                  {userList.map((user) => {
                    return (
                      <tr
                        className={`${
                          user.email === "nathanmersha@gmail.com" ||
                          user.email === "nathandegineh@gmail.com"
                            ? "hidden"
                            : ""
                        } border-b `}
                        key={user.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex space-x-3">
                            <h1 className="text-gray-900 text-sm">
                              {user.firstName} {user.lastName}
                            </h1>
                          </div>
                        </td>
                        <td className="font-medium text-blue-500  px-6 py-4 whitespace-nowrap ">
                          {user.email}
                        </td>
                        <td className="font-medium text-gray-700  px-6 py-4 whitespace-nowrap">
                          {user.phoneNumber}
                        </td>

                        <td className="font-medium  text-gray-900  px-6 py-4 whitespace-nowrap">
                          {user.userType}
                        </td>

                        <td className="font-medium text-gray-700 px-6 py-4 whitespace-nowrap">
                          {user.country}
                        </td>

                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-between">
                            <MdVisibility
                              className="h-5 w-5 text-blue-500"
                              onClick={() => {
                                setPostState(user);
                                setModalType("userInfo");
                                setModalOpen(true);
                              }}
                            />
                            {/* <FiEdit
                              className="h-5 w-5 text-green-500"
                              onClick={() => {
                                setUser(user);
                                setAddNewUser(true);
                              }}
                            /> */}
                            <MdManageAccounts
                              className="h-5 w-5 text-blue-500"
                              onClick={() => {
                                setPostState(user);
                                setModalType("userAssign");
                                setModalOpen(true);
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


export default SystemUser