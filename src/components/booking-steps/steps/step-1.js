"use client";

import { useState } from "react";
import { Heading, Content, Button, Errors } from "@/components/ui";
import Image from "next/image";

const Step1 = ({ hero, services, fields,errorMsg, formData, handleChange, nextStep}) => {
  const [activeService, setActiveService] = useState({ index: null, service: null });
  const [activeFrequency, setFrequency] = useState({index:null, option: null});
  const[location, setLocation] = useState("");
  const[errors, setErrors] = useState({service:"", frequency:"", location:""});

  const handleClick = (service, index) => {
    setActiveService({ index, service });
    if(errors.service){
      setErrors((prev) => ({...prev, service:""}));
    }
  };

  const handleFrequency = (option,index) => {
    setFrequency({index,option});
    if(errors.frequency){
      setErrors((prev) => ({...prev, frequency:""}));
    }
  }

  const handleShedule = () =>{
    let newErrors = {service:"", frequency:"", location:""};
    if(!activeService.service){
      newErrors.service = errorMsg.service;
    }
    if(!activeFrequency.option){
      newErrors.frequency = errorMsg.frequency;
    }
    if(!location.trim()){
      newErrors.location = errorMsg.location;
    }
    setErrors(newErrors);
    if (!newErrors.service && !newErrors.frequency && !newErrors.location) {
        const serviceResults = {
          service: activeService,
          location: location,
          frequency: activeFrequency
        };

        if(handleChange) handleChange(serviceResults);
        if (nextStep) nextStep();
    }

  }
  
  return (
    <div className="w-full py-6 md:py-15 justify-center items-center">
      <div className="max-w-[1332px] mx-auto px-5.5 md:px-4">
        {/* Hero Section */}
        <div className="text-center mb-6 md:mb-12">
          <Heading level={1} className={`mb-3 md:mb-5`}>{hero.heading}</Heading>
          <Content className={`max-w-[325px] md:max-w-[830px] mb-1.5 mx-auto md:mb-0`}>{hero.content}</Content>
        </div>

        {/* Services Grid */}
        <div className="border-2 md:border-3 border-[#E5E5E5] rounded-[20px] px-4 py-5 md:px-12 md:py-12">
          <div className="mb-4 md:mb-10">
             <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-9.5">
            {services.map((service, index) => {
              const isActive = activeService.index === index;

              return (
                <div
                  key={index}
                  onClick={() => handleClick(service, index)}
                  className={`cursor-pointer border-2 md:border-3 transition-colors rounded-[20px] py-4 px-6.5 md:py-9.5 md:px-9.5
                    ${isActive ? "bg-[#1a1a1a] text-white border-[#1a1a1a]" : "border-[#E5E5E5]"}
                  `}
                >
                  <div className="flex flex-col gap-3 md:gap-4.5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 md:gap-4.75">
                        <span className="w-12 h-12 md:w-19 md:h-19 rounded-full bg-[#F0F0F0] flex items-center justify-center">
                          <Image
                            className="h-[18px] md:h-[29px] w-auto"
                            src={service.icon}
                            width={29}
                            height={29}
                            alt={service.title}
                          />
                        </span>
                        <h3
                          className={`text-[20px] md:text-[32px] font-semibold ${
                            isActive ? "text-[#fff]" : "text-[#1A1A1A]"
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>
                      <span className="w-5 h-5 md:w-8 md:h-8 rounded-full border-2 md:border-3 border-[#E5E5E5]" />
                    </div>

                    {/* Content */}
                    <p className="text-[14px] md:text-[22px]">{service.content}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2.5 md:gap-4.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1.5 text-[12px] md:text-[19px] rounded-[6px] bg-[#F0F0F0] ${
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
             {errors.service && (
              <Errors>{errors.service}</Errors>
             )}
          </div>

          {/* Service Location Input */}
          <div className="mb-4 md:mb-10">
            <label className="text-[15px] md:text-[28px] font-semibold text-[#1A1A1A] block mb-2.5 md:mb-6">
              {fields.location.label}
            </label>
            <span className="block relative">
                <input
                    type="text"
                    placeholder={fields.location.placeholder}
                    className="w-full border-1 md:border-2 border-[#E5E5E5] rounded-[8px] md:rounded-[12px] font-normal text-[13px] md:text-[20px] 
                         placeholder:text-[#ADAEBC] text-[#666666] leading-6.5 md:leading-9 px-4 md:px-6 py-2 md:py-3"
                    value={location} 
                    onChange={(e) => {
                      const value = e.target.value;
                      setLocation(value);
                      setErrors((prev) => ({...prev,location:value.trim() ? "" : errorMsg.location}));
                    } }
                />
                <Image className="absolute right-4 md:right-7 top-1/2 -translate-y-1/2 h-[16px] md:h-[26px] w-auto" src={fields.location.suffix} width={19} height={26} alt="map" />
            </span>
            {errors.location && (
              <Errors>{errors.location}</Errors>
             )}
          </div>

          <div className="mb-4 md:mb-10">
            <label className="text-[15px] md:text-[28px] font-semibold text-[#1A1A1A] block mb-2.5 md:mb-6">
              {fields.frequency.label}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-6.5 text-center">
              {fields.frequency.options.map((option,index)=>{
                const isActive = activeFrequency.index === index;
                return (
                <div key={index} onClick={()=> handleFrequency(option,index)} className={`cursor-pointer border-2 md:border-3 rounded-[12px] p-4 md:p-7 
                  ${isActive ? "bg-[#1a1a1a] border-[#1A1A1A] text-[#fff]" : "border-[#E5E5E5]"}`}>
                  <label className={`cursor-pointerzs block text-[16px] md:text-[25px] text-[#1A1A1A] font-medium mb-1.5
                    ${isActive ? "text-[#FFFFFF]" : "text-[#1A1A1A]"}
                  `}>{option.label}</label>
                  <span className="text-[14px] md:text-[22px] font-normal block">{option.value}</span>
                </div>
                );
              })}
            </div>
            {errors.frequency && (
              <Errors>{errors.frequency}</Errors>
             )}
          </div>

          <div className="flex justify-center md:justify-end gap-3 md:gap-7.5">
            <Button type="button" onClick={handleShedule}>{fields.buttonShedule}</Button>
            <Button type="button" variant={`lightGray`}>{fields.buttonQuote}</Button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Step1;