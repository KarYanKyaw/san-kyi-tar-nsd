import Container from "@/components/Container";
import Header from "@/components/Header";
import ProcessCard from "@/components/process/ProcessCard";
import { Boat, Package, TruckTrailer } from "@phosphor-icons/react";
import React from "react";

const Process = () => {
  const processItems = [
    {
      icon: (
        <Package
          className=" lg:h-[30px] lg:w-[30px]"
          color="white"
          weight="duotone"
        />
      ),
      heading: "Booking",
      desc: "Verify cargo readiness and book the vessel.",
    },
    {
      icon: (
        <TruckTrailer
          className=" lg:h-[30px] lg:w-[30px]"
          color="white"
          weight="thin"
        />
      ),
      heading: "Pick up",
      desc: "Collect cargo from the shipper's factory.",
    },
    {
      icon: (
        <TruckTrailer
          className=" lg:h-[30px] lg:w-[30px]"
          color="white"
          weight="thin"
        />
      ),
      heading: "Loading",
      desc: "Load cargo into the container and transport it to the port.",
    },
    {
      icon: <Boat className=" lg:h-[30px] lg:w-[30px]" color="white" />,
      heading: "Shipping",
      desc: "Ship the container and handle customs clearance.",
    },
    {
      icon: <TruckTrailer className=" lg:h-[30px] lg:w-[30px]" color="white" />,
      heading: "Delivering",
      desc: "Deliver cargo to the consignee's warehouse.",
    },
  ];

  return (
    <div id="process" className="">
      <Container>
        <div className="text-center min-h-screen lg:gap-12 gap-8 h-full p lg:py-0 justify-center flex flex-col items-center">
          <Header
            section={"Working Process"}
            heading={"The Heart of Our Caring"}
            desc={
              "Streamlined steps to ensure efficient logistics and delivery."
            }
          />

          <div className="grid lg:grid-cols-5 grid-cols-1 gap-3 items-center">
            {processItems.map((item, index) => (
              <ProcessCard {...item} key={index} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Process;
