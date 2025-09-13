import Image from "next/image";
import Link from "next/link";
 const Footer = () => {
    const products = [
        {name:"Features", href:"#"},
        {name:"Pricing", href:"#"},
        {name:"Integrations", href:"#"},
        {name:"Updates", href:"#"}
    ];
    const company = [
        {name:"About Us", href:"#"},
        {name:"Careers", href:"#"},
        {name:"Press", href:"#"},
        {name:"Contact", href:"#"}
    ];
    const resources = [
        {name:"Blog", href:"#"},
        {name:"Help Center", href:"#"},
        {name:"API Docs", href:"#"},
        {name:"Security", href:"#"}
    ];
    const legal = [
        {name:"Privacy Policy", href:"#"},
        {name:"Terms of Service", href:"#"}
    ];
    return(
        <footer className="w-full bg-[#F0F0F0] text-[#666666]">
            <div className="max-w-7xl mx-auto px-6.25 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-[2.1791fr_repeat(4,1fr)]  pt-8 md:pt-16 pb-12 gap-8">
                    <div className="flex flex-col col-span-2 md:col-span-1 gap-4">
                        <Link href="/" className="flex items-center"><Image src="logo.svg" width={89} height={32} alt="logo" /></Link>
                        <p className="max-w-[311px]">The modern solution for booking and managing professional cleaning services for homes and businesses.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[#1a1a1a] font-semibold">Product</h3>
                        <ul className="flex flex-col gap-3">
                            {products.map((item) => (
                                <li key={item.name}><Link href={item.href}>{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[#1a1a1a] font-semibold">Company</h3>
                        <ul className="flex flex-col gap-3">
                            {company.map((item) => (
                                <li key={item.name}><Link href={item.href}>{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[#1a1a1a] font-semibold">Resources</h3>
                        <ul className="flex flex-col gap-3">
                            {resources.map((item) => (
                                <li key={item.name}><Link href={item.href}>{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[#1a1a1a] font-semibold">Legal</h3>
                        <ul className="flex flex-col gap-3">
                            {legal.map((item) => (
                                <li key={item.name}><Link href={item.href}>{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="text-center border-t border-[#E5E5E5] pt-5 pb-8">
                    <p className="text-xs">2025@</p>
                </div>
            </div>
        </footer>
    )
}
    

export default Footer;