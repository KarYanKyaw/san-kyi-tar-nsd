import React from "react";
import image from "../assets/image.png";
import image1 from "../assets/image2.jpg";
import image2 from "../assets/image1.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Specializations = () => {
  const images = [image2, image1, image3, image4, image5, image6];

  return (
    <div id="specializations">
      <div className=" relative my-24">
        <div className="gallery">
          {images.map((el, i) => (
            <figure key={i} className={`gallery__item gallery__item--${i + 1}`}>
              <img src={el} className="gallery__img object-cover grayscale" />
            </figure>
          ))}
        </div>
        <div className=" absolute top-0 h-full w-full ">
          <div className=" flex lg:mt-24 justify-center lg:w-[80%] mx-auto items-center bg-black/70">
            <div className=" grid grid-cols-12 gap-3 lg:px-10 lg:p-24 p-5 items-center">
              <div className=" lg:col-span-6 space-y-1.5 col-span-full">
                <p className=" text-base lg:text-4xl text-primary font-semibold">
                  Specialization
                </p>
                <p className=" text-xs lg:text-sm font-light lg:pt-2 text-white">
                  NSD is one of the leading freight forwarders in Myanmar, known
                  for its superior performance of handling OOG (out of gauge)
                  shipments and pharmaceutical shipments.
                </p>
              </div>
              <div className=" lg:col-span-6 col-span-full">
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
                      images?.map((image, index) => (
                        <CarouselItem key={index} className="">
                          <img src={image} className=" h-[400px] mx-auto" />
                        </CarouselItem>
                      ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specializations;
