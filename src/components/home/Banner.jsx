"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Banner = () => {
    return (
        <div className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 px-6">

            {/* Animated Background Gradients */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />
            </div>

            {/* Glassmorphic Content Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="z-10 w-full max-w-4xl rounded-3xl border border-white/20 bg-white/30 p-12 text-center shadow-2xl backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/40"
            >
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl"
                >
                    Elevate Your Style
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 text-lg text-slate-600 dark:text-slate-300 md:text-xl"
                >
                    Exclusive collections for the elite. Experience the future of premium shopping.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-10 flex flex-wrap justify-center gap-4"
                >
                    <Button size="lg" className="h-14 bg-blue-600 px-8 text-lg hover:bg-blue-700">
                        Explore Collection
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 border-blue-600 px-8 text-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800">
                        View Offers
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Banner;