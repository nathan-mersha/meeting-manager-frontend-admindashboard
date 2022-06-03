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

function AddUser({ handleClose, user }) {
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

  const [image, setImage] = useState(user?.profilePicture);

  const [startDate, setStartDate] = useState();
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
  });

  useEffect(() => {
    if (filesContent === []) return;

    if (filesContent[0]) {
      setImage(filesContent[0].content);
    }
  }, [filesContent]);

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
          <h4 className="text-black font-bold text-lg">REGISTER USER</h4>
          <div className="bg-blue-500 w-16 h-1 rounded-xl"></div>
        </div>

        <div className="flex items-start gap-x-8">
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
                <DatePicker
                  selected={startDate ?? ""}
                  placeholderText="Date of Birth"
                  onChange={(date) => {
                    watch("dob", date);
                    setStartDate(date);
                  }}
                  defaultValue={user?.dob}
                  className="px-3 py-1 focus:outline-none bg-gray-200"
                />
                <IoCalendar className="text-blue-500 h-5 w-5" />
              </div>
              {errors.dob && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid Date of birth.
                </p>
              )}
            </label>
            {/* <label className="inline-block w-full">
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
            </label> */}
            <label className="inline-block w-full">
              <select
              defaultValue={user?.planType}
                className="border flex justify-center items-center w-full px-3 rounded-xl h-10 bg-gray-200"
                {...register("country", { required: true })}
              >
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>

              </select>

              {errors.country && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid country.
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
              <select
              defaultValue={user?.gender}
                className="border flex justify-center items-center w-full px-3 rounded-xl h-10 bg-gray-200"
                {...register("gender")}
              >
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>

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
                  defaultValue={user?.city}
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
              <select
              defaultValue={user?.planType}
                className="border flex justify-center items-center w-full px-3 rounded-xl h-10 bg-gray-200"
                {...register("membershipLevel", { required: true })}
              >
                <option value="vip">Vip</option>
                <option value="premium">Premium</option>
                <option value="basic">Basic</option>

              </select>

              {errors.membershipLevel && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid membership Level.
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
              src={
                image ??
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              alt="userImage"
              className="rounded-lg h-36 w-40 object-cover"
            />

            <button
              onClick={() => {
                openFileSelector();
              }}
              className="bg-gray-300 flex items-center justify-center gap-x-2 text-gray-500 font-normal py-2 px-4 rounded-lg"
            >
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
