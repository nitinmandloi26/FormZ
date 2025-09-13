import { Heading1,Content1,Content2,Button1,Heading2 } from "./typography";
import Image from "next/image";
const HeroSection = () => {
    const steps = [
        {icon:"images/credit-card.svg",title:"1. Select Cleaning Type",content:"Choose from residential, commercial, deep cleaning, or specialized services."},
        {icon:"images/calender.svg",title:"2. Pick a Time & Date",content:"Select a convenient time slot that fits, perfectly into your busy schedule."},
        {icon:"images/mark.svg",title:"3. Relax & Enjoy",content:"Our vetted cleaning professionals will arrive on time and deliver spotless results."}
    ];
    return(
        <section className="w-full py-6 md:py-15 justify-center items-center">
            <div className="max-w-[1332px] mx-auto px-5.5 md:px-4">
                <div className="flex flex-col gap-2 md:gap-7 items-center text-center">
                    <Heading1 classDynamic="max-w-[258px] md:max-w-[600px]" title="Professional at Your Fingertips"/>
                    <Content1 classDynamic="max-w-[290px] md:max-w-[830px] mb-1.5 md:mb-0" content="Book trusted cleaning professionals for your home, office, or business. Simply choose your service, pick a time, and enjoy spotless results."/>
                    <Button1 href="#" text="Book Now"/>
                    <div className="flex items-center justify-center gap-2.5 md:gap-4 mb-2 md:mb-0">
                        <Image src="images/credit-card.svg" width={22} height={20} className="max-w-[13px] md:max-w-[22px]" alt="credit card" />
                        <span className="text-xs md:text-base">No credit card needed</span>
                    </div>
                    <Image src="images/calc-1.png" width={1024} height={400} alt="Calc"/>
                </div>

                <div className="flex flex-col pt-15 text-center">
                    <Heading2 classDynamic="max-w-[268px] mx-auto md:max-w-[100%] mb-3" title="A Simpler Way to Book Cleaning"/>
                    <Content1 content="Get your space cleaned in just three simple steps." />
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-6.75 mt-4 md:mt-7.5">
                        {steps.map((step) => (
                            <div key={step.title} className="border border-[#E5E5E5] rounded-[20px] p-9">
                                <span className="w-16 h-16 mb-6 mx-auto rounded-full bg-[#F0F0F0] flex items-center justify-center">
                                    <Image src={step.icon} width={30} height={26} alt="Brush"/>
                                </span>
                                <h3 className="text-[#1A1A1A] font-semibold text-[26px] mb-3">{step.title}</h3>
                                <Content2 classDynamic="max-w-[320px] mx-auto" content={step.content}/>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
export default HeroSection;