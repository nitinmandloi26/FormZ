"use client";

import {useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "./ui";
import Calendar from "react-calendar";
import { Heading, Content } from "./ui";


const BookingSlotsPage = ({hero,slots}) => {
   const router = useRouter();
   const[serviceResults, setServiceResults] = useState(null);

   useEffect(() => {
    const stored = sessionStorage.getItem("serviceResults");
    if(stored){
        setServiceResults(JSON.parse(stored));
    } else {
        router.push('/services');
    }
   },[]);

   if (!serviceResults) {
  return (
    <Loader></Loader>
  );
}


   return (
    <div className="w-full py-6 md:py-15 justify-center items-center">
      <div className="max-w-[1332px] mx-auto px-5.5 md:px-4">
        <div className="text-center mb-6 md:mb-12">
          <Heading level={1} className={`mb-3 md:mb-5`}>{hero.heading}</Heading>
          <Content className={`max-w-[325px] md:max-w-[830px] mb-1.5 mx-auto md:mb-0`}>{hero.content}</Content>
        </div>
        <div className="grid grid-cols-[0.96fr_repeat(1,1fr)] gap-7.5">
          <div className="border-1 border-[#E5E5E5] rounded-[23px] p-9.25">
            <Heading level={3} size={1} className={`mb-6.75`}>{slots.selectDate}</Heading>
            <Calendar  
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
          <div className="border-1 border-[#E5E5E5] rounded-[23px] p-9.25">
            <Heading level={3} size={1} className={`mb-6.75`}>{slots.availableSlot}</Heading>
            <Content variant={2}>Monday, January 15, 2024</Content>
            <div className="">
              
            </div>
          </div>
        </div>
        <pre>{JSON.stringify(serviceResults, null, 2)}</pre>
      </div>
        
    </div>
   );

}
export default BookingSlotsPage;