"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Hammer, ArrowLeft, Construction } from "lucide-react";

const Error404 = () => {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-background px-6 overflow-hidden">

            {/* Background Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 blur-[150px] rounded-full" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">

                {/* Animated Icon Container */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="mb-8 p-8 bg-card border border-border/50 rounded-[3rem] shadow-2xl relative group"
                >
                    <div className="absolute inset-0 bg-primary/5 rounded-[3rem] scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Construction size={80} className="text-primary animate-bounce duration-[2000ms]" />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
                        Feature <span className="text-primary italic text-3xl md:text-5xl">Under Development</span>
                    </h2>

                    <p className="text-muted-foreground font-medium text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed uppercase tracking-wider">
                        We are currently crafting a <span className="text-primary font-bold">Premium Experience</span> for this section. Stay tuned as we build something amazing for you.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <Link
                        href="/"
                        className="group flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-[0_0_30px_-5px_oklch(var(--primary))] transition-all active:scale-95"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <div className="px-8 py-4 border border-border rounded-2xl font-black uppercase tracking-widest text-[10px] text-muted-foreground flex items-center justify-center">
                        Coming <span className="text-primary mx-1">Soon</span> 2026
                    </div>
                </motion.div>
            </div>

            {/* Subtle Bottom Badge */}
            <div className="absolute bottom-12 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
                Elite Mart • Digital Craftsmanship
            </div>
        </div>
    );
};

export default Error404;