import Container from "@/components/Container";
import Header from "@/components/Header";
import ServiceCard from "@/components/service/ServiceCard";
import {
  AirplaneTakeoff,
  Boat,
  Car,
  DeviceTablet,
  Export,
  House,
  TruckTrailer,
} from "@phosphor-icons/react";
import React from "react";

const Service = () => {
  const serviceItems = [
    {
      icon: <Boat className="lg:h-[30px] lg:w-[30px]" color="#ffffff" />,
      heading: "Sea Freight",
      desc: "Manage sea freight logistics for both inbound and outbound shipments to and from Myanmar.",
    },
    {
      icon: (
        <AirplaneTakeoff className="lg:h-[30px] lg:w-[30px]" color="#ffffff" />
      ),
      heading: "Air Freight",
      desc: "Handle inbound and outbound cargo for Myanmar with speed and reliability.",
    },
    {
      icon: (
        <TruckTrailer
          className="lg:h-[30px] lg:w-[30px]"
          color="white"
          weight="thin"
        />
      ),
      heading: "Vehicle Imports",
      desc: "Importing vehicles from Europe, US, and China via sea freight.",
    },
    {
      icon: <Boat className="lg:h-[30px] lg:w-[30px]" color="#ffffff" />,
      heading: "Cross Border Sales",
      desc: "Offer cross-border trucking and customs clearance services through China and Thailand.",
    },
    {
      icon: <Car className="lg:h-[30px] lg:w-[30px]" color="#ffffff" />,
      heading: "Cargo Insurance",
      desc: "Providing insurance to sea, air and land cargo with convenient claim process.",
    },
    {
      icon: <Export className="lg:h-[30px] lg:w-[30px]" color="#ffffff" />,
      heading: "Import/Export Customs",
      desc: "Provide efficient customs clearance services for both import and export activities.",
    },
    {
      icon: (
        <DeviceTablet className="lg:h-[30px] lg:w-[30px]" color="#ffffff" />
      ),
      heading: "License Application",
      desc: "Assist with the application process for import and export licenses.",
    },
    {
      icon: <House className="lg:h-[30px] lg:w-[30px]" color="#ffffff" />,
      heading: "Warehousing",
      desc: "Solutions offer secure storage for your goods.",
    },
  ];

  return (
    <div id="service">
      <Container>
        <div className="text-center min-h-screen lg:gap-12 gap-8 h-full py-12 lg:py-24 justify-center flex flex-col items-center">
          <div className="space-y-3 text-center">
            <Header
              section={"Our Services"}
              heading={"Distribution to Forwarding"}
              desc={
                "Delivering world class solutions to customers & stakeholders on broad range of industry sectors."
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
              {serviceItems.map((item, index) => (
                <ServiceCard {...item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Service;
