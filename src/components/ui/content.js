import { tv } from "tailwind-variants";

const contentVariants = tv({
    base:"text-[#666666]",
    variants:{
        variant:{
            1: "text-[12px] md:text-[22px]",
            2: "text-[17px]",
            3: "text-[14px]"
        }
    },
    defaultVariants:{
        variant:1
    }
});

export const Content = ({variant,children,className}) => {
    return <p className={contentVariants({variant,className})}>{children}</p>;
}