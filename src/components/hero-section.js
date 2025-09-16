import { Heading1,Content1,Content2,Button1,Heading2 } from "./typography";
import Image from "next/image";
const HeroSection = ({heading,content,buttonLink,buttonLabel,cardImg,cardCont,
    deskDashBoardImg,mobDashBoardImg,stepHeading,stepContent,steps}) => {
    return(
        <section className="w-full py-6 md:py-15 justify-center items-center">
            <div className="max-w-[1332px] mx-auto px-5.5 md:px-4">
                <div className="flex flex-col gap-2 md:gap-7 items-center text-center">
                    <Heading1 classDynamic="max-w-[258px] md:max-w-[600px]" title={heading}/>
                    <Content1 classDynamic="max-w-[290px] md:max-w-[830px] mb-1.5 md:mb-0" content={content}/>
                    <Button1 href={buttonLink} text={buttonLabel}/>
                    <div className="flex items-center justify-center gap-2.5 md:gap-4 mb-2 md:mb-0">
                        <Image src={cardImg} width={22} height={20} className="max-w-[13px] md:max-w-[22px]" alt="credit card" />
                        <span className="text-xs md:text-base">{cardCont}</span>
                    </div>
                    <Image className="hidden md:block" src={deskDashBoardImg} width={1024} height={400} alt="Calc"/>
                    <Image className="md:hidden block" src={mobDashBoardImg} width={396} height={399} alt="Calc Mob"/>
                </div>

                <div className="flex flex-col pt-8 md:pt-15 text-center">
                    <Heading2 classDynamic="max-w-[268px] mx-auto md:max-w-[100%] mb-3" title={stepHeading}/>
                    <Content1 content={stepContent} />
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