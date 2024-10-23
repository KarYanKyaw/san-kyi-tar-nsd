import React from "react";
import { Button } from "../components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HeroSection = ({ data, images }) => {
  return (
    <div id="home" className=" min-h-full relative">
      <div className=" min-h-full flex justify-center items-center">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {images.length > 0 &&
              images?.map(({ image }, index) => (
                <CarouselItem key={index} className="">
                  <img
                    src={image}
                    className=" w-full object-cover h-screen"
                    alt=""
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className=" absolute lg:top-1/3 top-1/3  block lg:left-1/2">
        <div className="w-[80%] lg:w-full mx-auto">
          <div className=" lg:space-y-3 space-y-2 opacity-90 rounded bg-white lg:w-3/4 p-5 z-50 lg:p-[50px]">
            <p className=" uppercase text-primary font-medium text-xs lg:text-lg">
              {data[0]?.smallTitle || "YOUR SEAMLESS"}
            </p>
            <p className=" uppercase lg:text-4xl text-base font-semibold">
              {data[0]?.mainTitle || "LOGISTIC SOLUTION"}
            </p>
            <p className=" font-light text-black/60 text-xs lg:text-base">
              {data[0]?.heroText ||
                "We are dedicated to delivering your products with unparalleled speed, reliability, and efficiency. Our advanced tracking technology ensures you're kept in the loop"}
            </p>
            <Button size="sm" className=" rounded-lg">
              <a href="#service">Get To Know Service</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
