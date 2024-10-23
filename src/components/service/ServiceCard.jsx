import React, { useEffect } from "react";

const ServiceCard = ({ icon, heading, desc }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      className={`select-none space-y-2 text-start p-5`}
    >
      <button className={`cursor-default rounded-full  bg-primary p-4`}>
        {icon}
      </button>

      <p className={` font-medium text-sm lg:text-xl text-black `}>{heading}</p>
      <p className={`text-xs lg:text-sm font-light text-black/60`}>{desc}</p>
    </div>
  );
};

export default ServiceCard;
