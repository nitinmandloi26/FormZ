import Link from "next/link";
export const Heading1 = ({title,classDynamic}) => {
    return(
        <h1 className={`text-[26px] md:text-[50px] font-extrabold text-[#1a1a1a]  mx-auto leading-8 md:leading-16 ${classDynamic}`}>{title}</h1>
    );
}

export const Heading2 = ({title,classDynamic}) => {
    return(
        <h2 className={`text-[24px] md:text-[36px] leading-8 md:leading-13.5 text-[#1a1a1a] font-extrabold md:font-bold ${classDynamic}`}>{title}</h2>
    );
}

export const Content1 = ({content,classDynamic}) => {
    return(
        <p className={`text-[12px] md:text-[22px] ${classDynamic}`}>{content}</p>
    );
}

export const Content2 = ({content,classDynamic}) => {
    return(
        <p className={`text-[17px] ${classDynamic}`}>{content}</p>
    );
}

export const Button1 = ({href,text,classDynamic}) => {
    return(
        <Link href={href} className={`text-[10px] md:text-[16px] bg-[#1a1a1a] text-white px-3.75 md:px-7 md:py-3.5 py-2 inline-flex  rounded-full font-semibold hover:bg-neutral-700 transition ${classDynamic}`}>{text}</Link>
    );
}

export const Button2 = ({href,text,classDynamic}) => {
    return(
        <Link href={href} className={`text-[10px] md:text-[16px] bg-white text-[#1a1a1a] px-3.75 md:px-7 md:py-3.5 py-2 font-semibold inline-flex rounded-full hover:bg-[#f9f9f9] transition ${classDynamic}`}>{text}</Link>
    );
}