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

let driverData = [];
function ArrangeUser() {
  const [addNewUser, setAddNewUser] = useState(false);

  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getDataState);

  const [membershipFilter, setMembershipFilter] = useState(false);
  const [membershipSelected, setMembershipSelected] = useState(null);

  const [countryFilter, setCountryFilter] = useState(false);
  const [countrySelected, setCountrySelected] = useState(null);

  const [driverList, setDriverList] = useState(driverData);
  const searchDriver = (search) => {
    const searchResult = driverData.filter(
      (driver) =>
        driver.email
          .toLocaleLowerCase()
          .startsWith(search.toLocaleLowerCase()) ||
        driver.displayName
          .toLocaleLowerCase()
          .startsWith(search.toLocaleLowerCase()) ||
        driver.phoneNumber
          .toLocaleLowerCase()
          .startsWith(search.toLocaleLowerCase()) ||
        driver.carType
          .toLocaleLowerCase()
          .startsWith(search.toLocaleLowerCase()) ||
        driver.status.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    );
    setDriverList(searchResult);
  };
  useEffect(() => {
    const fetchData = async () => {
      const userList = await getListUser();
      console.log(userList);
      setDriverList(userList);
    };
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  if(addNewUser){
      return (
        <AddUser handleClose={()=>{
            setAddNewUser(false)
        }}/>
      )
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
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div className="py-1" role="none">
              <p
                className=" text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setMembershipSelected();
                  setMembershipFilter(false);
                }}
              >
                All
              </p>
              <p
                className=" text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setMembershipSelected("Vip");
                  setMembershipFilter(false);
                }}
              >
                Vip
              </p>
              <p
                className=" text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();

                  setMembershipSelected("Premium");
                  setMembershipFilter(false);
                }}
              >
                Premium
              </p>
              <p
                className=" text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();

                  setMembershipSelected("Basic");
                  setMembershipFilter(false);
                }}
              >
                Basic
              </p>
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
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
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
              setDriverList(driverData);
              searchDriver(e.target.value);
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
                  {driverList.map((driver) => {
                    return (
                      <tr className="border-b " key={driver._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex space-x-3">
                            <h1 className="text-gray-900 text-sm">
                              {driver.firstName} {driver.lastName}
                            </h1>
                          </div>
                        </td>
                        <td className="font-medium text-blue-500 font-light px-6 py-4 whitespace-nowrap ">
                          {driver.email}
                        </td>
                        <td className="font-medium text-gray-700 font-light px-6 py-4 whitespace-nowrap">
                          {driver.phoneNumber}
                        </td>

                        <td className="font-medium  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {driver.planType}
                        </td>

                        <td className="font-medium text-gray-700 font-light px-6 py-4 whitespace-nowrap">
                          {driver.country}
                        </td>

                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-between">
                            <MdVisibility
                              className="h-5 w-5 text-blue-500"
                              onClick={() => {
                                setPostState(driver);
                                setModalType("driverInfo");
                                setModalOpen(true);
                              }}
                            />
                            <FiEdit className="h-5 w-5 text-green-500" />
                            <MdDeleteSweep className="h-5 w-5 text-red-500" />
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
