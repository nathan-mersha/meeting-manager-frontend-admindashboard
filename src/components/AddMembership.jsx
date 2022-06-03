import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoCalendar } from "react-icons/io5";
import { FaCalendarCheck } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { FiSave } from "react-icons/fi";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { FaUpload } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { useFilePicker } from "use-file-picker";
import useAuth from "../hooks/useAuth";
import { updateConfig } from "../hooks/useConfig";

function AddMembership({ handleClose, user }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { config } = useAuth()

  const onSubmit = async (data) => {

    var xp= config;
    xp.pricingPlan[data.name]=data;
     await updateConfig(xp);

     handleClose();
    



  };




  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ml-8 mt-8 bg-white">
      <div className="flex items-center px-1 space-x-1">
        <IoIosArrowBack className="h-5 w-5 text-blue-500" />
        <button onClick={() => handleClose()} className="text-md font-normal">
          Back
        </button>
      </div>

      <div className="flex flex-col items-start py-8 pl-8 gap-y-10">
        <div className="flex flex-col items-start">
          <h4 className="text-black font-bold text-lg">REGISTER MEMBERSHIP</h4>
          <div className="bg-blue-500 w-16 h-1 rounded-xl"></div>
        </div>

        <div className="flex items-start gap-x-8">
          <div className="flex flex-col gap-y-4">
            <label className="inline-block w-full">
              <div className="border flex justify-between items-center px-2 rounded-xl h-10 bg-gray-200">
                {/* <BiSearchAlt2 className="text-blue-500 h-5 w-5" /> */}
                <input
                  type="text"
                  defaultValue={user?.name}
                  placeholder="Membership Name..."
                  className="px-3 py-1 focus:outline-none bg-gray-200"
                  {...register("name", { required: true })}
                  onChange={(e) => {}}
                />
              </div>
              {errors.name && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid Membership Name.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
              <div className="border flex justify-between items-center px-2 rounded-xl h-10 bg-gray-200">
                {/* <BiSearchAlt2 className="text-blue-500 h-5 w-5" /> */}
                <input
                  type="text"
                  placeholder="Membership description ..."
                  defaultValue={user?.description}
                  className="px-3 py-1 focus:outline-none bg-gray-200"
                  onChange={(e) => {}}
                  {...register("description", { required: true })}
                />
              </div>
              {errors.description && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid description.
                </p>
              )}
            </label>

        


           
            <label className="inline-block w-full">
              <div className="border flex justify-center items-center px-2 rounded-xl h-10 bg-gray-200">
                <input
                  defaultValue={user?.allowedNoOfActiveMeetings}
                  type="number"
                  placeholder="No Of Active Meetings..."
                  className="px-3 py-1 focus:outline-none bg-gray-200"
                  onChange={(e) => {}}
                  {...register("allowedNoOfActiveMeetings", { required: true })}
                />
              
              </div>
              {errors.allowedNoOfActiveMeetings && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid allowedNoOfActiveMeetings.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
              <div className="border flex justify-between items-center px-2 rounded-xl h-10 bg-gray-200">
                <input
                  type="number"
                  defaultValue={user?.allowedNoOfAttendees}
                  placeholder="No Of Attendees..."
                  className="px-3 py-1 focus:outline-none bg-gray-200"
                  onChange={(e) => {}}
                  {...register("allowedNoOfAttendees", { required: true })}
                />
              </div>
              {errors.allowedNoOfAttendees && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid allowedNoOfAttendees.
                </p>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-y-4">
            <label className="inline-block w-full">
              <div className="border flex justify-center items-center px-2 rounded-xl h-10 bg-gray-200">
                {/* <BiSearchAlt2 className="text-blue-500 h-5 w-5" /> */}
                <input
                  type="number"
                  defaultValue={user?.monthlyPrice}
                  placeholder="monthly Price..."
                  className="px-3 py-1 focus:outline-none bg-gray-200"
                  onChange={(e) => {}}
                  {...register("monthlyPrice", { required: true })}
                />
              </div>
              {errors.monthlyPrice && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid monthlyPrice.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
              <div className="border flex justify-between items-center px-2 rounded-xl h-10 bg-gray-200">
                {/* <BiSearchAlt2 className="text-blue-500 h-5 w-5" /> */}
                <input
                  type="number"
                  defaultValue={user?.yearlyPrice}
                  placeholder="yearly Price..."
                  className="px-3 py-1 focus:outline-none bg-gray-200"
                  onChange={(e) => {}}
                  {...register("yearlyPrice", { required: true })}
                />
              </div>
              {errors.yearlyPrice && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid yearlyPrice.
                </p>
              )}
            </label>



        

    
          </div>

        
        </div>

        <button
          type="submit"
          className="rounded-lg  bg-blue-500 py-2 px-4 text-white font-medium flex items-center justify-center gap-x-2"
        >
          <FiSave className="w-5 h-5 text-white" />
          Save Membership 
        </button>
      </div>
    </form>
  );
}


export default AddMembership