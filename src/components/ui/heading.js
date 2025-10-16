import { tv } from "tailwind-variants";

const heading = tv({
    base: "font-extrabold text-[#1a1a1a]",
    variants:{
        level:{
            1:"text-[26px] md:text-[50px] leading-8 md:leading-[4rem]",
            2:"text-[24px] md:text-[36px] leading-8 md:leading-13.5 md:font-bold",
            3:"",
            4:""
        },
        size:{
            1:"text-[27px] font-semibold",
            2:"text-[21px] font-medium",
            3:"text-[12px] md:text-[18px] font-medium",
     //       4:"text-[24px] md:text-[33px] font-semibold",
            4:"text-[21px] md:text-[24px] font-semibold",
            5:"text-[32px] font-semibold",
        },
    },
    defaultVariants:{
        level:2
    }
});

export const Heading = ({level=2, size, className,  children }) => {
   const Tag =  `h${level}`;
   return <Tag className={heading({level,size,className})}>{children }</Tag>;
}