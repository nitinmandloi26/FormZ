"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navItems = [
        {name:"Services", href:"#" },
        {name:"How It Works", href:"#"},
        {name:"Pricing", href:"#"},
        {name:"For Professionals", href:"#"}
    ];
    return (
    <header className="w-full bg-[#F9F9F9]">
        <div className="max-w-[1332px] mx-auto flex items-center justify-between md:p-4 p-5.5">
            <Link href="/" className="flex items-center">
                <Image src="logo.svg" width={89} height={32} alt="Logo" className="max-w-[57px] md:max-w-[89px]" priority />
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                    <Link className="text-[#666666] hover:text-[#1A1A1A]" key={item.name} href={item.href}>{item.name}</Link>
                ))}
            </nav>
            <div className="hidden md:flex items-center space-x-8 text-[#666666]">
                <Link href="#">Login</Link>
                <Link href="#" className="bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full font-medium hover:bg-neutral-700 transition">
  Sign Up Free
</Link>
            </div>
            <button className="md:hidden text-[#1A1A1A] focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>  
              ) :(
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 14" fill="none">
                    <path d="M0 1H18" stroke="black" strokeWidth="1.4"/>
                    <path d="M0 7H18" stroke="black" strokeWidth="1.4"/>
                    <path d="M0 13H18" stroke="black" strokeWidth="1.4"/>
                </svg>
              ) }
            </button>
        </div>
        {isOpen && (
        <div className="md:hidden bg-[#F9F9F9] px-5.5 pb-6 space-y-4 shadow">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                className="text-[#666666] hover:text-[#1A1A1A]"
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
            <Link href="#" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link
              href="#"
              className="bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full font-medium hover:bg-neutral-700 transition text-center"
              onClick={() => setIsOpen(false)}
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      )}
    </header>
    );
};

export default Header;