"use client";
import { useState,useEffect } from "react";
import { Heading, Content,  Button, formatDate } from "@/components/ui";
import fetchCountry from "@/components/countries";
import Image from "next/image";
const Step5 = ({hero,prevStep,formData}) => {
    const [showFull, setShowFull] = useState(false);
    const [countries, setCountries] = useState([]);
    useEffect(() => {
    const loadCountries = async () => {
      const data = await fetchCountry(); // call async function
      setCountries(data);
    };
    loadCountries();
  }, []);

    formData = {
        service:{
            service:{
                title:"Residential Deep Cleaning",
                content:"Complete deep cleaning service including kitchen, bathrooms, bedrooms, and living areas",
                tags:['2-3 bedrooms','~3 hours']
            }
        },
        booking:[
            {
                date:new Date(),
                timeSlot:{
                time:"7:00 PM"
                }
            }
        ],
        fullAddress: "123 Main Street, Apt 4B New York, NY 10001",
        frequency:{
            option:{
                label:"One Time"
            }
        }
    }
    
    return (
        <div className="w-full py-6 md:py-15 justify-center items-center">
            <div className="max-w-[1332px] mx-auto px-5.5 md:px-4">
                <div className="text-center mb-6 md:mb-12">
                    <div className="w-30 h-30 mx-auto mb-6 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                        <Image src={`images/services/success.svg`} width={52} height={37} alt="Success" />
                    </div>
                    <Heading level={1} className={`mb-3 md:mb-5`}>{hero.heading}</Heading>
                    <Content className={`max-w-[325px] md:max-w-[650px] mb-1.5 mx-auto md:mb-0`}>{hero.content}</Content>
                </div>
                <div className="grid grid-cols-[0.7452fr_repeat(1,1fr)] gap-10 items-start">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="bg-[#F0F0F0] rounded-2xl p-8">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="grid grid-cols-[44px_1fr] gap-4 items-start">
                                    <span className="flex items-center justify-center w-11 h-11 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/booking-check.svg`} width={17} height={16} alt="service" /></span>
                                    <div className="">
                                        <h4 className="text-[#1a1a1a] text-[18px] font-semibold">Booking Details</h4>
                                        <Content variant={3} className={`mb-2`}>Reference #CLN-2024-001234</Content>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[44px_1fr_30px] gap-4 items-start">
                                    <span className="flex items-center justify-center w-11 h-11 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/clean.svg`} width={17} height={16} alt="service" /></span>
                                    <div className="">
                                        <h4 className="text-[#1a1a1a] text-[16px] font-semibold">{formData?.service?.service.title}</h4>
                                            <Content variant={3} className={`mb-2`}>{formData?.service?.service.content}</Content>
                                                <div className="flex gap-4 text-[12px]">
                                                    {formData?.service?.service?.tags.map((tag,index) => (
                                                        <span key={index} className="bg-[#FFFFFF] block px-3 py-1 text-[#666666] rounded-full">{tag}</span>
                                                    ))}
                                                </div>
                                    </div>
                                </div> 

                                {[...formData.booking].reverse().map((b, idx) => (
                                                              <div key={idx} className="border-t-1 border-[#E5E5E5] pt-6">
                                                                {idx !== 0 && <h3 className="font-semibold text-[16px] text-[#1a1a1a] mb-4">Next Schedule</h3>}
                                                                <div className="grid grid-cols-2 gap-6 ">
                                                                <div className="grid grid-cols-[40px_1fr] gap-3">
                                                                    <span className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/date.svg`} width={16} height={16} alt="service" /></span>
                                                                    <div className="grid grid-cols-1">
                                                                        <h4 className="text-[#1a1a1a] text-[14px] font-medium">Date</h4>
                                                                        <p className="text-[#666] text-[14px] font-normal">{formatDate(b.date)}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-[40px_1fr] gap-3">
                                                                    <span className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/clock.svg`} width={20} height={20} alt="service" /></span>
                                                                    <div className="grid grid-cols-1">
                                                                        <h4 className="text-[#1a0e0e] text-[14px] font-medium">Time</h4>
                                                                        <p className="text-[#666] text-[14px] font-normal">{b?.timeSlot?.time || "Not selected"}</p>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                              </div>
                                                              ))}

                                                              <div className="grid grid-cols-2 gap-6 border-t-1 border-[#E5E5E5] pt-6 items-start">
                                                                                              <div className="grid grid-cols-[40px_1fr] gap-3">
                                                                                                  <span className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/address.svg`} width={16} height={16} alt="service" /></span>
                                                                                                  <div className="grid grid-cols-1">
                                                                                                      <h4 className="text-[#1a1a1a] text-[14px] font-medium">Service Address</h4>
                                                                                                      <p onClick={() => setShowFull(!showFull)}
                                                                    title={!showFull ? formData?.fullAddress : ""}
                                                               className="text-[#666] text-[14px] font-normal cursor-pointer">
                                                                  {showFull
                                                                      ? formData?.fullAddress
                                                                      : formData?.fullAddress.length > 40
                                                                      ? formData?.fullAddress.slice(0, 40) + "..."
                                                                      : formData?.fullAddress}
                                                               </p>
                                                                                                  </div>
                                                                                              </div>
                                                                                              <div className="grid grid-cols-[40px_1fr] gap-3">
                                                                                                  <span className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/booking.svg`} width={20} height={20} alt="service" /></span>
                                                                                                  <div className="grid grid-cols-1">
                                                                                                      <h4 className="text-[#1a1a1a] text-[14px] font-medium">Booking Type</h4>
                                                                                                      <p className="text-[#666] text-[14px] font-normal">{formData.frequency.option.label}</p>
                                                                                                  </div>
                                                                                              </div>                                
                                                                                            </div>                       
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-10">
                    {countries.map((country,index) => {
                        return (
                            <div key={index} className="">
                                {country.name} {country.code}
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Step5;