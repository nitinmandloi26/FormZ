import { Heading2, Content1, Content2 } from "./typography";
import Image from "next/image";
const Testimonial = ({heading,content,items}) => {
    return(
        <div className="w-full py-5.5 md:py-15">
            <div className="max-w-[1332px] px-4 mx-auto">
               <Heading2 classDynamic="text-center mb-3" title={heading}/> 
               <Content1 classDynamic="text-center mb-8.75" content={content} />
               <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-6.5">
                  {items.map((item) => (
                    <div key={item.name} className="bg-[#F9F9F9] rounded-[17px] p-[34px] flex flex-col gap-4">
                       <div className="flex items-center gap-4">
                          <Image className="rounded-full" src={item.src} width={52} height={52} alt="Sarah"/>
                          <div className="w-full">
                            <h3 className="text-[#1A1A1A] font-semibold text-[17px]">{item.name}</h3>
                            <h4 className="text-[15px]">{item.position}</h4>
                          </div>
                       </div>
                       <Content2 content={item.content} />
                   </div>
                  ))}
               </div>
            </div>
        </div>
    );
}
export default Testimonial;