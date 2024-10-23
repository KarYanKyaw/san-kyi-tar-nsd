import React, { useState } from "react";

const NavItems = ({ close }) => {
  const navItemsData = [
    { id: 1, name: "home" },
    { id: 2, name: "about" },
    { id: 8, name: "service" },
    { id: 3, name: "process" },
    { id: 4, name: "specialization" },
    { id: 5, name: "core" },
    { id: 6, name: "review" },
    { id: 7, name: "contact" },
  ];

  const [activeSection, setActiveSection] = useState("home");

  return (
    <div
      id="menu"
      className="lg:flex text-start lg:space-y-0 space-y-3 items-center justify-center gap-7"
    >
      {navItemsData.map(({ id, name }) => (
        <a
          data-menuanchor={name}
          href={`/#${name}`}
          onClick={() => {
            setActiveSection(name);
            close.current.click();
          }}
          className={`${
            activeSection == name && "active"
          }  capitalize select-none block cursor-pointer`}
          key={id}
        >
          {name}
        </a>
      ))}
    </div>
  );
};

export default NavItems;
