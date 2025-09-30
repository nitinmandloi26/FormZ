"use client";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";
import { Heading, Content, Button, Errors } from "@/components/ui";
import Image from "next/image";

const Step1 = ({ hero, services, fields,errorMsg, formData, handleChange, nextStep}) => {
  const[errors, setErrors] = useState({service:"", frequency:"", location:""});
  const locationRef = useRef(null);
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) {
        handleChange({location: place.formatted_address});
        setErrors((prev) => ({ ...prev, location: "" }));
      }
    }
  };


  const handleClick = (service, index) => {
    handleChange({service: { index, service } });
    if(errors.service){
      setErrors((prev) => ({...prev, service:""}));
    }
  };

  useEffect(() => {
    if (formData.service?.service && locationRef.current) {
      locationRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => locationRef.current.focus(), 350);
    }
  }, [formData?.service]); 

  const handleFrequency = (option,index) => {
    handleChange({frequency: { index, option } });
    if(errors.frequency){
      setErrors((prev) => ({...prev, frequency:""}));
    }
  }

  const handleShedule = () =>{
    let newErrors = {service:"", frequency:"", location:""};
    if(!formData?.service?.service){
      newErrors.service = errorMsg.service;
    }
    if(!formData?.frequency?.option){
      newErrors.frequency = errorMsg.frequency;
    }
    if(!formData?.location?.trim()){
      newErrors.location = errorMsg.location;
    }
    setErrors(newErrors);
    if (!newErrors.service && !newErrors.frequency && !newErrors.location) {
      const today = new Date();
      const tomorrow = new Date(today);
       tomorrow.setDate(today.getDate() + 1);
        handleChange({booking: [{date: tomorrow, timeSlot: null,slotIndex: null}] });
        if (nextStep) nextStep();
    }

  }
  
  return (
    <div className="w-full py-6 md:py-15 justify-center items-center">
      <div className="max-w-7xl mx-auto px-5.5 md:px-4">
        {/* Hero Section */}
        <div className="text-center mb-6 md:mb-12">
          <Heading level={1} className={`mb-3 md:mb-5`}>{hero.heading}</Heading>
          <Content className={`max-w-[325px] md:max-w-[830px] mb-1.5 mx-auto md:mb-0`}>{hero.content}</Content>
        </div>

        {/* Services Grid */}
        <div className="">
          <div className="mb-4 md:mb-10">
             <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-7">
            {services.map((service, index) => {
              const isActive = formData.service?.index === index;

              return (
                <div
                  key={index}
                  onClick={() => handleClick(service, index)}
                  className={`cursor-pointer border-1 transition-colors rounded-[20px] py-4 px-6.5 md:py-6 md:px-6
                    ${isActive ? "bg-[#1a1a1a] text-white border-[#1a1a1a]" : "border-[#E5E5E5]"}
                  `}
                >
                  <div className="flex flex-col gap-3 md:gap-4.5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 md:gap-4.75">
                        <span className="w-12 h-12 md:w-15 md:h-15 rounded-full bg-[#F0F0F0] flex items-center justify-center">
                          <Image
                            className="h-[18px] md:h-[22px] w-auto"
                            src={service.icon}
                            width={22}
                            height={22}
                            alt={service.title}
                          />
                        </span>
                        <h3
                          className={`text-[20px] md:text-[22px] font-semibold ${
                            isActive ? "text-[#fff]" : "text-[#1A1A1A]"
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>
                      <span className="w-5 h-5 md:w-7 md:h-7 rounded-full border-1 border-[#E5E5E5]" />
                    </div>

                    {/* Content */}
                    <p className="text-[14px] md:text-[16px]">{service.content}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2.5 md:gap-3">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1.5 text-[12px] md:text-[14px] rounded-[6px] bg-[#F0F0F0] ${
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
          <label className="text-[15px] md:text-[24px] font-semibold text-[#1A1A1A] block mb-2.5 md:mb-3">
            {fields.location.label}
          </label>
          <span className="block relative">
            <LoadScript
              googleMapsApiKey="{process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}"
              libraries={["places"]}
            >
              <Autocomplete
                onLoad={(ac) => (autocompleteRef.current = ac)}
                onPlaceChanged={handlePlaceChanged}
              >
                <input
                  ref={locationRef}
                  type="text"
                  placeholder={fields.location.placeholder}
                  className="w-full border-1 border-[#E5E5E5] rounded-[8px] md:rounded-[12px] font-normal text-[13px] md:text-[16px] 
                    placeholder:text-[#ADAEBC] text-[#666666] leading-6.5 md:leading-9 px-4 md:px-6 py-2 md:py-3"
                  value={formData?.location || ""}
                  onChange={(e) => handleChange({ location: e.target.value })}
                />
              </Autocomplete>
            </LoadScript>
            <Image
              className="absolute right-4 md:right-7 top-1/2 -translate-y-1/2 h-[16px] md:h-[26px] w-auto"
              src={fields.location.suffix}
              width={19}
              height={26}
              alt="map"
            />
          </span>
          {errors.location && <Errors>{errors.location}</Errors>}
        </div>

          <div className="mb-4 md:mb-10">
            <label className="text-[15px] md:text-[24px] font-semibold text-[#1A1A1A] block mb-2.5 md:mb-3">
              {fields.frequency.label}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-6.5 text-center">
              {fields.frequency.options.map((option,index)=>{
                const isActive = formData.frequency?.index === index;
                return (
                <div key={index} onClick={()=> handleFrequency(option,index)} className={`cursor-pointer border-1 rounded-[12px] p-4 md:p-10 
                  ${isActive ? "bg-[#1a1a1a] border-[#1A1A1A] text-[#fff]" : "border-[#E5E5E5]"}`}>
                  <label className={`cursor-pointerzs block text-[16px] md:text-[21px] text-[#1A1A1A] font-semibold mb-1.5
                    ${isActive ? "text-[#FFFFFF]" : "text-[#1A1A1A]"}
                  `}>{option.label}</label>
                  <span className="text-[14px] md:text-[18px] font-normal block">{option.value}</span>
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