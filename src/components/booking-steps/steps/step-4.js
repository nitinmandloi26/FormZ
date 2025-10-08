"use client";
import { Heading, Content, Button } from "@/components/ui";
import Image from "next/image";
const Step4 = ({hero,formData,handleChange,nextStep, prevStep}) => {
    return(
        <div className="w-full py-6 md:py-15 justify-center items-center">
            <div className="max-w-[1332px] mx-auto px-5.5 md:px-4">
                <div className="text-center mb-6 md:mb-12">
                    <Heading level={1} className={`mb-3 md:mb-5`}>{hero.heading}</Heading>
                    <Content className={`max-w-[325px] md:max-w-[830px] mb-1.5 mx-auto md:mb-0`}>{hero.content}</Content>
                </div>
                <div className="grid grid-cols-[0.7452fr_repeat(1,1fr)] gap-10">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="bg-[#F0F0F0] rounded-2xl p-8">
                            <Heading level={3} size={4} className={`mb-6`}>Booking Summary</Heading>
                            <div className="grid grid-cols-1 gap-6">
                              <div className="grid grid-cols-[44px_1fr_60px] gap-4 items-start">
                                <span className="flex items-center justify-center w-11 h-11 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/clean.svg`} width={17} height={16} alt="service" /></span>
                                <div className="">
                                    <h4 className="text-[#1a1a1a] text-[16px] font-semibold">Residential Deep Cleaning</h4>
                                    <Content variant={3} className={`mb-2`}>Complete deep cleaning service including kitchen, bathrooms, bedrooms, and living areas</Content>
                                    <div className="flex gap-4 text-[12px]">
                                        <span className="bg-[#FFFFFF] block px-3 py-1 text-[#666666] rounded-full">2-3 bedrooms</span>
                                        <span className="bg-[#FFFFFF] block px-3 py-1 text-[#666666] rounded-full">~3 hours</span>
                                    </div>
                                </div>
                                <span className="text-[#1a1a1a] text-[16px] font-semibold text-right">$75.00</span>
                              </div>
                              <div className="grid grid-cols-2 gap-6 border-t-1 border-[#E5E5E5] pt-6">
                                <div className="grid grid-cols-[40px_1fr] gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/date.svg`} width={16} height={16} alt="service" /></span>
                                    <div className="grid grid-cols-1">
                                        <h4 className="text-[#1a1a1a] text-[14px] font-medium">Date</h4>
                                        <p className="text-[#666] text-[14px] font-normal">January 15, 2024</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[40px_1fr] gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/clock.svg`} width={20} height={20} alt="service" /></span>
                                    <div className="grid grid-cols-1">
                                        <h4 className="text-[#1a1a1a] text-[14px] font-medium">Time</h4>
                                        <p className="text-[#666] text-[14px] font-normal">1:00 PM - 4:00 PM</p>
                                    </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-6 border-t-1 border-[#E5E5E5] pt-6 items-start">
                                <div className="grid grid-cols-[40px_1fr] gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/address.svg`} width={16} height={16} alt="service" /></span>
                                    <div className="grid grid-cols-1">
                                        <h4 className="text-[#1a1a1a] text-[14px] font-medium">Service Address</h4>
                                        <p className="text-[#666] text-[14px] font-normal">123 Main Street, Apt 4B New York, NY 10001</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[40px_1fr] gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/booking.svg`} width={20} height={20} alt="service" /></span>
                                    <div className="grid grid-cols-1">
                                        <h4 className="text-[#1a1a1a] text-[14px] font-medium">Booking Type</h4>
                                        <p className="text-[#666] text-[14px] font-normal">Monthly</p>
                                    </div>
                                </div>                                
                              </div>
                               <div className="grid grid-cols-1 gap-6 border-t-1 border-[#E5E5E5] pt-6 items-start">
                                <div className="grid grid-cols-[40px_1fr] gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] rounded-[10px]"><Image src={`images/services/user.svg`} width={16} height={16} alt="service" /></span>
                                    <div className="grid grid-cols-1">
                                        <h4 className="text-[#1a1a1a] text-[14px] font-medium">Contact Information</h4>
                                        <p className="text-[#666] text-[14px] font-normal">John Smith <br/> john.smith@email.com • +1 (555) 123-4567</p>
                                    </div>
                                </div>
                               </div>
                            </div>
                        </div>
                        <div className="border border-[#E5E5E5] rounded-2xl grid grid-cols-1 gap-6 p-8">
                            <Heading level={3} size={4}>Price Breakdown</Heading>
                            <div className="text-[16px] font-normal grid grid-cols-1 gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[#666666]">Deep Cleaning Service</span>
                                    <span className="text-[#1a1a1a]">$75.00</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#666666]">Platform Fee</span>
                                    <span className="text-[#1a1a1a]">$10.00</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#666666]">Tax (8.25%)</span>
                                    <span className="text-[#1a1a1a]">$7.01</span>
                                </div>
                                <div className="flex items-center justify-between border-t border-[#E5E5E5] pt-4">
                                    <span className="text-[#1a1a1a] font-semibold text-[20px]">Total</span>
                                    <span className="text-[#1a1a1a] text-[24px] font-bold">$92.01</span>
                                </div>
                            </div>
                            <div className="bg-[#F0F0F0] rounded-[12px] p-4 grid grid-cols-[16px_1fr] gap-3 items-center">
                                    <Image src="images/services/security.svg" width={16} height={16} alt="Security" />
                                <div className="">
                                    <h5 className="text-[#1a1a1a] text-[14px] font-medium">100% Satisfaction Guarantee</h5>
                                    <p className="text-[#666666] text-[12px] font-normal">If you're not satisfied, we'll make it right or refund your payment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        
                    </div>
                </div>
            </div>
            <Button type="button" onClick={prevStep}>Prev</Button>
        </div>
    );
}

export default Step4;