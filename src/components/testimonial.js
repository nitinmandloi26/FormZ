import { Heading2, Content1, Content2 } from "./typography";
import Image from "next/image";
const Testimonial = () => {
    const items = [
        {src:'/images/sarah.jpg',name:'Sarah L.',position:'Homeowner',content:'"Cleanly has been a lifesaver! The booking process is incredibly simple and the quality of cleaning is consistently top-notch. My house has never looked better."'},
        {src:'/images/michael.jpg',name:'Michael B.',position:'Office Manager',content:'"We use Cleanly for our weekly office cleanings. The platform makes it easy to manage schedules and payments. Our workspace is always spotless and professional."'},
        {src:'/images/jessica.jpg',name:'Jessica P.',position:'Busy Professional',content:'"The deep cleaning service was amazing! They got into every corner and crevice. I love coming home to a perfectly clean space without lifting a finger."'}
    ];
    return(
        <div className="w-full py-5.5 md:py-15">
            <div className="max-w-[1332px] px-4 mx-auto">
               <Heading2 classDynamic="text-center mb-3" title="Trusted by Thousands Worldwide"/> 
               <Content1 classDynamic="text-center mb-8.75" content="See what our happy customers are saying about cleanly." />
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