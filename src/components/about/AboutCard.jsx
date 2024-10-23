import React from "react";

const AboutCard = ({ icon, heading, desc }) => {
  return (
    <div className=" flex gap-3 items-center">
      {icon}
      <div className=" space-y-1">
        <p className=" font-medium text-base  lg:text-xl text-black ">
          {heading}
        </p>
        <p className="text-xs font-light text-black/60">{desc}</p>
      </div>
    </div>
  );
};

export default AboutCard;
