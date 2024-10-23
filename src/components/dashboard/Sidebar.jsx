import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";

const Sidebar = () => {
  const routes = [
    {
      icon: "",
      path: "",
      name: "Banner",
    },
    {
      icon: "",
      path: "/about",
      name: "About",
    },
    {
      icon: "",
      path: "/reviews",
      name: "Reviews",
    },
    {
      icon: "",
      path: "/contact",
      name: "Contact",
    },
  ];
  return (
    <div>
      <div className="space-y-8">
        <p className=" text-black text-lg font-medium">NSD Co.Ltd</p>
        <ul className=" space-y-5">
          {routes.map(({ name, icon, path }, index) => (
            <li key={index} className="sidebar">
              <NavLink
                to={`/dashboard${path}`}
                end
                className={
                  "flex gap-3 items-center cursor-pointer text-black select-none hover:bg-secondary capitalize text-sm px-3 py-2 mb-2 rounded-md"
                }
              >
                {icon} {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
