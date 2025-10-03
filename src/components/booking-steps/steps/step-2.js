"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import { Heading, Content, Button, formatDate, Errors } from "@/components/ui";
import Image from "next/image";


const Step2 = ({hero,slots, errorMsg, formData, handleChange, nextStep, prevStep }) => {
  const[errors, setErrors] = useState({slots:""});
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const [currentDate, setCurrentDate] = useState(tomorrow);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  
  const bookings = formData.booking || [];
  
  const updatedBookings = [...bookings];
  
  const handleDateChange = (date) => {
    setCurrentDate(date);
    setCurrentSlot(null); // reset slot when date changes
    setCurrentIndex(null);
    if (updatedBookings.length > 0) {
      updatedBookings[updatedBookings.length - 1] = {
        ...updatedBookings[updatedBookings.length - 1],
        date: date
      }
    }
    handleChange({ booking: updatedBookings });
    
  };
  
  
  const hadleTimeClick = (period,combinedIndex) => {
    setCurrentSlot(period);
    setCurrentIndex(combinedIndex);
    if (updatedBookings.length > 0) {
      updatedBookings[updatedBookings.length - 1] = {
        ...updatedBookings[updatedBookings.length - 1],
        timeSlot: period,
        slotIndex: combinedIndex
      }
      setErrors((prev) => ({ ...prev, slots: "" }));
    }
    handleChange({ booking: updatedBookings });
  }
  
  const addBooking = () => {
    if (!currentDate || !currentSlot) return;
    const newBooking = {
      date: currentDate,
      timeSlot: null,
      slotIndex: null,
    };
    
    handleChange({
      booking: [...bookings, newBooking],
    });
    
    setCurrentDate(tomorrow);
    setCurrentSlot(null);
    setCurrentIndex(null);
  }
  
  const removeBooking = (removeIndex) => {
    const updatedBookings = bookings.filter((_, idx) => idx !== removeIndex);
    handleChange({ booking: updatedBookings });
  };

  const handleCheckout = () => {
    let newErrors = {slots:""};
   if (updatedBookings.length > 0) {
      if(!updatedBookings[updatedBookings.length - 1].slotIndex){
        newErrors.slots = "Please choose available slot.";
      }
    }
    setErrors(newErrors);
    if (!newErrors.slots){
       if (nextStep) nextStep();
    }
  
  }

  

  
  return (
    <div className="w-full py-6 md:py-15 justify-center items-center">
    <div className="max-w-[1332px] mx-auto px-5.5 md:px-4">
    <div className="text-center mb-6 md:mb-12">
    <Heading level={1} className={`mb-3 md:mb-5`}>{hero.heading}</Heading>
    <Content className={`max-w-[325px] md:max-w-[830px] mb-1.5 mx-auto md:mb-0`}>{hero.content}</Content>
    </div>
    <div className="grid grid-cols-[0.96fr_repeat(1,1fr)] gap-7.5 items-start mb-9">
    <div className="border-1 border-[#E5E5E5] rounded-[23px] p-8">
    <Heading level={3} size={1} className={`mb-6.75`}>{slots.selectDate}</Heading>
    <Calendar  
    tileClassName={({ date, view }) => {
      if (view === "month" && date < tomorrow.setHours(0, 0, 0, 0)) {
        return "disabled-date"; // 👈 custom class
      }
    }}
    onChange={handleDateChange}
    value={currentDate}
    
    minDate={tomorrow}
    prev2Label={null}
    next2Label={null}
    prevLabel = {
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
      <path d="M0.599162 7.20653C0.158352 7.64734 0.158352 8.36321 0.599162 8.80402L7.37 15.5749C7.8108 16.0157 8.52668 16.0157 8.96749 15.5749C9.4083 15.134 9.4083 14.4182 8.96749 13.9774L2.99364 8.00351L8.96396 2.02966C9.40477 1.58885 9.40477 0.872979 8.96396 0.43217C8.52315 -0.00863986 7.80728 -0.00863986 7.36647 0.43217L0.595635 7.203L0.599162 7.20653Z" fill="#666666"/>
      </svg>
    }
    nextLabel={
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
      <path d="M9.3005 7.20653C9.74131 7.64734 9.74131 8.36321 9.3005 8.80402L2.52966 15.5749C2.08885 16.0157 1.37298 16.0157 0.93217 15.5749C0.49136 15.134 0.49136 14.4182 0.93217 13.9774L6.90602 8.00351L0.935696 2.02966C0.494887 1.58885 0.494887 0.872979 0.935696 0.43217C1.37651 -0.00863986 2.09238 -0.00863986 2.53319 0.43217L9.30402 7.203L9.3005 7.20653Z" fill="#666666"/>
      </svg>
    }
    />
    </div>
    <div className="border-1 border-[#E5E5E5] rounded-[23px] p-8">
    <Heading level={3} size={1} className={`mb-4.75`}>{slots.availableSlot}</Heading>
    <Content variant={2} className={`mb-4`}>{formatDate(currentDate, true)}</Content>
    <div className="grid grid-cols-1 gap-6">
    {slots?.timeslots?.map((timeslot,index) => {
      return (
        <div key={index} className=""
        >
        <Heading level={4} size={2} className="mb-5">{timeslot.label}</Heading>
        <div className="grid grid-cols-4 gap-3.5">
        {timeslot.periods?.map((period, idx) => {
          const combinedIndex = `${index}${idx}`; 
          const isActive = currentIndex  === combinedIndex;
          const isBooked = period.check === "booked";
          return (
            <div key={combinedIndex} 
            onClick={() => !isBooked && hadleTimeClick(period,combinedIndex)}
            className={` border border-[#E5E5E5] rounded-[14px] p-5 text-center
                        ${isActive ? "bg-[#1a1a1a] text-[#fff]" : ""}
                        ${isBooked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
              <span className={`block ${isActive ? "text-[#fff]":"text-[#1a1a1a]"} text-[16px] font-medium`}>{period.time}</span>
              <span className={`block capitalize ${isActive ? "text-[#fff]" : "text-[#666]"} text-[14px]`}>{period.check}</span>
              </div>
            );
          })}
          </div>
          </div>
        );
      })}
      </div>
    {errors.slots && (
                  <Errors>{errors.slots}</Errors>
                 )}
      {formData?.frequency?.index === 0 && (
        <div className="text-center pt-7">
        <Button type="button" onClick={addBooking}>Add To Booking</Button>
        </div>
      )}
      
      </div>
      </div>
      
      
      <div className="bg-[#F0F0F0] rounded-[22px] p-8">
      <Heading level={3} size={1} className={`mb-5`}>Booking Summary</Heading>
      {[...formData.booking].reverse().map((b, idx) => ( 
        <div key={idx} className="grid items-start grid-cols-4 mb-8 relative">
        <div className="flex items-center gap-3">
        <span className="w-13 h-13 flex bg-[#1a1a1a] justify-center items-center rounded-[12px]">
        <Image src={`images/services/clean.svg`} width={20} height={18} alt="service" />
        </span>
        <div className="">
        <Heading level={4} size={3}>Service</Heading>
        <Content variant={2}>{formData?.service?.service.title}</Content>
        </div>
        </div>  
        <div className="flex items-center gap-3">
        <span className="w-13 h-13 flex bg-[#1a1a1a] justify-center items-center rounded-[12px]">
        <Image src={`images/services/clean.svg`} width={20} height={18} alt="service" />
        </span>
        <div className="">
        <Heading level={4} size={3}>Booking Type</Heading>
        <Content variant={2}>{formData?.frequency?.option.label}</Content>
        </div>
        </div>            
        <div className="flex items-center gap-3">
        <span className="w-13 h-13 flex bg-[#1a1a1a] justify-center items-center rounded-[12px]">
        <Image src={`images/services/date.svg`} width={16} height={18} alt="service" />
        </span>
        <div className="">
        <Heading level={4} size={3}>Date</Heading>
        <Content variant={2}>{formatDate(b.date)}</Content>
        </div>
        </div>
        <div className="flex items-center gap-3">
        <span className="w-13 h-13 flex bg-[#1a1a1a] justify-center items-center rounded-[12px]">
        <Image src={`images/services/clock.svg`} width={18} height={18} alt="service" />
        </span>
        <div className="">
        <Heading level={4} size={3}>Time</Heading>
        <Content variant={2}>{b?.timeSlot?.time}</Content>
        </div>
        </div>
        {idx !== 0 && (
          <div className="absolute right-0"><Button onClick={() => removeBooking(formData.booking.length - 1 - idx)} type="button">Remove</Button></div>
        )}
        </div>
      ))}
      
      <div className="flex justify-between items-center">
      <Heading level={3} size={1} className={`font-bold`}>Total: ${formData.service.service.price * formData?.booking.length}</Heading>
      <div className="flex  gap-3 md:gap-4">
      <Button type="button" onClick={prevStep} variant={`lightGray`} className={`border border-[#E5E5E5]`}>Back to Services</Button>
      <Button type="button" onClick={handleCheckout}>Continue to Checkout</Button>
      </div>
      </div>
      </div>
  
      </div>
      
      </div>
    );
    
  }
  export default Step2;