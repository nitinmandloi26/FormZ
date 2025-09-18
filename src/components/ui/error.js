import { tv } from "tailwind-variants";

const errors = tv({
    base:"",
    variants:{
        variant:{
            1:"text-red-500 text-[17px] mt-2 font-bold"
        }
    },
    defaultVariants:{
        variant:1
    }
});

export const Errors = ({variant,children,className}) => {
    return <p className={errors({variant,className})}>{children}</p>;
}