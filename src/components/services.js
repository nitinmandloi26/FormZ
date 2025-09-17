"use client";

import { useState } from "react";
import { Heading1, Content1 } from "./typography";
import Image from "next/image";

const ServicesPage = ({ hero, services }) => {
  const [activeService, setActiveService] = useState({ index: null, service: null });

  const handleClick = (service, index) => {
    setActiveService({ index, service });
  };

  return (
    <div className="w-full py-6 md:py-15 justify-center items-center">
      <div className="max-w-[1332px] mx-auto px-5.5 md:px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Heading1
            classDynamic="max-w-[258px] md:max-w-[600px] mb-5"
            title={hero.heading}
          />
          <Content1
            classDynamic="max-w-[290px] md:max-w-[830px] mb-1.5 mx-auto md:mb-0"
            content={hero.content}
          />
        </div>

        {/* Services Grid */}
        <div className="border-3 border-[#E5E5E5] rounded-[20px] px-12 py-12">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-9.5 mb-10">
            {services.map((service, index) => {
              const isActive = activeService.index === index;

              return (
                <div
                  key={index}
                  onClick={() => handleClick(service, index)}
                  className={`cursor-pointer border-3 transition-colors rounded-[20px] p-9.5
                    ${isActive ? "bg-[#1a1a1a] text-white border-[#1a1a1a]" : "border-[#E5E5E5]"}
                  `}
                >
                  <div className="flex flex-col gap-4.5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4.75">
                        <span className="w-19 h-19 rounded-full bg-[#F0F0F0] flex items-center justify-center">
                          <Image
                            className="h-[29px] w-auto"
                            src={service.icon}
                            width={29}
                            height={29}
                            alt={service.title}
                          />
                        </span>
                        <h3
                          className={`text-[32px] font-semibold ${
                            isActive ? "text-[#fff]" : "text-[#1A1A1A]"
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>
                      <span className="w-8 h-8 rounded-full border-3 border-[#E5E5E5]" />
                    </div>

                    {/* Content */}
                    <p className="text-[22px]">{service.content}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-4.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1.5 text-[19px] rounded-[6px] bg-[#F0F0F0] ${
                            isActive && "text-[#666666]"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Service Location Input */}
          <div className="mb-10">
            <label className="text-[28px] font-semibold text-[#1A1A1A] block mb-4">
              Service Location
            </label>
            <span className="block relative">
                <input
                    type="text"
                    placeholder="Enter your address or zip code"
                    className="w-full border-2 border-[#E5E5E5] rounded-[12px] font-normal text-[20px] 
                         placeholder:text-[#ADAEBC] text-[#666666] leading-9 px-6 py-3"
                />
                <Image className="absolute right-7 top-1/2 -translate-y-1/2" src="images/services/location.svg" width={19} height={26} alt="map" />
            </span>
          </div>

          <div className="mb-10">
            <label className="text-[28px] font-semibold text-[#1A1A1A] block mb-4">
              Cleaning Frequency
            </label>
            
          </div>


        </div>
      </div>
    </div>
  );
};

export default ServicesPage;