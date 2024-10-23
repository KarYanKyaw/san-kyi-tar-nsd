import React, { useEffect, useState } from "react";
import $ from "jquery";
import "pagepiling.js";
import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import About from "./sections/About";
import Service from "./sections/Service";
import Process from "./sections/Process";
import Specializations from "./sections/Specializations";
import Core from "./sections/Core";
import Reviews from "./sections/Reviews";
import Contact from "./sections/Contact";
import { databases } from "./lib/appwrite";
import { SyncLoader } from "react-spinners";

const HomePage = () => {
  useEffect(() => {
    $("#pagepiling").pagepiling({
      menu: "#menu",
      anchors: [
        "home",
        "about",
        "service",
        "process",
        "specialization",
        "core",
        "review",
        "contact",
      ],
      sectionsColor: [
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
      ],

      afterRender: function () {
        $("#pp-nav").addClass("custom");
      },

      afterLoad: function (anchorLink, index) {
        if (index > 1) {
          $("#pp-nav").removeClass("custom");
        } else {
          $("#pp-nav").addClass("custom");
        }
      },

      navigation: {
        position: "right",
        tooltips: [
          "Home",
          "About Us",
          "Service",
          "Process",
          "Specialization",
          "Core",
          "Review",
          "Contact",
        ],
      },
    });
  }, []);

  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_HERO_CONTENT_COLLECTION_ID,
        []
      );
      setData(response.documents);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const fetchImages = async () => {
    try {
      const response1 = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_HERO_SLIDES1_COLLECTION_ID,
        []
      );

      const response2 = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_HERO_SLIDES2_COLLECTION_ID,
        []
      );

      const response3 = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_HERO_SLIDES3_COLLECTION_ID,
        []
      );

      setImages([
        ...response1.documents,
        ...response2.documents,
        ...response3.documents,
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchImages();
  }, []);

  return (
    <div id="pagepiling">
      <Navbar />
      <div className="section">
        <HeroSection data={data} images={images} />
      </div>
      <div className="section">
        <About key="about" />
      </div>
      <div className="section">
        <Service key="service" />
      </div>
      <div className="section">
        <Process key="process" />
      </div>
      <div className="section">
        <Specializations key="specializations" />
      </div>
      <div className="section">
        <Core key="core" />
      </div>
      <div className="section">
        <Reviews key="reviews" />
      </div>
      <div className="section">
        <Contact key="contact" />
      </div>
    </div>
  );
};

export default HomePage;
