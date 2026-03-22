"use client";
import React from "react";
import { motion } from "framer-motion";
import Logo from "@/components/layouts/Logo";

const Loading = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/60 backdrop-blur-md">
            <div className="relative flex flex-col items-center gap-10">

                {/* (Breathing Effect) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [0.95, 1.05, 0.95]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative"
                >
                    {/*  */}
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />

                    <div className="relative p-8 bg-card/30 border border-border/40 rounded-[3rem] shadow-2xl">
                        <Logo />
                    </div>
                </motion.div>

                
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0.2, y: 0 }}
                                animate={{ opacity: 1, y: -5 }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: i * 0.2,
                                }}
                                className="w-2 h-2 rounded-full bg-primary"
                            />
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] font-black uppercase tracking-[0.6em] text-muted-foreground ml-[0.6em]"
                    >
                        Processing <span className="text-primary">Data</span>
                    </motion.p>
                </div>
            </div>

            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                    Elite Mart Digital Engine
                </p>
            </div>
        </div>
    );
};

export default Loading;