import { Heading, Content, Button } from "./ui";
import Image from "next/image";
const CleaningServices = ({heading,content,cards,buttonLabel,buttonLink}) => {
    return(
        <div className="w-full bg-[#F0F0F0] py-5.5 md:py-12.5">
            <div className="max-w-[1332px] mx-auto px-4">
              <div className="text-center">
                <Heading className={`mb-2 md:mb-3`}>{heading}</Heading>
                <Content className={`mb-4 md:mb-8`}>{content}</Content>
              </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-9">
                 {cards.map((card) => (
                    <div key={card.title} className="relative w-full rounded-[21px] overflow-hidden">
                        <Image className="w-full h-full object-cover" src={card.src} width={411} height={338} alt="Residental"/>
                        <div className="absolute inset-0 bg-[#000000]/50"></div>
                        <div className="flex flex-col absolute left-[35px] bottom-[35px] ">
                            <h3 className="text-[30px] md:text-[32px] text-[#fff] font-bold mb-1">{card.title}</h3>
                            <p className="text-[14px] md:text-[15px] text-[#E5E7EB]">{card.content}</p>
                        </div>
                    </div>
                 ))} 
               </div>
               <div className="text-center pt-4 md:pt-9">
                   <Button>{buttonLabel}</Button>
               </div>
            </div>
        </div>
    );
}

export default CleaningServices;