import Container from "@/components/Container";
import Header from "@/components/Header";
import React, { useEffect } from "react";
import vision from "../assets/vision.png";
import mission from "../assets/mission.png";

const Core = () => {
  return (
    <div id="core">
      <Container>
        <div className=" text-center space-y-3 py-12">
          <Header
            section={"Our Core"}
            heading={"Commitment is always Key"}
            desc={"The foundation of our commitment to excellence.."}
          />
          <div
            data-aos="fade-right"
            data-aos-duration="2000"
            className=" grid grid-cols-1 lg:grid-cols-2 items-center gap-2 lg:gap-8"
          >
            <img
              src={mission}
              className=" lg:h-[300px] h-[100px] col-span-1 "
              alt=""
            />
            <p className=" text-xs lg:text-sm text-black/70 col-span-1 text-start ">
              To be your reliable forwarding partner by leveraging our extensive
              experience in Myanmar’s logistics industry.
            </p>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="2000"
            className=" grid grid-cols-1 lg:grid-cols-2 items-center gap-2  lg:gap-8"
          >
            <img
              src={vision}
              className=" lg:h-[300px] h-[100px] lg:w-full col-span-1  order-1 lg:order-2"
              alt=""
            />
            <p className=" text-xs lg:text-sm text-black/70 col-span-1 order-2 lg:order-1 text-start text-blacks">
              To provide cost-effective, efficient logistics solutions, planning
              and managing your shipments with exceptional service.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Core;
