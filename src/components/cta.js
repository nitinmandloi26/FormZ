import { Heading2, Content2, Button2 } from "./typography";
const Cta = ({title,content,buttonLabel,buttonLink,info}) => {
    return(
        <div className="w-full bg-[#1A1A1A] py-7 md:py-12.5 text-center">
            <div className="max-w-[1332px] px-4 mx-auto">
                <Heading2 classDynamic="text-white mb-3 md:mb-4 max-w-[245px] mx-auto md:max-w-[100%]" title={title}/>
                <p className="text-[12px] md:text-[17px] text-[#D1D5DB] max-w-[632px] mx-auto mb-4 md:mb-6">{content}</p>
                <Button2 classDynamic="mb-4" href={buttonLink} text={buttonLabel}/>
                <h4 className="text-[#9CA3AF] text-[12px] md:text-[14px] font-normal">{info}</h4>
            </div>
        </div>
    );
}

export default Cta;