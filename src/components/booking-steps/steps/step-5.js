"use client";
import { Heading, Content,  Button } from "@/components/ui";
import Image from "next/image";
const Step5 = ({hero,prevStep}) => {
    return (
        <div className="w-full py-6 md:py-15 justify-center items-center">
            <div className="max-w-[1332px] mx-auto px-5.5 md:px-4">
                <div className="text-center mb-6 md:mb-12">
                    <Heading level={1} className={`mb-3 md:mb-5`}>{hero.heading}</Heading>
                    <Content className={`max-w-[325px] md:max-w-[830px] mb-1.5 mx-auto md:mb-0`}>{hero.content}</Content>
                </div>
            </div>
        </div>
    );
}
export default Step5;