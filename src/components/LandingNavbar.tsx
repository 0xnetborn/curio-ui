"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const LandingNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-transparent">
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm">
                        <span className="text-black font-black text-sm italic">C</span>
                    </div>
                    <span className="text-xl font-bold tracking-tighter uppercase text-white group-hover:text-neon transition-colors duration-300">
                        Curiositas
                    </span>
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-8">
                {["Home", "Services", "Projects", "About", "Blog", "Careers", "Contact"].map((item) => (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-xs font-medium text-white/70 hover:text-white transition-colors uppercase tracking-widest"
                    >
                        {item}
                    </Link>
                ))}
                <button className="flex items-center gap-1 px-3 py-1 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-tighter text-white hover:bg-white/5 transition-colors">
                    EN <ChevronDown className="w-3 h-3" />
                </button>
            </div>
        </nav>
    );
};

export default LandingNavbar;
