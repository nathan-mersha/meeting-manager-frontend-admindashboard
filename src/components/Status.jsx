import React from "react";

function Status({ value, title, year, month, setYear, setMonth ,size=false }) {
  return (
    <div className={`${size && "w-[150px]"} bg-gray-200 rounded-md `}>
      <div className="flex flex-col h-full items-center justify-between  p-5">
        <h4 className="text-2xl font-bold">{value}</h4>

        <p className="text-md font-semibold mt-5">{title}</p>
        {year && (
          <select
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-gray-300 p-1 border-none rounded-md mt-2"
          >
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        )}
        {month && (
          <select
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="bg-gray-300 p-1 rounded-md mt-2 border-none "
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        )}
      </div>
    </div>
  );
}

export default Status;
