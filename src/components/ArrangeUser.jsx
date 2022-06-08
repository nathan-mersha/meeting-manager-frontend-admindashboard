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
import useAuth from '../hooks/useAuth';

let userData = [];
function ArrangeUser() {
  const [addNewUser, setAddNewUser] = useState(false);
  const { config } = useAuth()
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getDataState);

  const [membershipFilter, setMembershipFilter] = useState(false);
  const [membershipSelected, setMembershipSelected] = useState(null);

  const [countryFilter, setCountryFilter] = useState(false);
  const [countrySelected, setCountrySelected] = useState(null);

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
        (user.planType &&
          user.planType
            .toLocaleLowerCase()
            .startsWith(search.toLocaleLowerCase()))
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
  useEffect(() => {
    const fetchData = async () => {
      userData = await getListUser();
      setUserList(userData);
    };
    fetchData().catch(console.error);
  }, []);

if(addNewUser&& user){
  return (
    <AddUser
     user={user}
      handleClose={() => {
        setAddNewUser(false);
      }}
    />
  );
}
 else if (addNewUser) {
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
      <div className="flex items-end justify-end mb-3 space-x-4">
        <div className="space-y-1">
          <h1 className=" text-xl font-semibold ">Filter By</h1>
          <div className="bg-blue-500 w-10 h-1 rounded-xl"></div>
        </div>
        <div className="relative inline-block text-left">
          <div className="">
            <button
              type="button"
              // onBlur={() => setMembershipFilter(false)}
              className="flex items-center justify-between  rounded-xl gap-x-3 border border-gray-300 shadow-sm px-2  py-2 bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              onClick={() => setMembershipFilter(true)}
            >
              <h4 className="text-gray-400">
                {membershipSelected
                  ? membershipSelected
                  : "Membership level..."}
                {"  "}
              </h4>

              <TiArrowSortedDown className=" h-6 w-6 text-blue-500" />
            </button>
          </div>

          <div
            className={`${
              membershipFilter ? "" : "hidden"
            } origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div className="py-1" role="none">
            <p
                    className=" cursor-pointer w-full flex items-start justify-start px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              
                onClick={
                  (e) => {
                  e.stopPropagation();
                  setMembershipSelected();
                  setMembershipFilter(false);
                  membershipSetter(null);
                }
              }
              >
                All
              </p>
              {
                Object.keys(config.pricingPlan).map((membership,index) => (
                  <button
                    key={index}
                    type="button"
                    className=" w-full flex items-start justify-start px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMembershipSelected(membership);
                      membershipSetter(membership);
                      setMembershipFilter(false);
                    }}
                    >
                    {membership}
                    </button>
                ))
                  }
           
             
            </div>
          </div>
        </div>

        <div className="relative inline-block text-left">
          <div className="">
            <button
              type="button"
              //   onBlur={() => setCountryFilter(false)}
              className="flex items-center justify-between  rounded-xl gap-x-3 border border-gray-300 shadow-sm px-2  py-2 bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              onClick={() => setCountryFilter(true)}
            >
              <h4 className="text-gray-400">
                {countrySelected ? countrySelected : "Counter..."}
                {"  "}
              </h4>

              <TiArrowSortedDown className=" h-6 w-6 text-blue-500" />
            </button>
          </div>

          <div
            className={`${
              countryFilter ? "" : "hidden"
            } origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div className="py-1" role="none">
              <p
                className=" text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setCountrySelected();
                  setCountryFilter(false);
                }}
              >
                All
              </p>
              <p
                className=" text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setCountrySelected("Ethiopia");
                  setCountryFilter(false);
                }}
              >
                Ethiopia
              </p>
              <p
                className=" text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();

                  setCountrySelected("Korea");
                  setCountryFilter(false);
                }}
              >
                Korea
              </p>
              <p
                className=" text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();

                  setCountrySelected("USA");
                  setCountryFilter(false);
                }}
              >
                USA
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex p-3 space-x-5">
          <div className="flex flex-col space-y-1">
            <h1 className=" text-2xl  font-bold">ARRANGE USERS</h1>
            <div className="bg-blue-500 w-20 h-1 rounded-xl"></div>
          </div>
          <button
            className=" flex items-center justify-between gap-x-2 bg-blue-600  text-white px-6 rounded-lg"
            onClick={() => {
              setAddNewUser(true);
            }}
          >
            <IoAddCircleOutline className="w-5 h-5 text-white" />
            register user
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
                      Membership
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

                    
                    return(
                      <tr className={`${user.email==="nathanmersha@gmail.com" || user.email==="nathandegineh@gmail.com"? "hidden":""} border-b `} key={user.id}>
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
                          {user.planType}
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
                            <FiEdit
                              className="h-5 w-5 text-green-500"
                              onClick={() => {
                                setUser(user);
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

export default ArrangeUser;
