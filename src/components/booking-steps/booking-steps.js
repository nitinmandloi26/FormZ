"use client";
import { useState,useCallback  } from "react";
import serviceConfig from "@/config/serviceConfig";
import bookingSlotsConfig from "@/config/bookingSlotsConfig";
import customerDetailConfig from "@/config/customerDetailConfig";
import paymentConfig from "@/config/paymentConfig";
import bookingConfirmConfig from "@/config/bookingConfirmConfig";
import Step1 from "./steps/step-1";
import Step2 from "./steps/step-2";
import Step3 from "./steps/step-3";
import Step4 from "./steps/step-4";
import Step5 from "./steps/step-5";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "../ui/progress-bar";

const variants = {
    enter: { y: 50, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: 0, opacity: 0 }
  };



export default function BookingSteps(){
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const handleChange = useCallback((data) => {
  setFormData(prev => ({ ...prev, ...data }));
}, []);


     const nextStep = () => {
  setStep((prev) => prev + 1);
  window.scrollTo({ top: 0, behavior: "auto" }); // 👈 scrolls to top
};

const prevStep = () => {
  setStep((prev) => prev - 1);
  window.scrollTo({ top: 0, behavior: "auto" });
};



    return(
        <div className="relative w-full overflow-hidden">
            <ProgressBar step={step} totalSteps={6} />
          <AnimatePresence mode="wait">
            {step === 1 && (
               <motion.div
            key="step1"
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.6 }}
            className="w-full"
          >

           <Step1 {...serviceConfig} 
                formData={formData}
                handleChange={handleChange}
                nextStep={nextStep}
                />
               
            </motion.div>
             )}
             {step === 2 && (
              <motion.div
            key="step2"
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
                <Step2 {...bookingSlotsConfig} 
                formData={formData}
                handleChange={handleChange}
                nextStep={nextStep}
                prevStep={prevStep} 
                />
            </motion.div>
             )}
             {step === 3 && (
              <motion.div
            key="step3"
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
                <Step3 {...customerDetailConfig} 
                formData={formData}
                handleChange={handleChange}
                nextStep={nextStep}
                prevStep={prevStep} 
                />
            </motion.div>
             )}

              {step === 4 && (
              <motion.div
            key="step4"
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
                <Step4 {...paymentConfig} 
                formData={formData}
                handleChange={handleChange}
                nextStep={nextStep}
                prevStep={prevStep} 
                />
            </motion.div>
             )}

             {step === 5 && (
              <motion.div
            key="step4"
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="w-full"
          >

             <Step5 {...bookingConfirmConfig} 
                formData={formData}
                handleChange={handleChange}
                nextStep={nextStep}
                prevStep={prevStep} 
                />
             
                
            </motion.div>
             )}
             </AnimatePresence>
        </div>
    );
}