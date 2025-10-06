import Link from "next/link";
import { tv } from "tailwind-variants";

const button = tv({
    base:`text-[12px] md:text-[16px] px-3.75 md:px-7 md:py-3.5 py-2 
    font-semibold inline-flex rounded-full transition cursor-pointer`,
    variants:{
        variant:{
            dark:"bg-[#1a1a1a] text-white hover:bg-neutral-700",
            light:"bg-white text-[#1a1a1a] hover:bg-[#f9f9f9]",
            lightGray:"bg-[#F0F0F0] text-[#1A1A1A] hover:bg-[#d1d1d1]",
            lightGrayB:"bg-[#F0F0F0] text-[#1A1A1A] border border-[#E5E5E5] hover:bg-[#d1d1d1]"
        }
    },
    defaultVariants:{
        variant:"dark"
    }
});

export const Button = ({href = "#", children, type ="link", variant, className, ...props}) => {
    const classes = button({variant, className});
    if(type==="button"){
        return (
            <button className={classes} {...props}>
                {children}
            </button>
        );
    }

    return (
        <Link href={href || "#"} className={classes} {...props}>{children}</Link>
    );
}