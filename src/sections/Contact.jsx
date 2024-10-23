import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Header from "@/components/Header";
import { Clock, Envelope, MapPinLine, Phone } from "@phosphor-icons/react";
import { databases } from "@/lib/appwrite";

const Contact = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_CONTACT_COLLECTION_ID,
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
  const contactItems = [
    {
      icon: <MapPinLine size={42} color="#0058ff" weight="light" />,
      heading: "Address",
      info1: "No.247/249, Room 9(B), Bo Myat Tun Street (Upper Block)",
      info2: " Botahtaung Township, Yangon, Myanmar.",
    },
    {
      icon: <Phone size={42} color="#0058ff" weight="light" />,
      heading: "Call Us",
      phone: true,
    },
    {
      icon: <Envelope size={42} color="#0058ff" weight="light" />,
      heading: "Email Us",
      mail: true,
    },
    {
      icon: <Clock size={42} color="#0058ff" weight="light" />,
      heading: "Open Hour",
      info1: "Monday - Friday",
      info2: "9 : 00 AM - 5 : 00 PM",
    },
  ];

  return (
    <div id="contact">
      <Container>
        <div className="text-center min-h-screen space-y-3 lg:pt-24 pt-12 lg:space-y-12">
          <Header
            section={"Contact Us"}
            heading={"Reach Out to Us"}
            desc={"Contact with us for expert support & Solutions."}
          />
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 lg:gap-8">
            <div
              data-aos="fade-left"
              data-aos-duration="2000"
              className="grid grid-cols-2 gap-4"
            >
              {contactItems.map(
                ({ icon, heading, info1, info2, phone, mail }, index) => (
                  <div
                    key={index}
                    className="bg-white text-start text-black px-3 lg:p-6 lg:space-y-3"
                  >
                    {icon}
                    <p className="font-medium text-sm lg:text-lg text-black">
                      {heading}
                    </p>
                    {phone && (
                      <>
                        {data
                          .filter(({ type }) => type.toLowerCase() === "phone")
                          .map(({ data: phoneNumber }, i) => (
                            <a
                              key={i}
                              href={`tel:${phoneNumber}`}
                              className=" text-[12px] lg:text-sm font-light text-black/60"
                            >
                              <p>{phoneNumber || "09985641040"}</p>
                            </a>
                          ))}
                      </>
                    )}
                    {mail && (
                      <>
                        {data
                          .filter(({ type }) => type.toLowerCase() === "email")
                          .map(({ data: emailAddress }, i) => (
                            <a
                              key={i}
                              href={`mailto:${
                                emailAddress || "sales@nsdgroups.com"
                              }`}
                              className="text-[12px] lg:text-sm font-light text-black/60"
                            >
                              <p>{emailAddress}</p>
                            </a>
                          ))}
                      </>
                    )}
                    {!phone && !mail && (
                      <>
                        <p className="text-[12px] lg:text-sm font-light text-black/60">
                          {info1}
                        </p>
                        <p className="text-[12px] lg:text-sm font-light text-black/60">
                          {info2}
                        </p>
                      </>
                    )}
                  </div>
                )
              )}
            </div>

            <div
              data-aos="fade-right"
              data-aos-duration="2000"
              className="pb-3"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.7256836932906!2d96.16744459993849!3d16.777417648199627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1949e223e196b%3A0x1065c1641f17778!2sQ5G9%2BXX7%2C%20Yangon%2C%20Myanmar%20(Burma)!5e0!3m2!1sen!2ssg!4v1722871172352!5m2!1sen!2ssg"
                className=" w-full h-full"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <footer className=" text-center text-xs text-black">
            Copy Right © 2024 NSD, All Rights Reserved.
          </footer>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
