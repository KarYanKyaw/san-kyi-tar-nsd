import Container from "@/components/Container";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Client, Databases } from "appwrite";
import { databases } from "@/lib/appwrite";

const Reviews = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_REVIEWS_COLLECTION_ID,
        []
      );
      setData(response.documents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" w-full   min-h-screen relative">
      <div className=" w-full lg:py-24 py-12 justify-center items-center flex-col text-center">
        <Header
          section={"Review"}
          heading={"Hear What Our Clients Say"}
          desc={
            "Sometimes we need to listen what others words about some proves."
          }
        />
        <div className=" mt-12 min-h-full flex justify-center items-center">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-[300px] lg:w-[90%]"
          >
            <CarouselContent>
              {data.length > 0 &&
                data?.map(
                  ({ photo, name, message, organization, position }, index) => (
                    <CarouselItem
                      key={index}
                      className="lg:basis-1/3 basis-full"
                    >
                      <div className="mx-auto basis-1/2">
                        <div className=" bg-blue-500 rounded-lg p-4">
                          <div className="flex justify-center">
                            <svg
                              width="44"
                              height="44"
                              viewBox="0 0 86 86"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M64.5 64.5C65.9255 64.5 67.2927 63.9337 68.3007 62.9257C69.3087 61.9177 69.875 60.5505 69.875 59.125V45.9992C69.875 44.5737 69.3087 43.2066 68.3007 42.1985C67.2927 41.1905 65.9255 40.6243 64.5 40.6243H57.0395C57.0395 38.7358 57.1506 36.8474 57.3727 34.959C57.706 32.9595 58.2614 31.1822 59.039 29.627C59.8166 28.0718 60.8181 26.8481 62.0436 25.9559C63.262 24.9561 64.8171 24.4563 66.7091 24.4563V16.125C63.5988 16.125 60.8755 16.7915 58.5391 18.1245C56.219 19.4407 54.2255 21.2633 52.7072 23.4565C51.1787 25.8707 50.0531 28.5175 49.3747 31.2933C48.6888 34.3556 48.3534 37.4861 48.375 40.6243V59.125C48.375 60.5505 48.9413 61.9177 49.9493 62.9257C50.9573 63.9337 52.3245 64.5 53.75 64.5H64.5ZM32.25 64.5C33.6755 64.5 35.0427 63.9337 36.0507 62.9257C37.0587 61.9177 37.625 60.5505 37.625 59.125V45.9992C37.625 44.5737 37.0587 43.2066 36.0507 42.1985C35.0427 41.1905 33.6755 40.6243 32.25 40.6243H24.7895C24.7895 38.7358 24.9006 36.8474 25.1228 34.959C25.4596 32.9595 26.015 31.1822 26.789 29.627C27.5666 28.0718 28.5681 26.8481 29.7936 25.9559C31.012 24.9561 32.5671 24.4563 34.4591 24.4563V16.125C31.3488 16.125 28.6255 16.7915 26.2891 18.1245C23.969 19.4407 21.9755 21.2633 20.4573 23.4565C18.9287 25.8707 17.8031 28.5175 17.1248 31.2933C16.4388 34.3556 16.1034 37.4861 16.125 40.6243V59.125C16.125 60.5505 16.6913 61.9177 17.6993 62.9257C18.7073 63.9337 20.0745 64.5 21.5 64.5H32.25Z"
                                fill="#F2F2F2"
                              />
                            </svg>
                          </div>

                          <p className=" mb-16 text-xs lg:text-base font-medium text-white">
                            {message}
                          </p>
                        </div>
                        <div className=" gap-3 flex -mt-14 justify-center flex-col items-center rounded-full">
                          <img
                            src={photo}
                            className=" w-[100px] lg:w-[100px] rounded-full object-cover h-[100px] lg:h-[100px]"
                          />
                          <div className=" lg:space-y-0.5 space-y-1.5">
                            <p className=" font-medium text-sm lg:text-base text-black">
                              {name}
                            </p>
                            <p className="text-xs lg:text-xs text-black/70">
                              {position} of{" "}
                              <i className=" text-black">{organization}</i>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  )
                )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
