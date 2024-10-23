import React from "react";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div className=" flex items-center ">
      <img
        src={logo}
        alt="logo"
        className=" lg:w-[80px] w-[50px] h-[50px] lg:h-[80px]"
      />
      <div className=" text-xs lg:text-sm font-medium text-primary">
        <p>National Shipping</p>
        <p>Development Co., Ltd</p>
      </div>
    </div>
  );
};

export default Logo;
