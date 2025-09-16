import Image from "next/image";
import Link from "next/link";
import Cta from "./cta";
import footerConfig from "@/config/footerConfig";

const Footer = () => {
    return(
      <div className="w-full">
        <Cta title={footerConfig.cta.title}
             content={footerConfig.cta.content}
             buttonLabel={footerConfig.cta.buttonLabel}
             buttonLink={footerConfig.cta.buttonLink}
             info={footerConfig.cta.info}
        />
        <footer className="w-full bg-[#F0F0F0] text-[#666666]">
            <div className="max-w-7xl mx-auto px-6.25 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-[2.1791fr_repeat(4,1fr)]  pt-8 md:pt-16 pb-12 gap-8">
                    <div className="flex flex-col col-span-2 md:col-span-1 gap-4">
                        <Link href={footerConfig.logo.href} className="flex items-center"><Image src={footerConfig.logo.src} width={89} height={32} alt={footerConfig.logo.alt} /></Link>
                        <p className="max-w-[311px]">{footerConfig.description}</p>
                    </div>
                    {footerConfig.links.map((section)=> (
                        <div key={section.title} className="flex flex-col gap-4">
                            <h3 className="text-[#1a1a1a] font-semibold">{section.title}</h3>
                            <ul className="flex flex-col gap-3">
                                {section.links.map((item) => (
                                    <li key={item.name}><Link href={item.href}>{item.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>
                <div className="text-center border-t border-[#E5E5E5] pt-5 pb-8">
                    <p className="text-xs">{footerConfig.bottomText}</p>
                </div>
            </div>
        </footer>
      </div>
    )
}
    

export default Footer;