import React, { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { getArrangeStatus } from "../hooks/useDashboard";
import Loading from "./Loading";
import Status from "./Status";

function ArrangeMeeting() {
  const [meetings, setMeetings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [year, setYear] = useState("2022");
  const [month, setMonth] = useState("1");
  const [yearPer, setYearPer] = useState(0);
  const [monthPer, setMonthPer] = useState(0);
  const [incYear, setIncYear] = useState(true);
  const [incMonth, setIncMonth] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getArrangeStatus(year, month);
      if (data.preTotalMeetingsYear === 0) {
        setYearPer(100);
      } else {
        const per = (data.totalMeetingsYear / data.preTotalMeetingsYear) * 100;
        let ans = 100 - per;
        ans = ans < 0 ? ans * -1 : ans;
        ans = ans.toFixed(2);
        setYearPer(ans);
      }

      if (data.preTotalMeetingsYear < data.totalMeetingsYear) {
        setIncYear(true);
      } else {
        setIncYear(false);
      }

      if (data.preTotalMeetingsMonth === 0) {
        setMonthPer(100);
      } else {
        const per =
          (data.totalMeetingsMonth / data.preTotalMeetingsMonth) * 100;
        let ans = 100 - per;
        ans = ans < 0 ? ans * -1 : ans;
        ans = ans.toFixed(2);
        setMonthPer(ans);
      }

      if (data.preTotalMeetingsMonth < data.totalMeetingsMonth) {
        setIncMonth(true);
      } else {
        setIncMonth(false);
      }

      setMeetings(data);
      setLoading(false);
    };
    fetchData().catch(console.error);
  }, [year, month]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="py-10 px-10">
      <div className="flex flex-wrap gap-2 justify-between ">
        <Status
          value={meetings && meetings.totalMeetings}
          title={"Total Meetings arranged"}
        />
        <Status
          value={meetings && meetings.totalMeetingsChooseYear}
          title={"Meetings arranged in"}
          year={year}
          setYear={setYear}
        />

        <Status
          value={meetings && meetings.meetingsByChooseMonth}
          title={"Meetings arranged in"}
          month={month}
          setMonth={setMonth}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex w-150 h-150 justify-between gap-x-4 mt-10">
          <div className="flex items-center justify-between bg-gray-200 rounded-md p-3">
            <div className="flex h-full flex-col items-center justify-between p-5">
              <h4 className="text-xl font-bold">
                {meetings && meetings.totalMeetingsYear}
              </h4>
              <p className="text-md font-semibold mt-5">
                Meetings arranged this year so far
              </p>
            </div>
            {incYear ? (
              <AiOutlineArrowUp className="text-green-600 w-10 h-10" />
            ) : (
              <AiOutlineArrowDown className="text-red-600 w-10 h-10" />
            )}

            <p
              className={`${
                incYear ? "text-green-600" : "text-red-600"
              } text-lg`}
            >
              {yearPer}%
            </p>
          </div>
        </div>

        <div className="flex w-150 h-150 justify-between gap-x-4 mt-10">
          <div className="flex items-center justify-between bg-gray-200 rounded-md p-3">
            <div className="flex h-full flex-col items-center justify-between p-5">
              <h4 className="text-xl font-bold">
                {meetings && meetings.totalMeetingsMonth}
              </h4>
              <p className="text-md font-semibold mt-5">
                Meetings arranged this month so far
              </p>
            </div>
            {incMonth ? (
              <AiOutlineArrowUp className="text-green-600 w-10 h-10" />
            ) : (
              <AiOutlineArrowDown className="text-red-600 w-10 h-10" />
            )}

            <p
              className={`${
                incMonth ? "text-green-600" : "text-red-600"
              } text-lg`}
            >
              {monthPer}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArrangeMeeting;
