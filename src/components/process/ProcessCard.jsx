import React, { useEffect } from "react";

const ProcessCard = ({ icon, heading, desc }) => {
  return (
    <div className=" flex items-center justify-center">
      <div
        className={`select-none space-y-0.5 lg:space-y-2 flex flex-col items-center justify-center`}
      >
        <button className={`cursor-default rounded-full bg-primary p-3 lg:p-4`}>
          {icon}
        </button>
        <p
          className={` font-medium lg:text-xl text-center text-sm text-black `}
        >
          {heading}
        </p>
        <p className={`text-xs text-center lg:w-42 font-light text-black/60`}>
          {desc}
        </p>
      </div>
    </div>
  );
};

export default ProcessCard;
