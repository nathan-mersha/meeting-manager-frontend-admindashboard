import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoCalendar } from "react-icons/io5";
import { FaCalendarCheck } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { FiSave } from "react-icons/fi";
import { useForm } from "react-hook-form";

import { FaUpload } from "react-icons/fa";

function AddUser({ handleClose,user }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // if (login) {
    //    await signIn(data.email, data.password)
    // } else {
    //   // await signUp(data.email, data.password)
    // }
  }
  return (
    <form  
    onSubmit={handleSubmit(onSubmit)}
     className="ml-8 mt-8 bg-white">
      <div className="flex items-center px-1 space-x-1">
        <IoIosArrowBack className="h-5 w-5 text-blue-500" />
        <button onClick={() => handleClose()} className="text-md font-normal">
          Back
        </button>
      </div>

      <div className="flex flex-col items-start py-8 pl-8 gap-y-10">
        <div className="flex flex-col items-start">
          <h4 className="text-black font-bold text-lg">REGISTER USER</h4>
          <div className="bg-blue-500 w-16 h-1 rounded-xl"></div>
        </div>

        <div 
       
        className="flex items-start gap-x-8">
          <div className="flex flex-col gap-y-4">
            <label className="inline-block w-full">
              <div className="border flex justify-between items-center px-2 rounded-xl h-10 bg-gray-200">
                {/* <BiSearchAlt2 className="text-blue-500 h-5 w-5" /> */}
                <input
                  type="text"
                  defaultValue={user?.firstName}
                  placeholder="First name..."
                  className="px-3 py-1 focus:outline-none bg-gray-200"
                  {...register("firstName", { required: true })}
                  onChange={(e) => {}}
                />
              </div>
              {errors.firstName && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid First Name.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
            <div className="border flex justify-between items-center px-2 rounded-xl h-10 bg-gray-200">
              {/* <BiSearchAlt2 className="text-blue-500 h-5 w-5" /> */}
              <input
                type="email"
                placeholder="Email..."
                defaultValue={user?.email}
                className="px-3 py-1 focus:outline-none bg-gray-200"
                onChange={(e) => {}}
                {...register("email", { required: true })}
              />
            </div>  
            {errors.email && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid email.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
            <div className="border flex justify-center items-center px-2 rounded-xl h-10 bg-gray-200">
              <input
                type="text"
                placeholder="Date of birth..."
                defaultValue={user?.dob}

                className="px-3 py-1 focus:outline-none bg-gray-200"
                onChange={(e) => {}}
                {...register("dob", { required: true })}
              />
              <IoCalendar className="text-blue-500 h-5 w-5" />
            </div>
            {errors.dob && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid Date of birth.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
            <div className="border flex justify-center items-center px-2 rounded-xl h-10 bg-gray-200">
              <input
                type="text"
                placeholder="Country..."
                defaultValue={user?.country}

                className="px-3 py-1 focus:outline-none bg-gray-200"
                onChange={(e) => {}}
                {...register("country", { required: true })}

              />
              <TiArrowSortedDown className="text-blue-500 h-5 w-5" />
            </div>
            {errors.country && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid Country.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
            <div className="border flex justify-center items-center px-2 rounded-xl h-10 bg-gray-200">
              <input
                defaultValue={user?.nationalHoliday}
                type="text"
                placeholder="National calender..."
                className="px-3 py-1 focus:outline-none bg-gray-200"
                onChange={(e) => {}}
                {...register("nationalCalender", { required: true })}
              />
              <FaCalendarCheck className="text-blue-500 h-5 w-5" />
            </div>
            {errors.nationalCalender && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid National calender.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
            <div className="border flex justify-between items-center px-2 rounded-xl h-10 bg-gray-200">
              <input
                type="text"
                defaultValue={user?.companyName}

                placeholder="Company..."
                className="px-3 py-1 focus:outline-none bg-gray-200"
                onChange={(e) => {}}
                {...register("company", { required: true })}

/>
            </div>
            {errors.company && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid Company.
                </p>
              )}
            </label>

          </div>
          

          <div className="flex flex-col gap-y-4">
          <label className="inline-block w-full">
            <div className="border flex justify-center items-center px-2 rounded-xl h-10 bg-gray-200">
              {/* <BiSearchAlt2 className="text-blue-500 h-5 w-5" /> */}
              <input
                type="text"
                defaultValue={user?.lastName}
                placeholder="Last name..."
                className="px-3 py-1 focus:outline-none bg-gray-200"
                onChange={(e) => {}}
                {...register("lastName", { required: true })}

              />
            </div>
            {errors.lastName && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid Last Name.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
            <div className="border flex justify-between items-center px-2 rounded-xl h-10 bg-gray-200">
              {/* <BiSearchAlt2 className="text-blue-500 h-5 w-5" /> */}
              <input
                type="number"
                defaultValue={user?.phoneNumber}
                placeholder="Phone number..."
                className="px-3 py-1 focus:outline-none bg-gray-200"
                onChange={(e) => {}}
                {...register("phoneNumber", { required: true })}

              />
            </div>
            {errors.phoneNumber && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid Phone number.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
            <div className="border flex justify-center items-center px-2 rounded-xl h-10 bg-gray-200">
              <input
                type="text"
                placeholder="Gender..."
                defaultValue={user?.gender}
                className="px-3 py-1 focus:outline-none bg-gray-200"
                onChange={(e) => {}}
                {...register("gender", { required: true })}

              />
              <TiArrowSortedDown className="text-blue-500 h-5 w-5" />
            </div>
            {errors.gender && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid Gender.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
            <div className="border flex justify-between items-center px-2 rounded-xl h-10 bg-gray-200">
              <input
                type="text"
                defaultValue={user?.country}
                placeholder="City..."
                className="px-3 py-1 focus:outline-none bg-gray-200"
                onChange={(e) => {}}
                {...register("city", { required: true })}

              />
              {/* <TiArrowSortedDown className="text-blue-500 h-5 w-5" /> */}
            </div>
            {errors.city && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid City.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
            <div className="border flex justify-center items-center px-2 rounded-xl h-10 bg-gray-200">
              <input
                type="text"
                placeholder="Membership level..."
                defaultValue={user?.planType}

                className="px-3 py-1 focus:outline-none bg-gray-200"
                onChange={(e) => {}}
                {...register("membershipLevel", { required: true })}

              />
              <TiArrowSortedDown className="text-blue-500 h-5 w-5" />
            </div>
            {errors.membershipLevel && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid Membership level.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
            <div className="border flex justify-between items-center px-2 rounded-xl h-10 bg-gray-200">
              <input
                type="text"
                placeholder="Position at company..."
                defaultValue={user?.title}
                className="px-3 py-1 focus:outline-none bg-gray-200"
                onChange={(e) => {}}
                {...register("positionAtCompany", { required: true })}

              />
            </div>
            {errors.positionAtCompany && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid Position at company.
                </p>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-y-6">
            <img

              src= {user?.profilePicture?user?.profilePicture : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
              alt="userImage"
              className="rounded-lg h-36 w-40 object-cover"
            />

            <button className="bg-gray-300 flex items-center justify-center gap-x-2 text-gray-500 font-normal py-2 px-4 rounded-lg">
              <FaUpload className="w-3 h-3 text-blue-500" />
              Upload photo
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="rounded-lg  bg-amber-800 py-2 px-4 text-white font-medium flex items-center justify-center gap-x-2"
        >
          <FiSave className="w-5 h-5 text-white" />
          Save User
        </button>
      </div>
    </form>
  );
}

export default AddUser;
