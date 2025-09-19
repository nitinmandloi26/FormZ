"use client";

import {useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "./ui";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';


const BookingSlotsPage = () => {
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
    <div className="">
        <Calendar  />
        <pre>{JSON.stringify(serviceResults, null, 2)}</pre>
    </div>
   );

}
export default BookingSlotsPage;