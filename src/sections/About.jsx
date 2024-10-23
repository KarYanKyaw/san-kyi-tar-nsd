import Container from "@/components/Container";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import video from "../assets/video.png";
import AboutCard from "@/components/about/AboutCard";
import { Broadcast, TreeStructure } from "@phosphor-icons/react";
import { Client, Databases } from "appwrite";
import { databases } from "@/lib/appwrite";

const About = () => {
  const [data, setData] = useState("");
  const aboutItems = [
    {
      icon: <TreeStructure className=" rotate-90" size={42} color="#0058ff" />,
      heading: "Connect with Us",
      desc: "We build partnerships with personalized logistics and expert guidance.",
    },

    {
      icon: <Broadcast size={42} color="#0058ff" />,
      heading: "Your Logistics Junction",
      desc: "We integrate warehousing, transportation, and air logistics to streamline your supply chain.",
    },

    {
      icon: <Broadcast size={42} color="#0058ff" />,
      heading: "Delivering Excellence",
      desc: "We ensure timely, reliable deliveries with precision and care.",
    },
  ];

  const fetchData = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_ABOUT_US_COLLECTION_ID,
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
    <div id="about">
      <Container>
        <div className=" min-h-screen py-12 grid grid-cols-12 items-center gap-5">
          <div
            data-aos="fade-in"
            data-aos-duration="2000"
            className=" col-span-full lg:col-span-6"
          >
            <div className=" w-[90%] space-y-6">
              <Header
                section={"About Us"}
                heading={"Global logistics with efficiency"}
                desc={
                  "We ensure seamless logistics for your business, handling both shipping and air logistics with efficiency and reliability. "
                }
              />
              {aboutItems.map((items, index) => (
                <AboutCard {...items} key={index} />
              ))}
            </div>
          </div>

          <div
            data-aos="fade-in"
            data-aos-duration="2000"
            className=" col-span-full lg:col-span-6"
          >
            {data &&
              data.map(({ url, type }, index) => (
                <div key={index}>
                  {type === "image" ? (
                    <img
                      className="h-[400px] w-full object-cover "
                      src={url}
                      alt="About Us Media"
                    />
                  ) : (
                    <video className="h-[400px] w-full object-cover" controls>
                      <source src={url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
