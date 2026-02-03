"use client";

import React from "react";
import { motion } from "framer-motion";
import { AsciiRenderer } from "@/components/AsciiRenderer";
import LandingNavbar from "./LandingNavbar";

const RefinedHero = () => {
    return (
        <div className="relative min-h-screen w-full flex flex-col pt-32 pb-20 px-8">
            <LandingNavbar />

            {/* ASCII Background */}
            <div className="absolute inset-0 -z-20 overflow-hidden bg-black">
                <AsciiRenderer
                    asciiFontSize={10}
                    className="w-full h-full opacity-60"
                    videoSrc="/videos/nyla_bg_hero.mp4"
                    color="#32ff9f"
                    renderMode="classic"
                />
                {/* Dark Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none" />
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <div className="overflow-hidden">
                        <h1 className="text-[clamp(2.5rem,10vw,7rem)] font-bold tracking-tight leading-[0.9] text-white">
                            We build intelligent <br />
                            systems <span className="text-neon">with craft.</span>
                        </h1>
                    </div>

                    <p className="max-w-xl text-lg md:text-xl text-white/50 leading-relaxed font-medium">
                        Boutique studio designing AI-powered automations, custom software, and digital experiences.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-6">
                        <button className="px-10 py-4 bg-white text-black font-bold rounded-lg hover:bg-neon transition-colors duration-300">
                            Get in touch
                        </button>
                        <button className="px-10 py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-colors duration-300">
                            View work
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Decorative vertical lines or grid dots if needed, matching the aesthetic */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
    );
};

export default RefinedHero;
