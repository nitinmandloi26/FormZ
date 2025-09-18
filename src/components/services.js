"use client";

import { useState } from "react";
import { Heading, Content, Button } from "./ui";
import Image from "next/image";

const ServicesPage = ({ hero, services, fields}) => {
  const [activeService, setActiveService] = useState({ index: null, service: null });
  const [activeFrequency, setFrequency] = useState({index:null, option: null});

  const handleClick = (service, index) => {
    setActiveService({ index, service });
  };

  const handleFrequency = (option,index) => {
    setFrequency({index,option});
  }

  return (
    <div className="w-full py-6 md:py-15 justify-center items-center">
      <div className="max-w-[1332px] mx-auto px-5.5 md:px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Heading level={1} className={`max-w-[258px] md:max-w-[600px] mb-5 mx-auto`}>{hero.heading}</Heading>
          <Content className={`max-w-[290px] md:max-w-[830px] mb-1.5 mx-auto md:mb-0`}>{hero.content}</Content>
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
            <label className="text-[28px] font-semibold text-[#1A1A1A] block mb-6">
              {fields.location.label}
            </label>
            <span className="block relative">
                <input
                    type="text"
                    placeholder={fields.location.placeholder}
                    className="w-full border-2 border-[#E5E5E5] rounded-[12px] font-normal text-[20px] 
                         placeholder:text-[#ADAEBC] text-[#666666] leading-9 px-6 py-3"
                />
                <Image className="absolute right-7 top-1/2 -translate-y-1/2" src={fields.location.suffix} width={19} height={26} alt="map" />
            </span>
          </div>

          <div className="mb-10">
            <label className="text-[28px] font-semibold text-[#1A1A1A] block mb-6">
              {fields.frequency.label}
            </label>
            <div className="grid grid-cols-4 gap-6.5 text-center">
              {fields.frequency.options.map((option,index)=>{
                const isActive = activeFrequency.index === index;
                return (
                <div key={index} onClick={()=> handleFrequency(option,index)} className={`cursor-pointer border-3 rounded-[12px] p-7 
                  ${isActive ? "bg-[#1a1a1a] border-[#1A1A1A] text-[#fff]" : "border-[#E5E5E5]"}`}>
                  <label className={`cursor-pointerzs block text-[25px] text-[#1A1A1A] font-medium mb-1.5
                    ${isActive ? "text-[#FFFFFF]" : "text-[#1A1A1A]"}
                  `}>{option.label}</label>
                  <span className="text-[22px] font-normal block">{option.value}</span>
                </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-7.5">
            <Button type="button">{fields.buttonShedule}</Button>
            <Button type="button" variant={`lightGray`}>{fields.buttonQuote}</Button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ServicesPage;