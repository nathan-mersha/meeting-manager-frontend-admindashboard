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

function SystemConfig() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    
    var xp= config;
      xp["tokenExpirationInDay"]=parseInt(data.day);
       await updateConfig(xp);
       alert("token Expiration In hours has been updated to "+data.day);
  
       
  };
  const { config } = useAuth();

  const [value, setValue] = useState("0");

  const handleChange = (e) => {
      
    console.log(e.target.value);
    setValue(e.target.value);
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ml-8 mt-8 bg-white">
      <div className="flex flex-col items-start py-8 pl-8 gap-y-10">
        <div className="flex flex-col items-start">
          <h4 className="text-black font-bold text-lg">System Config</h4>
          <div className="bg-blue-500 w-16 h-1 rounded-xl"></div>
        </div>

        <div className="flex items-start gap-x-8">
          <div className="flex flex-col gap-y-4">
            <h4 className="text-lg font-medium">
              Set token Expiration In hours.
            </h4>
            <label className="inline-block w-full">
              <div className="border flex justify-between items-center px-2 rounded-xl h-10 bg-gray-200">
                {/* <BiSearchAlt2 className="text-blue-500 h-5 w-5" /> */}
                <input
                  type="number"
                  defaultValue={config.tokenExpirationInDay}
                  placeholder="token Expiration In Day..."
                  className="px-3 py-1 focus:outline-none bg-gray-200"
                  {...register("day", { required: true, min: 0 })}
                  onChange={(e) => {}}
                />
              </div>
              {errors.day && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid tokenExpirationInDay.
                </p>
              )}
            </label>
          </div>
        </div>

        <button
          type="submit"
          className={`rounded-lg bg-blue-500 py-2 px-4 text-white font-medium flex items-center justify-center gap-x-2`}
        >
          <FiSave className="w-5 h-5 text-white" />
          Save 
        </button>
      </div>
    </form>
  );
}

export default SystemConfig