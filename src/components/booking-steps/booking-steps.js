"use client";
import { useState } from "react";
import serviceConfig from "@/config/serviceConfig";
import bookingSlotsConfig from "@/config/bookingSlotsConfig";
import Step1 from "./steps/step-1";
import Step2 from "./steps/step-2";
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
    const handleChange = (data) => {
         setFormData(prev => ({ ...prev, ...data }));
     };

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
             </AnimatePresence>
        </div>
    );
}