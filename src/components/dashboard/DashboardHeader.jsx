import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DashboardHeader = () => {
  const { pathname } = useLocation();
  const [name, setName] = useState("");

  useEffect(() => {
    const parts = pathname.split("/");
    const contactPath = parts[parts.length - 1];
    setName(contactPath);
  }, [pathname]);
  return (
    <p className="text-2xl capitalize font-medium">
      {name == "" ? "Banner" : name}
    </p>
  );
};

export default DashboardHeader;
