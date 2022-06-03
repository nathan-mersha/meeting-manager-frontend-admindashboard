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

function PromoCode() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async () => {
      var xp= config;
      xp["promoPeriod"]=parseInt(value);
       await updateConfig(xp);
       alert("promo period updated to "+value+" months");
  };
  const { config } = useAuth();

  const [value, setValue] = useState( config["promoPeriod"]);

  const handleChange = (e) => {
      
    console.log(e.target.value);
    setValue(e.target.value);
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ml-8 mt-8 bg-white">
      <div className="flex flex-col items-start py-8 pl-8 gap-y-10">
        <div className="flex flex-col items-start">
          <h4 className="text-black font-bold text-lg">PROMO CODE</h4>
          <div className="bg-blue-500 w-16 h-1 rounded-xl"></div>
        </div>

        <div className="flex items-start gap-x-8">
          <div className="flex flex-col gap-y-4">
            <h4 className="text-lg font-medium">
              Set promo code period length.
            </h4>
            <label className="inline-block w-full">
              <select
                defaultValue={value}
                onChange={handleChange}
                placeholder="Select Plan Type"
                className="border flex justify-center items-center w-full px-3 rounded-xl h-10 bg-gray-200"
              >
                <option value="0">None</option>
                <option value="1">1 month</option>
                <option value="2">2 months</option>
                <option value="3">3 months</option>
              </select>

              {errors.country && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid membership Level.
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
          Save Length
        </button>
      </div>
    </form>
  );
}

export default PromoCode;
