import React from "react";

const Header = ({ section, heading, desc }) => {
  return (
    <div className=" space-y-1">
      <p className=" text-primary text-sm lg:text-lg font-medium">{section}</p>
      <p className=" text-base lg:text-4xl text-black font-semibold">
        {heading}
      </p>
      <p className=" text-xs lg:text-sm font-light lg:pt-2 text-black/60">
        {desc}
      </p>
    </div>
  );
};

export default Header;
