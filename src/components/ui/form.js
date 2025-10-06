import { tv } from "tailwind-variants";

const label = tv({
    base: "block text-[#1A1A1A] font-medium",
    variants:{
        variant:{
            1:"text-[14px] md:text-[18px] mb-2.5 md:mb-3",
            2:"text-[16px] font-normal mb-0"
        }
    },
    defaultVariants:{
        variant:1
    }
});

export const Label = ({variant, className,  children ,...props}) => {
   return <label className={label({variant,className})} {...props}>{children }</label>;
}

const input = tv({
    base: "w-full font-normal border border-[#E5E5E5] rounded-2xl text-[#666] placeholder:text-[#ADAEBC]",
    variants:{
        variant:{
            1:"text-[18px] py-3.5 px-5.5"
        }
    },
    defaultVariants:{
        variant:1
    }
});

export const Input = ({variant, className, ...props}) => {
   return <input className={input({variant,className})} {...props} />;
}

export const Select = ({variant, className, children, ...props}) => {
   return <select className={input({variant,className})} {...props}>
    {children}
   </select>;
}

export const TextArea = ({variant, className, children, ...props}) => {
   return <textarea className={input({variant,className})} {...props}>
    {children}
   </textarea>;
}