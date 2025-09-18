import { tv } from "tailwind-variants";

const loader = tv({
    base:"flex items-center justify-center h-screen",
    variants:{
        variant:{
            1: "bg-gray-50"
        }
    },
    defaultVariants:{
        variant:1
    }
});

export const Loader = ({variant,children="Loading your booking details...",className}) => {
  return (
    <div className={loader({variant,className})}>
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-lg font-medium text-gray-600">
          {children}
        </p>
      </div>
    </div>
  ); 
}