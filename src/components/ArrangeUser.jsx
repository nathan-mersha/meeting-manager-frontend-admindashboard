import React, { useEffect } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdVisibility, MdManageAccounts } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { getListUser } from "../hooks/useUserData";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import { getDataState } from "../atoms/postAtom";
import AddUser from "./AddUser";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
let userData = [];
function ArrangeUser() {
  const [addNewUser, setAddNewUser] = useState(false);
  const { config } = useAuth();

  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getDataState);

  const [membershipFilter, setMembershipFilter] = useState(false);
  const [membershipSelected, setMembershipSelected] = useState(null);

  const [userList, setUserList] = useState(userData);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [noRow, setNoRow] = useState(12);
  const [loading, setLoading] = useState(false);
  const [reLoad, setReLoad] = useState(false);
  const navigate = useNavigate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const dateMonth = month + "/" + year;

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
            .startsWith(search.toLocaleLowerCase())) ||
        (user.country &&
          user.country
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
  const changeRow = (value) => {
    setNoRow(value);
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  const prePage = () => {
    if (page === 1) return;

    setPage(page - 1);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      userData = await getListUser(noRow, page);
      setUserList(userData);
      setLoading(false);
    };
    fetchData().catch(console.error);
  }, [modalOpen, page, noRow, reLoad]);

  useEffect(() => {
    if (!config) {
      navigate("/", { replace: true });
    }
  }, [config]);

  if (!config) {
    return <div>Loading...</div>;
  }

  if (addNewUser && user) {
    return (
      <AddUser
        user={user}
        handleClose={() => {
          setAddNewUser(false);
          setReLoad(!reLoad);
        }}
      />
    );
  } else if (addNewUser) {
    return (
      <AddUser
        handleClose={() => {
          setAddNewUser(false);
          setReLoad(!reLoad);
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
                onClick={(e) => {
                  e.stopPropagation();
                  setMembershipSelected();
                  setMembershipFilter(false);
                  membershipSetter(null);
                }}
              >
                All
              </p>
              {Object.keys(config.pricingPlan).map((membership, index) => (
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
              ))}
            </div>
          </div>
        </div>

        {/* <div className="relative inline-block text-left">
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
        </div> */}
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
              {!loading && (
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
                        Total Meetings Created
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Meetings created this month
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Created At
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
                            {user.planType}
                          </td>

                          <td className="font-medium text-gray-700 px-6 py-4 whitespace-nowrap">
                            {user.country}
                          </td>
                          <td className="font-medium text-gray-700 px-6 py-4 whitespace-nowrap">
                            {/* get the current month */}
                            {user.meetingTotal}
                          </td>
                          <td className="font-medium text-gray-700 px-6 py-4 whitespace-nowrap">
                            {user.meetingMouth === dateMonth
                              ? user.meetingInAMouth
                              : "0"}
                          </td>
                          <td className="font-medium text-gray-700 px-6 py-4 whitespace-nowrap">
                            {/* format datetime to mm/dd/yyyy */}
                            {/* {dateFormat(user.firstModified, "dd/mm/yyyy")} */}
                            <ReactTimeAgo
                              date={user.firstModified}
                              locale="en-US"
                            />
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
              )}
              {loading && (
                <div className="flex w-full justify-center items-center">
                  <svg
                    role="status"
                    className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div
              className={`${
                loading && "hidden"
              } flex w-full bg-gray-200 p-3 items-center justify-end gap-x-3`}
            >
              <div className="text-sm font-medium">Rows per page</div>
              <select
                value={noRow}
                onChange={(e) => changeRow(e.target.value)}
                className=" border-none bg-gray-200 hover:border-none"
              >
                <option value="12">12</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>

              <IoIosArrowBack
                className={`${
                  page === 1 ? "text-gray-200" : "text-black"
                } w-6 h-6`}
                onClick={() => prePage()}
              />
              <span>{page}</span>
              <IoIosArrowForward
                className="w-6 h-6"
                onClick={() => nextPage()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArrangeUser;
