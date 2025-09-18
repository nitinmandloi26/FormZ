import { Heading, Content, Button } from "./ui";
import Image from "next/image";
const HeroSection = ({hero, card, image, steps}) => {
    return(
        <section className="w-full py-6 md:py-15 justify-center items-center">
            <div className="max-w-[1332px] mx-auto px-5.5 md:px-4">
                <div className="flex flex-col gap-2 md:gap-7 items-center text-center">
                    <Heading level="1" className="max-w-[258px] md:max-w-[600px]">{hero.heading}</Heading>
                    <Content className={`max-w-[290px] md:max-w-[830px] mb-1.5 md:mb-0`}>{hero.content}</Content>
                    <Button href={hero.buttonLink}>{hero.buttonLabel}</Button>
                    <div className="flex items-center justify-center gap-2.5 md:gap-4 mb-2 md:mb-0">
                        <Image src={card.img} width={22} height={20} className="max-w-[13px] md:max-w-[22px]" alt="credit card" />
                        <span className="text-xs md:text-base">{card.text}</span>
                    </div>
                    <Image className="hidden md:block" src={image.desktop} width={1024} height={400} alt="Calc"/>
                    <Image className="md:hidden block" src={image.mobile} width={396} height={399} alt="Calc Mob"/>
                </div>

                <div className="flex flex-col pt-8 md:pt-15 text-center">
                    <Heading className={`max-w-[268px] mx-auto md:max-w-[100%] mb-3`}>{steps.heading}</Heading>
                    <Content>{steps.content}</Content>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-6.75 mt-4 md:mt-7.5">
                        {steps.items.map((step) => (
                            <div key={step.title} className="border border-[#E5E5E5] rounded-[20px] p-9">
                                <span className="w-17.5 h-17.5 mb-6 mx-auto rounded-full bg-[#F0F0F0] flex items-center justify-center">
                                    <Image src={step.icon} width={30} height={26} alt="Brush"/>
                                </span>
                                <h3 className="text-[#1A1A1A] font-semibold text-[26px] mb-3">{step.title}</h3>
                                <Content variant={2}>{step.content}</Content>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
export default HeroSection;