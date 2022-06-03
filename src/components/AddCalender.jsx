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

function AddCalender({ handleClose, user }) {
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
    };
    const [value, setValue] = useState("default");

    const handleChange = (e) => {
        console.log(e.target.value);
      setValue(e.target.value);
      
    };
    const [image, setImage] = useState(user?.profilePicture);
  
    const [startDate, setStartDate] = useState();
    const [openFileSelector, { filesContent, loading }] = useFilePicker({
      readAs: "DataURL",
      accept: "image/*",
      multiple: false,
    });
  

  
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
            <h4 className="text-black font-bold text-lg">REGISTER CALENDAR</h4>
            <div className="bg-blue-500 w-16 h-1 rounded-xl"></div>
          </div>
  
          <div className="flex items-start gap-x-8">
            <div className="flex flex-col gap-y-4">
            <label className="inline-block w-full">
                <select
                defaultValue={value} onChange={handleChange}
                  placeholder="Select Plan Type"
                  className="border flex justify-center items-center w-full px-3 rounded-xl h-10 bg-gray-200"
                  
                >
                    <option value="default" disabled hidden>
          Choose Country...
        </option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
  
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
            className={`rounded-lg ${value==="default"?"bg-amber-800":"bg-blue-500"} py-2 px-4 text-white font-medium flex items-center justify-center gap-x-2`}
          >
            <FiSave className="w-5 h-5 text-white" />
            Save Calender
          </button>
        </div>
      </form>
    );
  }

export default AddCalender