"use client";

import { useState, useEffect, useRef  } from "react";
import Calendar from "react-calendar";
import { Heading, Content, Button, formatDate,formatDate2, Label, Input, Errors } from "@/components/ui";
import Image from "next/image";


const Step2 = ({hero,slots, errorMsg, formData, handleChange, nextStep, prevStep }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const[errors, setErrors] = useState({slots:""});
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const [currentDate, setCurrentDate] = useState(tomorrow);
  const [startDate, setStartDate] = useState(null);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [serviceFee, setServiceFee] = useState(0);
  const errorRef = useRef(null);
  
  
  
  const bookings = formData.booking || [];
  
  useEffect(() => {
    const total = formData?.service?.service?.price * bookings.length || 0;
    setServiceFee(total);
    handleChange({ serviceFee: total }); // sync to parent
  }, [bookings.length, formData?.service?.service?.price]);
  
  const updatedBookings = [...bookings];
  
  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  const recurringDateHandle = (date) => {
     setCurrentDate(date);
     setStartDate(date);
     setShowCalendar(false);
  }
  
  
  const hadleTimeClick = (period,combinedIndex) => {
    setCurrentSlot(period);
    setCurrentIndex(combinedIndex);
    setErrors((prev) => ({ ...prev, slots: "" }));
  }
  
  const addBooking = () => {
    if(formData?.frequency?.option?.label != "One-time" && bookings.length > 0){
      setErrors((prev) => ({ ...prev, slots: "You are already book slots." }));
      return
    }
    if(!currentSlot){
      setErrors((prev) => ({ ...prev, slots: "Please choose available slot." }));
    }
    if (!currentDate || !currentSlot) return;
    const newBooking = {
      date: currentDate,
      timeSlot: currentSlot,
      slotIndex: currentIndex,
    };
    handleChange({
      booking: [...bookings, newBooking]
    });
    setErrors((prev) => ({ ...prev, slots: "" }));
    
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
    if (updatedBookings.length < 1) {
        newErrors.slots = "Please add at least one booking.";
        setTimeout(() => {
          errorRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
    }
    setErrors(newErrors);
    if (!newErrors.slots){
      if (nextStep) nextStep();
    }
  }
  
  
  
  
  return (
    <div className="w-full py-6 md:py-15 justify-center items-center">
      <div className="max-w-7xl mx-auto px-5.5 md:px-4">
        <div className="text-center mb-6 md:mb-12">
          <Heading level={1} className={`mb-3 md:mb-5`}>{hero.heading}</Heading>
          <Content className={`max-w-[325px] md:max-w-[830px] mb-1.5 mx-auto md:mb-0`}>{hero.content}</Content>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.55fr_repeat(1,1fr)] gap-10">
          <div className="border-1 border-[#E5E7EB] shadow-[0px_4px_12px_0px_#0000001A] rounded-[23px] p-6 md:p-8 grid grid-cols-1 gap-4 md:gap-7">
          {formData?.frequency?.option?.label === "One-time" && (
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
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="#1a1a1a">
            <path d="M0.599162 7.20653C0.158352 7.64734 0.158352 8.36321 0.599162 8.80402L7.37 15.5749C7.8108 16.0157 8.52668 16.0157 8.96749 15.5749C9.4083 15.134 9.4083 14.4182 8.96749 13.9774L2.99364 8.00351L8.96396 2.02966C9.40477 1.58885 9.40477 0.872979 8.96396 0.43217C8.52315 -0.00863986 7.80728 -0.00863986 7.36647 0.43217L0.595635 7.203L0.599162 7.20653Z"/>
          </svg>
          }
          nextLabel={
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="#1a1a1a">
            <path d="M9.3005 7.20653C9.74131 7.64734 9.74131 8.36321 9.3005 8.80402L2.52966 15.5749C2.08885 16.0157 1.37298 16.0157 0.93217 15.5749C0.49136 15.134 0.49136 14.4182 0.93217 13.9774L6.90602 8.00351L0.935696 2.02966C0.494887 1.58885 0.494887 0.872979 0.935696 0.43217C1.37651 -0.00863986 2.09238 -0.00863986 2.53319 0.43217L9.30402 7.203L9.3005 7.20653Z"/>
          </svg>
          }
          />
          )}

          {formData?.frequency?.option?.label != "One-time" && (
            <div className="">
              <Heading level={3} size={4} className={`mb-6`}>{formData?.frequency?.option?.name}</Heading>
              <div className="">
                <Label htmlFor="start_date">Strat Date</Label>
                <div className="relative">
                  <div className="relative">
                  <Input id="start_date"  
                  value = {formatDate2(startDate)}
                  onClick={() => setShowCalendar(!showCalendar)}
                  placeholder="mm/dd/yyyy" className={`placeholder:text-[#1a1a1a] text-[14px] md:text-[18px]`} readOnly/>
                  <Image className="absolute right-5 top-1/2  -translate-y-1/2 w-4 h-4 md:w-6 md:h-6" src={`images/services/calender.svg`} width={24} height={24} alt="Calender" />
                  </div>
                  {showCalendar && (
                    <div className="absolute top-[75px] left-0 z-50 bg-white w-full border rounded-2xl p-6 border-[#E5E7EB]">
                      <Calendar 
                      tileClassName={({ date, view }) => {
                        if (view === "month" && date < tomorrow.setHours(0, 0, 0, 0)) {
                          return "disabled-date"; // 👈 custom class
                        }
                      }}
                      onChange={recurringDateHandle}
                      value={currentDate}
                      minDate={tomorrow}
                      prev2Label={null}
                      next2Label={null}
                      prevLabel = {
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="#1a1a1a">
            <path d="M0.599162 7.20653C0.158352 7.64734 0.158352 8.36321 0.599162 8.80402L7.37 15.5749C7.8108 16.0157 8.52668 16.0157 8.96749 15.5749C9.4083 15.134 9.4083 14.4182 8.96749 13.9774L2.99364 8.00351L8.96396 2.02966C9.40477 1.58885 9.40477 0.872979 8.96396 0.43217C8.52315 -0.00863986 7.80728 -0.00863986 7.36647 0.43217L0.595635 7.203L0.599162 7.20653Z"/>
          </svg>
                     }
                      nextLabel={
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="#1a1a1a">
            <path d="M9.3005 7.20653C9.74131 7.64734 9.74131 8.36321 9.3005 8.80402L2.52966 15.5749C2.08885 16.0157 1.37298 16.0157 0.93217 15.5749C0.49136 15.134 0.49136 14.4182 0.93217 13.9774L6.90602 8.00351L0.935696 2.02966C0.494887 1.58885 0.494887 0.872979 0.935696 0.43217C1.37651 -0.00863986 2.09238 -0.00863986 2.53319 0.43217L9.30402 7.203L9.3005 7.20653Z"/>
          </svg>
                     }
                     />
                     </div>
                    )}         
                    </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-2 md:gap-4 pt-5 md:pt-7 border-t border-[#1a1a1a]">
            <Heading level={4} size={3}> Select Available Time for   {currentDate ? formatDate(currentDate, false, false) : ""}</Heading>
            <div className="grid grid-cols-4 gap-1.5 md:gap-2.5">
              {slots?.timeslots?.map((timeslot,index) => {  
                const isBooked = timeslot.check === "booked"; 
                const isActive = currentIndex  === index;
                return (
                  <div key={index} 
                    onClick={() => !isBooked && hadleTimeClick(timeslot,index)}
                    className={` border  border-[#E5E5E5] rounded-[4px] md:rounded-[14px] p-1 md:p-2 text-center 
                        ${isActive ? "bg-[#D1D5DB] text-[#1a1a1a] " : "bg-[#1a1a1a] text-[#D1D5DB] hover:bg-neutral-700"}
                        ${isBooked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                     <span className={`block text-[8px] md:text-[16px] font-medium`}>{timeslot.time}</span>
                  </div>
                );
              })}
            </div>
            {errors.slots && (
            <Errors ref={errorRef}>{errors.slots}</Errors>
          )}
          </div>
     
          
            <div className="text-center">
              {formData?.frequency?.option?.label === "One-time" && (
              <Button type="button" className={`flex items-center justify-center gap-2 w-full rounded-[8px] font-semibold`} onClick={addBooking}>
                  <Image src={`images/services/plus.svg`} width={14} height={14} alt="Plus"/>Add Date & Time
              </Button>
               )}
               {formData?.frequency?.option?.label != "One-time" && (
              <Button type="button" className={`flex items-center justify-center gap-2 w-full rounded-[8px] font-semibold`} onClick={addBooking}>
                  Confirm
              </Button>
               )}
            </div>
        

          </div>
          <div className="border-1 border-[#E5E7EB] shadow-[0px_4px_12px_0px_#0000001A] rounded-[23px] p-8">
            <Heading level={4} size={4} className={`mb-4.75 font-bold flex items-center gap-3`}>
              <Image src={`images/services/slots.svg`} width={19} height={26} alt="Slots"/> Your Selected Slots
            </Heading>
            <div className="grid grid-cols-1 gap-5 mb-4.75">
              {[...(formData?.booking || [])].reverse().map((b, idx) => ( 
                <div key={idx} className="bg-[#F9FAFB] rounded-[10px] p-5 relative group duration-200">
                  <div className="flex justify-between items-center mb-1.5 md:mb-2.5">
                    <span className="text-[#1a1a1a] text-[16px] md:text-[20px] font-semibold">{formatDate(b.date)}</span>
                    <span className="text-[#1a1a1a] text-[16px] md:text-[20px] font-medium">{b?.timeSlot?.time}</span>
                  </div>
                  <h4 className="text-[14px] md:text-[18px] font-normal text-[#666666]">{formData?.service?.service.title}</h4>
                  <div className="absolute right-[-6px] top-[-6px] opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-[1] duration-200">
                    <span className="" onClick={() => removeBooking(formData.booking.length - 1 - idx)} title="Remove">
                      <Image className="bg-[#1a1a1a] cursor-pointer rounded-full p-1.5" src={`images/services/cross.svg`} width={25} height={25} alt="Cross"/>
                    </span>
                    </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E5E7EB] pt-6">
              <Button type="button" onClick={prevStep} variant={`lightGray`} className={`border border-[#E5E5E5] block w-full md:text-[19px]`}>Back to Services</Button>
              <Button type="button" className={`block w-full md:text-[19px] mt-3 md:mt-5`} onClick={handleCheckout}>Proceed to Booking</Button>
              <h6 className="text-center text-[#666666] text-[13px] md:text-[15px] font-normal mt-5">You can review details on the next step.</h6>
            </div>
          </div>
        </div>
      </div>
    
    </div>
    );
    
  }
  export default Step2;